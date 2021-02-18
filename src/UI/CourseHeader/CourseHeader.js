import {LitElement, html, css} from 'lit-element'

export class ModuleItem extends LitElement{
    
    static get properties(){
        return{
            label:{type:String}
        }
    }

    render(){
        return html`
         <style>
             li{
                 list-style-type:none;
                 margin-bottom:1rem;
                 
             }
             li img{
                 width:20px;
                 transform:translateY(3px);
             }
         </style>
          <li>
             <img src='https://cidpullzonestorage.b-cdn.net/enjambre/ios-checkmark-circle-outline.png' alt=${`Image ${this.title}`}/>
             ${this.label}
          </li>
        `
    }
}

class ModuleHeader extends LitElement{
    static get properties(){
        return{
            title:{type:String},
            label:{type:String},
            path:{type:String}
        }
    }

    render(){
        return html`
          <style>
             .module-header{
                background: white;
                box-shadow: 0px 0px 18px lightgrey;
                padding:2rem;
             }

             .content{
                 position:absolute;
                 top:30%;
                 right:-8%;
                 background:#E9ECEF;
                 padding:1rem;
             }

             .info{
                 max-width:77%;
                 position:relative;
             }

             .info img{
                 width:100%;
             }
             
             h2{
                 font-size:1.8rem;
                 color:#9e9e9e;
             }

             h4{
                 font-size:1.2rem;
             }

             ul{
                 margin-left:-25px;
             }

             @media (max-width:900px){
                .info{
                    max-width:100%;
                    position:relative;
                }

                .module-header{
                    padding-bottom:250px;
                }

                .content{
                    position:absolute;
                    width:80%;
                    top:60%;
                    right:50%;
                    transform:translateX(50%)
                }
             }
          </style>
          <div class="module-header">
             <div class="info">
               <h2>${this.title}</h2>
               <div>
               <img src='${this.path}' alt=${`Image ${this.title}`}/>
               </div>

               <div class="content">
                 <h4>${this.label}</h4>
                 <ul>
                    <slot name="item"></slot>
                 </ul>
             </div>
             </div>
             
          </div>
        `
    }
}

customElements.define('module-item', ModuleItem)
customElements.define('module-header', ModuleHeader)