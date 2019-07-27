const componetStyle = document.createElement('link');
componetStyle.rel = 'stylesheet';
componetStyle.type = 'text/css';
componetStyle.href = './app/components/olist-validation-steps/olist-validation-steps.css';

class OlistValidationStepsComponent extends HTMLElement {

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
        // Get number of validation steps
        this.stepsNumber = Number(this.getAttribute("steps")) - 1;

        /**
         * # StepColors define what color should be for each validation step
         * # This constant must be changed according steps validations number
         */
        this.stepColors = [{
                "color": "#F79682",
            },
            {
                "color": "#F7BC1C",
            },
            {
                "color": "#1FE6A8",
            }
        ];

        this.root.innerHTML = `
            <div id="validation-steps-wrapper">
            </div>
        `;
        const style = componetStyle.cloneNode(true);
        this.root.append(style);

        // insert N elements by attributes value
        this.includeStepsValidation();

        this.addEventListener('valid-steps', (event) => {
            // Get all elements child from steps wrapper
            const stepList = this.root.getElementById('validation-steps-wrapper').children;

            // Clear all validation steps by default color
            for (let i = 0; i <= this.stepsNumber; i++) {
                stepList[i].setAttribute('style', `background: #EAEAF4`);
            }

            // Make an insertion to valid any number of steps
            const validSteps = Number(event.detail.validNumber) - 1;
            if (validSteps || validSteps === 0) {
                for (let i = 0; i <= validSteps; i++) {
                    stepList[i].setAttribute('style', `background: ${this.stepColors[validSteps].color}`);
                }
            }
        });
    }

    /**
     * @description Insert step elemets by atribbute "steps" value
     * @example this.olistOnInit();
     */
    includeStepsValidation() {
        if (this.stepsNumber > 0) {
            for (let i = 0; i <= this.stepsNumber; i++) {
                const node = document.createElement("A");
                node.className += "step-shape";
                this.root.getElementById("validation-steps-wrapper").appendChild(node);
            }
        }
    }

}

customElements.define("olist-validation-steps", OlistValidationStepsComponent);