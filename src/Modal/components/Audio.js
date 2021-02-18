import {LitElement, html, css, unsafeCSS} from 'lit-element'
import { Profile } from './Profile'

export class AudioElement extends Profile{
    render(){
        return html`
          <style>
              .audio-container{
                width: 650px;
                height: 200px;
                margin: 2rem auto;
                z-index: 99;
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
                
                <div class="audio-container">
                <p>Haz clic sobre el reproductor para escuchar el audio.</p>
                <audio src="${this.info}" controls> </audio>
                </div>
               
          </div>
        `
    }
}

customElements.define('audio-element', AudioElement)