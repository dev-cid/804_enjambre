import {LitElement, html, css, unsafeCSS} from 'lit-element'
class ButtonElement extends LitElement{
    
    static get properties(){
        return{
            label:{type:String},
            icon:{type:String},
            color:{type:String},
            labelcolor:{type:String},
            link:{type:String}
        }
    }
    render(){
        return html`
        <style>
            .custom-button{
                background:${this.color};
                padding: .5rem .8rem;
                border-radius: 30px;
                color:${this.labelcolor};
                text-align:center;
                width:100%;
                max-width:400px;
                font-weight:bold;
                cursor:pointer;
                transition: box-shadow .4s;
            }
            .custom-button:hover{
                box-shadow:0 3px 12px -3px rgba(0,0,0,.5);
            }
            .custom-button div img{
              width:30px;
              margin-right:5px;
            }
            .flex{
                display:flex;
                align-items:center;
            }
            a{
                text-decoration:none;
            }
        </style>
        <a href="${this.link}">
            <div class="custom-button flex">
                ${
                this.icon ? html`
                <div><img src="${this.icon}" /></div>
                `:null
                }<span>${this.label}</span>
            </div>
        </a>
        `
    }
}

customElements.define('button-element', ButtonElement)