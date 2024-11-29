import testData from '../testData/testData.json';
import { Config } from './testDataTypes';
import { ENV } from '../envLoader';


type Environment = 'test' | 'prod';
type EnvData = Config[Environment];

// export class TestDataLoader {
//   private static getEnvData(): EnvData {
//     const env = (process.env.ENV as Environment) || 'prod';
//     if (!env) {
//       throw new Error('Environment variable ENV is not defined.');
//     }
//     const data = testData[env];
//     if (!data) {
//       throw new Error(`Test data for environment "${env}" is not defined.`);
//     }
//     return data;
//   }

export class TestDataLoader {
  private static getEnvData(): EnvData {
    const data = testData[ENV];
    if (!data) {
      throw new Error(`Test data for environment "${ENV}" is not defined.`);
    }
    return data;
  }


  static getValidUser() {
    return this.getEnvData().VALID;
  }

  static getInvalidUser() {
    return this.getEnvData().INVALID;
  }

  static getCompanyPrefix() {
    return this.getEnvData().COMPANYPREFIX;
  }

  static getAppUrl() {
    return this.getEnvData().BASE_URL; // Corrected to match BASE_URL in testData.json
  }

  static getExistingCompany() {
    return this.getEnvData().EXISTINGCOMPANY;
  }

  static getStreetAddress()  {
    return this.getEnvData().STREETADDRESS;
  }

  static getZipCode()  {
    return this.getEnvData().ZIPCODE;
  }

  static getCity() {
    return this.getEnvData().CITY;
  }

  static getSecondaryAddress() {
    return this.getEnvData().SECONDARYADDRESS;
  }

  static getTelephone() {
    return this.getEnvData().TELEPHONE;
  }
}
