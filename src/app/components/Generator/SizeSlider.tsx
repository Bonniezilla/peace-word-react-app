import { ChangeEvent, InputHTMLAttributes } from "react";

interface SizeSliderProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}

export function SizeSlider({ value, min = 5, max = 35, onChange }: SizeSliderProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className="flex flex-col w-full h-full gap-4 max-w-full">
                        <input 
                        className={`size-input
                            ${value == 5 ? "hover:slider-thumb:rounded-full" : ""} 
                            ${value == 35 ? "hover:slider-thumb:rounded-full" : ""}`}
                        type="range" 
                        min="5" 
                        max="35" 
                        value={value}
                        onChange={handleChange} 
                        id={'size-input'} />
                    <div className="text-white flex flex-nowrap font-bold
                        items-center justify-between h-full w-full tracking-widest">
                            <h1 className={`${value === min ? "text-white" : "text-emerald-500"} duration-500`}>
                                {min}
                            </h1>
                            <h1>
                                SIZE: <span className="text-emerald-500">{(value)}</span>
                            </h1>
                            <h1 className={`${value === max ? "text-white" : "text-emerald-500"} duration-500`}>
                                {max}
                            </h1>
                    </div>
        </div>
    )
};