import { FormEvent, useState } from "react";

interface ConfigMenuProps {
    onApply: (config: Partial<Config>) => void;
    show: boolean;   
}

interface Config {
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasSpecialChars: boolean;
    hasNumbers: boolean;
}

export function ConfigMenu({ onApply, show }: ConfigMenuProps) {
    const [caseOptions, setCaseOptions] = useState(1);
    const [specialChars, setSpecialChars] = useState(false);
    const [numbers, setNumbers] = useState(true);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
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

        onApply({
            hasUpperCase,
            hasLowerCase,
            hasSpecialChars: specialChars,
            hasNumbers: numbers
        })

        if(!show) return null
}

    return (
        <div className="flex self-end relative">
                <div>
                    <form onSubmit={handleSubmit}
                        className={`config-section`}
                        >
                        <div className="flex flex-col">
                            <h1 className="text-white">Letter case: </h1>
                            <select 
                            id="case-select" 
                            className="h-6"
                            onChange={(e) => setCaseOptions(Number(e.target.value))}
                            >
                                <option value="1">All</option>
                                <option value="2">Only Uppercase</option>
                                <option value="3">Only Lowercase</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white">Special chars: </h1>
                            <label className="flex flex-col relative w-12 h-6 max-w-full text-white">
                                <input 
                                type="checkbox" 
                                id="chars-select" 
                                onChange={(e) => setSpecialChars(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white">Numbers: </h1>
                            <label className="flex flex-col relative w-12 h-6 text-white">
                                <input 
                                type="checkbox" 
                                id="numbers-select" 
                                defaultChecked={true}
                                onChange={(e) => setNumbers(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <input className="apply-config-button"
                            type="submit"
                            value="Apply" />
                    </form>
                </div>
            </div>
    )
}