import { Locator, Page } from "@playwright/test";
import { chatPage } from "./chatPage";
import { contactPage } from "./contactPage";
import { applicationPage } from "./applicationPage";

export class CommonPage {
    readonly page: Page;
    readonly chatPage: Locator;
    readonly contactsPage: Locator;
    readonly applicationsPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chatPage = page.locator(chatPage.chatTap);
        this.contactsPage = page.locator(contactPage.contactTab);
        this.applicationsPage = page.locator(applicationPage.applicationTap);
    }

    async goto() {
        await this.page.goto("/");
    }

    async getChatPage() {
        await this.chatPage.click();
    }

    async getContactsPage() {
        await this.contactsPage.click();
    }

    async getApplicationsPage() {
        await this.applicationsPage.click();
    }

};