import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { RootHeader} from '../../UI/RootHeader/RootHeader'
import{Block} from '../../UI/Blocks/Blocks'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


const ProfileItem = (item)=>{
    return html`
         <li>${unsafeHTML(item)}</li>
   `
}

export class Profile extends LitElement{
    
    static get properties(){
      return{
        title: {type: String},
        color: {type: String},
        info:{type: Array}
      }
    }

    firstUpdated(){
      
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

       article{
         width:70%;
         margin: 0 auto;
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

       .teacher-info-cont{
        height: 370px;
        overflow: overlay;
        margin: -2rem auto;
       }

       @media(max-width:500px){
            article{
            width:90%;
            margin: 0 auto;
          }
       }
        </style>
          <div>
              <root-header
                  titlemodule="${this.title}"
                  withBack="true"
                  color="${this.color}"
                  isShort=${true}               
              ></root-header>

             <section class="teacher-info-cont">
                <block-element
                 title="INFORMACIÓN"
                 light="${this.color}"
                 titlesize="1.1rem"
                >
                <article>
                  <ul>
                    ${
                      this.info.map(item =>{
                        return html`
                        ${ProfileItem(item)}
                        `
                      })
                    }
                  </ul>
                </article>
                </block-element>
             </section>
          </div>
        `
    }
}

customElements.define('profile-element', Profile)