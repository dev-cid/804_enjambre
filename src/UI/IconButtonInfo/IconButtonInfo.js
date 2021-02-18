import {LitElement, html, css} from 'lit-element'

export class IconButtonInfo extends LitElement {

    static get properties(){
        return {
            label: {type:String},
            icon: {type:String},
            link: {type:String},
            buttonColor: {type:String},
            lineSpace: {type:Boolean}
        }
    }

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }
            .iconButtonInfo {
                width: fit-content;                
                min-height: 45px;
                display: flex;
                align-items: center;
                margin-top: 15px;
                margin-bottom: 15px;
                position: relative;
                padding: 10px 10px 10px 45px;
                border-radius: 5px;
                font-weight: 500;
                line-height: 24px;
                font-size: 20px;                
                color: #fff;
                text-decoration: none;
            }
            @media(min-width: 1024px) {
                .iconButtonInfo {
                    padding: 10px 10px 10px 60px;
                    min-height: 55px;
                    line-height: 28px;
                    font-size: 26px;                    
                }
            }
            .iconButtonInfo:focus {
                outline: none;
            }
            .iconButtonInfo__icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                width: 30px;
                height: 30px;
            }
            @media(min-width: 1024px) {
                .iconButtonInfo__icon {
                    width: 40px;
                    height: 40px;                    
                }
            }
            .iconButtonInfo__icon img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center;
            }
            @media(min-width: 568px) {
                .iconButtonInfo__space:not(span) {
                    margin-right: 50px;
                }
            }
            span.iconButtonInfo__space {
                width: 1px;
                height: 45px;
                position: absolute;
                right: -25px;
            }
            @media(min-width: 1024px) {
                span.iconButtonInfo__space {
                    height: 55px;
                }
            }
            @media(max-width: 567px) {
                span.iconButtonInfo__space {
                    display: none!important;
                }
            }
            `;
    }

    render() {
        return html`
                <a href="${this.link}" class="iconButtonInfo ${this.lineSpace ? "iconButtonInfo__space" :null}" title="${this.label}" style="background-color:${this.buttonColor}">
                    <span class="iconButtonInfo__icon"><img src="${this.icon}"></span>${this.label}
                    ${this.lineSpace ? html `
                        <span class="iconButtonInfo__space" style="background-color:${this.buttonColor}"></span>
                    `:null}
                </a>            
            `
    }

}

customElements.define("icon-button-info", IconButtonInfo)