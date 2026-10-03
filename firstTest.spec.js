const {test,expect}=require('@playwright/test');
test('TC1' ,async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     let title= await page.title();
    console.log(title);
    await page.locator("#username").fill("athira@exmplish.com");
    await page.locator("#password").fill("Athira@2027");
    await page.locator("#signInBtn").click();
    await expect(page.locator("div[style*='block']")).toContainText("Incorrect username");
    console.log(await page.locator("div[style*='block']").textContent());


})

test('TC2',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const loc=page.locator("[href*='documents-request']");
    await expect(loc).toHaveAttribute("class","blinkingText");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#usertype").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("select.form-control").selectOption("consult");
    await page.locator("#signInBtn").click();

    await expect(page.locator(".navbar-brand").first()).toBeVisible();



})
test.only('child_handles',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const linkPage= page.locator("a[href*='documents-request']");

const [page2]=await Promise.all(
[context.waitForEvent('page'),
linkPage.click()
])
const text=await page2.locator(".red").textContent();
const textarr=text.split("at")[1];
const email=textarr.split("with")[0];
console.log(email);
    await page.locator("#username").fill(email);
    await page.pause();



});
