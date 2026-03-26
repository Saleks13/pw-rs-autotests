import { test as base } from './base.fixture';

import TransactionsBasePage from '../pages/transactions/transactionsBase.page';
import BankingBlankPage from '../pages/transactions/banking/bankingBlank.page';
import BankingPopulatedPage from '../pages/transactions/banking/bankingPopulated.page';
import SalesPage from '../pages/transactions/sales.page';
import PurchasesPage from '../pages/transactions/purchases.page';
import ExpensesPage from '../pages/transactions/expenses.page';
import ManualJournalsPage from '../pages/transactions/manualJournals.page';
import FixedAssetsPage from '../pages/transactions/fixedAssets.page';


// Define the specific fixture types for the Transactions Overview module
type TransactionsFixtures = {
    transactionsBasePage: TransactionsBasePage;
    bankingBlankPage: BankingBlankPage;
    bankingPopulatedPage: BankingPopulatedPage;
    salesPage: SalesPage;
    purchasesPage: PurchasesPage;
    expensesPage: ExpensesPage;
    manualJournalsPage: ManualJournalsPage;
    fixedAssetsPage: FixedAssetsPage;
};

export const test = base.extend<TransactionsFixtures>({
    transactionsBasePage: async ({ page }, use) => {
        try {
            await use(new TransactionsBasePage(page));
        } catch (error) {
            console.error("Error initializing TransactionsBasePage:", error);
            throw error;
        }
    },
    bankingBlankPage: async ({ page }, use) => {
        try {
            await use(new BankingBlankPage(page));
        } catch (error) {
            console.error("Error initializing BankingBlankPage:", error);
            throw error;
        }
    },
    bankingPopulatedPage: async ({ page }, use) => {
        try {
            await use(new BankingPopulatedPage(page));
        } catch (error) {
            console.error("Error initializing BankingPopulatedPage:", error);
            throw error;
        }
    },
    salesPage: async ({ page }, use) => {
        try {
            await use(new SalesPage(page));
        } catch (error) {
            console.error("Error initializing SalesPage:", error);
            throw error;
        }
    },
    purchasesPage: async ({ page }, use) => {
        try {
            await use(new PurchasesPage(page));
        } catch (error) {
            console.error("Error initializing PurchasesPage:", error);
            throw error;
        }
    },
    expensesPage: async ({ page }, use) => {
        try {
            await use(new ExpensesPage(page));
        } catch (error) {
            console.error("Error initializing ExpensesPage:", error);
            throw error;
        }
    },
    manualJournalsPage: async ({ page }, use) => {
        try {
            await use(new ManualJournalsPage(page));
        } catch (error) {
            console.error("Error initializing ManualJournalsPage:", error);
            throw error;
        }
    },
    fixedAssetsPage: async ({ page }, use) => {
        try {
            await use(new FixedAssetsPage(page));
        } catch (error) {
            console.error("Error initializing FixedAssetsPage:", error);
            throw error;
        }
    },
})

export const expect = test.expect;