import { test as base } from './base.fixture';

import SignInPage from "../pages/onboarding/signIn.page";
import Wizard1UserInfoPage from "../pages/onboarding/wizard.1userInfo.page";
import Wizard2RequiredDocsPage from "../pages/onboarding/wizard.2requiredDocs.page";
import Wizard3CompanyInfoPage from "../pages/onboarding/wizard.3companyInfo.page";
import Wizard4FinancialInfoPage from "../pages/onboarding/wizard.4financialInfo.page";
import Wizard5MobilePhonePage from "../pages/onboarding/wizard.5mobilePhone.page";
import Wizard6FinalStepPage from "../pages/onboarding/wizard.6finalStep.page";

// Define the specific fixture types for the onboarding module
type OnboardingFixtures = {
    signInPage: SignInPage;
    wizard1UserInfoPage: Wizard1UserInfoPage;
    wizard2RequiredDocsPage: Wizard2RequiredDocsPage;
    wizard3CompanyInfoPage: Wizard3CompanyInfoPage;
    wizard4FinancialInfoPage: Wizard4FinancialInfoPage;
    wizard5MobilePhonePage: Wizard5MobilePhonePage;
    wizard6FinalStepPage: Wizard6FinalStepPage;
};

export const test = base.extend<OnboardingFixtures>({
    signInPage: async ({ page }, use) => {
        try {
            await use(new SignInPage(page));
        } catch (error) {
            console.error("Error initializing SignInPage:", error);
            throw error;
        }
    },
    wizard1UserInfoPage: async ({ page }, use) => {
        try {
            await use(new Wizard1UserInfoPage(page));
        } catch (error) {
            console.error("Error initializing Wizard1UserInfoPage:", error)
            throw error;
        }
    },
    wizard2RequiredDocsPage: async ({ page }, use) => {
        try {
            await use(new Wizard2RequiredDocsPage(page));
        } catch (error) {
            console.error("Error initializing Wizard2RequiredDocsPage:", error)
            throw error;
        }
    },
    wizard3CompanyInfoPage: async ({ page }, use) => {
        try {
            await use(new Wizard3CompanyInfoPage(page));
        } catch (error) {
            console.error("Error initializing Wizard3CompanyInfoPage:", error)
            throw error;
        }
    },
    wizard4FinancialInfoPage: async ({ page }, use) => {
        try {
            await use(new Wizard4FinancialInfoPage(page));
        } catch (error) {
            console.error("Error initializing Wizard4FinancialInfoPage:", error)
            throw error;
        }
    },
    wizard5MobilePhonePage: async ({ page }, use) => {
        try {
            await use(new Wizard5MobilePhonePage(page));
        } catch (error) {
            console.error("Error initializing Wizard5MobilePhonePage:", error)
            throw error;
        }
    },
    wizard6FinalStepPage: async ({ page }, use) => {
        try {
            await use(new Wizard6FinalStepPage(page));
        } catch (error) {
            console.error("Error initializing Wizard6FinalStepPage:", error)
            throw error;
        }
    }
})

export const expect = test.expect;