'use client';

import { useEffect, useState } from "react";

export default function Generator(props) {
    const [passwords, setPasswords] = useState([]);
    const [passwordConfig, setPasswordConfig] = useState({ 
        number: props.passwordsNumber >= 1 ? props.passwordsNumber : 4 
        , size: 8 });

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
            for (let i = 1; i <= passwordConfig.number; i++) {
                passwordsArray.push(createPassword(passwordsLength));
            }
            setPasswords(passwordsArray);
        }
    }

    const copyPassword = (event) => {
        alert('Copied to clipboard ' + event.target.value);
        navigator.clipboard.writeText(event.target.value);
    }

    return (
        <section className="max-sm:w-full max-sm:p-0
        h-5/6 p-6 w-5/6 flex flex-col items-center justify-center
        gap-4">
            <span className="font-bold text-center gap-2 flex flex-col justify-center 
            items-center">
                <h1 className="text-5xl animate-text-entry text-white
                "><span className="text-emerald-500">Peace</span> Word</h1>
                <h2 className="text-white text-3xl font-bold animate-text-entry-invert
                ">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
            </span>
            <div className="flex flex-nowrap max-sm:flex-col items-center justify-center gap-6
            max-sm:w-full max-sm:px-4">
                <button onClick={() => getPasswords(passwordConfig.size)}
                    className="text-white bg-emerald-500 p-2 border-2
                border-solid border-white rounded-lg"
                >New Password</button>
                <div className="flex flex-col w-full">
                    <input type="range" min="5" max="35" defaultValue={passwordConfig.size}
                        className="size-input" onChange={handleChange} id={'size-input'} />
                    <span className="text-white flex flex-nowrap font-bold
                    items-center justify-center">
                        Size: <span className="text-emerald-500">{passwordConfig.size}</span>
                    </span>
                </div>
            </div>
            <div className={`max-sm:px-0 
            md:p-6 grid items-center
        gap-6 w-full h-3/6 ${ passwordConfig.number <= 1 ? "grid-cols-1" : "lg:grid-cols-2 md:grid-cols-1"}`}>
                {passwords.map(password => (
                    <input className="password-input"
                        type="text"
                        value={password}
                        onClick={copyPassword}
                        title="Click to copy on clipboard"
                        readOnly />
                ))}
            </div>
        </section>
    )
} 