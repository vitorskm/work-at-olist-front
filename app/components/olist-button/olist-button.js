const componetStyle = document.createElement('link');
componetStyle.rel = 'stylesheet';
componetStyle.type = 'text/css';
componetStyle.href = './app/components/olist-button/olist-button.css';

class OlistButtonComponent extends HTMLElement {

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
        this.loadingButton = `
            <svg id="dots" width="70px" height="25px" viewBox="0 0 132 58">
                <g id="dots" fill="#ffffff">
                    <circle id="dot1" cx="25" cy="30" r="13"></circle>
                    <circle id="dot2" cx="65" cy="30" r="13"></circle>
                    <circle id="dot3" cx="105" cy="30" r="13"></circle>
                </g>
            </svg>
        `;

        this.root.innerHTML = `
            <div class="olist-button-wrapper">
                <button class="button">${this.getAttribute("label")}</button>
            </div>
        `;
        const style = componetStyle.cloneNode(true);
        this.root.append(style);

        this.element = this.root.querySelector("button");

        this.element.addEventListener("click", (event) => {
            this.clickButton();
        });
    }

    set disabled(value) {
        this.element.disabled = value;
    }

    get disabled() {
        return this.element.disabled;
    }

    /**
     * @description ClickButton is called when the button element is clicked
     * @example this.clickButton();
     */
    clickButton() {
        this.loading(true);
        setTimeout(() => {
            const event = new CustomEvent("button-clicked", {
                detail: {
                    click: true
                }
            });
            this.dispatchEvent(event);
        }, 3000)
    }

    /**
     * @description Change button label by loading status
     * @example this.loading(true);
     * @param {boolean} value
     */
    loading(value) {
        if (value) {
            this.element.innerHTML = this.loadingButton;
        } else {
            this.getAttribute("label");
        }
    }

}

customElements.define("olist-button", OlistButtonComponent);