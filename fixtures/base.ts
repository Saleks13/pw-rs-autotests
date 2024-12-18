import { test as base } from "@playwright/test";
import SignInPage from "../pages/onboarding/signIn.page";
import Wizard1UserInfoPage from "../pages/onboarding/wizard.1userInfo.page";
import Wizard2RequiredDocsPage from "../pages/onboarding/wizard.2requiredDocs.page";
import Wizard3CompanyInfoPage from "../pages/onboarding/wizard.3companyInfo.page";
import Wizard4FinancialInfoPage from "../pages/onboarding/wizard.4financialInfo.page";
import Wizard5MobilePhonePage from "../pages/onboarding/wizard.5mobilePhone.page";
import Wizard6FinalStepPage from "../pages/onboarding/wizard.6finalStep.page";

import OverviewHello from "../pages/welcome/overviewHello.page";
import OverviewGeneral from "../pages/overview/overviewGeneral.page";

import FooterPage from "../pages/page components/footer.component";
import HeaderPage from "../pages/page components/header.component";

type MyFixtures = {
    // pages
    signInPage: SignInPage;
    wizard1UserInfoPage: Wizard1UserInfoPage;
    wizard2RequiredDocsPage: Wizard2RequiredDocsPage;
    wizard3CompanyInfoPage: Wizard3CompanyInfoPage;
    wizard4FinancialInfoPage: Wizard4FinancialInfoPage;
    wizard5MobilePhonePage: Wizard5MobilePhonePage;
    wizard6FinalStepPage: Wizard6FinalStepPage;
    overviewHello: OverviewHello;
    overviewGeneral: OverviewGeneral;
    // components
    headerPage: HeaderPage;
    footerPage: FooterPage;
}

export const test = base.extend<MyFixtures>({

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
    },
    overviewHello: async ({ page }, use) => {
        try {
            await use(new OverviewHello(page));
        } catch (error) {
            console.error("Error initializing OverviewHello:", error)
            throw error;
        }
    },
    overviewGeneral: async ({ page }, use) => {
        try {
            await use(new OverviewGeneral(page));
        } catch (error) {
            console.error("Error initializing OverviewGeneral:", error)
            throw error;
        }
    },
    headerPage: async ({ page }, use) => {
        try {
            await use(new HeaderPage(page));
        } catch (error) {
            console.error("Error initializing HeaderPage:", error)
            throw error;
        }
    },
    footerPage: async ({ page }, use) => {
        try {
            await use(new FooterPage(page));
        } catch (error) {
            console.error("Error initializing FooterPage:", error)
            throw error;
        }
    }
})

test.beforeAll(async ({ baseURL }) => {
    console.log("BASE_URL =", baseURL);
});

test.afterEach(async ({ page }, testInfo) => {

    // Access ptoject name 
    const projectName = testInfo.project.name;

    // Extract short identifiers (e.g., SU-0001, SI-0001)
    const shortIdMatch = testInfo.title.match(/^\b([A-Z]{2}-\d{4})\b/);
    const shortId = shortIdMatch ? shortIdMatch[1] : testInfo.title.split('(')[0].trim().replace(/[\s-]/g, '_');

    // Sanitize the test title and project name
    const sanitizedProjectName = projectName.replace(/[\s-]/g, '_').replace(/[^\w]/g, '');

    // Construct the screenshot path
    const screenshotPath = `.screenshots/${sanitizedProjectName}_${shortId}.png`;

    // Capture screenshot
    await page.screenshot({ path: screenshotPath });

    // Attach screenshot to testInfo
    testInfo.attach('screenshot', {
        path: screenshotPath,
        contentType: `image/png`,
    })
})


export const expect = test.expect;