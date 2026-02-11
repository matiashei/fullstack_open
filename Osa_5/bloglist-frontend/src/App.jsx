import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

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

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(() => {
        setErrorMessage('error creating blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

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
    } catch {
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

  const handleLike = id => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id
    }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        returnedBlog.user = blog.user
        setBlogs(blogs.map(b => (b.id !== id ? b : returnedBlog)))
      })
      .catch(() => {
        setErrorMessage('error updating blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleDelete = id => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          setSuccessMessage('blog removed')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage('error removing blog')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const loginForm = () => (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
            <div key={blog.id}>
              <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App