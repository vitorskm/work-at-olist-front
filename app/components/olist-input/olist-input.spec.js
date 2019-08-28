import { expect } from 'chai';
import faker from 'faker/locale/pt_BR';
import OlistInputComponent from './olist-input';

describe('Test [OlistInputComponent]', () => {
    let input;

    before(() => {
        input = new OlistInputComponent();
    });

    describe("Checks email input value", () => {
        before(() => {
            (input).setAttribute("type", "email");
            input.olistOnInit();
        });

        it ('should be a valid email value', () => {
            input.value = faker.internet.email();
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(true);
        });

        it ('should be an invalid email value', () => {
            input.value = faker.internet.userName + "$email.com"
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);
        });
    });

    describe("Checks name input value", () => {
        before(() => {
            (input).setAttribute("type", "name");
            input.olistOnInit();
        });

        it ('should be a valid name value', () => {
            input.value = faker.name.firstName() + " " + faker.name.lastName();
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(true);
        });

        it ('should be an invalid name value', () => {
            input.value = faker.name.prefix() + " " + faker.name.firstName() + " " + faker.name.lastName();
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);
        });
    });

    describe("Checks password input value", () => {
        before(() => {
            (input).setAttribute("type", "password");
            input.olistOnInit();
        });

        it ('should be a valid password value', () => {
            input.value = faker.internet.password(10, false, /^[a-zA-Z]$/) + Math.floor(Math.random() * 1000) + 0;
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(true);
        });

        it ('should be an invalid password value', () => {
            input.value = faker.internet.password(5, false, /^[.]$/);
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);

            input.value = faker.internet.password(6, false, /^[a-z]$/) + Math.floor(Math.random() * 10) + 0;
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);

            input.value = faker.internet.password(10, false, /^[a-zA-Z]$/);
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);
        });
    });

    describe("Checks repeat password input value", () => {
        let passwrdValue;
        before(() => {
            (input).setAttribute("type", "repeatPassword");
            input.olistOnInit();
        });

        it ('should be a valid repeat password value', () => {
            passwrdValue = faker.internet.password(10, false, /^[a-zA-Z]$/) + Math.floor(Math.random() * 1000) + 0;
            input.value = passwrdValue;
            input.repeatPasswordValue = passwrdValue;
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(true);
        });

        it ('should be an invalid repeat password value', () => {
            passwrdValue = faker.internet.password(5, false, /^[.]$/);
            input.value = passwrdValue;
            input.repeatPasswordValue = passwrdValue;
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);

            passwrdValue = faker.internet.password(10, false, /^[a-zA-Z]$/) + Math.floor(Math.random() * 1000) + 0;
            input.value = passwrdValue;
            input.repeatPasswordValue = passwrdValue + ".";
            input.validationInputEvent();
            expect(input.isValid).to.be.eq(false);
        });

    });

});