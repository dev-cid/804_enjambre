import {LitElement, html, css} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

class IconEvent extends Event{
    constructor(type, modalType, info){
        super(type)
    }
}

export class IconsImage extends LitElement{
    
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
            left:{type:Number},
            size:{type:String}
        }
    }

    static get styles(){
         return css`
            article{                
                position:absolute;
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
                width: 200px;
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
                position: absolute;                
              }
              .icon-cont p{
                width: 20px;
                height: 20px;
                line-height: 4px;
              }

              @media (max-width: 1024px) {
                article img{                            
                    width: 150px; 
                }
              
          </style>
          <article  title="${_label}" style="animation-delay:${this.delay};top:${this.top}%;left:${this.left}%;">
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
                            ${
                                this.icon ? html`<img style="${this.size == 'big' ? 'width: 320px;':'width: 150px;'}" src="${this.icon}">`: html `<p></p>`
                            }
                        </div>                       
                    </div>
                 `
                 : html`
                 <a href="${this.link}" >
                    <div class="icon-cont">
                            ${
                                this.icon ? html`<img style="${this.size == 'big' ? 'width: 320px;':'width: 150px;'}" src="${this.icon}">`: html `<p></p>`
                            }
                    </div>                    
                 </a>
               `
             }
          </article>
        `
    }
}
customElements.define('icon-image', IconsImage)