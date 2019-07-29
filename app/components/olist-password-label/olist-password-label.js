import styles from "./olist-password-label.css";

class OlistPasswordLabelComponent extends HTMLElement {

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
        this.root.innerHTML = `
            <style>${styles.toString()}</style>
            <div class="password-label-wrapper">
                <label class="password-label">${this.getAttribute("label")}</label>
            </div>
        `;
        this.element = this.root.querySelector("label");

        this.addEventListener('valid', (event) => {
            if (event.detail.valid)
                this.classValidationManager('valid');
            else
                this.classValidationManager('invalid');
        });
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

customElements.define("olist-password-label", OlistPasswordLabelComponent);