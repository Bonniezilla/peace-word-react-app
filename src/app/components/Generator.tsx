'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useOutsideClick } from "../useOutsideClick";

interface GeneratorProps {
    passwordsNumber: number;
    ref
}

const Generator: React.FC<GeneratorProps> = ({ passwordsNumber, ref }) => {
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
    
    const [showMenu, setShowMenu] = useState(false);
    
    const [checked, setChecked] = useState(true);
    
    const configRef = useOutsideClick((target) => {
        if(target.id == "config-button" && configRef.current.classList.contains('hidden')) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    });

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        
        // this part of code check and prepare the form values to send in update config parameters
        let caseOptions = event.target[0].value;
        let specialChars = event.target[1].checked == true ? true : false
        let numbers = event.target[2].checked == true ? true : false

        updateConfig(caseOptions, specialChars, numbers);
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

        setConfig({...config, ...newConfig});
    }

    useEffect(() => {
        setPasswords(createPasswords(config));
    }, [config]);

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
            <div className="flex self-end relative">
                <button>
                    <img src="/config.png" id="config-button"
                        className="w-8 hover:animate-spin-one hover:brightness-50 duration-300"
                    />
                </button>
                <form onSubmit={handleSubmit} ref={configRef}
                    className={`${showMenu ? 'flex' : 'hidden'} flex-col gap-4 bg-slate-800 h-46 border-solid border-zinc-500 border-4
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
                            <input type="checkbox" id="chars-select"/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white">Numbers: </h1>
                        <label className="flex flex-col relative w-12 h-6 text-white">
                            <input type="checkbox" id="numbers-select" defaultChecked={checked}
                            onChange={() => setChecked((state) => !state)}/>
                            <span className="slider"></span>
                        </label> 
                    </div>
                    <input className="flex justify-center items-center text-white p-2 px-4 
                    bg-emerald-500 border-solid border-white border-2 rounded-xl self-start
                    hover:bg-emerald-600 duration-300"
                        type="submit" 
                        value="Apply"/>
                </form>
            </div>

            <div className="flex flex-nowrap max-md:flex-col justify-around items-center
            max-lg:w-full max-lg:px-4 max-md:h-1/6 max-sm:gap-4 w-4/12 h-3/6">
                <button onClick={() => setPasswords(createPasswords(config))}
                    className="generator-button"
                >New Password</button>
                <div className="flex w-6/12 h-12 items-center justify-around">
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
                        onClick={copyPassword}
                        title="Click to copy on clipboard"
                        readOnly />
                ))}
            </div>
        </section>
    );
};

export default Generator;