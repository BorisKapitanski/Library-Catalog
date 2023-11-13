const { test, expect } = require("@playwright/test")

test("Verify All books button is visible", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/catalog");
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$("a[href='/catalog']");
    const isVisible = await allBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Verify Login button is visible", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/catalog");
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$("a[href='/login']");
    const isVisible = await allBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Verify Register button is visible", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/catalog");
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$("a[href='/register']");
    const isVisible = await allBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Verify All Books button is visible after user login", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='email']", "peter@abv.bg");
    await page.fill("input[name='password']", "123456");
    await page.click("input[type='submit']");

    const allBooksLink = await page.$("a[href='/catalog']");
    const isVisible = await allBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Verify My Books button is visible after user login", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='email']", "peter@abv.bg");
    await page.fill("input[name='password']", "123456");
    await page.click("input[type='submit']");

    const MyBooksLink = await page.$("a[href='/profile']");
    const isVisible = await MyBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Verify Add Books button is visible after user login", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='email']", "peter@abv.bg");
    await page.fill("input[name='password']", "123456");
    await page.click("input[type='submit']");

    const AddBooksLink = await page.$("a[href='/create']");
    const isVisible = await AddBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Verify user email is visible", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='email']", "peter@abv.bg");
    await page.fill("input[name='password']", "123456");
    await page.click("input[type='submit']");

    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$("#user>span");
    const isVisible = await allBooksLink.isVisible();
    expect(isVisible).toBe(true);
})

test("Login with valid credentials", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='email']", "peter@abv.bg");
    await page.fill("input[name='password']", "123456");
    await page.click("input[type='submit']");

    await page.$("a[href='/catalog']");
    expect(page.url()).toBe("http://127.0.0.1:5500/catalog")
})

test("Login with empty imput fields", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.click("input[type='submit']");

    page.on("dialog", async dialog =>{
        expect(dialog.type()).toContain("Alert");
        expect(dialog.message()).toContain("All field are required!");
        await dialog.accept();
    })

    await page.$("a[href='/login']");
    expect(page.url()).toBe("http://127.0.0.1:5500/login")
})

test("Login with empty email field", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='password']", "123456");
    await page.click("input[type='submit']");

    page.on("dialog", async dialog =>{
        expect(dialog.type()).toContain("Alert");
        expect(dialog.message()).toContain("All field are required!");
        await dialog.accept();
    })

    await page.$("a[href='/login']");
    expect(page.url()).toBe("http://127.0.0.1:5500/login")
})

test("Login with empty password field", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login");
    await page.fill("input[name='email']", "peter@abv.bg");
    await page.click("input[type='submit']");

    page.on("dialog", async dialog =>{
        expect(dialog.type()).toContain("Alert");
        expect(dialog.message()).toContain("All field are required!");
        await dialog.accept();
    })

    await page.$("a[href='/login']");
    expect(page.url()).toBe("http://127.0.0.1:5500/login")
})