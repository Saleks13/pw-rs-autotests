import { faker } from "@faker-js/faker";
import { TestDataLoader } from "../testData/testDataLoader";
import { LegalForm } from "../testData/legalForm";
import { VatType } from "../testData/vatType";

class Utils {
  static getCurrentDateInFormat(): string {
    const now: Date = new Date();

    const year: string = now.getFullYear().toString();
    const month: string = (now.getMonth() + 1).toString().padStart(2, '0');
    const day: string = now.getDate().toString().padStart(2, '0');
    const hours: string = now.getHours().toString().padStart(2, '0');
    const minutes: string = now.getMinutes().toString().padStart(2, '0');
    const seconds: string = now.getSeconds().toString().padStart(2, '0');
    const milliseconds: string = now.getMilliseconds().toString().padStart(3, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  static getUniqueCompanyName(): string {
    // Assuming getCompanyPrefix is a static method or property
    const companyPrefix: string = TestDataLoader.getCompanyPrefix();
    const currentDate: string = this.getCurrentDateInFormat();

    const uniqueCompanyName: string = companyPrefix + currentDate;
    return uniqueCompanyName;
  }

  static newRandomUser() {
    const validUser = TestDataLoader.getValidUser();
    const reg = TestDataLoader.getRegistrationDefaults();
    return {
      email: faker.internet.email(),
      firstName: validUser.FIRSTNAME,
      lastName: validUser.LASTNAME,
      password: validUser.PASSWORD,
      companyName: this.getUniqueCompanyName(),
      streetAddress: TestDataLoader.getStreetAddress(),
      zipCode: TestDataLoader.getZipCode(),
      legalForm: LegalForm[reg.LEGAL_FORM as keyof typeof LegalForm],
      city: TestDataLoader.getCity(),
      secondaryAddress: TestDataLoader.getSecondaryAddress(),
      telephone: TestDataLoader.getTelephone(),
      financialYearStartDay: reg.FINANCIAL_YEAR_START_DAY,
      financialYearStartMonth: reg.FINANCIAL_YEAR_START_MONTH,
      vatType: VatType[reg.VAT_TYPE as keyof typeof VatType],
      vatValue: reg.VAT_VALUE,
      phoneCode: reg.PHONE_CODE,
      phoneNumber: reg.PHONE_NUMBER
    };
  }
}

export { Utils }

