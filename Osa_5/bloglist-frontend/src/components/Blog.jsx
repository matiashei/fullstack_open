import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const style = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }

  return (
  <div style={style}>
    <b>{blog.title}</b> by <b>{blog.author}</b> <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    <div style={showWhenVisible}>
      <a href={blog.url}>{blog.url}</a><br />
      likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button><br />
      added by { blog.user.name }
    </div >
  </div >
)
}

export default Blog