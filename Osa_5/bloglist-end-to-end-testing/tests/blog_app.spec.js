const { test, expect, beforeEach, describe } = require('@playwright/test')

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

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await page.getByLabel('username').fill('user')
      await page.getByLabel('password').fill('secret')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Tim Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await page.getByLabel('username').fill('user')
      await page.getByLabel('password').fill('incorrect')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')

        await page.getByLabel('username').fill('user')
        await page.getByLabel('password').fill('secret')

        await page.getByRole('button', { name: 'login' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()

        await page.getByLabel('title:').fill('My first blog')
        await page.getByLabel('author:').fill('Atte Author')
        await page.getByLabel('url:').fill('http://example.com/my_first_blog')
        await page.getByRole('button', { name: 'create' }).click()

        const blog = page.locator('.blog').filter({ hasText: 'My first blog by Atte Author' })
        await expect(blog).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()

        await page.getByLabel('title:').fill('My first blog')
        await page.getByLabel('author:').fill('Atte Author')
        await page.getByLabel('url:').fill('http://example.com/my_first_blog')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })
  })
})