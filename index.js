import "./app/components/olist-input/olist-input.js";
import "./app/components/olist-password-label/olist-password-label.js";
import "./app/components/olist-validation-steps/olist-validation-steps.js";
import "./app/components/olist-button/olist-button.js";

// Load elements references as constants
const olistInputs = document.getElementsByTagName("olist-input");
const olistButton = document.getElementsByTagName("olist-button")[0];
const olistInputFirstPassword = olistInputs[2];
const olistInputRepeatPassword = olistInputs[3];

// Set "Criar Conta" button as disabled
olistButton.disabled = true;

// Add event lister to watch all inputs
for (let i = 0; i < olistInputs.length; i++) {
    olistInputs[i].addEventListener("input", checkAllFormIsValid);
}

/**
 * @description Checks all input elements validation, if it's valid sets button as enabled
 * @example checkAllFormIsValid()
 */
function checkAllFormIsValid() {
    for (let i = 0; i < olistInputs.length; i++) {
        if (!olistInputs[i].isValid) return false;
    }
    olistButton.disabled = false;
}

// Add event listener in case of that button was clicked and show success notification
olistButton.addEventListener("button-clicked", () => {
    const formElement = document.getElementsByClassName("form-elements")[0];
    formElement.classList.add("hidden");

    const notificationElement = document.getElementsByClassName("success-notification")[0];
    notificationElement.classList.remove("hidden");
});

// Add a listener to password input to handle all others components like labels and steps validations
olistInputFirstPassword.addEventListener("input", () => {
    const passwordValidation = olistInputFirstPassword.passwordValidation;
    olistInputRepeatPassword.repeatPasswordValue = olistInputFirstPassword.value;
    if (olistInputRepeatPassword.value)
        olistInputRepeatPassword.validationInputEvent();
    passwordLabelsValidation(passwordValidation);
    passwordStepsValidation(passwordValidation);
});

/**
 * @description Function that comunicates with validation steps element
 * @example passwordStepsValidation(passwordValidation);
 * @param {{sixChar: boolean, oneUppercase: boolean, oneNumber: boolean}} passwordValidation
 */
function passwordStepsValidation(passwordValidation) {
    let validSteps = 0;
    Object.keys(passwordValidation).forEach((key) => {
        if (passwordValidation[key]) validSteps = validSteps + 1;
    });

    const validationSteps = document.querySelector("olist-validation-steps");
    const event = new CustomEvent("valid-steps", {
        detail: {
            validNumber: validSteps
        }
    });
    validationSteps.dispatchEvent(event);
};

/**
 * @description Function that comunicates with validation labels element
 * @example passwordLabelsValidation(passwordValidation);
 * @param {{sixChar: boolean, oneUppercase: boolean, oneNumber: boolean}} passwordValidation
 */
function passwordLabelsValidation(passwordValidation) {
    const elementsId = ["sixChar", "oneUppercase", "oneNumber"];
    // pass to the element the validation value
    elementsId.forEach(element => {
        const event = new CustomEvent("valid", {
            detail: {
                valid: passwordValidation[element]
            }
        });
        document.getElementById(element).dispatchEvent(event);
    });
};