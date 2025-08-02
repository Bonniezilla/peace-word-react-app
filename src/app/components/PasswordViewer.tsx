import React from "react";

const PasswordViewer = async () => {

    const data = await fetch(process.env.PEACEWORD_API + "/users/1/passwords");
    const passwordsData = await data.json();
    if (!passwordsData || passwordsData.length === 0) {
        return (
            <div className="w-11/12 p-12 h-full justify-self-center bg-emerald-950/30 flex items-center justify-center">
                <h1 className="text-white text-2xl">No passwords found.</h1>
            </div>
        );
    }
    
    return (
        <div className="w-11/12 p-12 h-full justify-self-center bg-emerald-950/30 flex items-center justify-center">
            <ul className="flex flex-wrap gap-6">
                {passwordsData.map((password) => (
                    <li key={password.id} className="w-96 bg-emerald-600 flex flex-col gap-2 items-center justify-center p-8 rounded-2xl">
                        <h1 className="text-white font-bold text-3xl">{password.password}</h1>
                        <h2 className="text-white text-1xl"><span className="font-bold">Category: </span>{password.category}</h2>
                        <h2 className="text-white text-1xl"><span className="font-bold">Website URL: </span> {password.url}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PasswordViewer;