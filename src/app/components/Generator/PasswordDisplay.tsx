// Component to display one genereated password

interface PasswordDisplayProps {
    password: string;
    onCopy: (password: string) => void;
}

export function PasswordDisplay({ password, onCopy }: PasswordDisplayProps) {
    return (
        <input 
        className="password-input" 
        type="text" 
        value={password} 
        readOnly 
        data-testid={1} 
        title="Click to copy on clipboard"
        onClick={() => onCopy(password)}
        />
    )
}