import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

beforeEach(() => {
  window.localStorage.setItem(
    'loggedBlogappUser',
    JSON.stringify({ username: 'testuser', })
  )
})

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'Tim Tester',
    url: 'http://example.com/test-blog',
    likes: 10,
    user: {
      name: 'Test User',
      username: 'testuser',
    },
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test blog')
})

