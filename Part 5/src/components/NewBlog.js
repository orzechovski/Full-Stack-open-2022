const NewBlog = ({ submit, blog, setBlog }) => {
  const { title, author, url } = blog;
  return (
    <form onSubmit={submit}>
      <label>
        title: <input type="text" name="title" value={title} onChange={({ target }) => setBlog({ ...blog, title: target.value })} />
      </label>{' '}
      <label>
        author: <input type="text" name="auhtor" value={author} onChange={({ target }) => setBlog({ ...blog, author: target.value })} />
      </label>{' '}
      <label>
        url: <input type="text" name="url" value={url} onChange={({ target }) => setBlog({ ...blog, url: target.value })} />
      </label>
      <button type="submit">Add new Blog</button>
    </form>
  );
};

export default NewBlog;
