"use client";
import Link from 'next/link';
import { LoginForm } from './form';
import { SubmitButton } from '../submit-button';
import { FormEvent, useState } from 'react';
import router from 'next/router';

export default function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [isError,setIsError] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }
        router.push('/home');
    } catch (error) {
        setIsError(true);
        console.error('Login error:', error);
    }
};
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-900">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-blue-600 bg-gray-100 px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-black">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <LoginForm onSubmit={onSubmit}>
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-black">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </LoginForm>
      </div>
    </div>
  );
}