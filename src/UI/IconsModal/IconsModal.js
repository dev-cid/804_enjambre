import {LitElement, html, css} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

class IconEvent extends Event{
    constructor(type, modalType, info){
        super(type)
    }
}

export class IconsModal extends LitElement{
    
    static get properties(){
        return {
            label:{type:String},
            labelcolor:{type:String},
            icon: {type:String},
            color:{type:String},
            link: {type:String},
            modaltype:{type:String},
            modalpath:{type:String},
            modalinfo:{type:Array},
            dots: {type:Boolean},
            delay:{type:Number}
        }
    }

    static get styles(){
         return css`
           article{
               cursor:pointer;
               margin: 1rem;
           }
            
            span{
                display:block;
                width:70%;
                margin:1rem auto;
                text-align:center;
                font-size: 1.3rem;
            }

            article img{
                display:block;
                margin:0 auto;
                max-width: 130px;
                transition: filter .4s;
            }

            a{
                text-decoration:none;
            }

            .dots{
                position:absolute;
                top:50px;
                
                left:0;
            }

            

            .dots div{
                width:4px;
                height:4px;
                margin:5px 0;
                background: #9D9D9D;
                border-radius:6px;

            }

           

            article:hover  .icon-cont{
                box-shadow: 0 4px 9px -3px rgba(0,0,0,.6)
            }

            @keyframes fadeUp{
                0%{
                    transform: translateY(50px);
                    opacity:0
                }

                100%{
                    transform: translateY(0);
                    opacity:1;
                }
            }

        `
    }

    // callEvent(){
    //     // console.log(this.modaltype)
    //     // if(this.modaltype){
    //     //     this.dispatchEvent(new IconEvent("dispatch", this.modaltype, {}))
    //     // }
    // }

    constructor(){
        super()
        console.log(this.modalinfo)
        // if(this.modaltype){
        //     this.modalinfo = JSON.parse(this.modalinfo)
        // }
    }

  
     
    render(){
        const _label = this.label.includes("Unidad") ? 
                       this.label.substring(0, this.label.lastIndexOf("<"))
                       : this.label;
        return html`
          <style>
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
                border-top: 83px solid transparent;
                border-bottom: 53px solid transparent;
                border-right: 20px solid #fff;  
            }
        }                        
        @media(min-width: 1024px) {
            .iconButton::after {
                border-top: 75px solid transparent;
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
       
           
        }
        .iconButton__text {
            height: 120px;
            flex: 0 0 100%;
            flex-basis: 0;
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding: 2% 6%;
            line-height: 22px;
            font-size: 16px;                
            color: #fff;   
            text-align: initial;             
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
              
          </style>
          <article title="${_label}" style="animation-delay:${this.delay}">        
             ${
                 !this.link ? html`
                    <div @click="${this.callEvent}">
                        <div class="iconButton" title="${this.label}">
                            <span class="iconButton__icon" style="background-color:${this.labelcolor}"><img src="${this.icon}"><span class="iconButton__line" style="background-color:${this.labelcolor}"></span></span>
                            <span class="iconButton__text" style="background-color:${this.labelcolor}">${this.label}</span>
                        </div> 
                    </div>
                 `
                 : html`
                 <a href="${this.link}" class="iconButton" title="${this.label}">
                    <span class="iconButton__icon" style="background-color:${this.labelcolor}"><img src="${this.icon}"><span class="iconButton__line" style="background-color:${this.labelcolor}"></span></span>
                    <span class="iconButton__text" style="background-color:${this.labelcolor}">${this.label}</span>
                </a>                   
                 `
             }
          </article>
        `
    }
}
customElements.define('icon-content', IconsModal)