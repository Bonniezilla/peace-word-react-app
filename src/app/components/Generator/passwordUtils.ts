// Utility functions for password generation
// Function to get the array of characters based on the configuration
export function getCharsArray (config) {
        const charsPatterns = {
            upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowerCase: 'abcdefghijklmnopqrstuvwxyz',
            specialChars: "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"',
            numbers: '0123456789',
        }

        let charsArray: string[] = [];

        if (config.hasUpperCase) charsArray.push(charsPatterns.upperCase);

        if (config.hasLowerCase) charsArray.push(charsPatterns.lowerCase);

        if (config.hasSpecialChars) charsArray.push(charsPatterns.specialChars);

        if (config.hasNumbers) charsArray.push(charsPatterns.numbers);

        return charsArray.join('');
    }

// Function to create passwords based on the configuration    
export function createPasswords(config) {
        let passwordsArray = [];
        const chars = getCharsArray(config);

        const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

        if (config.size >= 5 && config.size <= 35) {
            for (let n = 0; n < config.number; n++) {
            let password = '';
            
            for (let i = 0; i < config.size; i++) {
                password += getRandomChar();
            }
            passwordsArray.push(password);
        }

        return passwordsArray;
    }
}

