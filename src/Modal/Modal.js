import {LitElement, html} from 'lit-element';

export class ModalElement extends LitElement{
    
    static get properties(){
        return{
            title:{type:String},
            closeEv:{type:Function}
        }
    }

    _close(){
        const event = new CustomEvent('close-modal')
        this.dispatchEvent(event)
    }

 

    render(){
      return html`
      <style>
        :host{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:999;
            background:rgba(0,0,0,.4);
            display:flex;
            justify-content:center;
            align-items:center;
            animation-name: fadeIn;
            animation-duration: 1s;
        }

        .container{
            width:0;
            min-height:0;
            border-radius:50%;
            max-width:1000px;
            max-height:550px;
            background:white;
            border-radius:8px;
            box-shadow: 0 4px 13px -5px rgba(0,0,0,.5); 
            transform: translateY(100%);
            opacity:0;
            animation-name: circle;
            animation-duration: 1s;
            animation-delay:.2s;
            animation-fill-mode: both;
            
        }
        .container div{
            position:relative
        }
        .container span{
            position: absolute;
            top:17px;
            right:33px;
            color: gray;
            font-weight:bold;
            cursor:pointer;
            color:white;
            z-index:99;
        }

        .modal-content{
            animation-name: fadeIn;
            animation-duration: 1s;
        }
        

        @keyframes circle{
            0%{
                transform: translateY(100%);

            }

            50%{
                border-radius:10px;
            }

            100%{
                transform: translateY(0);
                opacity:1;
                width:100%;
                min-height:300px;

            }
        }

  

        @keyframes fadeIn{
            0%{
                opacity:0
            }

            100%{
                opacity:1
            }
        }
      </style>
       <div class="container">
          <header>
          ${
            this.title ? html`
             <h3>${this.title}</h3>
                `:null
            }
          </header>
          <div class="modal-content">
            <span @click=${this.closeEv}>X</span>
            <slot></slot>
          </div>
       </div>
      `
    }
}

customElements.define('modal-element', ModalElement)