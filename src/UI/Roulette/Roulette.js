import {LitElement, html} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

class CompletedWord extends LitElement{
     
    static get properties(){
        return{
            info:{type:String},
            isCorrect:{type:Boolean}
        }
    }

    constructor(){
        super()
        
        this.input = null
        this.isCorrect = false
    }

    firstUpdated(){
        this.input = this.shadowRoot.querySelector("input")
      
    }

    change(e){
       if(e.target.value ==  this.info[2]){
          this.input.disabled = true;
          this.isCorrect=true
       }
    }

    render(){
        return html`
        <style>
                    input{
                        border: 1px solid white;
                        width: 150px;
                        color: #707070;
                        text-align: center;
                        font-size: 15px;
                        margin: 1rem auto;
                        border-radius: 5px;
                        box-shadow: 0px 0px 2px white;
                        background: white;
                    }

                    div{
                        color: white;
                    }

                    .correct{
                        padding:.4rem;
                        background: #9cbb1e;
                        border-radius: 11px;
                    }

                    .item-completed{
                        text-align: center;
                    }

                    span{
                        margin: 0 2px;
                    }                
            </style>

        <div class="item-completed">
        <div style="display:grid" class="${this.isCorrect ? "correct" : ""}"> 
         <span>${this.info[0]}</span>
         ${
            this.info[0].split(" ").map((word,index) =>{
               if(index == this.info[1]){
                   return html`<input  type="text" @input="${this.change}"/><br>`
               }
            })
        }
        </div>
      </div>
        `
    }
}

customElements.define("word-completed", CompletedWord)

export class Roulette extends LitElement{
    static get properties(){
        return{
            info:{type:Array},
            title:{type:String},
            color:{type:String},
            content:{type:String}
        }
    }

    constructor(){
        super()        
        this.cont = null
    }

    show(e){
        const info = this.shadowRoot.querySelector(".text-circle")  
        let aa = this.shadowRoot.querySelector("word-completed")
        if(aa != null){
            aa.outerHTML = "";
        }
        let item = document.createElement('word-completed')
        
        
        
        this.info.map((element, index)=>{
            var letter = element[2].substring(-1,2);
            if(letter == e.target.textContent){
                item.info = element
                info.appendChild(item)
                e.target.parentNode.classList.add("inactive");
            }
        })
  
    }
   

    render(){

        let valuePi = 2 * Math.PI / this.info.length;

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

        .inactive{
            background: #ddd !important;pointer-events: none;
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

        .menu{
            background: ${this.color};
            width: 380px;
            height: 380px;
            border-radius: 50%;
            box-shadow: 0px 0px 17px #aaa;
            margin: 3rem auto;
            position: relative;
        }

        .menu-item{
            position: absolute;
            cursor: pointer;
            background: #fbd91f;
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-weight: bold;
        }

        .text-circle{
            position: absolute;
            margin: 5rem 4rem;
            width: 250px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .circle{
            margin: 10.5rem 11rem;
            position: absolute;
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
          
          <article >
          <nav class="menu">
             <div class="circle">                
                ${
                    this.info.map((ele, _index)=>{
                     var letter = ele[2].substring(-1,2);
                     let real_i = 0;
                     let x = Math.sin(valuePi * _index) * 170;
                     let y = Math.cos(valuePi * _index) * 170;
                    
                       return html`
                       <div style="top:${y}px;left:${x}px" @click="${this.show}" class="menu-item">                         
                            <p>${letter}</p>                                       
                       </div>
                       `
                    })
                }
              </div>
              <div class="text-circle">
                
              </div>
          </nav>
          </article>
          
         </section>
        `
    }

    
}

customElements.define("roulette-element", Roulette)