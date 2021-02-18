import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { Profile } from './Profile'
import { elements } from '.'

export class VideoElement extends Profile{
    render(){
        return html`
          <style>
              .video-container{
                  width: 650px;
                  height: 320px;
                  margin: 1rem auto;
                  z-index:99;
              }
              p{
                text-align: center;
              }
          </style>

          <div>
              <root-header
                    titlemodule="${this.title}"
                    color="${this.color}"
                    withBack="false"
                    isShort=${true}
                    centered=${true}                    
                ></root-header>
                
                <div class="video-container">  
                   <p>${this.info}</p>                 
                   <iframe width="100%" height="80%" src="${this.link}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
               
          </div>
        `
    }
}

customElements.define('video-element', VideoElement)