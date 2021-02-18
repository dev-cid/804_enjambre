import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class RootHeader extends LitElement{
  
    static get properties(){
        return{
            title:{type:String, attribute: 'titlemodule'},
            color:{type:String},
            image:{type:String},
            borderImage:{type:String},
            isShort:{type: Boolean},
            isMedium:{type: Boolean},
            isInner:{type:Boolean},
            centered:{type:Boolean},
            shape:{type:String},
            withBack:{type:String}
        }
    }

    static get styles(){
        return unsafeCSS`
          header{        
            position:relative;
            z-index:2;  
            box-shadow: 0px 0px 18px lightgrey;
            border-radius: 3px;    
          }
          header div{
            width: 95%;
            max-width: 800px;  
            margin: 0 auto;
            height:100%;
            display:flex;
            align-items:flex-end;
          }

          header h2{
              color:white;
              font-size:4.6rem;
              line-height:53px;
              margin-bottom:10%;
              text-shadow: #CCC 1px 0 10px; 
          }

          header h2 span{
              display:block;
              font-size:4.3rem;
              font-weight:normal;
          }

          header h2 span em{
              font-style: normal;
              font-size: 1.7rem;
              display:block;
          }

          header .border-decorator{
              width:100%;
              position:absolute;
              bottom:0;
              
          }
          
          .ligth-style{
              font-weight:normal;
              font-size:3.5rem;
              letter-spacing: 0rem;
              transform:translateY(30px);
          }

         

          .centered{
             margin:0 auto;
             transform:translateY(-40px);
             color:#fffff;
          }
           .inner-title  span{
               font-size: 2.4rem;
               line-height: 39px;
               letter-spacing: .6rem;
           }

           .shape-img{
               width: 120px;
               position:absolute;
               bottom:0;
               right:15%;
           }

           .back-button{
            border:1px solid white;
            background:#ed6b1f;
            color: white;
            position:absolute;
            top:15px;
            cursor:pointer;
            border-radius: 6px;
            padding: 0.6rem 1.4rem;
            left: 30px;
        }

         

           @media (max-width:700px){
            .shape-img{
                right:10%;
            }
           }

          @media (max-width:500px){
            .ligth-style{
                transform:translateY(0);
            }

            .ligth-style,  .ligth-style span, .inner-title  span, header h2 span em{
                font-size: 1.6rem;
            }

            .shape-img{
                width: 100px;
            }
          }
          
        `
    
    }

    constructor(){
        super()
        this.isShort = false;
        this.isMedium = false;
        this.withBack = false;
    }

  

    firstUpdated(){
        const header = this.shadowRoot.querySelector('header')
        // header.style.height = this.isShort ? '240px' : '440px'
        const h2 = this.shadowRoot.querySelector('h2')
        if(this.isShort){
            header.style.height = '160px'
        }else if(this.isMedium){
            header.style.height = '240px'
        }else{
            header.style.height = '440px'
        }
        
        if(this.isShort || this.isMedium){
            h2.classList.add("ligth-style")
        }

        if(!this.centered){
            h2.classList.add("dots")
        }
    }

    back(){
        console.log("back")
        window.history.back();
    }

   render(){
       return html`
     
         <header style="background-color:${this.color};
                                         ${this.image ? `background:url(${this.image}); 
                                         background-size:cover;background-position:0 15%;
                                         `: '' }">
                 ${
                     ! this.withBack ?
                     html`<button @click="${this.back}" class="back-button">Volver</button>`:null
                 }                
             <div>
                ${
                    this.centered ?
                     html`
                      <h2 class="centered">${unsafeHTML(this.title)}</h2>
                     `
                    : html`
                      <h2 class="${this.isInner ? "inner-title" :""}">${unsafeHTML(this.title)}</h2>
                    `
                }
                ${
                    this.shape ?
                    html`
                     <img class="shape-img" src="${this.shape}"/>
                    `:null
                }
             </div>
             ${
                 this.borderImage ? 
                 html`
                    <img class="border-decorator" src="${this.borderImage}"/>
                    `:null
             }
             
         </header>
       `
   }
}

customElements.define('root-header', RootHeader)