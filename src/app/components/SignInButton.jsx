"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SignInButton(props) {
    const { data: session } = useSession();
    return (
        <>
            <button className="flex items-center justify-center shadow-md shadow-black/50
            bg-white rounded-md h-12 w-3/5"
            onClick={async () => {
               fetch(() => {
                signIn(props.provider)
               })
               .catch(() => {
                return (
                    <h1>Error</h1>
                )
               })
            }}>
                {props.text}
            </button>
        </>
    )
} 