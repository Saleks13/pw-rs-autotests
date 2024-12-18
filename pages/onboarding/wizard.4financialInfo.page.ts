import { expect, Page } from "@playwright/test";
import { VatType } from "../../testData/vatType";

export default class Wizard4FinancialInfoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators 
    dayDropdown = () => this.page.locator('#FinancialYearEnd_Day');
    monthDropdown = () => this.page.locator('#FinancialYearEnd_Month');
    vatRadioButtons = () => this.page.locator('#RadioButton');
    vatInput = () => this.page.locator('#VAT_Id');
    continueButton = () => this.page.locator('.continue');

    // Actions 

    // day field
    public async selectDay(day: number) {
        await this.dayDropdown().selectOption(day.toString());
    }
    // month field
    public async selectMonth(month: number) {
        await this.monthDropdown().selectOption(month.toString());
    }
    // value added tax
    public async selectVat(vatType: VatType) {
        switch (vatType) {
            case VatType.KeineMehrwertsteuer:
                await this.vatRadioButtons().nth(0).click();
                break;
            case VatType.Effektiv:
                await this.vatRadioButtons().nth(1).click();
                break;
            case VatType.Saldosteuersatz:
                await this.vatRadioButtons().nth(2).click();
                break;

        }
    }
    // value added tax 
    public async fillVat(vat: string) {
        await this.vatInput().fill(vat);
    }
    // continue button
    public async clickContinueButton() {
        await this.continueButton().click();
    }
}