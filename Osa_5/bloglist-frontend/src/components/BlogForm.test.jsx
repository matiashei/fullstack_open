import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByRole('textbox', { name: 'title:' })
  const authorInput = screen.getByRole('textbox', { name: 'author:' })
  const urlInput = screen.getByRole('textbox', { name: 'url:' })
  const createButton = screen.getByRole('button', { name: 'create' })

  await user.type(titleInput, 'Test blog title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://example.com/test-blog')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://example.com/test-blog')
})