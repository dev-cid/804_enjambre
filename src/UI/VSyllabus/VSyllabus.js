import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


export class SyllabusItem extends LitElement{

    static get properties(){
        return{
            title:{type:String},
            color:{type:String},
            labelcolor:{type:String},
            bordercolor:{type:String},
            isOpen:{type:Boolean},
            index:{type:Number},
            logo:{type:String},
            callback:{type:Function}
        }
    }

    constructor(){
      super()
      this._height = '70px';
      this._contentHeight =0;
    }

    firstUpdated(){
      console.log(this.callback)
    }

    
    toggleOpen(){
       this.isOpen = !this.isOpen
      //  this.dispatchEvent(new CustomEvent('toggle'))
      if(this.callback){
        this.callback({target:this})
      }
    }
    

    render(){
        return html`
        <style>
          *{
            box-sizing: border-box;
          }
          ::slotted(img) {
              display:none;
            }
                
          .container{
              width: 85%;
              overflow:hidden;
              transition: height .3s;
              border-bottom: 1px solid #dbdbdb;
              margin: 0 auto;
            }

            div{
              font-size: 18px;
            }

            .closed{
              border-bottom: 1px solid #dbdbdb;
            }

            .header-item{
              padding:.7rem 1.3rem;
              position: relative;
              cursor:pointer;
              height: 70px;
            }
            .closed:hover{
              border-bottom: 1px solid ${this.bordercolor}
            }

            .closed:hover span{
               color: ${this.bordercolor}
            }

            

            
              .span-number{                
                width: 35px;
                height: 35px;
                display: flex;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: ${this.color};
                border-radius: 50%;
                color: white;
                justify-content: center;
                align-items: center;
                z-index: 99;
                left: 5rem;
            }

            .icon-img{             
              transform: scale(1);
              display: flex;
              position: absolute;
              top: 15%;
              border-radius: 50%;
              justify-content: center;
              align-items: center;
              z-index: 99;
              background: #fbd91f;
              left: 0.5rem;
              padding: 0.2rem;
              width: 50px;
              height: 50px;
          }

            .header-item span{
              color: ${this.labelcolor};
              font-size: 1.3rem;
              margin: .5rem 0 0 7.5rem;
              text-shadow: 0px 0px;
            }

            .item-content{
              padding: 2rem 3rem;
              background:white;
              height: 90%;
              overflow: auto;
              color: #707070;
            }

            .item-content::-webkit-scrollbar {
                width: 6px;
              }

              /* Track */
              .item-content::-webkit-scrollbar-track {
            
                
              }

              /* Handle */
              .item-content::-webkit-scrollbar-thumb {
                background: ${this.color};
                border-radius: 10px;
              }

              /* Handle on hover */
              .item-content::-webkit-scrollbar-thumb:hover {
                background: #555;
              }

            .flex{
              display:flex;
              justify-content:space-between;
            }

            li {
              list-style: circle !important;
            }

            .cross{
              width: 24px;
              height: 24px;
              position:relative;
              margin:0 1% 2% 0;
            }
            .cross{
              display:flex;
              justify-content:center;
              align-items: center;
            }
            .cross div{
              width:100%;
              height: 1px;
              background : ${this.labelcolor}
            }

            .cross div:nth-of-type(1){
               transform: rotate(90deg);
               position: absolute;
               top:50%;
               left:0;
            }


            .animated div:nth-of-type(2){
              animation-delay: .5s;
              animation-name: animated;
              animation-duration: 1s;
              animation-fill-mode: both;
            }

            .animated div:nth-of-type(1){
              animation-delay: .2s;
              animation-name: animated2;
              animation-duration: 1s;
              animation-fill-mode: both;
            }


            .noanimated div:nth-of-type(2){
              animation-delay: .2s;
              animation-name: animated3;
              animation-duration: 1s;
              animation-fill-mode: both;
            }

            .noanimated div:nth-of-type(1){
              animation-delay: .5s;
              animation-name: animated4;
              animation-duration: 1s;
              animation-fill-mode: both;
            }




            @keyframes animated{
              0%{
                transform: rotate(0deg);
                opacity:1;
              }

              100%{
                transform: rotate(360deg);
                opacity:0;
              }
            }

            @keyframes animated2{
              0%{
                transform: rotate(0deg)
              }

              100%{
                transform: rotate(360deg)
              }
            }


            @keyframes animated3{

              0%{
                transform: rotate(360deg);
                opacity:0;
              }

              100%{
                transform: rotate(90deg);
                opacity:1;
              }

              
            }

            @keyframes animated4{
             
              0%{
                transform: rotate(360deg)
              }

              100%{
                transform: rotate(0deg)
              }

            }

            .container-open{

            }

            @media (max-width:600px){
              .item-content{
                  padding: 1.3rem 2rem;
                }
                .header-item span{
                  font-size:1rem;
                }
            }
        </style>
         
          <div  class="container ${!this.isOpen ? 'closed': ''}" style=" height:${this.isOpen ?'400px': this._height}">
            <header @click="${this.toggleOpen}" class="header-item flex">
              <img class="icon-img" src="${this.logo}">
              <div class="span-number">${this.index}</div>
              <span>${this.title}</span>
              <div class="cross ${this.isOpen ? 'animated': 'noanimated'}">
                <div></div>
                <div></div>
              </div>
            </header>
              <div class="item-content">
                <slot class="content" name="content"></slot>
                <slot name="video"></slot>
              </div>
          </div>
        `
    }
}

