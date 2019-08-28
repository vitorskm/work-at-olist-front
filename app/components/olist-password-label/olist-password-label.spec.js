import { expect } from 'chai';
import OlistPasswordLabelComponent from './olist-password-label';
import { searchElementNode } from '../../js/mockFunctions';

describe('Test [OlistPasswordLabelComponent]', () => {
    let passwordLabel;

    before(() => {
        passwordLabel = new OlistPasswordLabelComponent();
    });

    it ('should be a valid label using CustomEvent', () => {
        const event = new CustomEvent("valid", {
            detail: {
                valid: true
            }
        });
        passwordLabel.dispatchEvent(event);
        const classValid = searchElementNode(passwordLabel, 3, 1).getAttribute('class');
        expect(classValid).to.be.eq('password-label valid');
    });

    it ('should be an invalid label using CustomEvent', () => {
        const event = new CustomEvent("valid", {
            detail: {
                valid: false
            }
        });
        passwordLabel.dispatchEvent(event);
        const classValid = searchElementNode(passwordLabel, 3, 1).getAttribute('class');
        expect(classValid).to.be.eq('password-label invalid');
    });

});