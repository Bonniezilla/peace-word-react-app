'use client';

import { useEffect, useState } from "react";

export default function Generator() {
    const [passwords, setPasswords] = useState([]);
    const [passwordConfig, setPasswordConfig] = useState({ size: 8 });

    const handleChange = (event) => {
        if (event.target.id === 'size-input') {
            setPasswordConfig(config => ({
                ...config,
                size: parseInt(event.target.value)
            }));
        }
    }

    useEffect(() => {
        getPasswords(passwordConfig.size);
    }, [passwordConfig])

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

        for (let i = 1; i <= length; i++) {
            password += getRandomChar();
        }
        return password;

    }

    function getPasswords(passwordsLength = 8) {
        let passwordsArray = [];

        if (passwordsLength <= 35 && passwordsLength >= 5) {
            for (let i = 1; i <= 4; i++) {
                passwordsArray.push(createPassword(passwordsLength));
            }
            setPasswords(passwordsArray);
        }

    }

    return (
        <section className="h-5/6 p-6 w-5/6 flex flex-col items-center justify-center
        gap-4">
            <span className="font-bold text-center gap-2 flex flex-col justify-center 
            items-center">
                <h1 className="text-5xl animate-text-entry text-white
                "><span className="text-emerald-500">Peace</span> Word</h1>
                <h2 className="text-white text-3xl font-bold animate-text-entry-invert
                ">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
            </span>
            <div className="flex flex-nowrap items-center justify-center gap-6">
                <button onClick={() => getPasswords(passwordConfig.mount, passwordConfig.size)}
                    className="text-white bg-emerald-500 p-2 border-2
                border-solid border-white rounded-lg"
                >New Password</button>
                <div className="flex flex-col">
                    <input type="range" min="5" max="35" defaultValue={passwordConfig.size}
                        className="size-input" onChange={handleChange} id={'size-input'} />
                    <span className="text-white flex flex-nowrap font-bold
                    items-center justify-center">
                    Size: <span className="text-emerald-500">{passwordConfig.size}</span>
                    </span>
                </div>
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