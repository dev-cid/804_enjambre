import {LitElement, html, css, unsafeCSS} from 'lit-element'
import FontAwesome from 'lit-fontawesome'


export class GalleryItem extends LitElement{
    
    static get properties(){
        return {
           url:{type:String},
           alt:{type:String},
           text:{type:String},
           title:{type:String},
           color:{type:String}
        }
    }


    static get styles(){
        return unsafeCSS`
          article{
            position:absolute;
            width:100%;
          }

          article img{
            width:100%;
            object-fit: contain;
          }

          article::after{
            content:"";
            width:100%;
            height:100%;
            display:block;
            background:${this.color};
            position:absolute;
            top:0;
            left:0;
          }

          .information-cont{
            position: absolute;
            bottom:5%;
            width:90%;
            margin:3%;
            font-family: sans-serif;
            color:white;
          }

          .information-cont h2{
            font-size: 2.1rem;
            padding-bottom:1rem;
            maring-botton:1rem;
            width:fit-content;
            border-bottom:1px dotted;
          }
        `
    }

    constructor(){
      super()
      this.color = "#000"
    }


    render(){
        return html`
          <article>
            <img src="${this.url}" alt="${this.alt }">
            <div class="information-cont">
              ${
                this.title ? html`
                  <h2>${this.title}</h2>
                `: null
              }
              ${this.text ? html`
                <p>${this.text}</p>
              `: null} 
            </div>
          </article>
        `
    }
}

export class GalleryElement extends LitElement{
    
    static get properties(){
        return {
           autoplay: {type: Boolean},
           arrows:{type: Boolean}
        }
    }

    static get styles(){
        return css`
          .gallery{
              position:relative;
              width:100%;
          }
        `
    }

    constructor(){
        super()
        this.autoplay = false
        this.arrows = false
        this.active = null
        this.time = 2000
        this.interval = null
    }

    firstUpdated(){
      let nodes = this.shadowRoot.querySelector('#content').assignedNodes()
      let index = nodes.length
      nodes.forEach((node, ix) =>{
        if(ix == 0){
          this.activate = node
          this.activate.classList.add("active-slider")
        }
        node.style.cssText = `z-index:${index}; position:absolute;width:100%; height:100%;`
        index--
      })

      this.interval = setInterval(this.update.bind(this),this.time)
    }


    update(){
      this.activate()
    }

    activate( activeNode ){
      this.activate.classList.remove('active-slider')
      this.activate = activeNode
      this.activate.classList.add("active-slider")
    }

    render(){
        return html`
          <section class="gallery">
            <slot id="content" name="item"></slot>
          </section>
        `
    }
}

customElements.define('gallery-element', GalleryElement)
customElements.define('gallery-item', GalleryItem)