'use client'
import { useRouter } from 'next/navigation';

export default function Landing() {
    const router = useRouter();
    const handleLogin = () => {
        router.push('/login');
    };
    const handleRegister = () => {
        router.push('/register');
    }
    return (
        <div className="flex ">
            <div className="w-full lg:w-3/5 p-4 bg-fuchsia-200 text-black dark:bg-violet-900 dark:text-white font-bold">
                <div className="text-center py-72 text-[32px]">
                    Welcome to Taskhub
                </div>
            </div>
            <div className="w-full lg:w-2/5 h-full">
                <div className="bg-violet-900 py-24 lg:py-72 xl:py-96 dark:bg-black text-white">
                    <div className="relative flex w-full grow flex-col items-center justify-center">
                        <h2 className="text-center text-[20px] font-bold leading-[1.2] md:text-[32px] md:leading-8">
                            Let's Get Started
                            <div className="mt-5 w-full max-w-[440px]">
                                <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
                                    <button className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]" onClick={handleLogin}>
                                        Login
                                    </button>
                                    <button className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]" onClick={handleRegister}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}