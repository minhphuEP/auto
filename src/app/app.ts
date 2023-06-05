import { remote } from 'webdriverio';
import { authenPage } from '../pages/authenPage';
import { contactPage } from '../pages/contactPage';
import { chatPage } from '../pages/chatPage';

async function launchAppAndSendMessage(
  apkPath: string,
  getQR: string,
  username: string,
  password: string,
  otp: string,
  recipient: string,
  message: string,
  replyMessage: string
): Promise<void> {
  const appiumConfig = {
    capabilities: {
      platformName: 'Android',
      deviceName: 'samsung',
      app: apkPath,
      automationName: 'UiAutomator2',
    },
    hostname: 'localhost',
    port: 4723,
    path: '/wd/hub',
  };
  const client = await remote(appiumConfig);
  await client.$(authenPage.activateCode).setValue(getQR);
  await client.$(authenPage.userName).setValue(username);
  await client.$(authenPage.password).setValue(password);
  for (let i = 0; i <= 5; i++) {
    await client.$(authenPage.otpCell(i)).setValue(otp);
  }
  await client.$(authenPage.loginButton).click();
  await client.$(contactPage.contactTab).click();
  await client.$(contactPage.teamTab).click();
  await client.$(contactPage.searchBox).setValue(recipient);
  await client.pause(3000);
  await client.$(chatPage.textArea).setValue(message);
  await client.$(chatPage.sendButton).click();
  await client.pause(3000);

  await client.$(chatPage.reply).click();
  await client.$(chatPage.textArea).setValue(replyMessage);
  await client.$(chatPage.sendButton).click();

  await client.pause(3000);

  // Close the app and clean up
  await client.deleteSession();
}

export async function sendAndReplyMessageOnApp(apkPath: string,
  getQR: string,
  username: string,
  password: string,
  otp: string,
  recipient: string,
  message: string,
  replyMessage: string) {
    await launchAppAndSendMessage(apkPath, getQR, username, password, otp, recipient, message, replyMessage).then(() => {
      console.log('Message sent and replied successfully!');
    }).catch((error) => {
      console.error('Error occurred while sending or replying to a message:', error);
    });
}
