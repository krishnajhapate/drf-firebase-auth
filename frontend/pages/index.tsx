import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { LockClosedIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res.user);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeHandler = (e: { target: object }) => {
        const { name, value } = e.target;

        setValues({ ...values, [name]: value });
    };
    console.log(values);

    return (
        <div className="flex min-h-screen text-black flex-col items-center justify-center py-2 bg-[url('../assets/grade.jpg')] ">
            <Head>
                <title> Hello Dev - Krishna </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className=" font-bold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Namaste Devs
                </h1>

                <p className="mt-3 text-2xl">Firebase Django and Next auth </p>
                <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img
                                    className="mx-auto h-12 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    alt="Workflow"
                                />
                                <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>
                            <form
                                className="mt-8 space-y-6"
                                action="#"
                                method="POST"
                            >
                                <input
                                    type="hidden"
                                    name="remember"
                                    defaultValue="true"
                                />
                                <div className="rounded  ">
                                    <div>
                                        <label
                                            htmlFor="email-address"
                                            className="sr-only"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={values.email}
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none p-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  mb-2 text-gray-900 rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-base"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Password
                                        </label>
                                        <input
                                            onChange={onChangeHandler}
                                            value={values.password}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none p-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 "
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-600 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <LockClosedIcon
                                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        Sign in
                                    </button>

                                    <button
                                        onClick={signInWithGoogle}
                                        className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-600 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                        Google
                                    </button>

                                    <button className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-600 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                                        Phone
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="flex h-24 w-full items-center justify-center border-t">
                <a
                    className="flex items-center justify-center gap-2"
                    href="https://github.com/krishnajhapate"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Developed with ❤️ by Krishna Jhapate
                </a>
            </footer>
        </div>
    );
};

export default Home;
