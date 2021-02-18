import {LitElement, html, css} from 'lit-element'

export class Layout extends LitElement{
    
    static get properties(){
        return{
            title:{type:String},
            background:{type:String}
        }
    }

    static get styles(){
        return css`
        ::slotted(*) { font-family: Roboto; }
        main{
            padding-bottom:240px;
        }
        `
    }

    render(){
        return html`
             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
             <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"/>
             <link href="https://fonts.googleapis.com/css?family=Roboto:300,700&display=swap" rel="stylesheet">
             <main style="background-position:left bottom; background-repeat:no-repeat;">
                <slot name="header"></slot>
                <slot name="blocks"></slot>
                <slot name="buttonsGroup"></slot>
                <slot name="blockQuestion"></slot>
             </main>
        `
    }
}

customElements.define('layout-element', Layout)