import { createPasswords } from '../Generator/passwordUtils';

describe('Password Utilities', () => {
    test('createPasswords generates correct number of passwords with specified length', () => {
        const config = {
            number: 6,
            size: 10,
            hasUpperCase: true,
            hasLowerCase: true,
            hasSpecialChars: false,
            hasNumbers: true
        };
        const result = createPasswords(config);

        expect(result).toHaveLength(6);
        result.forEach(password => {
            expect(password).toHaveLength(10);
        });
    })

    test('createPasswords includes at least one character from each selected group', () => {
        const config = {
            number: 5,
            size: 12,
            hasUpperCase: true,
            hasLowerCase: true,
            hasSpecialChars: true,
            hasNumbers: true
        };
        const result = createPasswords(config);

        result.forEach(password => {
            expect(/[A-Z]/.test(password)).toBe(true); // Uppercase
            expect(/[a-z]/.test(password)).toBe(true); // Lowercase
            expect(/[0-9]/.test(password)).toBe(true); // Numbers
            expect(/[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/ .test(password)).toBe(true); // Special chars
        });
    });
});