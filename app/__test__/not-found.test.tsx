import { render, screen, userEvent } from '@testing-library/react-native';
import React from 'react';
import NotFoundScreen from '../+not-found';

// 1. Create a mock function to track the router actions
const mockReplace = jest.fn();

// 2. Mock expo-router modules used in the component
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  // Mock Stack to return a dummy component that accepts children or fragment
  Stack: {
    Screen: () => null,
  },
}));

describe('<NotFoundScreen />', () => {
  beforeEach(() => {
    // Clear mock call history between individual tests
    jest.clearAllMocks();
  });

  test('renders the error message and the redirect link text', () => {
    render(<NotFoundScreen />);

    // Check that the error message is present
    expect(screen.getByText('This screen doesn`t exist.')).toBeTruthy();

    // Check that the redirect button text is present
    expect(screen.getByText('Go to home screen!')).toBeTruthy();
  });

  test('navigates to the home screen when the link is pressed', async () => {
    const user = userEvent.setup();
    render(<NotFoundScreen />);

    // Locate the clickable link text
    const linkButton = screen.getByText('Go to home screen!');

    // Simulate the user pressing the button
    await user.press(linkButton);

    // Verify that router.replace was called exactly once with the root route '/'
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