customElements.define('vsyllabus-item', SyllabusItem)

export class Syllabus extends LitElement{

    static get properties(){
      return{
        htm:{
          type: Array
        },
        color:{type:String},
        labelcolor:{type:String},
        bordercolor:{type:String},
        title:{type:String},
        icon:{type:String},
        content:{type:String},
      }
    }

      constructor(){
        super()
        this._current=null;
      }

      firstUpdated(){
        const nodes = this.shadowRoot.querySelector('.items').assignedNodes();
        
        // const nodes = document.querySelector('syllabus-item')
        // console.log(nodes);

        [].forEach.call(nodes, element=>{
           element.callback = this.openInfo.bind(this)
        })
      }

      openInfo({target}){
        console.log("****", target)
        if(this._current == target){
          return
        }
        console.log(this._current)
        if(this._current !== null){
           this._current.isOpen = false
        }
      
        this._current = target
      }

      static get styles(){
        return css`
        ::slotted(*) { font-family: Roboto, sans-serif; }
        
        `
    }
     
     render(){
         return html`
           <style>
             table th{
               background:${this.color};
               padding: 1%;
               font-size:.8rem;
             }
             tr td{
               padding: 1%;
               font-size:.7rem;
             }
              section{
                background: white;
                box-shadow: 0px 0px 18px lightgrey;
                border-radius: 3px;
                padding: 2rem;
                margin: 2.3rem 0;
                color: #707070;
              }
              
              li{
                list-style: circle;
                line-height: 1.5rem;
              }

              img{
                width: 100%;
              }

              p{
                line-height: 1.4rem;
              }

              .flex{
                display:flex;
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
             
              header{
                width:fit-content;
                height:auto;
                margin:0 auto;
                padding:.3rem 1.4rem;
                position: relative;
              }

              h2{
                font-size: 1.5rem;
                color: #9e9e9e !important;
              }

              .content{
                width: 80%;
                margin: 0.8rem auto;
              }
              

              @media (max-width:600px){
                section{
                  width: 100%;
                  margin: 3rem auto;
                }
                
              }
           </style>
           <section class="accordeon">
           ${
             this.title ? html`
              <header>
                <div style="background:${this.color}" class="tags left"></div>
                <h2>${this.title}</h2>
                <div style="background:${this.color}"  class="tags right"></div>
              </header>
             `:null
           }
          <div class="content">
          ${
            this.content ? html`
            ${unsafeHTML(this.content)}
            `: null
          }   
          </div>
            
             <slot class="items" name="items"></slot>
           </section>
         `
     }
}
customElements.define("vsyllabus-element", Syllabus)