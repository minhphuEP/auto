import { Page, expect } from "@playwright/test";
import { chatPage } from "./chatPage";

const companyName = "Company name";
const userName = "Username";
const password = "Password";
const loginButton = "//span[@class='Login_button__Somrs Login_otp__KZcNs']";
const otpCell = (index: number) => {
    return `//input[@data-testid='otp-input-${index}']`;
}
const activateCode = "//div[@class='LinkDeviceModal_label-code__w4AeK']";
const userLogo = "//a[@id='NOTIFICATION']/../div[@class='_wrapper_1sks2_1 style_avatar__LbiSX _clickable_1sks2_85']";
const accountUser = "//p[text()='automation_auto_100@leapxpert.dev']";
const deviceTab = "//div[text()='Devices']";
const linkDevice = "//button[text()='Link Device']";
const qrCode = "//div[@class='LinkDeviceModal_code-name__zpXmI']";

export const authenPage = {
    companyName,
    userName,
    password,
    loginButton,
    otpCell,
    activateCode,
    userLogo,
    accountUser,
    deviceTab,
    linkDevice,
    qrCode,
}

export async function loginWebPage(page: Page, companyName: string, userName: string, password: string) {
    await page.getByPlaceholder(authenPage.companyName).fill(companyName);
    await page.getByPlaceholder(authenPage.userName).fill(userName);
    await page.getByPlaceholder(authenPage.password).fill(password);
    await page.locator(authenPage.loginButton).click();
    await page.waitForLoadState();
    for(let i = 0; i <= 5; i++) {
        await page.locator(authenPage.otpCell(i)).fill("1");
    }
    await page.waitForLoadState();
    await expect(page.locator(chatPage.chatTap)).toBeVisible();
}

export async function getQRCode(page: Page){
    await page.locator(authenPage.userLogo).click();
    await page.locator(authenPage.accountUser).click();
    await page.waitForLoadState();
    await page.locator(authenPage.deviceTab).click();
    await page.locator(authenPage.linkDevice).click();
    const qrCode = (await page.$(authenPage.qrCode)).textContent();
    return qrCode;
}