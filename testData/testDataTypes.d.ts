export type ValidUser = {
  FIRSTNAME: string;
  LASTNAME: string;
  EMAIL: string;
  PASSWORD: string;
};

export type InvalidUser = {
  FIRSTNAME: string;
  LASTNAME: string;
  EMAIL: string;
  PASSWORD: string;
};

export type RegistrationDefaults = {
  LEGAL_FORM: string;
  VAT_TYPE: string;
  VAT_VALUE: string;
  PHONE_CODE: string;
  PHONE_NUMBER: string;
  FINANCIAL_YEAR_START_DAY: number;
  FINANCIAL_YEAR_START_MONTH: number;
};

export type EnvironmentData = {
  COMPANYPREFIX: string;
  EXISTINGCOMPANY: string;
  VALID: ValidUser;
  INVALID: InvalidUser;
  REGISTRATION: RegistrationDefaults;
  STREETADDRESS: string;
  ZIPCODE: string;
  CITY: string;
  SECONDARYADDRESS: string;
  TELEPHONE: string;
};

export type Config = {
  test: EnvironmentData;
  prod: EnvironmentData;
};
