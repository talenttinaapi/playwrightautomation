import { test, expect } from '@playwright/test';
import { login } from '../../support/setCookies';

let sharedContext;
let page;

test.beforeAll(async ({ browser }) => {
    console.log('Running beforeAll hook');
    sharedContext = await login(browser);
    page = await sharedContext.newPage();
});

test.beforeEach(async () => {
    console.log('Running beforeEach hook');
    await page.goto('/app/internal/admin/configuration_defaults');
});

test('Page header loads', async () => {
    console.log('Running test: Page header loads');
    await expect(
        page.getByRole('heading', { name: 'Configuration defaults' })
    ).toBeVisible();
});

test('Edit collection', async () => {
    console.log('Running test: Edit collection');
    await page.getByTestId('basic-search-name_cont').fill('United States');
    await page.getByRole('cell', { name: 'Edit' }).first().click();
    await expect(page.getByText('Key messages', { exact: true })).toBeVisible();
});