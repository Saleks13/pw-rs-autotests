import { Page } from "@playwright/test";

// Enum for predefined locators
export enum ButtonType {
    BankingTab = "bankingTab",
    BankingPlusButton = "bankingPlusButton",
    SalesTab = "salesTab",
    SalesPlusButton = "salesPlusButton",
    PurchasesTab = "purchasesTab",
    PurchasesPlusButton = "purchasesPlusButton",
    ExpensesTab = "expensesTab",
    ExpensesPlusButton = "expensesPlusButton",
    ManualJournalsTab = "manualJournalsTab",
    ManualJournalsPlusButton = "manualJournalsPlusButton",
    FixedAssetsTab = "fixedAssetsTab",
    FixedAssetsPlusButton = "fixedAssetsPlusButton",
}

export default class TransactionsBasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators 
    bankingTab = () => this.page.locator("#snbm1_");
    bankingPlusButton = () => this.page.locator("#snbm1 .plus"); // >> new bank account
    salesTab = () => this.page.locator("#snbm2_");
    salesPlusButton = () => this.page.locator("#snbm2 .plus"); // >> new sale invoice
    purchasesTab = () => this.page.locator("#snbm3_");
    purchasesPlusButton = () => this.page.locator("#snbm3 .plus"); // >> new purchase invoice
    expensesTab = () => this.page.locator("#snbm6_");
    expensesPlusButton = () => this.page.locator("#snbm6 .plus"); // >> new expense claim
    manualJournalsTab = () => this.page.locator("#snbm4_");
    manualJournalsPlusButton = () => this.page.locator("#snbm4 .plus"); // >> new mj 
    fixedAssetsTab = () => this.page.locator("#snbm5_");
    fixedAssetsPlusButton = () => this.page.locator("#snbm5 .plus"); // >> new asset

    private buttonMapping: Record<ButtonType, () => ReturnType<Page["locator"]>> = {
        [ButtonType.BankingTab]: this.bankingTab,
        [ButtonType.BankingPlusButton]: this.bankingPlusButton,
        [ButtonType.SalesTab]: this.salesTab,
        [ButtonType.SalesPlusButton]: this.salesPlusButton,
        [ButtonType.PurchasesTab]: this.purchasesTab,
        [ButtonType.PurchasesPlusButton]: this.purchasesPlusButton,
        [ButtonType.ExpensesTab]: this.expensesTab,
        [ButtonType.ExpensesPlusButton]: this.expensesPlusButton,
        [ButtonType.ManualJournalsTab]: this.manualJournalsTab,
        [ButtonType.ManualJournalsPlusButton]: this.manualJournalsPlusButton,
        [ButtonType.FixedAssetsTab]: this.fixedAssetsTab,
        [ButtonType.FixedAssetsPlusButton]: this.fixedAssetsPlusButton,
    };


    // Generalized Click Method
    public async clickButton(buttonType: ButtonType): Promise<void> {
        const buttonLocator = this.buttonMapping[buttonType];
        await buttonLocator().click();
    }
}
