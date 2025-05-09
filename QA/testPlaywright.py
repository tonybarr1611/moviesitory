import pytest
from time import sleep
from playwright.async_api import async_playwright, expect

@pytest.mark.asyncio
async def test_01_register_user():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto("http://localhost:4200/user/register")

        await page.fill('#mat-input-1', "barrantesa088@gmail.com")
        await page.fill('#mat-input-2', "tony1611")
        await page.fill('#mat-input-3', "Password123!")

        register_btn = page.get_by_role("button", name="Register")
        await expect(register_btn).to_be_enabled()
        await register_btn.click()

        sleep(1.5)
        assert "register" not in page.url
        await browser.close()

@pytest.mark.asyncio
async def test_02_login_user():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto("http://localhost:4200/user/login")

        await page.fill('#mat-input-1', "barrantesa088@gmail.com")
        await page.fill('#mat-input-2', "Password123!")

        login_btn = page.get_by_role("button", name="Login")
        await expect(login_btn).to_be_enabled()
        await login_btn.click()

        sleep(1.5)
        assert "all" in page.url
        await browser.close()

@pytest.mark.asyncio
async def test_03_create_movie():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto("http://localhost:4200/admin/movie/add")

        await page.fill('#title', "Título de prueba")
        await page.fill('#overview', "Esta es una overview de prueba.")
        await page.fill('#popularity', "42")
        await page.fill('#release_date', "2025-12-31")
        await page.fill('#image', "https://example.com/image.jpg")

        # Espera y haz clic en "Add image"
        await expect(page.get_by_role("button", name="Add image")).to_be_visible()
        await page.get_by_role("button", name="Add image").click()

        await page.fill('#search', "Anya")
        await page.keyboard.press("Enter")

        await expect(page.locator("mat-card:has-text('Anya') button")).to_be_visible()
        await page.locator("mat-card:has-text('Anya') button").click()

        await page.get_by_role("button", name="Confirm").click()
        sleep(1.5)
        assert "/" in page.url
        await browser.close()

@pytest.mark.asyncio
async def test_04_edit_movie():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto("http://localhost:4200/admin/movie/edit")

        await page.fill('#title', "Película editada")
        await page.fill('#overview', "Nueva descripción para la película editada.")
        await page.fill('#popularity', "84")
        await page.fill('#release_date', "2026-01-15")
        await page.fill('#image', "https://example.com/newimage.jpg")

        await expect(page.get_by_role("button", name="Add image")).to_be_visible()
        await page.get_by_role("button", name="Add image").click()

        await page.fill('#search', "Keanu")
        await page.keyboard.press("Enter")

        await expect(page.locator("mat-card:has-text('Keanu Reeves') button")).to_be_visible()
        await page.locator("mat-card:has-text('Keanu Reeves') button").click()

        await page.get_by_role("button", name="Confirm").click()
        sleep(1.5)
        assert "/" in page.url
        await browser.close()

@pytest.mark.asyncio
async def test_05_delete_movie():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()

        await page.goto("http://localhost:4200/user/login")
        await page.fill('#mat-input-1', "sfabricito@gmail.com")
        await page.fill('#mat-input-2', "Password123!")
        await page.get_by_role("button", name="Login").click()

        sleep(2)

        await page.goto("http://localhost:4200/movie/6340535139")

        delete_btn = page.locator("button mat-icon", has_text="delete")
        await expect(delete_btn).to_be_visible()
        await delete_btn.click(force=True)

        sleep(1.5)
        assert "/" in page.url
        await browser.close()
