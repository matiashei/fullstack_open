import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

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

  const buttonStyle = {
    backgroundColor: 'ligtgrey',
    color: 'black',
    borderRadius: 5,
    border: '1px solid grey',
  }

  const deleteButtonStyle = {
    backgroundColor: 'lightblue',
    color: 'black',
    borderRadius: 5,
    border: '1px solid blue',
  }

  const likeButtonStyle = {
    backgroundColor: 'lightgreen',
    color: 'black',
    borderRadius: 5,
    border: '1px solid green',
  }

  return (
    <div style={style} className="blog">
      {blog.title} by {blog.author}<button style={buttonStyle} onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a><br />
        likes {blog.likes}<button style={likeButtonStyle} onClick={() => handleLike(blog.id)}>like</button><br />
        {blog.user && <div>added by {blog.user.name} <br /></div>}
        {blog.user && blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username && (
          <button style={deleteButtonStyle} onClick={() => handleDelete(blog.id)}>remove</button>
        )}
      </div>
    </div >
  )
}

export default Blog