'use client';

import React, { useEffect } from "react";

const PasswordViewer = () => {
    const [passwordsData, setPasswordsData] = React.useState([]);
    const apiURL = process.env.NEXT_PUBLIC_PEACEWORD_API;

    const [error, setError] = React.useState(null);
    
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch(apiURL + "/users/1/passwords", {
            headers: {
                "ngrok-skip-browser-warning": "true",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setPasswordsData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching passwords:", error)
            setError(error);
            setLoading(false);});
    }, []);

    return (
        <div className="w-11/12 p-12 h-full justify-self-center bg-emerald-950/30 flex items-center justify-center">
            <ul className="flex flex-wrap gap-6">
                { loading ? (
                    <div className="w-96 bg-slate-800 flex flex-col gap-2 items-center justify-center p-8 rounded-2xl">
                        <p className="text-white text-2xl font-bold">Loading...</p>
                    </div>
                ): error ? (
                    <div className="w-96 bg-slate-800 flex flex-col gap-2 items-center justify-center p-8 rounded-2xl">
                        <p className="text-red-500 text-2xl">Error fetching passwords: <span className="font-bold">{error.message}</span></p>
                    </div>
                ):
                passwordsData.map((password) => (
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