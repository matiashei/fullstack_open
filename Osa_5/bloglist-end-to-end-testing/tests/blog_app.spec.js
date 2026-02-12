const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tim Tester',
        username: 'user',
        password: 'secret'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tina Turner',
        username: 'tina',
        password: 'password'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'user', 'secret')
      await expect(page.getByText('Tim Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'user', 'incorrect')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'user', 'secret')
        await createBlog(page, 'My first blog', 'Atte Author', 'http://example.com/my_new_blog')
      })

      test('a new blog can be created', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'My first blog by Atte Author' })
        await expect(blog).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted by the creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        await page.once('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toBe('Remove blog My first blog by Atte Author?')
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()
        const blog = page.locator('.blog').filter({ hasText: 'My first blog by Atte Author' })

        await expect(blog).not.toBeVisible()
      })

      test.only('remove button is only visible for the creator of a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'tina', 'password')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})