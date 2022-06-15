import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { LockClosedIcon } from "@heroicons/react/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
interface Value {
    email: string;
    password: string;
}

interface User {
    type: string;
    login: boolean;
    name: string;
}

interface ResetPassword {
    email: string;
    otp?: string;
}

const tempValue = {
    type: "",
    name: "",
    login: false,
};
const tempReset = {
    email: "",
    otp: "",
};

const Home: NextPage = () => {
    const [values, setValues] = useState<Value>({
        email: "",
        password: "",
    });
    const [user, setUser] = useState<User>(tempValue);
    const [resetValue, setResetValue] = useState<ResetPassword>(tempReset);

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res.user);
            let idToken = await res.user.getIdToken(true);
            console.log(idToken);

            const { data } = await axios.post(
                "http://localhost:8000/api/register",
                {},
                {
                    headers: { Authorization: `JWT ${idToken}` },
                }
            );
            console.log(data, "+++");
            setUser({
                type: "Google",
                login: true,
                name: res.user.displayName,
            });
            return toast.success("Logged in successful");
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeHandler = (e: {
        target: { name: string; value: string };
    }) => {
        const { name, value } = e.target;

        setValues({ ...values, [name]: value });
    };

    const onChangeResetHandler = (e: {
        target: { name: string; value: string };
    }) => {
        const { name, value } = e.target;

        setResetValue({ ...values, [name]: value });
    };

    const signout = () => {
        auth.signOut();
        setValues(tempValue);
        toast.info("Logged out succesful");
        // window.location.reload();
    };

    const logInWithEmailAndPassword = async (e: any) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            console.log(res);
            console.log(res.user);
            setUser({
                name: "User",
                type: "Email/Password",
                login: true,
            });
            toast.success("Logged in successful");
        } catch (err: any) {
            toast.error("Invalid credentials");
        }
    };

    const registerWithEmailAndPassword = async (e: any) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const user = res.user;
            console.log(user);
            setUser({
                name: "User",
                type: "Email/Password",
                login: true,
            });
            toast.success("Registered successful");
        } catch (err) {
            console.error(err);
            toast.error("Register failed");
        }
    };

    const sendPasswordReset = async (e: any) => {
        e.preventDefault();
        try {
            const res = await sendPasswordResetEmail(auth, resetValue.email);
            console.log(res);
            toast.success("Password reset link sent!");
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    const verifyReq = async () => {
        try {
            const token = await auth.currentUser?.getIdToken(true);
            console.log(token);
            const { data } = await axios.get(
                "http://localhost:8000/api/verified",
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            );
            console.log(data, "+++");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen text-black flex-col items-center justify-center py-2 bg-[url('../assets/grade.jpg')] ">
            <ToastContainer />

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
                    {user.login === true ? (
                        <div className="card bg-transparent card-compact w-96 bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src="https://api.lorem.space/image/shoes?w=400&h=225"
                                    alt="Shoes"
                                />
                            </figure>
                            <div className="card-body ">
                                <h2 className="card-title">
                                    Hello {user.name}
                                </h2>
                                <p>You logged in with {user.type} </p>
                                <div className="card-actions justify-start">
                                    <span
                                        className="btn btn-success"
                                        onClick={verifyReq}
                                    >
                                        Verify
                                    </span>
                                </div>
                                <div className="card-actions justify-end">
                                    <span
                                        className="btn btn-primary"
                                        onClick={signout}
                                    >
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-full grid grid-cols-2 gap-5  justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                                    onSubmit={logInWithEmailAndPassword}
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

                                <form onSubmit={registerWithEmailAndPassword}>
                                    <button
                                        type="submit"
                                        className="group relative mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-600 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                        <span className="absolute  left-0 inset-y-0 flex items-center pl-3">
                                            <LockClosedIcon
                                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        Register
                                    </button>
                                </form>
                            </div>

                            <div className="max-w-md w-full space-y-8">
                                <div>
                                    <img
                                        className="mx-auto h-12 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        alt="Workflow"
                                    />
                                    <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
                                        Reset password
                                    </h2>
                                </div>
                                <form
                                    className="mt-8 space-y-6"
                                    onSubmit={sendPasswordReset}
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
                                                onChange={onChangeResetHandler}
                                                value={resetValue.email}
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="appearance-none p-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  mb-2 text-gray-900 rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-base"
                                                placeholder="Email address"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-600 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
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
