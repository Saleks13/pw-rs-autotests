import { expect, Page } from "@playwright/test";

export default class HeaderPage {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    logoImg = () => this.page.locator("#Logo");
    notificationIcon = () => this.page.locator("#notification_icon");
    ownerFullName = () => this.page.locator("#OwnInfo a");
    helpMenuDropdownButton = () => this.page.locator(".btn-topNav");
    helpCenterButton = () => this.page.locator("#HelpCenter");
    contactSupportButton = () => this.page.locator(".dropdown-menutopNav a[href='/Request/Add']");
    logoutButton = () => this.page.locator("#LogOffLink");    

    

    //Check logo visible
    public async isLogoVisible() {
        return expect(await this.logoImg().isVisible());
    }


}



