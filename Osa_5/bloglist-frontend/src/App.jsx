import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setSuccessMessage('logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({ title: '', author: '', url: '' })
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }).catch(error => {
      setErrorMessage('error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <Notification message={successMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          <ul>
            {blogs.map(blog => (
              <li key={blog.id}><Blog blog={blog} /></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App