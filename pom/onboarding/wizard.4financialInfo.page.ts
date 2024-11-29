import { expect, Page } from "@playwright/test";

export default class Wizard4FinancialInfoPage 
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    // Locators 
    dayField = () => this.page.locator('#FinancialYearEnd_Day');
    monthField = () => this.page.locator('#FinancialYearEnd_Month');
    



    // Actions 

    // day field
    public async selectDay(day: number) {
        await this.dayField().selectOption(day.toString());
    }
    // month field
    public async selectMonth(month: number) {
        await this.monthField().selectOption(month.toString());
    }

   


}