import { Given, When, Then } from 'cucumber';
import { CommonPage } from "../../pages/commonPage";
import { loginWebPage, getQRCode } from "../../pages/authenPage";
import { readFileExcel } from '../../utils/common';
import { filePath } from '../../utils/const';
import { sendAndReplyMessageOnApp } from "../../app/app";
import { verifyReceivedMessage } from "../../pages/chatPage";

let getData = readFileExcel(filePath.sendMessageFile, "authen");
let getQR;

Given('User 1 is on the Web Application login page', async ({ page }) => {
    const commonPage = new CommonPage(page);
    await commonPage.goto();
});

When('User 1 logs in with credentials', async ({ page }) => {    
    await loginWebPage(page, getData.data[0].companyName, getData.data[0].userName, getData.data[0].password);  
});

When('User 1 requests a QR code to log in to the mobile app', async ({ page }) => {
    getQR = await getQRCode(page);
});

Then('User 1 installs and launches the mobile app, logs in to the mobile app using QR code, username, and password, goes to the Contact tab and searches for User 2, sends message and reply to User 2', async ({ page}) => {
    await sendAndReplyMessageOnApp(filePath.apkFile, getQR, getData.data[0].userName, getData.data[0].password, getData.data[0].otp, getData.data[1].userName, getData.data[0].message, getData.data[0].replyMessage);
});

Then('User 2 logs in to the Web Application', async ({ page }) => {
  await loginWebPage(page, getData.data[1].companyName, getData.data[1].userName, getData.data[1].password);
});

Then('User 2 should see the received message', async ({ page }) => {
  await verifyReceivedMessage(page, getData.data[0].userName, getData.data[0].replyMessage);
});
