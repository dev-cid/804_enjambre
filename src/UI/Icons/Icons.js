import {LitElement, html, css} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

class IconEvent extends Event{
    constructor(type, modalType, info){
        super(type)
    }
}

export class Icons extends LitElement{
    
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
                max-width: 80px;
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
              .icon-cont{
                  width:fit-content;
                  background:${this.color};
                  border-radius:50%;
                  margin:0 auto;
                  transition: box-shadow .4s;
              }
              
          </style>
          <article  title="${_label}" style="animation-delay:${this.delay}">
           <div>
           ${
               this.dots ? html `
                    <div class="dots">
                    <div></div>
                    <div></div>
                    <div></div>
                    </div>
                `:null
           }
             ${
                 !this.link ? html`
                    <div @click="${this.callEvent}">
                        <div class="icon-cont">
                             <img src="${this.icon}" alt="icono"/>
                        </div>
                        <span style="color:${this.labelcolor}">${unsafeHTML(this.label)}</span>
                    </div>
                 `
                 : !this.download ? html`
                 <a href="${this.link}" >
                    <div class="icon-cont">
                      <img src="${this.icon}" alt="icono"/>
                    </div>
                      <span style="color:${this.labelcolor}">${unsafeHTML(this.label)}</span>
                 </a>
               `: html`
               <a href="${this.link}" target="_blank" download>
                  <div class="icon-cont">
                    <img src="${this.icon}" alt="icono"/>
                  </div>
                    <span style="color:${this.labelcolor}">${unsafeHTML(this.label)}</span>
               </a>
             `
             }
          </article>
        `
    }
}
customElements.define('icon-element', Icons)