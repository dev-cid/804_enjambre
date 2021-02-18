import {LitElement, html, css} from 'lit-element'

const mainColor = css`blue`;

export class IconButton extends LitElement {

    static get properties(){
        return {
            label: {type:String},
            icon: {type:String},
            link: {type:String},
            buttonColor: {type:String}
        }
    }

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }
            .iconButton {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                text-decoration: none;
                margin-top: 15px;
                margin-bottom: 15px;
                min-height: 70px;
                width: 300px;                
            }
            @media(min-width: 768px) {
              .iconButton {
                min-height: 90px;
                width: 350px;   
              }  
            }
            @media(min-width: 1024px) {
                .iconButton {
                    min-height: 120px;
                    width: 450px;
                }
            }                        
            .iconButton:focus {
                outline: none;
            }            
            .iconButton::after {
                position: absolute;
                width: 0;
                height: 0;
                content: "";
                display: inline-block;
                right: 0;
                border-top: 35px solid transparent;
                border-bottom: 35px solid transparent; 
                border-right: 20px solid #fff;             
            }
            @media(min-width: 768px) {
                .iconButton::after {
                    border-top: 45px solid transparent;
                    border-bottom: 45px solid transparent; 
                    border-right: 20px solid #fff;   
                }
            }                        
            @media(min-width: 1024px) {
                .iconButton::after {
                    border-top: 60px solid transparent;
                    border-bottom: 60px solid transparent;                              
                }
            }              
            .iconButton__icon {
                width: 80px;
                height: auto;
                padding: 10px;
                display:flex;
                flex: 0 0 auto;
                justify-content:center;
                align-items:center;
                margin-right: 10px;
                position: relative;
            }
           
            
            @media(min-width: 1024px) {
                .iconButton__icon {
                    width: 120px;
                }
            }
            .iconButton__line {
                width: 10px;
                height: 4px;
                content: "";
                display: inline-block;
                position: absolute;
                bottom: 45%;
                right: -10px;
            }
            .iconButton__icon img {
                width: 85%;
                height: 85%;
               
            }
            .iconButton__text {
                flex: 0 0 100%;
                flex-basis: 0;
                flex-grow: 1;
                display: flex;
                align-items: center;
                padding: 2% 6%;
                line-height: 22px;
                font-size: 16px;                
                color: #fff;                
            }
            @media(min-width: 768px) {
                .iconButton__text {
                    line-height: 24px;
                    font-size: 20px;
                }
            }             
            @media(min-width: 1024px) {
                .iconButton__text {
                    line-height: 30px;
                    font-size: 26px;
                }
            }                     
            `;
    }

    render() {
        return html`
            <a href="${this.link}" class="iconButton" title="${this.label}">
                <span class="iconButton__icon" style="background-color:${this.buttonColor}"><img src="${this.icon}"><span class="iconButton__line" style="background-color:${this.buttonColor}"></span></span>
                <span class="iconButton__text" style="background-color:${this.buttonColor}">${this.label}</span>
            </a>
            `
    }

}

customElements.define("icon-button", IconButton)