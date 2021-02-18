import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class RootHeaderSlider extends LitElement{
  
    static get properties(){
        return{
            slides:{type:Object},         
            color:{type:String},
            image:{type:String},
            borderImage:{type:String},
            withBack:{type:String}
        }
    }

    static get styles(){
        return unsafeCSS`
          .swiper-container {
            width: 90%;
            margin-top: 3rem;
            height: auto;
            padding: 2rem;       
          }
          @media(min-width: 1024px) {
            .swiper-container { 
           
          }
          @media(min-width: 768px) {
            .swiper-container { 
              
            }
          }
          .root-header-slider {
            width: 100%;
            height: auto;
            display: inline-block;
            position:relative;
            box-shadow: 0px 0px 18px lightgrey;
            border-radius: 3px;
          }
          .root-header-slider__intro,
          .root-header-slider__title {
            display: inline-block;
                      
          }
          .root-header-slider__intro {
            letter-spacing: 0;
            font-weight: bold;
            text-transform: initial;
            font-size: 27px;
            color: #ed6b1f;
          }
          .root-header-slider__title {
            width: 100%;
            font-weight: 900;
            line-height: 30px;         
            font-size: 23px;
            color: #707070;          
          }
          
          @media(min-width: 1024px) {
            .root-header-slider__title {            
                         
            }

            
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
          .root-header-slider__border-img {
            width: 100%;
            height: 22px;
            bottom:3px;
            display: inline-block;
            background-size:100%;
            background-repeat: repeat-x;
            transform: translateY(15px);
            position:relative;
            z-index:2
          }

          
        `
    }

    constructor(){
      super()
      this.withBack = false;
  }
  back(){
      console.log("back")
      window.history.back();
  }

   render(){
       return html`
          <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">
          <header class="root-header-slider" style="background-color:${this.color};${this.image ? `background:url(${this.image}); background-size:cover;background-position:0 15%;`: '' }">
             ${
                     this.withBack ?
                     html`<button @click="${this.back}" class="back-button">Volver</button>`:null
                 }    
          <!-- Slider main container -->
            <div class="swiper-container">
              <!-- Additional required wrapper -->
              <div class="swiper-wrapper">
                ${Object.keys(this.slides).map(item =>
                  html`
                    <div class="swiper-slide">
                      <span class="root-header-slider__intro">${this.slides[item].intro}</span>
                      <span class="root-header-slider__title">${this.slides[item].titulo}</span>
                    </div>
                  `)
                }
              </div>            
            </div>
            <span class="root-header-slider__border-img" style="background-image: url(${this.borderImage});"></span>
         </header>
       `
   }
}

customElements.define('root-header-slider', RootHeaderSlider)