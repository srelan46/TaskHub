"use client";
import { RegisterForm } from "./form";
import { SubmitButton } from "../submit-button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password,email,firstname,lastname }),
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            router.push('/home');
        } catch (error) {
            setIsError(true);
            console.error('Registration error:', error);
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-violet-900">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-blue-600 bg-gray-100 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold text-black">Sign Up</h3>
                    <p className="text-sm text-gray-500">
                        Signup to Get Started
                    </p>
                </div>
                <RegisterForm onSubmit={onSubmit}
                            username={username}
                            onUsernameChange={(e) => setUsername(e.target.value)}
                            password={password}
                            onPasswordChange={(e) => setPassword(e.target.value)}
                            email={email}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  firstname={firstname}
                  onFirstNameChange={(e) => setFirstName(e.target.value)}
                  lastname={lastname}
                  onLastNameChange={(e) => setLastName(e.target.value)}
                >
                    <SubmitButton>Sign Up</SubmitButton>
                </RegisterForm>
            </div>
        </div>
    );
}