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

    const handleHover = () => {
        controls.start({ scale: 1.02, transition: { duration: 0.2 } });
    }
    
    return (
        <div
        className="w-full h-full"
        >
            <motion.div
            animate={controls}
            className="password-input"
            data-testid={1}
            title="Click to copy on clipboard"
            onClick={() => onCopy(password)}
            onHoverStart={handleHover}
            onHoverEnd={() => controls.start({ scale: 1, transition: { duration: 0.2 } })}
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