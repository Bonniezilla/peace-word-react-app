// Component to display a list of generated passwords with copy functionality

import { PasswordDisplay } from "./PasswordDisplay";

interface PasswordListProps {
    passwords: string[];
    onCopy: (password: string) => void;
}

export function PasswordList({ passwords, onCopy }: PasswordListProps) {
    return (
        <div className={`max-sm:px-0 max-md:h-full max-sm:p-6 max-md:p-0 grid items-center gap-6 w-full h-3/6
            ${passwords.length < 2 ? "grid-cols-1" : "md:grid-cols-2 sm:grid-cols-1"}`}>
            {passwords.map((password, index) => (
                <PasswordDisplay
                    key={index}
                    password={password}
                    onCopy={onCopy} />
            ))}
        </div>
    );
}