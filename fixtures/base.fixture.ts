import { test as base } from "@playwright/test";
import { mkdir } from "fs/promises";

import HelloPage from "../pages/welcome/hello.page";
import OverviewGeneral from "../pages/overview/overviewGeneral.page";
import FooterPage from "../pages/page-components/footer.component";
import HeaderPage from "../pages/page-components/header.component";
import MainNavBar from "../pages/page-components/mainNavBar.component";

import { Utils } from "../utils/utils";

type SharedFixtures = {
    // pages
    overviewHello: HelloPage;
    overviewGeneral: OverviewGeneral;
    // components
    headerPage: HeaderPage;
    footerPage: FooterPage;
    // navigation
    mainNavBar: MainNavBar;

}

export const test = base.extend<SharedFixtures>({

    overviewHello: async ({ page }, use) => {
        try {
            await use(new HelloPage(page));
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
    },
    mainNavBar: async ({ page }, use) => {
        try {
            await use(new MainNavBar(page));
        } catch (error) {
            console.error("Error initializing MainNavBar:", error)
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
    const shortIdMatch = testInfo.title.match(/#?([A-Z]{2}-\d{4})/);
    const shortId = shortIdMatch ? shortIdMatch[1] : testInfo.title.split('(')[0].trim().replace(/[\s-]/g, '_');

    // Sanitize the test title and project name
    const sanitizedProjectName = projectName.replace(/[\s-]/g, '_').replace(/[^\w]/g, '');

    const currentDate = Utils.getCurrentDateInFormat();

    // Construct the screenshot path
    const screenshotPath = `.screenshots/${sanitizedProjectName}_${shortId}_${currentDate}.png`;

    await mkdir(".screenshots", { recursive: true });

    if (page.isClosed()) {
        return;
    }

    try {
        // Capture screenshot
        await page.screenshot({ path: screenshotPath });

        // Attach screenshot to testInfo
        await testInfo.attach('screenshot', {
            path: screenshotPath,
            contentType: `image/png`,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? (error.stack ?? error.message) : String(error);

        await testInfo.attach("screenshot-error", {
            body: Buffer.from(`Failed to capture screenshot.\n${errorMessage}`, "utf-8"),
            contentType: "text/plain",
        });

        console.warn(`Failed to capture screenshot for "${testInfo.title}"`, error);
    }
    //console.log(testInfo.title , " = " , screenshotPath);
})

export const expect = test.expect;
