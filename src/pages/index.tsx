import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmailAndPassword = async () => {
    try {
      const signInResponse = await signIn("signin", {
        email,
        password,
        redirect: false,
      });
      console.log(signInResponse);
      if (!signInResponse?.ok) {
        return alert(signInResponse?.error);
      }
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Error signing in with email and password. Try again later.");
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div
        className="rounded-lg border text-card-foreground shadow-sm mx-auto max-w-sm bg-white"
        data-v0-t="card"
      >
        <div className="flex flex-col p-6 pb-2 space-y-1">
          <h3 className="tracking-tight text-2xl font-bold">Login</h3>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to login to your account.{" "}
            <Link className="underline" href="/signup">
              Don't have an account?
            </Link>
          </p>
        </div>
        <div className="p-6 pt-2">
          <div className="space-y-3">
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
              />
            </div>
            <button
              className="text-white bg-green-700 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full"
              onClick={signInWithEmailAndPassword}
            >
              Login
            </button>
            <button
              onClick={() => signIn("google")}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-blue-500 text-white"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
};
