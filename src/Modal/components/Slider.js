import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


const ProfileItem = (item, index)=>{
   return html`
        <div class="slide slide-${index}">
            <img src="${item}"/> 
        </div>           
   `
}

export class SliderElement extends LitElement{
    
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
            
       ::slotted(*){
         display:none;
       }

       img{
        width: 95%;
       }

       .teacher-info-cont{
        height: 400px;
       }

        :focus {
            outline: none!important;
        }

        .radio-slider {
            background-color: #fff;           
            border-radius: 10px;        
            cursor: pointer;
            display: inline-block;
            height: 20px;
            margin-right: 15px;
            margin-top: 2rem;
            position: relative;
            width: 20px;
            -webkit-appearance: none;
        }
        .radio-slider:after {
            background-color: #444;
            border-radius: 25px;        
            content: '';
            display: block;
            height: 10px;
            left: 5px;
            position: relative;
            top: 5px;
            width: 10px;
        }
        input[type="radio"]:checked:after {
            background-color: #fe6b01;       
        }

       article{
        background: #fe6b01;
       }

       .slider-container{
        height: 100%;
        position: relative;
        overflow-y: auto;
        text-align: center;
        overflow-x: hidden;
      }
      
      .menu {
        position: absolute;
        left: 0;
        z-index: 900;
        width: 100%;
        bottom: 0;
      }
            
      .slide {        
        position: absolute;
        left: 100%;       
        padding: 1rem;
        transition: left 0s .75s;
      }
      
      [id^="slide"]:checked + .slide {
        left: 0;
        z-index: 100;
        transition: left .65s ease-out;
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
                <div class="slider-container">
                    <div class="menu">
                        ${
                            this.info.map((item, index) =>{
                            return html`
                            <label for="slide-dot-${index}"></label>`
                            
                            })
                        }
                    </div>

                    ${
                        this.info.map((item, index) =>{
                            
                            if(index == 0){
                                return html`
                                    <input id="slide-dot-${index}" class="radio-slider" type="radio" name="slides" checked>
                                    ${ProfileItem(item, index)}`
                            }else{
                                return html`
                                    <input id="slide-dot-${index}" class="radio-slider" type="radio" name="slides">
                                    ${ProfileItem(item, index)}`
                            }
                           
                        })
                    }
                                          
                </div> 
                </article>
             </section>
          </div>
        `
    }
}

customElements.define('slider-element', SliderElement)