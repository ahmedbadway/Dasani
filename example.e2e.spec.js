import { test, expect } from '@playwright/test'

test.describe('Website Navigation & Links', () => {
  test.beforeEach(async ({ page }) => {
    // زار الـ homepage قبل كل test
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    // تأكد إن الـ page loaded
    expect(page.url()).toBe('http://localhost:5173/')
  })

  test('should have working navigation links', async ({ page }) => {
    // تأكد إن الـ links موجودة
    const homeLink = page.locator('a[href="/"]')
    const aboutLink = page.locator('a[href="/about"]')
    const contactLink = page.locator('a[href="/contact"]')

    await expect(homeLink).toBeVisible()
    await expect(aboutLink).toBeVisible()
    await expect(contactLink).toBeVisible()
  })

  test('should navigate to About page when clicking About link', async ({ page }) => {
    // اضغط على About link
    await page.locator('a[href="/about"]').click()
    
    // تأكد إن الـ URL تغير
    expect(page.url()).toBe('http://localhost:5173/about')
  })

  test('should navigate to Contact page', async ({ page }) => {
    // اضغط على Contact link
    await page.locator('a[href="/contact"]').click()
    
    // تأكد إن الـ URL تغير
    expect(page.url()).toBe('http://localhost:5173/contact')
  })

  test('should handle button clicks', async ({ page }) => {
    // مثال: اختبر أي button في الـ site
    const button = page.locator('button:has-text("Click me")')
    
    if (await button.isVisible()) {
      await button.click()
      // تأكد من الـ result بعد الـ click
      await expect(page).toHaveURL(/.*/) // يمكنك إضافة شروط أكتر
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    // تغيير حجم الـ viewport إلى mobile
    await page.setViewportSize({ width: 375, height: 667 })
    
    // تأكد إن الـ page still visible
    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should submit form without errors', async ({ page }) => {
    // ملأ الـ form fields
    await page.fill('input[name="name"]', 'Ahmed Badway')
    await page.fill('input[name="email"]', 'ahmed@example.com')
    await page.fill('textarea[name="message"]', 'Test message')
    
    // اضغط على submit button
    await page.click('button[type="submit"]')
    
    // تأكد من النتيجة (مثل: رسالة نجاح تظهر)
    await expect(page.locator('text=Success')).toBeVisible()
  })
})
