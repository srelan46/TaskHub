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
        <div className="flex h-screen">
            <div className="w-full lg:w-3/5 bg-fuchsia-200 text-black dark:bg-violet-900 dark:text-white font-bold flex items-center justify-center">
                <div className="text-center text-[32px]">
                    Welcome to Taskhub
                </div>
            </div>
            <div className="w-full lg:w-2/5 bg-violet-900 text-white dark:bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-[20px] font-bold leading-[1.2] md:text-[32px] md:leading-8">
                        Let's Get Started
                    </h2>
                    <div className="mt-5">
                        <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
                            <button className="h-12 rounded-md text-base font-medium bg-[#3C46FF] text-white hover:bg-[#0000FF]" onClick={handleLogin}>
                                Login
                            </button>
                            <button className="h-12 rounded-md text-base font-medium bg-[#3C46FF] text-white hover:bg-[#0000FF]" onClick={handleRegister}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}