
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = './app/components/olist-input/olist-input.css';

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
                <input class="input-item " type="${this.getAttribute("type")}" ${this.placeholder}">
            </div>
        `;
        this.element = this.root.querySelector("input");
        this.root.appendChild(style);
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

}

customElements.define("olist-input", OlistInputComponent);