const blogForm = ({ onSubmit, newBlog, setNewBlog }) => {
  return (
    <form onSubmit={onSubmit}>
      <h1>create new</h1>
      <div>
        <label>
          title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default blogForm