import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog/>', () => {
  let container;
  const blog = {
    author: 'Marcin',
    title: 'first test',
    url: 'antything',
  };
  const likeHandler = jest.fn();
  const notificationHandler = jest.fn();
  beforeEach(() => {
    return (container = render(<Blog blog={blog} setBlogs={likeHandler} setNotification={notificationHandler} />).container);
  });
  test('check if displaying blog renders only title and author', () => {
    const details = container.querySelector('.blog_fullsized');
    const blogMinisized = container.querySelector('.blog_minisized');
    expect(details).toEqual(null);
    expect(blogMinisized).not.toHaveTextContent(blog.url);
  });

  test('check if url and likes are dieplayed after clicking view button ', async () => {
    const blogMinisized = container.querySelector('.blog_minisized');
    const button = container.querySelector('.view');
    const user = userEvent.setup();
    await user.click(button);
    const blogFullsized = container.querySelector('.blog_fullsized');
    expect(blogMinisized).not.toBeInTheDocument();
    expect(blogFullsized).toBeInTheDocument();
    expect(blogFullsized).toHaveTextContent('likes');
    expect(blogFullsized).toHaveTextContent(blog.url);
  });

  //this test is correct but only when we will disconnect axios async part from blog.js
  test('ensures that like button is clicked twice', async () => {
    const user = userEvent.setup();

    const button = container.querySelector('.view');
    await user.click(button);

    const likeButton = container.querySelector('.like');
    await user.dblClick(likeButton);
    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
