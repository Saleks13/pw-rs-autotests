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

export type EnvironmentData = {
  COMPANYPREFIX: string;
  BASE_URL: string;
  EXISTINGCOMPANY: string;
  VALID: ValidUser;
  INVALID: InvalidUser;
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
