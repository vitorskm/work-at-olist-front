import styles from "./olist-input.css";
import {searchElementNode} from "../../js/mockFunctions";

export default class OlistInputComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.olistOnInit();
    }

    /**
     * @description Manages all methods that needs to be started with this element
     * @example this.olistOnInit();
     */
    olistOnInit() {
        this.placeholder = this.getAttribute("placeholder") ? `placeholder="${this.getAttribute("placeholder")}"` : "";
        this.isValid = false;
        this.repeatPasswordValue = "";
        this.passwordValidation = {
            sixChar: false,
            oneUppercase: false,
            oneNumber: false
        };
        this.root.innerHTML = `
            <style>${styles.toString()}</style>
            <div class="olist-input-wrapper">
                <label class="input-label">${this.getAttribute("label")}</label>
                <input class="input-item" type="${this.getAttribute("type") == 'repeatPassword' ? 'password' : this.getAttribute("type")}" ${this.placeholder}">
            </div>
        `;
        // Get the main element of this component
        this.element = process.env.isMock ? searchElementNode(this, 3, 3) : this.root.querySelector("input");
        // Get first element of this component
        this.firstElement = process.env.isMock ? searchElementNode(this, 3) : this.root.querySelector("DIV");

        // Injects a custom style to the element by custom attribute
        if (this.getAttribute("setStyle"))
            this.firstElement.setAttribute('style', this.getAttribute("setStyle"));

        this.element.addEventListener('input', () => {
            this.validationInputEvent();
        });
    }

    get value() {
        return this.element.value;
    }

    set value(inputValue) {
        return this.element.value = inputValue;
    }

    get type() {
        return this.getAttribute("type");
    }

    /**
     * @description Handles the input validation event
     * @example this.validationInputEvent();
     */
    validationInputEvent() {
        this.isValid = this.textValidation(this.type, this.value);
        if (this.isValid)
            this.classValidationManager("valid");
        else
            this.classValidationManager("invalid");
    }

    /**
     * @description Handles input types validations
     * @example this.textValidation(type);
     * @param {string} type
     * @enum {string} email, name, password, repeatPassword
     * @returns {Function} validationFunctions
     */
    textValidation(type) {
        const validationFunctions = {
            email: this.emailInputValidation,
            name: this.nameInputValidation,
            password: this.passwordInputValidation,
            repeatPassword: this.repeatPasswordInputValidation
        };

        // At this moment the methods lost the main reference, so I pass the context to them
        return validationFunctions[type](this);
    }

    /**
     * @description Validates email text value from input
     * @example this.emailInputValidation(type);
     * @param {this} ctx
     * @returns {boolean} regexValidationValue
     */
    emailInputValidation(ctx) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        ctx.value = ctx.value.toLowerCase();
        return emailRegex.test(String(ctx.value));
    }

    /**
     * @description Validates name text value from input
     * @example this.nameInputValidation(type);
     * @param {this} ctx
     * @returns {boolean} regexValidationValue
     */
    nameInputValidation(ctx) {
        const nameRegex = /^([a-zA-zÀ-ú]+([ '-]([a-zA-ZÀ-ú]{3,})+){1,})$/;
        return nameRegex.test(String(ctx.value));
    }

    /**
     * @description Validates password text value from input
     * @example this.passwordInputValidation(this);
     * @param {this} ctx
     * @returns {boolean} regexValidationValue
     */
    passwordInputValidation(ctx) {
        const sixCharRegex = /(.){6}/gm;
        ctx.passwordValidation.sixChar = sixCharRegex.test(String(ctx.value));

        const oneUppercaseRegex = /([A-Z])/gm;
        ctx.passwordValidation.oneUppercase = oneUppercaseRegex.test(String(ctx.value));

        const oneNumberRegex = /(\d)/gm;
        ctx.passwordValidation.oneNumber = oneNumberRegex.test(String(ctx.value));

        if (ctx.passwordValidation.sixChar && ctx.passwordValidation.oneUppercase && ctx.passwordValidation.oneNumber)
            return true;

        return false;
    }

    /**
     * @description Validate repeat password text value from input
     * @example this.repeatPasswordInputValidation(this);
     * @param {this} ctx
     * @returns {boolean} ValidationValue
     */
    repeatPasswordInputValidation(ctx) {
        if (ctx.passwordInputValidation(ctx) && ctx.repeatPasswordValue === ctx.value)
            return true;

        return false;
    }

    /**
     * @description Class manager for each validation type: valid and invalid
     * @example this.repeatPasswordInputValidation(this);
     * @param {string} className
     * @returns {Function} addClassMethod
     */
    classValidationManager(className) {
        if (className === "valid" && this.element.classList.contains('invalid'))
            this.element.classList.remove('invalid');

        if (className === "invalid" && this.element.classList.contains('valid'))
            this.element.classList.remove('valid');

        return this.element.classList.add(className);
    }

}

customElements.define("olist-input", OlistInputComponent);