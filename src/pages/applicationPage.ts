import { CommonPage } from "./commonPage";
import { Page, expect } from "@playwright/test";

const applicationTap = "//div[@class='NavSide_nav-side__to+vM']//a[@id='bot']//div[@class='NavSideItem_content__title__cPhbG']";

export const applicationPage = {
    applicationTap,
}