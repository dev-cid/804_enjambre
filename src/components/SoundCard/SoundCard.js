import {LitElement, html, css} from 'lit-element'
import { RootHeaderSlider} from '../../UI/RootHeaderSlider/RootHeaderSlider'
import FontAwesome from 'lit-fontawesome'

export class SoundCard extends LitElement{
    

    static get properties(){
        return{
            image:{type:String},            
            audio:{type:String},
            position:{type:String},
            progresscolor:{type: String}
        }
    }

    static get styles(){
        return css`
            .sound-card{
                width: 300px;
                height: 300px;
                position: relative;
            }

           .rounded .image-container{               
               overflow:hidden;
               width:100%;
               height:100%;
               position:relative;
           }
           .rounded img{
             object-fit: contain;
             position:absolute;
             width: 85%;
             left:50%;
             top:50%;
             transform:translate(-50%,-50%);
           }
           .info-container{
               position: absolute;
               top:0;
               left:0;
               width:100%;
               height:100%;
               display:flex;
               justify-content:center;
               align-items:center;
               background: rgb(2,0,36);
               background: linear-gradient(355deg, rgba(0,0,0,.6) 0%, rgba(0,212,255,0) 80%);
               border-radius:50%;
           }

           .info-container p, .info-container small{
             color:white;
             font-family:sans-serif;  
             width:90%;
             margin:0 auto;
             text-align:center;
             text-shadow: #000 1px 0 10px; 
             transform: translateY(45%);
           }

           .info-container p{
             font-size:1.5rem; 
           }

           .info-container small{
             font-size:1rem; 
             display:block;
             margin-top:60px;
           }

           ${
               FontAwesome
           }

           .button{
              width:40px;
              height:40px;
              background: white;
              border-radius: 50%;
              margin: 0 auto;
              position:relative;
              z-index:9;
              display:flex;
              justify-content:center;
              align-items:center;
              transform:translateY(-20px);
              box-shadow: 0 4px 8px -3px rgba(0,0,0,.6);
              cursor:pointer;
           }

           canvas{
               position:absolute;
               top:0;
               left:0;
               transform:rotate(90deg);
               width:90%;
           }

           
        

           @media (max-width: 500px){
            .sound-card{
                width:350px;
                height:350px;
                position:relative;
                margin:1rem auto;
            }
           }
        `
    }

    constructor(){
        super()
        this.pane = null
        this.position= -50
        this.play = false
        this.audioNode = null
        this.canvas=null
        this.context=null
        this.degree=0
    }

    firstUpdated(){
        this.pane  = this.shadowRoot.querySelector('.sound-card')
        this.audioNode = this.shadowRoot.querySelector('audio')
        this.canvas = this.shadowRoot.querySelector('canvas')
        if(this.canvas.getContext('2d')){
            this.initCanvas()
        }
        this.audioNode.addEventListener('ended', this.audioNodeEnd.bind(this))
        this.audioNode.addEventListener('timeupdate', this.audioNodeUpdate.bind(this))
       // this.buildInteraction()
    }

    initCanvas(){
         this.canvas.width  = this.canvas.parentNode.offsetWidth
         this.canvas.height = this.canvas.parentNode.offsetHeight
         this.context = this.canvas.getContext('2d')
         this.draw()
    }

    draw(){
        this.context.lineWidth = 6
        this.context.beginPath()
        const radian = (Math.PI / 180 ) * this.degree
        this.context.arc(250, 250, 247, 0, radian, false)
        this.context.strokeStyle=this.progresscolor
        this.context.stroke()
    }
     
    audioNodeEnd(){
       this.play = false
       this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
       this.requestUpdate()
    }

    audioNodeUpdate(){
       this.degree = Math.ceil((this.audioNode.currentTime / this.audioNode.duration) * 360)
       this.draw()
    }

    buildInteraction(){
        const image = this.shadowRoot.querySelector('img')
        this.pane.addEventListener("mousemove", (ev)=>{
           this.position = -(ev.pageX + 530) * 0.04  
        })
    }
    
    playSound(){
        this.play = !this.play
        if(this.audioNode.paused){
            this.audioNode.play()
        }else{
            this.audioNode.pause()
        }
        this.requestUpdate()
    }


    render(){
        return html`
         <div class="sound-card rounded">
             <div class="image-container">
               <img style="transform:translate(${this.position}%,-50%);" src="${this.image}" alt="${this.image.alt}"/>
             </div>
             <div class="button" @click="${this.playSound}">
                ${
                  this.play ? html`
                  <i class="fas fa-pause"></i>
                  `:
                  html`
                  <i class="fas fa-play"></i>
                  `
                }
             </div>
             <audio preload src="${this.audio}" type="audio/mp3">
             
          </div>
        `
    }
}

customElements.define('sound-card', SoundCard)