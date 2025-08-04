'use client';

import React from "react";

const CreatePasswordForm = () => {
    const [formData, setFormData] = React.useState({
        password: '',
        category: '',
        url: ''
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const apiURL = process.env.NEXT_PUBLIC_PEACEWORD_API;
            fetch(apiURL + "/users/1/passwords", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Password created successfully:", data);
                setFormData({ password: '', category: '', url: '' }); // Reset form
            })
            .catch(error => console.error("Error creating password:", error));
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }

        console.log("Form submitted");
    };

    return ( 
        <main className="w-full h-full flex items-center justify-center bg-emerald-950/50 p-12 px-80">
            <div className="h-full w-full bg-emerald-600 p-12 px-96 rounded-2xl flex flex-col items-center justify-center">
                <h1 className="text-white font-bold text-3xl mb-4 text-center">Create Password</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={formData.password} name="password" type="text" placeholder="Password" className="input-create-password-form" required/>
                    <input onChange={handleChange} value={formData.category} name="category" type="text" placeholder="Category" className="input-create-password-form"/>
                    <input onChange={handleChange} value={formData.url} name="url" type="text" placeholder="Website URL" className="input-create-password-form" required/>
                    <button type="submit" className="text-white bg-emerald-700 input-create-password-form hover:bg-white hover:text-emerald-600 hover:tracking-wider transition-all">Create Password</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePasswordForm;