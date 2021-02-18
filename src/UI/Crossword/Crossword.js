import{LitElement, html} from 'lit-element'
import interact from 'interactjs'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import {ModalElement} from '../../Modal/Modal'

export class CrossWord extends LitElement{

    static get properties(){
        return{
            words:{type:Array},            
            title:{type:String},           
            color:{type:String},
            content:{type:String}, 
            start:{type:String},
            empty:{type:String},
            completed:{type:Array},
            matrix:{type:Array},
            selected:{type:String},
            message:{type:String},
            label:{type:String},
            modal:{type:String}
        }
    }

    constructor(){
        super()        
        this.start = false
        this.empty = true
        this.matrix  = []
        this.selected = undefined
        this.message = ''
        this.label = ''
        this.completed = []
        this.modal = false
    }

    firstUpdated(){
        this.CreatedMatrix()        
    }

    closeModal(){
        this.modal = false;
    }

    CreatedMatrix(){
        const width = this.words.reduce((max, cur) => Math.max(max, cur.position[0] + (cur.orientation === 0 ? cur.word.length : 1)), 0)
        const height = this.words.reduce((max, cur) => Math.max(max, cur.position[1] + (cur.orientation === 1 ? cur.word.length : 1)), 0)
        let matrix = Array(height).fill(0).map(() => Array(width).fill(null).map(() => this.empty))
        
        this.words.map((palabra, index) => {
                const [x, y] = palabra.position
                palabra.word.split('').map((l, i) => {
                    let cell = matrix[y + (palabra.orientation ? i : 0)][x + (palabra.orientation ? 0 : i)]
                    if (cell === this.empty) {
                        cell = matrix[y + (palabra.orientation ? i : 0)][x + (palabra.orientation ? 0 : i)] = {words_total: []}
                    }
                    cell.empty = false
                    cell.words_total.push(index)
                    if (i === 0) {
                        cell.start = index + 1
                    }
                    cell.letter = l
                })
        })
        this.matrix = matrix
        this.completed = Array(this.words.length).fill(false)
    }
    
    selectWord(e) {              
        if (e.target.dataset.info > 0) {
            this.selected = e.target.dataset.info - 1
            e.target.classList.add("selected");
          }
    }

    pista () {
        if (this.selected === undefined) return undefined
        return `${this.words[this.selected].orientation ? '<b>Vertical</b>' : '<b>Horizontal</b>'} <b>${this.selected + 1}</b> <br><br> <p class="pista">${this.words[this.selected].description}</p>`
    }
 

    corregir () {
    const solucion = this.words[this.selected].word
    const answer = this.shadowRoot.querySelector("#value_input").value
        if (answer.toUpperCase() === solucion.toUpperCase()) {
            this.completed[this.selected] = true
            this.selected = undefined
            this.modal = true;
            this.message = "¡Correcto!"
            this.label = "Lo estas haciendo muy bien, continua afinzando tus conocimientos"
        }else{
            this.modal = true;
            this.message = "¡Ups! Te equivocaste"
            this.label = "La palabra ingresada no es la correcta, por favor no ingreses caracteres especiales o tildes"
        }
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

        .information{
            margin: 2rem;
            height: 173px;
            text-align: center;
            padding: 2rem;
            background: #eee;
            border-radius: 7px;
        }

        
        .container{
            max-width: 300px !important;
        }

        .pista, b{
            color: white;
        }

        .section-word{
            width: 50%;  
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .section-word > div{
            background: #ed6b1f;
            padding: 2rem;
            margin: 3rem;
            border-radius: 10px;
            text-align: center;
            box-shadow: 3px 3px 8px #eee;
        }

        .crossword{
            display:flex;
        }

        input:focus{
            outline: none !important;
            border: 2px solid #FFC107;
        }

        input{
            padding: 0.4rem 2rem;
            border-radius: 10px;
            border: none;
            margin: 1rem auto;
            box-shadow: 0px 0px 4px #847373;
            width: 100%;
        }

        table {
            border-collapse: collapse;
            font-size: 18px;
            width: 45%;
            margin: 3rem 4rem;
          }
          
          td {
            width: 36px;
            height: 36px;
            text-align: center;
            position: relative;
            text-transform: uppercase;
            box-shadow: 2px 2px 3px #ed6b1f;
            background: #eeeeee;
            border: 1px solid white;   
          }

          td.empty{
            box-shadow: none;
            background: none;
            border: 1px solid beige;
          }

          td.start{
              cursor:pointer;
          }

          td.selected {
            background: #fbd91f;
            border: 1px solid transparent;
          }

          .game{
            background: #ed6b1f;
            color: white;
            padding: 0.5rem 3rem;
            cursor: pointer;
            border-radius: 6px;
            top: 3rem;
            position: relative;
            font-size: 14px;
        }

          :focus {
            outline: none;
        }

          .btn{
            padding: 0.5rem 2rem;
            border: none;
            border-radius: 30px;
            background: #fbd91f;
            cursor: pointer;
            font-weight: bold;
           
          }

          td.start label {
            position: absolute;
            top: 0;
            left: 2px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
        }
        @media (max-width:780px){
            table{
                width: 80%;
            }

            .crossword{
                display: block;
            }

            .section-word{
                width: 100%;
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

        <div class="crossword">
        <table>    
        ${
            this.matrix.map((element, index)=>{
                return html`<tr>
                    ${
                        element.map((ele,_index)=>{
                            if(ele == true){
                               return html`
                                 <td class="empty"></td>`
                            }else{
                                return html`
                                    <td class="${ele.start ? 'start':''} ${ele.words_total.includes(this.selected) ? 'selected': ''}" @click="${this.selectWord}" data-info="${ele.start}">                                  
                                        <label>${ele.start}</label>  
                                        <span>${ele.words_total.some(i => this.completed[i]) ? ele.letter : ' '}      </span>           
                                    </td>
                                ` 
                            }
                        })
                    }
                
                </tr>` 
               
            })
        }
        </table>

        <div class="section-word">
            <div>
            ${this.selected != undefined ? html`
            ${unsafeHTML(this.pista())} 
            </p>
            <input id="value_input" ref="input" />
            <button @click="${this.corregir}" class="btn">Guardar</button>`
            :html`
            <p class="pista"><b>¡Recuerda!</b></p>
            <p class="pista">Selecciona en el crucigrama el número de la fila o columna que desees resolver</p>`}
            </div>
        </div>
        </div>
        ${
            this.modal ? html`
             <modal-element .closeEv="${this.closeModal.bind(this)}">
                <div class="information">
                    <h2>${this.message}</h2> 
                    <p>${this.label}</p>
                    <a @click="${this.closeModal.bind(this)}" class="game">Volver</a>                   
                </div>
             </modal-element>
            `: null
            }
        </section>

        `
    }
}

customElements.define('crossword-element', CrossWord)