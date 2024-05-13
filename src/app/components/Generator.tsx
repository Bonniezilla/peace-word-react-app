'use client';

import { ChangeEvent, useEffect, useState } from "react";

interface GeneratorProps {
    passwordsNumber: number;
}

const Generator: React.FC<GeneratorProps> = ({ passwordsNumber }) => {
    class PasswordConfig {
        number: number;
        size: number;
        hasUpperCase: boolean;
        hasLowerCase: boolean;
        hasSpecialChars: boolean;
        hasNumbers: boolean;

        constructor(
            number?: number,
            size?: number,
            hasUpperCase?: boolean,
            hasLowerCase?: boolean,
            hasSpecialChars?: boolean,
            hasNumbers?: boolean
        ) {
            this.number = number || 6;
            this.size = size || 8;
            this.hasUpperCase = hasUpperCase || true;
            this.hasLowerCase = hasLowerCase || true;
            this.hasSpecialChars = hasSpecialChars || false;
            this.hasNumbers = hasNumbers || true;
        }
    }

    const [passwords, setPasswords] = useState([]);

    const initialConfig = new PasswordConfig(passwordsNumber);

    const [config, setConfig] = useState<PasswordConfig>(initialConfig);

    const getCharsArray = () => {
        const charsPatterns = {
            upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowerCase: 'abcdefghijklmnopqrstuvwxyz',
            specialChars: "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"',
            numbers: '0123456789',
        }

        let charsArray: string[] = [];

        if (config.hasUpperCase) {
            charsArray.push(charsPatterns.upperCase);
        }

        if (config.hasLowerCase) {
            charsArray.push(charsPatterns.lowerCase);
        }

        if (config.hasSpecialChars) {
            charsArray.push(charsPatterns.specialChars);
        }

        if (config.hasNumbers) {
            charsArray.push(charsPatterns.numbers);
        }

        return charsArray.join('');
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'size-input') {
            let value = Number(event.target.value);
            setConfig(prevState => ({
                ...prevState,
                size: value,
            }))
        }
    }

    const updateConfig = () => {
        setConfig(prevState => ({
            ...prevState,
            hasUpperCase: false,
            hasSpecialChars: true,
        }))
    }

    useEffect(() => {
        setPasswords(createPasswords(config));
    }, [config])

    function createPasswords(passwordConfig) {
        let passwordsArray = [];

        function getRandomChar(allChars = getCharsArray()) {
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

    const copyPassword = (event: any) => {
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
                <button onClick={() => setPasswords(createPasswords(config))}
                    className="generator-button"
                >New Password</button>
                <div className="flex w-6/12 h-12 items-center justify-around">
                    <button className="h-12 w-52 rounded-lg bg-emerald-500 border-solid border-white border-2 hover:bg-emerald-700 duration-300"
                        onClick={() => updateConfig()}
                    >Config</button>
                    <div className="flex flex-col w-full h-full gap-4">
                        <input type="range" min="5" max="35" value={config.size}
                            className={`size-input ${config.size == 5 ? "hover:slider-thumb:rounded-full" : ""} ${config.size == 35 ? "hover:slider-thumb:rounded-full" : ""}`}
                            onChange={handleChange} id={'size-input'} />
                        <div className="text-white flex flex-nowrap font-bold
                        items-center justify-between h-full w-full tracking-widest">
                            <h1 className={`${config.size == 5 ? "text-white" : "text-emerald-500"} duration-500`}>5</h1>
                            <h1>SIZE: <span className="text-emerald-500">{Number(config.size)}</span></h1>
                            <h1 className={`${config.size == 35 ? "text-white" : "text-emerald-500"} duration-500`}>35</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`max-sm:px-0 max-md:h-full
            max-sm:p-6 max-md:p-0 grid items-center
        gap-6 w-full h-3/6 ${config.number < 2 ? "grid-cols-1" : "md:grid-cols-2 sm:grid-cols-1"}`}>
                {passwords.map(password => (
                    <input className="password-input"
                        type="text"
                        value={password}
                        onClick={() => copyPassword}
                        title="Click to copy on clipboard"
                        readOnly />
                ))}
            </div>
        </section>
    );
};

export default Generator;