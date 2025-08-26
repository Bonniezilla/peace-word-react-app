// Component to display one genereated password
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";


interface PasswordDisplayProps {
    password: string;
    onCopy: (password: string) => void;
    index?: number;
}

export function PasswordDisplay({ password, onCopy, index }: PasswordDisplayProps) {
    return (
        <div
        className="w-full h-full"
        >
            <motion.div
            initial={{ opacity: 0.5, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index ? index * 0.05 : 0, duration: 0.3 }}
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
            </motion.div>
        </div>
    )
}