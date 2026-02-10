import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

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

  expect(screen.getByText('Test blog')).toBeInTheDocument()
})

test('clicking view button shows url and likes', async () => {
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

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('http://example.com/test-blog', { exact: false })).toBeInTheDocument()
  expect(screen.getByText('likes 10', { exact: false })).toBeInTheDocument()
})

test('clicking like button increases likes', async () => {
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

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})