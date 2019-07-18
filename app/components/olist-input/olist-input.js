
var componetStyle = document.createElement('link');
componetStyle.rel = 'stylesheet';
componetStyle.type = 'text/css';
componetStyle.href = './app/components/olist-input/olist-input.css';

class OlistInputComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.olistOnInit();
    }

    olistOnInit() {
        this.placeholder = this.getAttribute("placeholder") ? `placeholder="${this.getAttribute("placeholder")}"` : "";
        this.isValid = false;
        this.passwordValidation = {
            sixChar: false,
            oneUppercase: false,
            oneNumber: false
        };
        this.root.innerHTML = `
            <div class="olist-input-wrapper">
                <label class="input-label">${this.getAttribute("label")}</label>
                <input class="input-item" type="${this.getAttribute("type")}" ${this.placeholder}">
            </div>
        `;
        const style = componetStyle.cloneNode(true);
        this.root.append(style);
        this.element = this.root.querySelector("input");

        this.element.addEventListener('input', () => {
            this.isValid = this.textValidation(this.type, this.value);
            if (this.isValid)
                this.classValidationManager("valid");
            else
                this.classValidationManager("invalid");
        });
    }

    get value() {
        return this.root.querySelector("input").value;
    }

    set value(inputValue) {
        return this.root.querySelector("input").value = inputValue;
    }

    get type() {
        return this.getAttribute("type");
    }

    passwordValidation(){
        return {
            sixChar: false,
            oneUppercase: false,
            oneNumber: false
        }
    }

    textValidation(type) {
        const validationFunctions = {
            email: this.emailInputValidation,
            name: this.nameInputValidation,
            password: this.passwordInputValidation
        }
        // At this moment the methods lost the main reference, so I pass the context to them
        return validationFunctions[type](this);
    }

    emailInputValidation(ctx) {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        ctx.value = ctx.value.toLowerCase();
        return emailRegex.test(String(ctx.value));
    }

    nameInputValidation(ctx) {
        var nameRegex = /^([a-zA-z]+([ '-]([a-zA-Z]{3,})+){1,})$/;
        return nameRegex.test(String(ctx.value));
    }

    passwordInputValidation(ctx) {
        var sixCharRegex = /(.){6}/gm;
        ctx.passwordValidation.sixChar = sixCharRegex.test(String(ctx.value));

        var oneUppercaseRegex = /([A-Z])/gm;
        ctx.passwordValidation.oneUppercase = oneUppercaseRegex.test(String(ctx.value));

        var oneNumberRegex = /(\d)/gm;
        ctx.passwordValidation.oneNumber = oneNumberRegex.test(String(ctx.value));

        if (ctx.passwordValidation.sixChar && ctx.passwordValidation.oneUppercase && ctx.passwordValidation.oneNumber)
            return true;

        return false;
    }

    classValidationManager(className) {
        if (className === "valid" && this.element.classList.contains('invalid'))
           this.element.classList.remove('invalid');

        if (className === "invalid" && this.element.classList.contains('valid'))
            this.element.classList.remove('valid');

        return this.element.classList.add(className);
    }

}

customElements.define("olist-input", OlistInputComponent);