'use client';

import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import { useOutsideClick } from "../../useOutsideClick";

import { createPasswords } from "./passwordUtils";
import { PasswordList } from "./PasswordList";
import { SizeSlider } from "./SizeSlider";
import { ConfigMenu } from "./ConfigMenu";

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

    function handleCopy(password: string) {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert(`${password} copied to clipboard!`);
            })
    }

    function handleApply(newConfig: Partial<PasswordConfig>) {
        setConfig({ ...config, ...newConfig });
        setShowMenu(false);
    }
    

    useEffect(() => {
        setPasswords(createPasswords(config));
    }, [config]);

    useEffect(() => {
        console.log("Show menu: ", showMenu);
    }, [showMenu]);

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
                    <ConfigMenu show={showMenu} onApply={handleApply} />
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