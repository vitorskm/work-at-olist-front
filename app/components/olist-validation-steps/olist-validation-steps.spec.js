import { expect } from 'chai';
import OlistValidationStepsComponent from './olist-validation-steps';
import { searchNodeValidationSteps, searchLastValidationStepElement } from '../../js/mockFunctions';

describe('Test [OlistValidationStepsComponent]', () => {
    let validationSteps;
    let stepsNumber;

    before(() => {
        validationSteps = new OlistValidationStepsComponent();
    });

    describe('Checks steps number validations', () => {
        before(() => {
            stepsNumber = Math.floor(Math.random() * 10) + 1;
            (validationSteps).setAttribute("steps", stepsNumber);
            validationSteps.olistOnInit();
        });

        it ('should create N validations steps as well', () => {
            const elements = searchNodeValidationSteps(validationSteps);
            expect(elements.length).to.be.eq(stepsNumber);
        });
    });

    describe('Checks color validation', () => {
        before(() => {
            stepsNumber = Math.floor(Math.random() * 3) + 1;
            (validationSteps).setAttribute("steps", stepsNumber);
            validationSteps.olistOnInit();
        });

        it ('should have a valid background color', () => {
            const event = new CustomEvent("valid-steps", {
                detail: {
                    validNumber: stepsNumber
                }
            });
            validationSteps.dispatchEvent(event);
            const element = searchLastValidationStepElement(validationSteps);
            const elementColor = element.getAttribute('style')
            expect(elementColor).to.be.eq(`background: ${validationSteps.stepColors[stepsNumber - 1].color}`);
        });
    });

});