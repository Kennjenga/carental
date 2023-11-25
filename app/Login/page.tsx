"use client";
import React from "react";
import Link from "next/link";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/signup">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href={""}
              >
                create a new account
              </Link>
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
