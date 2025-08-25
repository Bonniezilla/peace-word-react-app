'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useOutsideClick } from "../../useOutsideClick";

import { createPasswords } from "./passwordUtils";
import { PasswordList } from "./PasswordList";
import { SizeSlider } from "./SizeSlider";

interface GeneratorProps {
    passwordsNumber?: number;
}

interface PasswordConfig {
    number: number;
    size: number;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasSpecialChars: boolean;
    hasNumbers: boolean;
}

const Generator: React.FC<GeneratorProps> = ({ passwordsNumber }) => {
    const [config, setConfig] = useState<PasswordConfig>({
        number: passwordsNumber ? passwordsNumber : 4,
        size: 12,
        hasUpperCase: true,
        hasLowerCase: true,
        hasSpecialChars: false,
        hasNumbers: true
    });

    const [passwords, setPasswords] = useState<string[]>([]);

    const [showMenu, setShowMenu] = useState(false);

    const [checked, setChecked] = useState(true);

    const configRef = useOutsideClick((target) => {
        if (target.id == "config-button" && configRef.current.classList.contains('hidden')) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    });

    
    const handleChange = (newSize) => {
            setConfig(prevState => ({...prevState, size: newSize}));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        // this part of code check and prepare the form values to send in update config parameters
        let caseOptions = event.target[0].value;
        let specialChars = event.target[1].checked == true ? true : false
        let numbers = event.target[2].checked == true ? true : false

        updateConfig(caseOptions, specialChars, numbers);
    }

    function handleCopy(password: string) {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert(`${password} copied to clipboard!`);
            })
    }

    function updateConfig(caseOptions: number, hasChars: boolean, hasNumbers: boolean) {
        let hasUpperCase: boolean
        let hasLowerCase: boolean

        if (caseOptions == 1) {
            hasUpperCase = true
            hasLowerCase = true
        } else if (caseOptions == 2) {
            hasUpperCase = true
            hasLowerCase = false
        } else if (caseOptions == 3) {
            hasUpperCase = false
            hasLowerCase = true
        }

        let newConfig = {
            hasUpperCase: hasUpperCase,
            hasLowerCase: hasLowerCase,
            hasSpecialChars: hasChars,
            hasNumbers: hasNumbers
        }

        setConfig({ ...config, ...newConfig });
    }

    useEffect(() => {
        setPasswords(createPasswords(config));
    }, [config]);

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
            <div className="flex self-end relative">
                <button>
                    <img src="/config.png" id="config-button"
                        className="w-8 hover:animate-spin-one hover:brightness-50 duration-300"
                    />
                </button>
                <div ref={configRef} className={`${showMenu ? " block" : "hidden"}`}>
                    <form onSubmit={handleSubmit}
                        className={`flex flex-col gap-4 bg-slate-800 h-46 border-solid border-zinc-500 border-4
                    rounded-md self-end p-4 absolute right-8 top-8`}>
                        <div className="flex flex-col">
                            <h1 className="text-white">Letter case: </h1>
                            <select id="case-select" className="h-6">
                                <option value="1">All</option>
                                <option value="2">Only Uppercase</option>
                                <option value="3">Only Lowercase</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white">Special chars: </h1>
                            <label className="flex flex-col relative w-12 h-6 text-white">
                                <input type="checkbox" id="chars-select" />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white">Numbers: </h1>
                            <label className="flex flex-col relative w-12 h-6 text-white">
                                <input type="checkbox" id="numbers-select" defaultChecked={checked}
                                    onChange={() => setChecked((state) => !state)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <input className="flex justify-center items-center text-white p-2 px-4 
                    bg-emerald-500 border-solid border-white border-2 rounded-xl self-start
                    hover:bg-emerald-600 duration-300"
                            type="submit"
                            value="Apply" />
                    </form>
                </div>
            </div>

            <div className="flex flex-nowrap max-md:flex-col justify-around items-center
            max-lg:w-full max-lg:px-4 max-md:h-1/6 max-sm:gap-4 w-4/12 h-3/6">
                <button onClick={() => setPasswords(createPasswords(config))}
                    className="generator-button"
                >New Password</button>
                <div className="flex w-6/12 h-12 items-center justify-around">
                    <SizeSlider value={config.size} onChange={handleChange} />
                </div>
            </div>
            <PasswordList passwords={passwords} onCopy={handleCopy} />
        </section>
    );
};

export default Generator;