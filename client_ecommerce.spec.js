//import { expect } from "@playwright/test"

const {test, expect}=require('@playwright/test');
test('eCommerceApp' , async({page}) =>
{
    const product="ADIDAS ORIGINAL";
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill("athira@invalid.com");
await page.locator("#userPassword").fill("7532Athira@");
await page.locator("#login").click();

const text=await page.locator("#toast-container").textContent();
console.log(text);
expect(text).toBe(" Login Successfully ");
 const listOfPdts=await page.locator(".card-body");
   await page.locator(".card-body b").first().waitFor();

 //console.log(await listOfPdts.allTextContents()); 
 const count =await listOfPdts.count();
 for(let i=0;i<count;i++){
    if( await listOfPdts.nth(i).locator("b").textContent()===product){
        console.log("pdt matched");
        await listOfPdts.nth(i).locator("text= Add To Cart").click();
       break;
    }else{
        console.log("i didn't enter the if loop");
    }
 }
 await page.locator("button[routerlink='/dashboard/cart']").click();
 const pdtinCart=await page.locator("div[class='cartSection'] h3").textContent();
//await page.pause();
expect(pdtinCart).toEqual(product);
await page.getByRole('button',{name:'checkout'}).click();
await expect(page.locator("text=athira@invalid.com")).toBeVisible();
await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
const countries=await page.locator(".ta-results");
//await countries.waitFor();
await countries.filter({hasText:'India'}).click();
const email=page.locator(".user__name [type='text']").first();
await expect(email).toHaveText("athira@invalid.com");
await page.locator(".action__submit ").click();
await expect( page.locator(".hero-primary")).toBeVisible();
const orderIdfull = await page.locator(".em-spacer-1 [class='ng-star-inserted']").textContent();
const orderId = orderIdfull.split('|')[1].trim();
console.log(orderId);

await page.locator("button[routerlink='/dashboard/myorders']").click();

const orders =  page.locator("tbody tr").filter({hasText:orderId});


await orders.locator("button[tabindex='0']").click();
await page.pause();



});
