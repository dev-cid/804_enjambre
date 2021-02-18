import {LitElement, html, css} from 'lit-element'

export class BlockQuestion extends LitElement {

    static get properties(){
        return {
            titleQuestion: {type:String},
            question: {type:String},
            titleColor: {type:String}
        }
    }

    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }
            section {
                max-width: 730px;
                width: 100%;
                margin: 40px auto 15px;
                text-align: center;
            }
            @media(min-width: 1024px) {
                section {
                    max-width: 900px;
                }
            }
            header {
                display: inline-block;
                padding: 0 30px;
                line-height: 32px;
                font-size: 28px;
                letter-spacing: 2px;
                position: relative;
            }
            @media(min-width: 768px) {
                header {
                    padding: 0 40px;
                }
            }            
            @media(min-width: 1024px) {
                header {
                    padding: 0 70px;
                    line-height: 34px;
                    font-size: 32px;
                }
            }
            header span {
                position: absolute;
                top: 50%;
                transform: translateY(-51%);
                width: 30px;
                height: 25px;                
                display: inline-block;
            }
            @media(min-width: 768px) {
                header span {
                    width: 35px;
                    height: 26px;
                }
            }            
            @media(min-width: 1024px) {
                header span {
                    width: 45px;
                    height: 36px;
                }
            }
            .icon-left {
                left: 0;
            }
            .icon-right {
                right: 0;
            }
            .icon-header::before {
                position: absolute;
                content: "";
                width: 0; 
                height: 0; 
            }
            .icon-left::before {
                left: 0;
                border-top: 13px solid transparent;
                border-bottom: 13px solid transparent;
                border-left: 6px solid #fff;     
            }
            .icon-right::before {
                right: 0;
                border-top: 13px solid transparent;
                border-bottom: 13px solid transparent; 
                border-right: 6px solid #fff;                                             
            }
            @media(min-width: 1024px) {
                .icon-right::before { 
                    border-top: 18px solid transparent;
                    border-bottom: 18px solid transparent; 
                    border-right: 6px solid #fff; 
                }
                .icon-left::before {
                    border-top: 18px solid transparent;
                    border-bottom: 18px solid transparent;
                    border-left: 6px solid #fff;     
                }
            }           
            p {
                font-style: italic;
                line-height: 25px;
                font-size: 20px;                
                color: #b3b1b2;
            }
            @media(min-width: 1024px) {
                p {
                    line-height: 30px;
                    font-size: 25px;                
                }                
            }
            .icons-questions-group {
                margin: 0;
                list-style-type: none;
                width: 100%;
                display: inline-block;
                text-align: center;
            }
            .icon-question {
                width: 21px;
                height: 24px;
                display: inline-block;
                vertical-align: middle;
                margin: 0 10px;
                background-image: url(../../assets/icon-question.png);
            }
            `;
    }

    render() {
        return html`
            <section>
                <header style="color: ${this.titleColor}"><span style="background-color: ${this.titleColor}" class="icon-header icon-left"></span> ${this.titleQuestion} <span style="background-color: ${this.titleColor}" class="icon-header icon-right"></span></header>
                <p>${this.question}</p>
                <ul class="icons-questions-group">
                    <li class="icon-question"></li>
                    <li class="icon-question"></li>
                    <li class="icon-question"></li>
                    <li class="icon-question"></li>
                    <li class="icon-question"></li>
                </ul>
            </section>
            `
    }

}

customElements.define("block-question", BlockQuestion)