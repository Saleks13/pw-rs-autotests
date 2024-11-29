import { TestDataLoader } from "./testDataLoader";

export function getCurrentDateInFormat(): string {
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

  export function getUniqueCompanyName(): string {
    // Assuming getCompanyPrefix is a static method or property
    const companyPrefix: string = TestDataLoader.getCompanyPrefix(); 
    const currentDate: string = getCurrentDateInFormat();
  
    const uniqueCompanyName: string = companyPrefix + currentDate;
    return uniqueCompanyName;
  }
  