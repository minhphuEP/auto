import { CommonPage } from "./commonPage";
import { Page, expect } from "@playwright/test";

const chatTap = "//div[@class='NavSide_nav-side__to+vM']//a[@id='chat']//div[@class='NavSideItem_content__title__cPhbG']";
const menuChat = (userText: string): string => {
    return `//div[@id='ZLaFvbroPdPxXbMpum']//span[text()='${userText}']`;
}
const textArea = "//textarea[@data-testid='input-box']";
const sendButton = "//div[@data-testid='btn-send']";
const replyMessage = (message: string) => {
    return `//span[@data-testid='message-item-body']/span[text()='${message}']`;
}
const reply = "//div[@data-testid='reply-option']";
const verifyMessage = (message: string) => {
    return `//span[@data-testid='message-item-body']/span[text()='${message}']`;
} 

export const chatPage = {
    chatTap,
    menuChat,
    textArea,
    sendButton,
    replyMessage,
    reply,
    verifyMessage,
}

export async function verifyReceivedMessage(page: Page, user: string, message: string) {
    await page.locator(chatPage.menuChat(user)).click();
    await expect(page.locator(chatPage.verifyMessage(message))).toBeVisible();    
}