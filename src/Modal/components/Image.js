import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { RootHeader} from '../../UI/RootHeader/RootHeader'
import{Block} from '../../UI/Blocks/Blocks'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


const ProfileItem = (item)=>{
   return html`
   <img src="${item}"/> 
   `
}

export class ImageElement extends LitElement{
    
    static get properties(){
      return{
        title: {type: String},
        color: {type: String},
        info:{type: Array}
      }
    }

   
    render(){
        return html`
        <style>
          span{
         font-weight:bold;
       }
     
       ::slotted(*){
         display:none;
       }

       img{
        width: 95%;
       }

       .container span{
        top: -42px !important;
        color: #dcdc00 !important;
        right:31px !important;
       }

       .teacher-info-cont{
        height: 380px;
        overflow-y: scroll;
       }

       article{
        background: #fe6b01;
       }

       a{
        display: flex;
        justify-content: end;
        align-items: center;
       }

       ul{
         list-style-type:none;
         margin-left:0;
         transform: translateY(-40px)
       }
       
       li{
         position:relative;
         margin-bottom:1rem;
       }
       li::before{
        content:"";
        width: 0;
        height: 0;
        display:inline-block;
        border-top: 12px solid transparent;
        border-left: 15px solid ${this.color};
        border-bottom: 12px solid transparent;
        position: absolute;
        left:-30px;
       }

       @media(max-width:500px){
            article{
            width:90%;
            margin: 0 auto;
          }
       }
        </style>
          <div>
     
             <section class="teacher-info-cont">
                <article>                 
                    ${
                      this.info.map(item =>{
                        return html`
                        ${ProfileItem(item)}
                        `
                      })
                    }
                </article>
                </block-element>
             </section>
          </div>
        `
    }
}

customElements.define('image-element', ImageElement)