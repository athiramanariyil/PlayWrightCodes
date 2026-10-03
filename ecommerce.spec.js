const {test,expect}=require('@playwright/test');

test('loginPage',async({page})=>{
    const productName ='ZARA COAT 3';
    const listOfPdts = page.locator(".card-body");
    const count = listOfPdts.count();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill("athira@invalid.com");
await page.locator("#userPassword").fill("7532Athira@");
await page.locator("#login").click();
await page.locator(".card-body b").first().waitFor();
await page.locator(".card-body b").allTextContents();
for(let i=0;i<count;++i){
if(await listOfPdts.nth(i).locator("b").textContent()===productName){
    await listOfPdts.nth(i).locator("text=  Add To Cart").click();
    break;
}}
   await page.pause();





})
