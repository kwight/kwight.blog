class WPcomSpinner extends HTMLElement {
    constructor() {
        super();
        const spinner = this.getTemplate().content.cloneNode(true);
        this.attachShadow({ mode: 'open' }).appendChild(spinner);
    }

    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @keyframes rotate-spinner {
                    100% {
                        transform: rotate( 360deg );
                    }
                }
                .spinner {
                    display: inline-block;
                }
                .spinner__outer, .spinner__inner {
                    margin: auto;
                    box-sizing: border-box;
                    border: 0.1em solid transparent;
                    border-radius: 50%;
                    animation: 0.8s linear infinite;
                    animation-name: rotate-spinner;
                }
                .spinner__outer {
                    border-top-color: var(--color, gray);
                    width: var(--size, 40px);
                    height: var(--size, 40px);
                    font-size: var(--size, 40px);
                }
                .spinner__inner {
                    width: 100%;
                    height: 100%;
                    border-top-color: var(--color, gray);
                    border-right-color: var(--color, gray);
                    opacity: 0.5;
                }
            </style>
            <div class="spinner">
                <div class="spinner__outer">
                    <div class="spinner__inner">
                    </div>
                </div>
            </div>
        `;
        return template;
    }
}

customElements.define('wpcom-spinner', WPcomSpinner);
