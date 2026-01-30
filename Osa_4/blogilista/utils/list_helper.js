const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0
  }
  const maxBlog = blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max
  })
  return maxBlog.likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}