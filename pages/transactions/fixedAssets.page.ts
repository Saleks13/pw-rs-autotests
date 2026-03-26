import { Page } from "@playwright/test";
import TransactionsBasePage, { ButtonType } from "./transactionsBase.page";

export default class FixedAssetsPage extends TransactionsBasePage {
    constructor(page: Page) {
        super(page);
    }

    public async goto() {
        await this.page.goto("/FixedAssets/FixedAssets");
    }

    async navigateToFixedAssetsSection(): Promise<void> {
        await this.clickButton(ButtonType.FixedAssetsTab);
    }

    async createNewFixedAsset(): Promise<void> {
        await this.clickButton(ButtonType.FixedAssetsPlusButton);
    }
}
