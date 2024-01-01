import { RegisterForm } from "./form";
import { SubmitButton } from "../submit-button";
import Link from "next/link";
export default function Register() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-violet-900">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-blue-600 bg-gray-100 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold text-black">Sign Up</h3>
                    <p className="text-sm text-gray-500">
                        Signup to Get Started
                    </p>
                </div>
                <RegisterForm action={'do nothing'}>
                    <SubmitButton>Sign Up</SubmitButton>
                </RegisterForm>
            </div>
        </div>
    );
}