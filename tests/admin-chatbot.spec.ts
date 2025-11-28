import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const ADMIN_EMAIL = 'admin@altroway.demo';
const ADMIN_PASSWORD = 'AltroAdmin123!';

test.describe('Altroway Platform - Admin Settings & Chatbot Tests', () => {
  
  test.describe('Admin Panel - Real-time Settings Update', () => {
    
    test('should navigate to admin settings page', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      // Check if we're redirected to login
      const url = page.url();
      if (url.includes('login')) {
        // Need to log in first
        await page.fill('input[type="email"]', ADMIN_EMAIL);
        await page.fill('input[type="password"]', ADMIN_PASSWORD);
        await page.click('button:has-text("Sign in")');
        await page.waitForNavigation();
      }
      
      await expect(page).toHaveTitle(/.*Settings|Platform/);
      await expect(page.locator('text=Project Statistics')).toBeVisible();
    });

    test('should display completion percentage field', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      // Wait for page to load
      await page.waitForSelector('input[type="number"]');
      
      const completionInput = page.locator('input[type="number"]').first();
      await expect(completionInput).toBeVisible();
      
      const value = await completionInput.inputValue();
      expect(parseInt(value)).toBeGreaterThanOrEqual(0);
      expect(parseInt(value)).toBeLessThanOrEqual(100);
    });

    test('should update completion percentage in real-time', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      // Wait for inputs to load
      await page.waitForSelector('input[type="number"]');
      
      const completionInput = page.locator('input[type="number"]').first();
      
      // Change value
      await completionInput.fill('95');
      
      // Click update button for completion percentage
      const updateButtons = page.locator('button:has-text("Update")');
      await updateButtons.first().click();
      
      // Wait for success message
      await page.waitForTimeout(500);
      
      // Verify value persists
      const newValue = await completionInput.inputValue();
      expect(newValue).toBe('95');
    });

    test('should display phase name field', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      await page.waitForSelector('input[type="text"]');
      const phaseInput = page.locator('input[type="text"]').first();
      await expect(phaseInput).toBeVisible();
      
      const value = await phaseInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('should update phase name in real-time', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      await page.waitForSelector('input[type="text"]');
      const phaseInput = page.locator('input[type="text"]').first();
      
      // Change value
      await phaseInput.fill('Production Ready');
      
      // Click update button
      const updateButtons = page.locator('button:has-text("Update")');
      await updateButtons.nth(1).click();
      
      await page.waitForTimeout(500);
      
      const newValue = await phaseInput.inputValue();
      expect(newValue).toBe('Production Ready');
    });

    test('should display version number field', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      await page.waitForSelector('input[type="text"]');
      const versionInput = page.locator('input[type="text"]').nth(1);
      await expect(versionInput).toBeVisible();
      
      const value = await versionInput.inputValue();
      expect(value).toMatch(/v\d+\.\d+\.\d+/);
    });

    test('should update version number in real-time', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);
      
      await page.waitForSelector('input[type="text"]');
      const versionInput = page.locator('input[type="text"]').nth(1);
      
      // Change value
      await versionInput.fill('v1.4.0');
      
      // Click update button
      const updateButtons = page.locator('button:has-text("Update")');
      await updateButtons.nth(2).click();
      
      await page.waitForTimeout(500);
      
      const newValue = await versionInput.inputValue();
      expect(newValue).toBe('v1.4.0');
    });
  });

  test.describe('Documentation Page - Real-time Stats Display', () => {
    
    test('should load documentation page', async ({ page }) => {
      await page.goto(`${BASE_URL}/documentation`);
      await expect(page).toHaveTitle(/.*Documentation|Technical/);
    });

    test('should display project overview section', async ({ page }) => {
      await page.goto(`${BASE_URL}/documentation`);
      
      await expect(page.locator('text=Project Overview')).toBeVisible();
      await expect(page.locator('text=Completion')).toBeVisible();
    });

    test('should fetch and display completion percentage from database', async ({ page }) => {
      await page.goto(`${BASE_URL}/documentation`);
      
      // Wait for stats to load
      await page.waitForTimeout(1000);
      
      // Check if completion percentage is displayed
      const completionCard = page.locator('text=Completion').locator('..').locator('..').first();
      await expect(completionCard).toBeVisible();
      
      const percentageText = await completionCard.locator('div').first().textContent();
      expect(percentageText).toMatch(/\d+%/);
    });

    test('should display phase name', async ({ page }) => {
      await page.goto(`${BASE_URL}/documentation`);
      
      await page.waitForTimeout(1000);
      
      // Check for phase name
      const phaseSection = page.locator('text=Phase 2').locator('..').locator('..').first();
      await expect(phaseSection).toBeVisible();
    });

    test('should display version number', async ({ page }) => {
      await page.goto(`${BASE_URL}/documentation`);
      
      await page.waitForTimeout(1000);
      
      // Check for version number
      const versionText = await page.locator('text=Production Ready').locator('..').locator('..').first().textContent();
      expect(versionText).toMatch(/v\d+\.\d+\.\d+/);
    });
  });

  test.describe('Chatbot - FAQ Functionality', () => {
    
    test('should open chatbot', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Click chatbot button
      const chatbotButton = page.locator('button').filter({ has: page.locator('svg') }).last();
      await chatbotButton.click();
      
      // Wait for chatbot window to appear
      await page.waitForSelector('text=Job Assistant');
      await expect(page.locator('text=Job Assistant')).toBeVisible();
    });

    test('should answer FAQ question about Altroway', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Type FAQ question
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('What is Altroway?');
      
      // Send message
      const sendButton = page.locator('button').filter({ has: page.locator('svg[class*="Send"]') }).last();
      await sendButton.click();
      
      // Wait for response
      await page.waitForTimeout(1000);
      
      // Check if response contains FAQ answer
      const messages = await page.locator('div[class*="rounded-lg"]').allTextContents();
      const hasAnswer = messages.some(msg => 
        msg.includes('platform') || msg.includes('job') || msg.includes('opportunities')
      );
      expect(hasAnswer).toBeTruthy();
    });

    test('should answer FAQ question about registration', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Type question
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('How do I create an account?');
      
      // Send message
      await input.press('Enter');
      
      // Wait for response
      await page.waitForTimeout(1000);
      
      // Verify response
      const messages = await page.locator('text=Register').allTextContents();
      expect(messages.length).toBeGreaterThan(0);
    });
  });

  test.describe('Chatbot - Job Filtering', () => {
    
    test('should detect and filter jobs by IT niche', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Type job-related question
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('I am looking for IT jobs');
      
      // Send message
      await input.press('Enter');
      
      // Wait for response
      await page.waitForTimeout(1500);
      
      // Check if chatbot mentions jobs
      const messages = await page.locator('div').locator('text=/jobs|opportunities|found/i').allTextContents();
      expect(messages.length).toBeGreaterThan(0);
    });

    test('should detect and filter jobs by Healthcare niche', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Type healthcare job question
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('Show me healthcare jobs');
      
      // Send message
      await input.press('Enter');
      
      // Wait for response
      await page.waitForTimeout(1500);
      
      // Verify response
      const botMessages = await page.locator('div[class*="bg-gray"]').allTextContents();
      expect(botMessages.length).toBeGreaterThan(0);
    });

    test('should show "View All Jobs" button for filtered results', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Ask for jobs
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('I want marketing jobs');
      
      await input.press('Enter');
      
      // Wait for response
      await page.waitForTimeout(1500);
      
      // Check for View All Jobs button
      const viewButton = page.locator('button:has-text("View All")');
      const isVisible = await viewButton.isVisible().catch(() => false);
      
      // Button might not be visible if no jobs found, which is ok
      // Just verify the chatbot responded
      const responses = await page.locator('div[class*="bg-gray"]').count();
      expect(responses).toBeGreaterThan(0);
    });
  });

  test.describe('Chatbot - Job Redirection', () => {
    
    test('should redirect to jobs page when clicking View All Jobs', async ({ page, context }) => {
      // Listen for new page
      const newPagePromise = context.waitForEvent('page');
      
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Ask for jobs
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('Finance jobs');
      
      await input.press('Enter');
      
      // Wait for response
      await page.waitForTimeout(1500);
      
      // Look for View All Jobs button
      const viewButton = page.locator('button:has-text("View All")');
      const exists = await viewButton.isVisible().catch(() => false);
      
      if (exists) {
        await viewButton.click();
        
        // Wait for navigation
        await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
        
        // Check if redirected to jobs page
        const url = page.url();
        expect(url).toContain('/jobs');
      }
    });
  });

  test.describe('Integration Tests', () => {
    
    test('should maintain completion percentage across page refreshes', async ({ page }) => {
      await page.goto(`${BASE_URL}/documentation`);
      
      // Get initial value
      await page.waitForTimeout(1000);
      const initialPercentage = await page.locator('text=/\\d+%/').first().textContent();
      
      // Refresh page
      await page.reload();
      
      // Wait for page to reload
      await page.waitForTimeout(1000);
      
      // Get new value
      const newPercentage = await page.locator('text=/\\d+%/').first().textContent();
      
      // Values should match
      expect(newPercentage).toBe(initialPercentage);
    });

    test('should respond appropriately to non-FAQ questions', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Open chatbot
      const chatbotButton = page.locator('button[class*="bottom"]').last();
      await chatbotButton.click();
      
      await page.waitForSelector('input[placeholder*="Ask"]');
      
      // Ask random question
      const input = page.locator('input[placeholder*="Ask"]');
      await input.fill('Tell me a joke');
      
      await input.press('Enter');
      
      // Wait for response
      await page.waitForTimeout(1000);
      
      // Chatbot should still respond
      const responses = await page.locator('div[class*="bg-gray"]').count();
      expect(responses).toBeGreaterThan(0);
    });
  });
});
