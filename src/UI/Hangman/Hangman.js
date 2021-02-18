import {LitElement, html} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import {ModalElement} from '../../Modal/Modal'

export class Hangman extends LitElement{
    static get properties(){
        return{
            info:{type:Array},
            buttons:{type:Array},
            title:{type:String},
            image:{type: String},
            color:{type:String},
            content:{type:String},
            wordGuess:{type:String},
            fails:{type:String},
            hits:{type:String},
            sentence:{type:String},
            message:{type:String},
            modal:{type:String},
        }
    }

    constructor(){
        super()        
        this.fails = 0
        this.hits = 0
        this.wordGuess = ""
        this.sentence = ""
        this.message = ""
        this.modal = false
    }

    firstUpdated(){
        this.GetwordGuess()        
    }

    closeModal(){
        this.modal = false;
    }

    RemoveClass(){
        var sections = this.shadowRoot.querySelectorAll('.button');
        const info = this.shadowRoot.querySelectorAll(".letters p") 
        for (let i = 0; i < sections.length; i++){
            sections[i].classList.remove('incorrect');
            sections[i].classList.remove('correct');
        }
        for (let i = 0; i < info.length; i++){
            info[i].textContent = ''
        }
    }

    Refresh(){
        this.RemoveClass()
        this.GetwordGuess()
        this.fails = 0
        this.hits = 0
        this.modal = false;
    }

    GetwordGuess(){
        this.words = []
        this.sentences = []
        this.info.map((elem)=>{this.words.push(elem[0]) })
        this.info.map((elem1)=>{this.sentences.push(elem1[1]) })

        let aleatorias = Math.floor(Math.random() * this.words.length + 1);        
        this.wordGuess = this.words[aleatorias];
        this.sentence = this.sentences[aleatorias]

        
    }

    validate(){
        if(this.hits == this.wordGuess.length){
            this.modal = true;
            this.message = "¡Felicitaciones has ganado!"
          } 
          if(this.fails == 6){        
            this.modal = true;              
            this.message = "¡Ups, perdiste!"
          }        
    }

    press(e){   
        const info = this.shadowRoot.querySelectorAll(".letters p")     
        if(this.wordGuess.toUpperCase().includes(e.target.textContent)){
            this.wordGuess.split("").map((item,index)=>{
                if(item.toUpperCase() == e.target.textContent){
                    info[index].textContent = e.target.textContent
                    e.target.classList.add("correct");
                    this.hits++ 
                }
            })
                  
        }else{
            e.target.classList.add("incorrect");
            this.fails++            
        } 

        this.validate()
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

        .correct{
            background: #9cbb1e !important;
            pointer-events: none;
        }

        .incorrect{
            background: #e51b1b !important;
            pointer-events: none;
        }

        .flex{
            display: flex;
            width: 100%;
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

        .button{
            background: #ed6b1f;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 3px;
            cursor: pointer;
            margin: 0.2rem;
            display: inline-block;
            width: 20px;
            text-align: center;
        }

        .container{
            max-width: 300px !important;
        }

        .section-button{
            padding: 2rem;
            width: 20%;
        }

        .section-content, .message{
            text-align: center;
            width: 80%;
        }

        p{
            text-align: center;
        }
        .section-content .image{
           padding: 2rem;
           height: 190px;
           display: flex;
           justify-content: center;
           align-items: center;
        }

        .information{
            margin: 2rem;
            height: 173px;
            text-align: center;
            padding: 2rem;
            background: #eee;
            border-radius: 7px;
        }

        .game{
            background: #ed6b1f;
            color: white;
            padding: 1rem;
            cursor: pointer;
            border-radius: 6px;
        }
        
        .information h2{
            color: #ed6b1f;
        }

        .letters{
            display: flex;
            justify-content: space-evenly;
        }

        .letters p{
            border-bottom: 1px solid #707070;
            width: 30px;
            font-weight: bold;
            line-height: 27px;
        }

        img{
            width: 140px;
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
          <article class="flex">
            <div class="section-button">
              ${  
                  this.buttons.map((element, index)=>{                
                      return html`
                          <a @click="${this.press}" class="button">${element}</a>
                      ` 
                  })
               }
              </div>
              <div class="section-content">
               
                <div class="image"><img src="${this.image}${this.fails}.png"></div>   
                <div class="letters">             
                ${
                    this.wordGuess.split("").map((element, index)=>{
                        return html`
                            <p></p>
                        `
                    })
                }
                </div>
                <p>${this.sentence}</p>
              </div>
              ${
                this.modal ? html`
                 <modal-element .closeEv="${this.closeModal.bind(this)}">
                    <div class="information">
                        <h2>${this.message}</h2>
                        <p>La palabra era: ${this.wordGuess}</p><br><br>
                        <a @click="${this.Refresh}" class="game">Jugar de nuevo</a>
                    </div>
                 </modal-element>
                `: null
                }
         </article>
         </section>
        `
    }

    
}

customElements.define("hangman-element", Hangman)