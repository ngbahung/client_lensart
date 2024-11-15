// Header.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// Mock component wrapper
const HeaderWrapper = () => {
    return (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
};

describe('Header Dropdown Tests', () => {
    test('shows login/register options when user is not registered', () => {
        render(<HeaderWrapper />);
        
        // Click account button to open dropdown
        const accountButton = screen.getByText('Tài khoản');
        fireEvent.click(accountButton);
        
        // Check unregistered menu items
        expect(screen.getByText('Đăng nhập')).toBeInTheDocument();
        expect(screen.getByText('Đăng ký')).toBeInTheDocument();
    });

    test('shows user options when registered', () => {
        // Mock registered state
        const mockSetState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation(() => [true, mockSetState]);

        render(<HeaderWrapper />);
        
        // Click account button
        const accountButton = screen.getByText('Tài khoản');
        fireEvent.click(accountButton);
        
        // Check registered menu items
        expect(screen.getByText('Tài khoản')).toBeInTheDocument();
        expect(screen.getByText('Lịch sử mua hàng')).toBeInTheDocument();
        expect(screen.getByText('Đăng xuất')).toBeInTheDocument();
    });

    test('logout button calls handler', () => {
        // Mock registered state
        const mockSetState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation(() => [true, mockSetState]);

        render(<HeaderWrapper />);
        
        // Open dropdown and click logout
        const accountButton = screen.getByText('Tài khoản');
        fireEvent.click(accountButton);
        
        const logoutButton = screen.getByText('Đăng xuất');
        fireEvent.click(logoutButton);
        
        // Verify state changes
        expect(mockSetState).toHaveBeenCalledWith(false);
    });
});