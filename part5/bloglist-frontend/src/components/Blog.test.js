import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
    let container;
    const mockHandler = jest.fn();
    beforeEach(() => {
        const user = {
            username: 'gastropodo1',
            name: 'Felipe Areyuna',
            id: '64e0dddc706bb5e29c16db92'
        };
        const blog = {
            title: 'Test blog 1',
            author: 'Test',
            url: '/test-blog',
            likes: 6,
            user,
            id: '64e0e1732983b1ec0dc6f6fe'
        };
        container = render(<Blog blog={blog} user={user} like={mockHandler}/>).container;
    });

    test('renders title and author, does not render url or likes by default', async () => {
        let element = await screen.findByText('Test blog 1 Test');
        expect(element).toBeDefined();
        element = screen.queryByText('/test-blog');
        expect(element).toBeNull();
        element = screen.queryByText('likes: 6');
        expect(element).toBeNull();
    });

    test('show url and likes when corresponding button is cliked', async () => {
        const user = userEvent.setup();
        const button = container.querySelector('.show-details');
        await user.click(button);

        let element = await screen.findByText('/test-blog');
        expect(element).toBeDefined();
        element = await screen.findByText('likes: 6');
        expect(element).toBeDefined();
    });

    test('like button is clicked twice', async () => {
        const user = userEvent.setup();
        let button = container.querySelector('.show-details');
        await user.click(button);

        button = container.querySelector('.like-button');
        await user.click(button);
        await user.click(button);

        expect(mockHandler.mock.calls).toHaveLength(2);
    });
});