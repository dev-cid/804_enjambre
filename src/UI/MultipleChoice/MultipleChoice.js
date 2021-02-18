import{LitElement, html} from 'lit-element'
import interact from 'interactjs'
import functions from '../../components/DragBehavior'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class MultipleChoice extends LitElement{

    static get properties(){
        return{
            choice:{type:Array},            
            title:{type:String},           
            color:{type:String},
            content:{type:String},           
        }
    }

    select({target}){
        target.classList.contains("true") ?  target.classList.add("correct") :  target.classList.add("incorrect")
        target.parentNode.classList.add("disable")       
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

        h2, p{
              color:#707070;
              text-align: center;
          }
        
          .flex {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
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

        
        .container{
            max-width: 300px !important;
        }

        :host{
            text-align:left;
  
          }
  
          .multiple-cont{
            margin-top:2rem;
          }
  
        
          
          ul {
            list-style:none;
          }
          .flex > li{
            width: 43%;
            margin-top: 2rem;
            background: #eee;
            margin-left: -5rem;
            border-radius: 5px;
          }
          li{
            color: #333;
            position:relative;
          }
          li span{
            text-align: center;
            margin: 1rem auto;
            display: flex;
            justify-content: center;
            align-items: center;           
            padding: 0.4rem;
            width: 80%;
          } li ul{
            display:inline-block;
            width: 80%;
          }
          .questionary {
            background: #eee;
            padding: 1rem;      
          }
          .questionary > li{
            margin-bottom:1rem;
          }
          .disable{
            pointer-events:none;
          }
          .correct{
            background: #0f920fab !important;
            color: white !important;
          }
          .incorrect{
            background: #c74646 !important;
            color: white !important;
          }
          .options{
            transition: opacity .4s;
            cursor: pointer;
            width: 80%;
            background: #fbd91f;
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            position: relative;
            box-shadow: 0 4px 10px -5px rgba(0,0,0,.3);
            margin: 1.5rem auto;
            color: #707372;
            border-radius: 10px;
          }
  
          .options:hover{
            opacity: .7;
          }
  
          .questionary img{
            width: 70%;
            margin-top: 2rem;
            text-align: center;
          }

          @media (max-width:900px){
                .flex > li{
                    width:90%;
                 }
            }

            @media (max-width:990px){
              .flex > li{
                  width:70%;
               }
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

          <ul class="flex">
            ${
              this.choice.map((option, index )  =>{
                    return html`
                     <li> <span>${option.question}</span><ul>
                          ${
                            option.answers.map((element, _index )=>{
                              return html`
                                <li @click=${this.select} class="options ${element.correct}" data-question="${index}">
                                  ${element.label}
                                </li>
                              `
                            })
                          }
                        </ul>
                    `
                })
            }
         </ul>

        </section>

        `
    }
}

customElements.define('multiple-choice', MultipleChoice)