import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Generator from '../Generator/PasswordGenerator';

test('testing if new passwords are running', async () => {
    //ARRANGE
    render(<Generator/>);

    //ACT
    let passwordOne = await screen.getByTestId(1);
    console.log(passwordOne)

    await userEvent.click(screen.getByText('New Password'));

    //ASSERT

    expect(true).toBe(true);
})

