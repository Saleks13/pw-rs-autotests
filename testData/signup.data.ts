import { Builder } from "builder-pattern";
import { fa, faker } from '@faker-js/faker';
import { LegalForm } from "../config-reader/legalForm";
import { Localizations } from "../config-reader/localizations";
import { ConfigReader } from "../config-reader/config.reader";


export class SignupBuilder {

    _firstName: string;
    _lastName: string; 
    _emailAddress: string;
    _password: string; 
    _companyName: string; // aka organization name
    _street: string; 
    _additionalAddress: string; 
    _zipCode: string; 
    _city: string; 
    _phone: string;
    _finEndDate: string; 
    _finEndMonth: string; 
    _vatId: string;

    public static getRandomSignupData(): SignupBuilder {

        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Generates yyyymmddhhmmss

        return Builder<SignupBuilder>()
        .firstName(faker.person.firstName())
        .lastName(faker.person.lastName())
        .emailAddress(faker.internet.email())
        .password(faker.internet.password())
        .companyName(ConfigReader.COMPANYPREFIX + timestamp)
        .street(faker.location.streetAddress())
        .additionalAddress("Unit 13")
        .zipCode(faker.location.zipCode())
        .city(faker.location.city())
        .phone(faker.phone.number())
        .vatId('000000000')
        .build();
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get companyName(): string {
        return this._companyName;
    }

    set companyName(value: string) {
        this._companyName = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get additionalAddress(): string {
        return this._additionalAddress;
    }

    set additionalAddress(value: string) {
        this._additionalAddress = value;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    set zipCode(value: string) {
        this._zipCode = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get finEndDate(): string {
        return this._finEndDate;
    }

    set finEndDate(value: string) {
        this._finEndDate = value;
    }

    get finEndMonth(): string {
        return this._finEndMonth;
    }

    set finEndMonth(value: string) {
        this._finEndMonth = value;
    }

    get vatId(): string {
        return this._vatId;
    }

    set vatId(value: string) {
        this._vatId = value;
    }

    toString(): string {
        return `SignupBuilder { firstName: ${this.firstName}, lastName: ${this.lastName}, emailAddress: ${this.emailAddress}, password: ${this.password}, companyName: ${this.companyName}, street: ${this.street}, additionalAddress: ${this.additionalAddress}, zipCode: ${this.zipCode}, city: ${this.city}, phone: ${this.phone}, vatId: ${this.vatId} }`;
    }


}