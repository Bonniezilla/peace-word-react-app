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

        return charsArray;
    }

// Function to create passwords based on the configuration    
export function createPasswords(config) {
        let passwordsArray = [];
        const charsGroups = getCharsArray(config);
        const allChars = charsGroups.join('');

        const getRandomChar = (set: string) => set[Math.floor(Math.random() * set.length)];

        if (config.size >= 5 && config.size <= 35) {
            for (let n = 0; n < config.number; n++) {
            let passwordsChars: string[] = [];
            
            // Ensure at least one character from each selected group
            charsGroups.forEach(group => {
                passwordsChars.push(getRandomChar(group));
            });

            // Fill the rest of the password length with random characters from all selected groups
            while (passwordsChars.length < config.size) {
                passwordsChars.push(getRandomChar(allChars));
            }

            // Shuffle the characters to avoid predictable patterns
            for (let i = passwordsChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [passwordsChars[i], passwordsChars[j]] = [passwordsChars[j], passwordsChars[i]];
            }

            passwordsArray.push(passwordsChars.join(''));
        }
        return passwordsArray;
    }
}

