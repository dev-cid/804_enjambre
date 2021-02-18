import {LitElement, html, css} from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'


export class IconTwoGooey extends LitElement{
    
    static get properties(){
        return {
            label:{type:String},
            labelcolor:{type:String},
            icon: {type:String},
            color:{type:String},
            dots: {type:Boolean},
            contentImage: {type:Array}
        }
    }

    static get styles(){
         return css`
            article{
                width:100%;
                position:relative;
                animation-name: fadeUp;
                animation-duration: 1s;
                animation-fill-mode: both;
                opacity:0;
                cursor:pointer;
                text-align: center;
                height: auto;
                margin: 2rem auto;
            }
            
            ul{
                list-style-type: none;
            }

            .pure-tree {
                text-align: left;
                display: flex;
                text-align: center;
                padding: 0;
                margin: 0;
                
              }

              img{
                width: 100%;
              }
              .pure-tree.main-tree {
                display: block;
                width: 100%;
              }
              .pure-tree:not(.main-tree) li {
                overflow: hidden;
                height: 0;
                display: block;
              }
              .pure-tree label {    
                font-size: 14px;  
                margin: 1rem auto;          
                cursor: pointer;
                width: 230px;
                display: flex;
                justify-content: center;
                background: #fbd91f;
                border-radius: 7px;
                padding: 1rem;
                height: 50px;
                align-items: center;                
              }
              .pure-tree label:before {
                width: 1em;
                height: 1em;
                line-height: 1em;
                display: inline-block;
                font-family: 'FontAwesome', sans-serif;
                content: "\f114";
                padding-right: .75em;
              }
              .pure-tree label:hover {
                color: #434a58;
                border-bottom-color: #434a58;
              }
                            
              .pure-tree .pure-tree_link a:hover {
                color: #434a58;
              }

              
            
              .pure-tree.nested {
                padding-left: 1.7em;
              }
              .pure-tree [type="checkbox"] {
                display: none;
              }
              .pure-tree [type="checkbox"]:checked + label {
                color: white;
                text-align: center;
                background: #ed6b1f;
                width: 230px;
                margin: 1rem auto;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                box-shadow: 0px 0px 4px #dbdbdb;
              }
              
              .pure-tree [type="checkbox"]:checked ~ ul > li {
                height: auto;
              }

              .images{
                display: block;
                overflow-y: auto;
                height: 400px; 
                border: 0.5px solid #ed6b1f;
                border-radius: 10px;         
                margin: 2rem;      
              }

              .images::-webkit-scrollbar {
                -webkit-appearance: none;
                width: 6px;
                 }

                
                
                .images::-webkit-scrollbar-thumb {
                    background-color: #ed6b1f;
                    border-radius: 20px;
                    
                }
                
                

            article:hover  .icon-cont{
                box-shadow: 0 4px 9px -3px rgba(0,0,0,.6)
            }

            @keyframes fadeUp{
                0%{
                    transform: translateY(50px);
                    opacity:0
                }

                100%{
                    transform: translateY(0);
                    opacity:1;
                }
            }

        `
    }

    // callEvent(){
    //     console.log(this.modaltype)
    //     if(this.modaltype){
    //         this.dispatchEvent(new IconEvent("dispatch", this.modaltype, {}))
    //     }
    // }

    constructor(){
        super()
        //console.log(this.modalinfo)
        // if(this.modaltype){
        //     this.modalinfo = JSON.parse(this.modalinfo)
        // }
    }

    closeModal(){
        this.modal = false;
    }

  
     
    render(){
        const _label = this.label.includes("Unidad") ? 
                       this.label.substring(0, this.label.lastIndexOf("<"))
                       : this.label;
        return html`
         <article> 
          <span style="color:${this.labelcolor}">${unsafeHTML(this.label)}</span>
          <ul id="compositions-list" class="pure-tree main-tree">
              <li>
              <input type="checkbox" id="trigger-views" checked="checked">
              <label for="trigger-views">${this.contentImage.name}</label>
                    <ul class="pure-tree">
                        ${
                            this.contentImage.children.map((element, index)=>{
                                return html`
                                <li>
                                    <input type="checkbox" id="trigger-${element.index}">
                                    <label for="trigger-${element.index}">${element.name}</label>
                                        <ul class="pure-tree">
                                        ${
                                            element.children.map((item, _index)=>{
                                                return html`
                                                <li>
                                                    <input type="checkbox" id="trigger-b${element.index}">
                                                    <label for="trigger-b${element.index}">${item.name}</label>
                                                    <ul class="pure-tree images">
                                                        ${
                                                            item.children.map((info, __index)=>{
                                                                return html`
                                                                <li class="pure-tree_link">
                                                                   <image src="${info.name}"/>
                                                                </li>
                                                                `
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                                `
                                            })
                                         }
                                        </ul>
                                </li>
                                ` 
                            })
                        }
                    </ul>
              </li>
          </ul>
          </article>
        `
    }
}


customElements.define('icon-two-gooey', IconTwoGooey)