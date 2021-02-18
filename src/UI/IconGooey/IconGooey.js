import {LitElement, html, css} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class IconGooey extends LitElement{
    
    static get properties(){
        return {
            label:{type:String},
            labelcolor:{type:String},
            icon: {type:String},
            color:{type:String},
            dots: {type:Boolean},
            contentImage: {type:Array}
        }
    }

    static get styles(){
         return css`
            article{
                width:100%;
                max-width:230px;
                position:relative;
                animation-name: fadeUp;
                animation-duration: 1s;
                animation-fill-mode: both;
                opacity:0;
                cursor:pointer;
                height: 11rem;
                margin: 2rem auto;
            }

            .menu-item{
                display: flex;
              }

              .menu-item p {
                visibility: hidden;
                background: #fbd91f;
                position: absolute;
                width: 200px;
                padding: 1rem;
                color: #707070;
                border-radius: 7px;
                box-shadow: 1px 1px 5px #dbdbdb;
                font-size: 15px;  
                line-height: 15px;  
                margin: 0px 7rem;
              }

              .menu-item:hover p {                
                visibility: visible;
              }

              .menu-item .element {
                visibility: hidden;
                position: absolute;
                width: 260px;
                margin: 0px 7rem;
              }

              .menu-item:hover .element {                
                visibility: visible;
              }

              .menu-item:nth-child(6) p, .menu-item:nth-child(7) p, .menu-item:nth-child(6) .element, .menu-item:nth-child(7) .element{               
                left: -23rem;          
              }

              .menu-item:nth-child(5) p, {               
                left: 4rem;          
              }
              
              .menu-item:nth-child(5) .element{
                left: 4rem; 
                top: -46px;
              }
            span{
                display:block;
                width:100%;
                margin:1rem auto;
                text-align:center;
                font-size: 1.3rem;
            }

            article img{
                display:block;
                margin:0 auto;
                width: 85%;
                transition: filter .4s;
            }

            a{
                text-decoration:none;
            }

            .menu {
                -webkit-filter: url("#shadowed-goo");
                        filter: url("#shadowed-goo");
              }
                            
              
              .menu-open {
                display: none;
              }
              
              .hamburger {
                width: 25px;
                height: 3px;
                background: white;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -12.5px;
                margin-top: -1.5px;
                -webkit-transition: -webkit-transform 200ms;
                transition: -webkit-transform 200ms;
                transition: transform 200ms;
                transition: transform 200ms, -webkit-transform 200ms;
              }
              
              .hamburger-1 {
                -webkit-transform: translate3d(0, -8px, 0);
                        transform: translate3d(0, -8px, 0);
              }
              
              .hamburger-2 {
                -webkit-transform: translate3d(0, 0, 0);
                        transform: translate3d(0, 0, 0);
              }
              
              .hamburger-3 {
                -webkit-transform: translate3d(0, 8px, 0);
                        transform: translate3d(0, 8px, 0);
              }
              
              .menu-open:checked + .menu-open-button .hamburger-1 {
                -webkit-transform: translate3d(0, 0, 0) rotate(45deg);
                        transform: translate3d(0, 0, 0) rotate(45deg);
              }
              .menu-open:checked + .menu-open-button .hamburger-2 {
                -webkit-transform: translate3d(0, 0, 0) scale(0.1, 1);
                        transform: translate3d(0, 0, 0) scale(0.1, 1);
              }
              .menu-open:checked + .menu-open-button .hamburger-3 {
                -webkit-transform: translate3d(0, 0, 0) rotate(-45deg);
                        transform: translate3d(0, 0, 0) rotate(-45deg);
              }
              
              .menu {
                width: 100%;
                max-width: 230px;
                position: relative;
                animation-name: fadeUp;
                animation-duration: 1s;
                animation-fill-mode: both;
                opacity: 0;
                cursor: pointer;
                left: 4rem;
              }

              .menu-item, .menu-open-button {                
                border-radius: 100%;
                width: 90px;
                height: 90px;
                position: absolute;
                top: 20px;
                color: white;
                text-align: center;
                line-height: 80px;
                -webkit-transform: translate3d(0, 0, 0);
                        transform: translate3d(0, 0, 0);
                -webkit-transition: -webkit-transform ease-out 200ms;
                transition: -webkit-transform ease-out 200ms;
                transition: transform ease-out 200ms;
                transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
              }
              
              
              .menu-item:nth-child(3) {
                -webkit-transition-duration: 70ms;
                        transition-duration: 70ms;
              }
              .menu-item:nth-child(4) {
                -webkit-transition-duration: 130ms;
                        transition-duration: 130ms;
              }
              .menu-item:nth-child(5) {
                -webkit-transition-duration: 190ms;
                        transition-duration: 190ms;
              }
              .menu-item:nth-child(6) {
                -webkit-transition-duration: 250ms;
                        transition-duration: 250ms;
              }
              .menu-item:nth-child(7) {
                -webkit-transition-duration: 310ms;
                        transition-duration: 310ms;
              }
              
              .menu-open-button {
                z-index: 2;
                -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                -webkit-transition-duration: 400ms;
                        transition-duration: 400ms;
                -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
                        transform: scale(1.1, 1.1) translate3d(0, 0, 0);
                cursor: pointer;
              }
              
              .menu-open-button:hover {
                -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
                        transform: scale(1.2, 1.2) translate3d(0, 0, 0);
              }
              
              .menu-open:checked + .menu-open-button {
                -webkit-transition-timing-function: linear;
                        transition-timing-function: linear;
                -webkit-transition-duration: 200ms;
                        transition-duration: 200ms;
                -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
                        transform: scale(0.8, 0.8) translate3d(0, 0, 0);
              }
              
              .menu-open:checked ~ .menu-item {
                -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
                        transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
              }
              .menu-open:checked ~ .menu-item:nth-child(3) {
                -webkit-transition-duration: 160ms;
                        transition-duration: 160ms;
                -webkit-transform: translate3d(114.42548px, 11.48084px, 0);
                        transform: translate3d(114.42548px, 11.48084px, 0);
              }
              .menu-open:checked ~ .menu-item:nth-child(4) {
                -webkit-transition-duration: 240ms;
                        transition-duration: 240ms;
                -webkit-transform: translate3d(77.18543px, 85.2491px, 0);
                        transform: translate3d(77.18543px, 85.2491px, 0);
              }
              .menu-open:checked ~ .menu-item:nth-child(5) {
                -webkit-transition-duration: 320ms;
                        transition-duration: 320ms;
                -webkit-transform: translate3d(0.09158px, 114.99996px, 0);
                        transform: translate3d(0.09158px, 114.99996px, 0);
              }
              .menu-open:checked ~ .menu-item:nth-child(6) {
                -webkit-transition-duration: 400ms;
                        transition-duration: 400ms;
                -webkit-transform: translate3d(-77.04956px, 85.37192px, 0);
                        transform: translate3d(-77.04956px, 85.37192px, 0);
              }
              .menu-open:checked ~ .menu-item:nth-child(7) {
                -webkit-transition-duration: 480ms;
                        transition-duration: 480ms;
                -webkit-transform: translate3d(-114.40705px, 11.66307px, 0);
                        transform: translate3d(-114.40705px, 11.66307px, 0);
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
    //     console.log(this.modaltype)
    //     if(this.modaltype){
    //         this.dispatchEvent(new IconEvent("dispatch", this.modaltype, {}))
    //     }
    // }

    constructor(){
        super()
        //console.log(this.modalinfo)
        // if(this.modaltype){
        //     this.modalinfo = JSON.parse(this.modalinfo)
        // }
    }

    closeModal(){
        this.modal = false;
    }

  
     
    render(){
        const _label = this.label.includes("Unidad") ? 
                       this.label.substring(0, this.label.lastIndexOf("<"))
                       : this.label;
        return html`
          <style>
              .icon-cont{
                  width:fit-content;
                  background:${this.color};
                  border-radius:50%;
                  margin:0 auto;
                  transition: box-shadow .4s;
              }

              .menu-open-button{
                background: ${this.color};
              }
            
              
          </style>
          <span style="color:${this.labelcolor}">${unsafeHTML(this.label)}</span>
          <article >
          <nav class="menu">
                <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>
                <label class="menu-open-button" for="menu-open">
                    <span class="hamburger hamburger-1"></span>
                    <span class="hamburger hamburger-2"></span>
                    <span class="hamburger hamburger-3"></span>
                </label>
                
                ${
                    this.contentImage.map((ele, _index)=>{
                       return html`
                       <div class="menu-item">                          
                            <img src="${ele[0]}"> 
                            ${unsafeHTML(ele[1])}                                       
                       </div>
                       `
                    })
                }

          </nav>
          </article>
        `
    }
}
customElements.define('icon-gooey', IconGooey)