import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


export class IconsMap extends LitElement{
    
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
            delay:{type:Number},
            download: {type:Boolean},
            top:{type:Number},
            left:{type:Number}
        }
    }

    firstUpdated(){        
       
    }

    constructor(){
        super()
       
    }

    static get styles(){
        return css`
           article{                
               position:absolute;
               animation-name: fadeUp;
               animation-duration: 1s;
               animation-fill-mode: both;
               cursor:pointer;     
           }

          
           article:hover .icon-cont{
               box-shadow: rgb(5 0 0 / 60%) 0px 4px 9px -3px;
               border-radius: 50%;                
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

           .icon-cont{                            
               position: absolute;                
             }
   
             .icon-cont p{
               line-height: 4px;
             }
   
             article{
               text-align: center;
               padding: 2rem;
             }
   
           @media (max-width: 900px) {
               article img{                            
                   width: 180px !important; 
               }
      
           }

       `
   }
 
     
    render(){

        return html`
        <article style="animation-delay:${this.delay};top:${this.top}%;left:${this.left}%;">
           <div>
         
             ${
                 !this.link ? html`
                    <div @click="${this.callEvent}">
                        <div class="icon-cont">
                            ${
                                this.icon ? html`<img src="${this.icon}">`: html `<p></p>`
                            }
                        </div>                       
                    </div>
                 `
                 : html`
                 <a href="${this.link}" >
                    <div class="icon-cont">
                            ${
                                this.icon ? html`<img src="${this.icon}">`: html `<p></p>`
                            }
                    </div>                    
                 </a>
               `
             }
             ${
                this.dots ? html `
                     <div class="dots">
                     <div></div>
                     <div></div>
                     <div></div>
                     </div>
                 `:null
            }
          </article>
        `
    }
}
customElements.define('icon-map', IconsMap)