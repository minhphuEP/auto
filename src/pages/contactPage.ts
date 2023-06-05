import { CommonPage } from "./commonPage";
import { Page, expect } from "@playwright/test";

const contactTab = "//div[@class='NavSide_nav-side__to+vM ']//a[@id='contact']//div[@class='NavSideItem_content__title__cPhbG']";
const teamTab = "//span[@data-testid='tab-team']";
const searchBox = "//input[@data-testid='search-contact']";

export const contactPage = {
    contactTab,
    teamTab,
    searchBox,
}