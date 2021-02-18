import {LitElement, html, css, unsafeCSS} from 'lit-element'
import {shared} from '../../css/shared'
import {ModalElement} from '../../Modal/Modal'
import elements from '../../Modal/components/index'

const bigTitle = (color, title, isTopic=false, icon=undefined)=>{
     
    const h2 = this.shadowRoot.querySelector('h2')
        h2.classList.add(this.titlesize ? "small": "big")

    if(isTopic){
        return html`
            <div class="topic-title flex" >
            ${ icon ?  html` <div class="title-icon-cont" style="background:${color}">  
                <div>
                    <img src="${icon}"  alt="icon ${title}"/>
                </div>
              </div> ` :null
            } 
            <h2 style="background:${color}">${title}</h2>
            </div>
      `
    } else{
        return html`
        <div style="background:${color}" class="tags left"></div>
                    <h2 style="color:${color}" >${title}</h2>
        <div style="background:${color}"  class="tags right"></div>
      `
    }
}

export class Block extends LitElement{
    
    static get properties(){
        return{
            title:{type:String},
            titlesize:{type:String},
            light:{type:String},
            modal:{type:String},
            isTopic:{type:String},
            icon:{type:String},
            withTop:{type:String},
            justifyContent: {type: String}
        }
    }

    static get styles(){
        return [
            shared
        ]
    }

    constructor(){
        super()
        this.modal = false
        this.elementType =''
        this.modalInfo=[]
    }

    firstUpdated(){
        const nodes = this.shadowRoot.querySelector('#icons').assignedNodes();
        this.shadowRoot.querySelector('#icons').addEventListener("click", this.showModal.bind(this))
        nodes.forEach((element, index) => {
            element.delay= `${index * 0.2}s`
            if(element.modaltype){
                //console.log(element)                
            }
        });


        const tags = this.shadowRoot.querySelectorAll('.tags')
        if(this.titlesize){
            [].forEach.call(tags, (tag)=>{
                tag.style.width="30px"
                tag.style.height="25px"
            })
        }
    }

    showModal(e){
        console.log("aaaaaa", e)
        this.elementType = e.target.modaltype
        this.modalInfo = e.target.modalinfo
        this.modal = true;

    } 

    closeModal(){
        this.modal = false;
    }

    renderModalChild(){
     console.log(this.modalInfo)
       const element = document.createElement(this.elementType)
       element.color = this.light
       element.title= this.modalInfo[0]
       element.info= this.modalInfo[1]
       element.link = this.modalInfo[2]
       element.isShort = true
       return element
    }

    bigTitle(color, title, isTopic=false, icon=undefined){
    
        if(isTopic){
            return html`
                <div class="topic-title flex" >
                ${ icon ?  html` <div class="title-icon-cont" style="background:${color}">  
                    <div>
                        <img src="${icon}"  alt="icon ${title}"/>
                    </div>
                  </div> ` :null
                } 
                <h2 style="background:${color}">${title}</h2>
                </div>
          `
        } else{
            return html`
            <div style="background:${color}" class="tags left"></div>
                        <h2 style="color:${color}" class="${this.titlesize ? "small": "big"}" >${title}</h2>
            <div style="background:${color}"  class="tags right"></div>
          `
        }
    }
   

    render(){
        return html`
          <style>
          
            header{
                width:fit-content;
                height:auto;
                margin:0 auto;
                padding:.3rem 1.4rem;
                position: relative;
            }

            .buttons-group__intro {
                text-align: center;
                padding-bottom: 10px;
                margin: 60px auto 0;
                line-height: 22px;
                font-size: 20px;
                color: #9e9e9e;
            }

            div{
                color:#707070;
            }

            section{
                overflow:hidden;
                margin:2.3rem 0;
                background: white;
                box-shadow: 0px 0px 18px lightgrey;
                border-radius: 3px;
                padding: 2rem;
            }

              .big{
                font-size:1.2rem;
                color: #9e9e9e !important;
                font-weight: bold;
              }

              .small{
                font-size:1.5rem;
                text-align:center;
                letter-spacing:.2rem; 
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

              .icons-container{
                width: 90%;
                display: flex;
                flex-wrap: wrap;
                margin: 25px auto;               
              }

              ::slotted(icon-element){
                  margin:1.5%;
                  flex:none;
                  min-width:190px;
              }
              
              .division{
                  margin-top:2rem;
                  display:block;
                  position:relative;
                  left:50%;
                  transform:translateX(-50%);
              }
              
              .topic-title {
                  width: 800px;
                  min-height:56px;
              }
              .topic-title h2{
                 color:white;
                 margin:0;
                 font-size:1.6rem;
                 width:98%;
                 display:flex;
                 padding-left: 1rem;
                 align-items:center;
                 text-align:left;
                 border-radius: 3px;
              }

              

              .topic-title > div{
                  
              }

              .flex{
                  display:flex;
              }
              
              .title-icon-cont{
                  width: 56px;
                  height:56px;
                  margin:0 .5%;
                  padding:5px;
                  position:relative;
              }

              .title-icon-cont::after{
                 content:"";
                 display:block;
                 width:10px;
                 height:3px;
                 position:absolute;
                 top:47%;
                 right:-5px;
                 z-index:-1;
                 background:${this.light};
              }
              
              .title-icon-cont div{
                 width:52px;
                 height:52px;
                 display:flex;
                 justify-content:center;
                 align-items:center;
              }

              .title-icon-cont div img{
                  width:80%;
              }
              .top{
                  margin-bottom: 5rem;
              }
              @media (max-width:700px){
                .big{
                  font-size:1.6rem;
                }

                .icons-container{
                    flex-wrap:wrap;
                }

                .tags{
                    width: 30px;
                    height:25px;
                }

                .tags::before{
                  
                }

                .topic-title {
                  width: 100%;
              }
              .topic-title h2{
                 font-size:1.2rem;
              }
              }
          </style>
          <section>
            ${
                this.modal ? html`
                 <modal-element .closeEv="${this.closeModal.bind(this)}">
                   ${this.renderModalChild()}
                 </modal-element>
                `: null
            }
             ${this.withTop ? html`
                <div class="icons-container top">
                <slot name="top"></slot>
            </div>
             `:null}
             <header>
             ${this.title ? this.bigTitle(this.light, this.title, this.isTopic, this.icon) : null}
             </header>              
             <div class="icons-container" style="justify-content: ${this.justifyContent}">
                 <slot id="icons" name="icons"></slot>
             </div>
             <div class="icons-container">
             <slot></slot>
             </div>
           
          </section>
        `
    }
}

customElements.define('block-element', Block)