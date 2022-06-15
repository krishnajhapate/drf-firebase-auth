import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
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

                <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full"></div>
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
