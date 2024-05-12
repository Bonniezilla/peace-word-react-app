'use client';

import { useEffect, useState } from "react";

export default function Generator(props) {
    class PasswordConfig {

        constructor(number, size, hasUpperCase, hasLowerCase, hasSpecialChars, hasNumbers) {
            this.number = number || 6;
            this.size = size || 8;
            this.hasUpperCase = hasUpperCase || true;
            this.hasLowerCase = hasLowerCase || true;
            this.hasSpecialChars = hasSpecialChars || false;
            this.hasNumbers = hasNumbers || true;
            this.getCharsArray = this.getCharsArray.bind(this);

            this.charsPatterns = {
                upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                lowerCase: 'abcdefghijklmnopqrstuvwxyz',
                specialChars: '!@#$%^&*()-_=+\|[]{};:/?.',
                numbers: '0123456789',
            }
        }
        
        getCharsArray() {
            let charsArray = [];

            if(this.hasUpperCase) {
                charsArray.push(this.charsPatterns.upperCase);
            }

            if(this.hasLowerCase) {
                charsArray.push(this.charsPatterns.lowerCase);
            }

            if(this.hasSpecialChars) {
                charsArray.push(this.charsPatterns.specialChars);
            }

            if(this.hasNumbers) {
                charsArray.push(this.charsPatterns.numbers);
            }

            let charsString = charsArray.join('');

            return charsString;
        }
    }

    const [passwords, setPasswords] = useState([]);
    const [passwordConfig, setPasswordConfig] = useState(new PasswordConfig(props.passwordsNumber));

    const handleChange = (event) => {
        if (event.target.id === 'size-input') {
            setPasswordConfig(prevState => ({
                ...prevState,
                size: event.target.value,
            }));
        }
    }

    useEffect(() => {
        setPasswords(createPasswords(passwordConfig));
    }, [passwordConfig])

    function createPasswords(passwordConfig) {
        let passwordsArray = [];

        function getRandomChar(allChars = passwordConfig.getCharsArray()) {
            let randomChar = allChars[Math.floor(Math.random() * allChars.length)];
            return randomChar;
        }

        if (passwordConfig.size >= 5 && passwordConfig.size <= 35) {
            let password = '';
            for (let i = 1; i <= passwordConfig.number; i++) {
                for (let i = 1; i <= passwordConfig.size; i++) {
                    password += getRandomChar();
                }
                passwordsArray.push(password);
                password = '';
            }
        }

        return passwordsArray;
    }

    const copyPassword = (event) => {
        let password = event.target.value;
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('Copied to clipboard ' + event.target.value);
            })
            .catch((error) => {
                alert(`Has occurred a error copying to the clipboard ${error}`)
            });
    }

    return (
        <section className="max-sm:w-full max-sm:px-0 max-sm:py-4
        h-full p-12 w-5/6 flex flex-col items-center justify-center
        gap-4">
            <span className="font-bold text-center gap-2 flex flex-col justify-center 
            items-center">
                <h1 className="text-5xl animate-text-entry text-white
                "><span className="text-emerald-500">Peace</span> Word</h1>
                <h2 className="text-white text-3xl font-bold animate-text-entry-invert
                max-md:hidden">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
            </span>
            <div className="flex flex-nowrap max-md:flex-col justify-around items-center
            max-lg:w-full max-lg:px-4 max-md:h-1/6 max-sm:gap-4 w-4/12 h-3/6">
                <button onClick={() => setPasswords(createPasswords(passwordConfig))}
                    className="generator-button"
                >New Password</button>
                <div className="flex w-6/12 h-12 items-center justify-around">
                    <div className="flex flex-col w-full h-full gap-4">
                        <input type="range" min="5" max="35" defaultValue={passwordConfig.size}
                            className={`size-input ${passwordConfig.size == 5 ? "hover:slider-thumb:rounded-full" : ""} ${passwordConfig.size == 35 ? "hover:slider-thumb:rounded-full" : ""}`} 
                            onChange={handleChange} id={'size-input'} />
                        <div className="text-white flex flex-nowrap font-bold
                        items-center justify-between h-full w-full tracking-widest">
                            <h1 className={`${passwordConfig.size == 5 ? "text-white" : "text-emerald-500"} duration-500`}>5</h1>
                            <h1>SIZE: <span className="text-emerald-500">{passwordConfig.size}</span></h1>
                            <h1 className={`${passwordConfig.size == 35 ? "text-white" : "text-emerald-500"} duration-500`}>35</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`max-sm:px-0 max-md:h-full
            max-sm:p-6 max-md:p-0 grid items-center
        gap-6 w-full h-3/6 ${passwordConfig.number <= 1 ? "grid-cols-1" : "md:grid-cols-2 sm:grid-cols-1"}`}>
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