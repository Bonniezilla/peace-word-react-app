import React from "react";
import CreatePassword from "../components/CreatePasswordForm";

function CreatePasswordPage() {
    return (
        <main className="w-screen h-screen grid items-center justify-center bg-emerald-950/30 p-12">
                <span className="font-bold text-center gap-2 flex flex-col justify-center 
            items-center">
                    <h1 className="text-5xl animate-text-entry text-white"><span className="text-emerald-500">Peace</span> Word</h1>
                    <h2 className="text-white text-3xl font-bold animate-text-entry-invert
                max-md:hidden">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
                </span>
                <CreatePassword />
        </main>
    )
}

export default CreatePasswordPage;