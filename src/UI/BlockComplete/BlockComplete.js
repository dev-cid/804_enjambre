import {LitElement, html} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


class SentenceItem extends LitElement{
     
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
        this.info[3].split(",").map((elem, index)=>{
            if(e.target.value == elem){
                e.target.disabled = true;
                e.target.setAttribute("style", "padding: .4rem;background: #fbd91f;border-radius: 4px;");
             }
        }) 
       
    }

    render(){
        return html`
        <style>
                    input{
                        background: transparent;
                        border: none;
                        border-bottom: 1px solid #707070;
                        width: 190px;
                        margin: 0px 7px;
                        color: #707070;
                        font-size:15px;
                    }     
                    
                    input:focus {
                        outline: none;
                    }

                    .correct{
                        padding: .4rem;
                        background: #fbd91f;
                        border-radius: 4px;
                    }

                    .item-completed{
                        margin: 1rem auto;
                        border-bottom: 1.5px dashed #dbdbdb;
                        padding: 1.5rem 0rem;
                        line-height: 25px;
                    }

                    span{
                        margin: 0 2px;
                        color: #707070 !important;
                    }                
            </style>

        <div class="item-completed">
        <div>
            ${                             
                this.info[0].split(" ").map((word,index) =>{                      
                    if(index == this.info[1] || index == this.info[2]){
                        return html`<input  type="text" @input="${this.change}"/><span>${word}</span>`
                    }else{
                        if(word == "<br>"){
                            return html`<br><span>${word.replace('<br>','')}</span>`
                        }else{
                            return html`<span>${word}</span>`
                        }
                       
                    }
                })
                
            }
           </div>
      </div>
        `
    }
}

customElements.define("sentence-completed", SentenceItem)

export class BlockComplete extends LitElement{
    static get properties(){
        return{
            info:{type:Array},
            title:{type:String},
            color:{type:String},
            content:{type:String}
        }
    }

    render(){
        return html`
        <style>
        
        div, p{
            color: #707070;
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

        article{
            padding: 1rem;
            box-shadow: 0px 0px 4px #dbdbdb;
            border-radius: 5px;
            margin: 2rem;
        }

        section {
            overflow: hidden;
            margin: 2.3rem 0;
            background: white;
            box-shadow: 0px 0px 18px lightgrey;
            border-radius: 3px;
            padding: 2rem;
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
         
         <article>
            ${
                this.info.map((element, index)=>{
                    return html`
                        <sentence-completed .info="${element}"></sentence-completed>
                    `
                })

            }
            
         </article>
         </section>
        `
    }
}

customElements.define("block-complete", BlockComplete)