// Component to display one genereated password
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";


interface PasswordDisplayProps {
    password: string;
    onCopy: (password: string) => void;
    index?: number;
}

export function PasswordDisplay({ password, onCopy, index }: PasswordDisplayProps) {
    const controls = useAnimationControls();

    useEffect(() => {
        controls.start({ opacity: [0, 1], y: [5, 0], x: [-5, 0] }, { delay: index * 0.2 });
    }, [password]);

    return (
        <motion.div 
        className="w-full h-full"
        animate={ controls }
        >
            <div
            className="password-input"
            data-testid={1}
            title="Click to copy on clipboard"
            onClick={() => onCopy(password)}
            >{password.split("").map((char, index) => {
                const randomDelay = index * 0.03 + Math.random() * 0.1;
                
                return (
                <motion.span
                key={`${char}-${index}-${password}`}
                initial={{ opacity: 0, y: -5, color: "#ffffff"}}
                animate={{ opacity: 1, y: 0, color: "#10B981"}}
                transition={{ delay: randomDelay, duration: 0.3 }}
                >
                    {char}
                </motion.span>
            )})}
            </div>
        </motion.div>
    )
}