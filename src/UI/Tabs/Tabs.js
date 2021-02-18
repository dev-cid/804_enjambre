import {LitElement, html} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class Tabs extends LitElement{
  
  static get properties(){
      return{       
        text:{type:String},
        list:{type:String},
        name:{type:String},
        image:{type:String},
        title:{type:String},
        content:{type:String},
        color:{type:String},
        tabs:{type:Object}
      }
  }

  constructor(){
    super()
    this.list = "";
    this.text = "";
    this.name = null;
  }
    
  select({target}){    
     target.classList.contains("true") ?  target.classList.add("correct") :  target.classList.add("incorrect")
     target.parentNode.classList.add("disable")   
     this.shadowRoot.querySelector(`.${this.name}`).classList.add("disable") 
     this.shadowRoot.querySelector(`.${this.name}`).style.backgroundColor = 'rgb(224, 200, 167)'
  }

  change_tab({target}){   
    this.shadowRoot.querySelector(`.${this.name}`).classList.contains("disable") ?  target.classList.remove("disable") :  null   
    this.name = this.tabs[target.dataset.index].name  
    this.text = this.tabs[target.dataset.index].text
    this.list = this.tabs[target.dataset.index].list    
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
        }

        .content{
            width: 80%;
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

        u{
            font-weight: bold;
        }       

        img{
            width: 85%;
        }

        :host{
          text-align:left;

        }

        .tabs{
          margin: 2px auto;
          padding: 0px;
          list-style: none;
          width: 25%;
          max-height: 725px;
          overflow: auto;
        }
        .tabs::-webkit-scrollbar {
          width: 6px;
         }

        .tabs::-webkit-scrollbar-thumb {
          background: #ed6b1f;
          border-radius: 10px;
        }
            
        .tabs .current{
          background: #ededed;
          color: #222;
        }
    
        .tab-content{
          display: none;
          background: white;
          padding: 1.5rem;
          margin-left: 3rem;
          border-radius: 10px;
          -webkit-transition: all .3s ease-in-out;
        -moz-transition: all .3s ease-in-out;
        -o-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
        }
    
        .tab-content.current{
          display: inherit;
    }

        .multiple-cont{
          margin-top:2rem;
        }

        .flex{
           display: flex;
           flex-wrap:wrap;
           justify-content: space-between;
        }
        
        ul {
          list-style:none;
          padding-inline-start: 1rem;
        }
        .flex > li{
          width: 48%;
          margin-top: 2rem;
          box-shadow: 0px 0px 9px;
          background: white;
        }
        li{
          color: #333;
          position:relative;
        }
         li ul{
          display:inline-block;
          width: 80%;
        }
        .tab-link{
            margin-bottom: 1rem;
            background: white;
            padding: 0.5rem;
            box-shadow: 0px 0px 13px lightgrey;
            cursor: pointer;
            border-radius: 10px;
        }
        .questionary {
            display: flex;            
            padding: 2%;
            box-shadow: 0px 0px 7px #cfcfcf;
            border-radius: 10px;
            background: #eeeeee;   
        }
        .questionary > li{
          margin-bottom:1rem;
        }
        .disable{
          pointer-events:none;
        }
        .correct{
          background: #0f920fab !important;
        }
        .incorrect{
          background: #c74646 !important;
          color: white !important;
        }
        .options{
          cursor: pointer;
          transition: opacity .4s;
          margin-bottom: .4rem;
          background: #5d746e4f;
          text-align: center;
          display: flex;
          align-items: center;
          padding: 1.5%;
          position: relative;
          box-shadow: 0 4px 10px -5px rgba(0,0,0,.3);
          margin: 1.5rem auto;
          color: #707372;
        }

        .options:hover{
          opacity: .7;
        }

        audio{
          width: 90% !important;
          margin: 0rem 3rem;
        }

        @media(max-width:900px){
          .flex > li{
           width:45%;
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
       <div class="multiple-cont">
       <div class="questionary">      
            <div class="tabs" >           
              ${this.tabs.map((ele, index)=>{                  
                  return html `
                  <img src="${ele.image}" @click=${this.change_tab} data-index=${index} class="tab-link ${ele.name}">
                   
                  </img>` 
              })}            
            </div>
            <div class="content">
                <div class="tab-content current"> 
                  <ul>  
                    <li class="${this.name}">
                        ${unsafeHTML(this.text)}
                        ${unsafeHTML(this.list)}
                     </li>                                                              
                   </ul> 
                   </div>                
                </div>                
            </div>
         </div>
       </div>
      </section>
      `
  }
}

customElements.define('tabs-element',Tabs)