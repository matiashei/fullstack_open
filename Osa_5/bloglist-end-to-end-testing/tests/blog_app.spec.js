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
  })
})