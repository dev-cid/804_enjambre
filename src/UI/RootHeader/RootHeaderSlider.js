import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class RootHeaderSlider extends LitElement{
  
    static get properties(){
        return{
            slides:{type:Object},         
            color:{type:String},
            image:{type:String},
            borderImage:{type:String}
        }
    }

    static get styles(){
        return unsafeCSS`
          .swiper-container {
            width: 90%;
            height: 200px;
            margin-top: 120px;
            margin-bottom: 20px;            
          }
          @media(min-width: 1024px) {
            .swiper-container { 
              height: 250px;
              margin-top: 200px;
              margin-bottom: 100px;
            }
          }
          @media(min-width: 768px) {
            .swiper-container { 
              width: 650px;
            }
          }
          .root-header-slider {
            width: 100%;
            height: auto;
            display: inline-block;
          }
          .root-header-slider__intro,
          .root-header-slider__title {
            display: inline-block;
            color: #fff;            
          }
          .root-header-slider__intro {
            margin-bottom: 10px;
            padding: 4px 8px 1px;            
            letter-spacing: 15px;
            line-height: 24px;
            font-size: 22px;
            text-transform: uppercase;
            border: dashed 1px #fff;
          }
          .root-header-slider__title {
            width: 100%;
            font-weight: 900;
            line-height: 30px;         
            font-size: 50px;
            text-shadow: #CCC 1px 0 10px;             
          }
          @media(min-width: 1024px) {
            .root-header-slider__title {                       
              font-size: 70px;            
            }
          }
          .root-header-slider__border-img {
            width: 100%;
            height: 15px;
            display: inline-block;
            background-repeat: repeat-x;
            transform: translateY(15px);
            position:relative;
            z-index:-2
          }
        `
    }

   render(){
       return html`
          <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">
          <header class="root-header-slider" style="background-color:${this.color};${this.image ? `background:url(${this.image}); background-size:cover;background-position:0 15%;`: '' }">
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