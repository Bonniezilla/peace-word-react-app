// Component to display a list of generated passwords with copy functionality

import { PasswordDisplay } from "./PasswordDisplay";

interface PasswordListProps {
    passwords: string[];
    onCopy: (password: string) => void;
}

export function PasswordList({ passwords, onCopy }: PasswordListProps) {
    return (
        <div className={`gap-4 grid items-center w-full h-3/6 flex-1 max-w-full
            ${passwords.length < 2 ? "grid-cols-1" : "md:grid-cols-2 sm:grid-cols-1"}`}>
            {passwords.map((password, index) => (
                <PasswordDisplay
                    key={index}
                    password={password}
                    onCopy={onCopy} 
                    index={index} 
                    />
            ))}
        </div>
    );
}