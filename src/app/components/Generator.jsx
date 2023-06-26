'use client';

import { useState, useRef } from "react";

export default function Generator() {
    const [passwords, setPasswords] = useState([]);

    const [passwordConfig, setPasswordConfig] = useState({});
    const handleChange = (event) => {
        setPasswordConfig(event.target.value);
    }

    function createPassword(length) {
        function getRandomChar() {
            let randomChar = allChars[Math.floor(Math.random() * allChars.length)];
            if (Boolean(Math.random() < 0.5)) {
                randomChar = randomChar.toUpperCase();
            }
            return randomChar;
        }

        const allChars = '!"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
        let password = '';

        if (length >= 4 && length <= 35) {
            for (let i = 1; i <= length; i++) {
                password += getRandomChar();
            }
            return password;
        }

    }

    function getPasswords(passwordsNumber = 4, passwordsLength = 8) {
        let passwordsArray = [];

        for (let i = 1; i <= passwordsNumber; i++) {
            passwordsArray.push(createPassword(passwordsLength));
        }

        setPasswords(passwordsArray);
    }

    return (
        <section className="h-5/6 p-6 w-5/6 flex flex-col items-center justify-around
        ">
            <span className="font-bold text-center gap-6 flex flex-col justify-center 
            items-center">
                <h1 className="text-5xl animate-text-entry text-white
                "><span className="text-emerald-500">Peace</span> Word</h1>
                <h2 className="text-white text-3xl font-bold animate-text-entry-invert
                ">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
            </span>
            <div className="flex flex-nowrap">
                <button onClick={() => getPasswords(passwordConfig)}
                    className="text-white bg-emerald-500 p-2 border-2
                border-solid border-white rounded-lg"
                >New Password</button>
                <input type="number" min={4} max={8} placeholder="Password mount"
                    className="config-input" onChange={handleChange} />
                <input type="number" min='8' max='35' placeholder="Password size"
                    className="config-input" />
            </div>
            <div className="md:grid-cols-1 md:p-6 
            lg:grid-cols-2 
            grid justify-center items-center gap-6
            w-full h-3/6">
                {passwords.map(password => (
                    <input
                        className="password-input"
                        type="text" value={password} readOnly />
                ))}
            </div>
        </section>
    )
} 