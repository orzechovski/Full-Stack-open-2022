import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

//this test is correct but only when we will disconnect axios async part from blog.js
test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm setBlogs={createBlog} setNotification={jest.fn()} blogs={[{ title: 'a', author: 'b', url: 'c' }]} />);

  const input = screen.getAllByRole('textbox');
  const sendButton = screen.getByText('Add new Blog');
  await user.type(input[0], 'title');
  await user.type(input[1], 'author');
  await user.type(input[2], 'toTheMoon.com');
  await user.click(sendButton);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('title');
  expect(createBlog.mock.calls[0][0].author).toBe('author');
  expect(createBlog.mock.calls[0][0].url).toBe('toTheMoon.com');
});
