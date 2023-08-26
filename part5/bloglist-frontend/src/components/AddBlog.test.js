import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBlog from './AddBlog';

describe('<AddBlog />', () => {
    test('create new blog', async () => {
        const user = userEvent.setup();
        const addBlog = jest.fn();
        render(<AddBlog addBlog={addBlog} />);

        const titleInput = screen.getByPlaceholderText('title');
        const authorInput = screen.getByPlaceholderText('author');
        const urlInput = screen.getByPlaceholderText('url');

        const createButton = screen.getByText('create');

        await user.type(titleInput, 'test title');
        await user.type(authorInput, 'test author');
        await user.type(urlInput, 'test url');
        await user.click(createButton);

        expect(addBlog.mock.calls).toHaveLength(1);
        expect(addBlog.mock.calls[0][0]).toEqual({
            title: 'test title',
            author: 'test author',
            url: 'test url'
        });
    });
});