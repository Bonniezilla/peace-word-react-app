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
    // State for password configuration
    const [config, setConfig] = useState<PasswordConfig>({
        number: passwordsNumber ? passwordsNumber : 4,
        size: 12,
        hasUpperCase: true,
        hasLowerCase: true,
        hasSpecialChars: false,
        hasNumbers: true
    });

    // State for generated passwords
    const [passwords, setPasswords] = useState<string[]>([]);

    // State for config menu visibility
    const [showMenu, setShowMenu] = useState(false);

    const configRef = useOutsideClick((target) => {
        if (target.id == "config-button" && configRef.current.classList.contains('hidden')) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    });


    const handleChange = (newSize) => {
        setConfig(prevState => ({ ...prevState, size: newSize }));
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

    return (
        <section className="max-sm:w-full max-sm:px-0
        min-h-screen w-5/6 max-w-full flex flex-col items-center justify-center"
        >
            <div className="flex flex-1 flex-nowrap max-md:flex-col justify-around items-center max-md:h-2/6 w-10/12 h-8/12 max-w-full max-sm:w-full">
                <div className="flex self-center relative">
                    <button>
                        <img src="/config.png" id="config-button"
                            className="w-8 max-w-full hover:animate-spin-one hover:brightness-50 duration-300"
                        />
                    </button>
                    <div ref={configRef} className={`${showMenu ? " block" : "hidden"}`}>
                        <ConfigMenu show={showMenu} onApply={handleApply} />
                    </div>
                </div>
                <button
                    onClick={() => setPasswords(createPasswords(config))}
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