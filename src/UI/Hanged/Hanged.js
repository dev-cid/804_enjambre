import {LitElement, html, css} from 'lit-element'

export class buttonsGroup extends LitElement {

    static get properties(){
        return {
            intro: {type:String},
            justifyContent: {type: String}
        }
    }

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }
            .buttons-group,
            .buttons-group__intro {
                max-width: 730px;
                width: 100%;
            }
            @media(min-width: 1024px) {
                .buttons-group,
                .buttons-group__intro {
                    max-width: 1000px;
                }
            }
            .buttons-group {
                display: flex;
                flex-wrap: wrap;            
                margin: 25px auto;
            }
            @media(max-width: 767px) {
                .buttons-group {
                    justify-content: center!important;
                }
            }
            .buttons-group__intro {
                text-align: center;
                padding-bottom: 10px;
                margin: 60px auto 0;
                line-height: 22px;
                font-size: 20px;
                color: #9e9e9e;
            }
            `;
    }

    render() {
        return html`
            ${ this.intro ? html `
                <p class="buttons-group__intro">${this.intro}</p>
            `:null}
            <section class="buttons-group" style="justify-content: ${this.justifyContent}">
                <slot name="buttons"></slot>
            </section>
            `
    }

}

customElements.define("hanged-section", buttonsGroup)