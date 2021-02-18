import {LitElement, html} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class Pairing extends LitElement{
    static get properties(){
        return{
            info:{type:Array},            
            title:{type:String},           
            color:{type:String},
            content:{type:String},
            image:{type:String}           
        }
    }

    constructor(){
        super()
        this.zoom = null
        this.cart = 0;
        this.cart1=0;
        this.cart2=0;
        this.targetcard1 ;
        this.targetcard2;
    }

    console(e){ 
        let data  = e.currentTarget.dataset.correct  
        if(data != 0){   
        this.cart += 1
        this.flip(e.currentTarget)
        if(this.cart > 1){
            this.cart2 = data ;
            this.targetcard2 = e.currentTarget
            if(this.cart1 ==  this.cart2){
                this.unselect(this.targetcard1) 
                this.unselect(this.targetcard2)                
            }else{
                this.unflip(this.targetcard1)
                this.unflip(this.targetcard2)
                console.log('perdiste')                
            }          
            this.reset();  
        }else{
            this.cart1 = data ;
            this.targetcard1 = e.currentTarget           
        }  
    }else{
        console.log('yes')
    }        
    }
    flip(element){          
        element.getElementsByClassName('card')[0].classList.add('flipped')
    }
    unflip(element){
        setTimeout(function(){  element.getElementsByClassName('card')[0].classList.remove('flipped')  }, 500);
       
    }
    unselect(element){
        element.dataset['correct'] = '0'
    }
    
    reset(){
        this.cart = 0;
        this.cart1=0;
        this.cart2=0;
    }



    render(){        
        
        return html`
        <style>
        

        section{
            overflow: hidden;
            margin: 2.3rem 0;
            background: white;
            box-shadow: 0px 0px 18px lightgrey;
            border-radius: 3px;
            padding: 2rem;
        
        }

        
        .flex{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: #fbd81f;
            margin: 2rem auto;
            padding: 2rem 0px;
        }

        header{
            width:fit-content;
            height:auto;
            margin:0 auto;
            padding:.3rem 1.4rem;
            position: relative;
          }

          h2, p{
              color:#707070;
              text-align: center;
          }

          .tags{
            width:35px;
            height:30px;
            position:absolute;
            top:50%;
        }

        .tags::before{
            content:"";
            width: 0;
            height: 0;
            display:block;
            border-top: 15px solid transparent;
            border-left: 10px solid white;
            border-bottom: 15px solid transparent;
            position:relative;
            left:-1px;
            top:50%;
            transform:translateY(-50%)
        }

        .right{
            transform:rotate(180deg) translateY(50%);
            right:-40px;
        }

        .left{
            transform:translateY(-50%);
            left:-40px;
        }

        
        .container{
            max-width: 300px !important;
        }

        
        p{
            text-align: center;
        }
        

        img{
            width: 100%;
        }

        .flip {
            -webkit-perspective: 800;
            width: 180px;
            height: 180px;
            position: relative;
            margin: 22px;
          }
          .flip .card.flipped {
            -webkit-transform: rotatex(-180deg);
          }
          .flip .card{
            width: 100%;
            height: 100%;
            -webkit-transform-style: preserve-3d;
            -webkit-transition: 0.5s;
          }
          .flip .card .face {
            width: 100%;
            height: 100%;
            position: absolute;
            -webkit-backface-visibility: hidden ;
            z-index: 2;
            font-size: 6em;
            font-family: Verdana, Arial, Helvetica, sans-serif;
            text-align: center;         
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            box-shadow: 1px 1px 4px #707070;
          }
          .flip .card .front {
            position: absolute;
            z-index: 1;
            background: white;
            color: #585858;
            cursor: pointer;
            box-shadow: none;
            height: 104px;
            border-radius: inherit !important;
            margin: 2rem auto;
          }
          .content-text{
            position: absolute;
            z-index: 1000;
            width: 90%;
            margin: 0 auto;
            left: 0;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            text-align: center;
            font-weight: bold;
            line-height: 25px;
            color: #ed6b1f;
            font-size: 4rem;
          }
          .flip .card .front::after{
            content: '';
            display: block;
            position: absolute;
            top: 0;
            width: inherit;
            height: inherit;
            transform: rotate(60deg);
            background-color: inherit;
            //border-radius: 5%;
          }
          .flip .card .front::before{
            content: '';
            display: block;
            position: absolute;
            top: 0px;
            width: inherit;
            height: inherit;
            transform: rotate(-60deg);
            background-color: inherit;
            //border-radius: 5%;
          }
          .flip .card .back {
            -webkit-transform: rotatex(-180deg);
              background: transparent;
              color: black;
              cursor: pointer;
              font-size: 16px !important;
              box-shadow: none;
          }
                
        </style>
         <section>

         ${
            this.title ? html`
             <header>
               <div style="background:${this.color}" class="tags left"></div>
               <h2>${this.title}</h2>
               <div style="background:${this.color}"  class="tags right"></div>
             </header>
            `:null
          }

          ${
            this.content ? html`
            ${unsafeHTML(this.content)}
            `: null
          } 
          <div class="flex">
 
          ${
              this.info.sort().map(path=>{
                  return html`
                    <div class="flip" @click="${this.console}" id="${path.id}" data-correct="${path.correct}"> 
                        <div class="card"> 
                        <div class="face front"> 
                            <div class="content-text">?</div>
                        </div> 
                        <div class="face back"> 
                        ${
                            this.image ? html`
                            <img src="${path.text}">`: `${unsafeHTML(path.text)}`
                        }
                        
                        </div> 
                        </div> 
                    </div> 
                                                                                         
                  `})
          }
              
          </div> 
         </section>
        `
    }

    
}

customElements.define("pairing-element", Pairing)