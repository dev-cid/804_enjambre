import{LitElement, html} from 'lit-element'
import interact from 'interactjs'
import functions from '../../components/DragBehavior'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export class DragElement extends LitElement{

    static get properties(){
        return{
            draggables:{type:Array},
            zones:{type:Array},
            title:{type:String},           
            color:{type:String},
            content:{type:String},
            theme:{type:String},
            image:{type:String},
            behavior:{type:String},
            classBehavior:{type:String},
        }
    }

    firstUpdated(){
        let zoneActive= false
        const _self = this
        interact('.dr-zone')
        .dropzone({
             accept  : ".draggable",
             overlap : 0.77,
             context : this.shadowRoot,
             ondrop : function(ev){
               
                 if(ev.relatedTarget.dataset.zone == ev.target.id){
                      functions[_self.behavior](ev.target, ev.relatedTarget, _self.classBehavior)
                     }
                 else{
                     mover(ev.relatedTarget)
                     zoneActive = false;  
                 }
             },
 
           ondragenter:function(){
             console.log("eenter")
              zoneActive = true;
           },
 
           ondragleave:function(){
              zoneActive = false;
           },
        })
        interact('.dr-zone')._context=this.shadowRoot
        interact('.draggable')
             .draggable({
                 inertia:true,
                 restrict:{
                     restriction:this.shadowRoot.querySelector(`.${this.theme}`),
                     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                 },
                 onmove: function(ev){
                     console.log(zoneActive)
                     let tg = ev.target,
                      x = (parseFloat(tg.getAttribute('data-x')) || 0) + ev.dx,
                      y = (parseFloat(tg.getAttribute('data-y')) || 0) + ev.dy;
                      tg.style.webkitTransform = tg.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                      tg.setAttribute('data-x', x);
                      tg.setAttribute('data-y', y);
              },
              onend:(event)=>{
                
                 if(!zoneActive){
                      mover(event.target);
                  }
               }
             });
            
            
 
             function mover(event){
                 event.style.webkitTransform = event.style.transform ='translate(' + 0 + 'px, ' + 0 + 'px)';
                 event.setAttribute('data-x', 0);
                 event.setAttribute('data-y', 0);
            }
     }
    render(){
        return html`
          <style>
          section{
            overflow: hidden;
            margin: 2.3rem 0;
            background: white;
            box-shadow: 0px 0px 18px lightgrey;
            border-radius: 3px;
            padding: 2rem;
        
        }

        h2, p{
              color:#707070;
              text-align: center;
          }
        
        .flex{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        header{
            width:fit-content;
            height:auto;
            margin:0 auto;
            padding:.3rem 1.4rem;
            position: relative;
          }

          h2, p{
              color:#707070;
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

        
        .container{
            max-width: 300px !important;
        }

            .numbers, .time{
                padding: 2%;
                background: #eee;
                border-radius: 10px;                
            }

            .flex{
                display: flex;
                justify-content: space-around;
            }

            .numbers .dr-zone{
                font-weight:bold;
                font-size: 1.4rem;
                display:flex;
                justify-content:center;
                align-items:center;
                padding: .3rem;
                background:#FCE690;
                text-align:center;
                width: 100px;
                height: 50px;
                box-shadow:0 4px 10px -5px rgba(0,0,0,.3);
            }

            .numbers .drg-cont{
                margin-top: 2rem;
            }

            .numbers .numbers-succes {
                background: #9FC649;
                color: white;

            }
            .numbers .numbers-succes span{
                color:white;
                font-size: 1.2rem;
                line-height:1.2rem;
            }

            .numbers .label, .time .label{
                background: #fbd91f;
                border-radius: 5px;
                width: 100px;
                text-align:center;
                display:flex;
                justify-content:center;
                align-items:center;
                padding:1%;
                position:relative;
                box-shadow:0 4px 10px -5px rgba(0,0,0,.3);
            }

            .time .dr-zone  span{
              display:none;
            }
            .time .dr-zone{
                width: 27%;
                margin: 1%;
                flex: none;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                color: white;
                background: #ed6b1f;
                border-radius: 10px;
                box-shadow: 2px 2px 4px #aaa;
                font-size: 15px;
            }

            .time .dr-zone img{
                width:100%;

            }

            .time .flex{
                flex-wrap:wrap;
                justify-content:center;
            }

            .time .label{
               font-size: 15px;
               margin:1% .4%;
            }

            .clock-succes{
                background: #9FC649 !important;
            }

            @media (max-width:900px){
                .time .dr-zone{
                    font-size: 11px;
                }
            }
          </style>
          <section>

         ${
            this.title ? html`
             <header>
               <div style="background:${this.color}" class="tags left"></div>
               <h2>${this.title}</h2>
               <div style="background:${this.color}"  class="tags right"></div>
             </header>
            `:null
          }

          ${
            this.content ? html`
            ${unsafeHTML(this.content)}
            `: null
          } 

          <div class="${this.theme}">
             
             <div class="zones-container flex">
                ${
                    this.draggables.map(draggable=>{
                        
                       if(this.image){
                          return html`
                          <div class="dr-zone" id="${draggable.zone}">
                           ${draggable.label}
                          </div>
                          `
                        }else{
                         return html`
                            <div class="dr-zone" 
                                id="${draggable.zone}" 
                            >
                                <span>${draggable.zone}</span>
                            </div>
                            `
                        }
                    })
                }
             </div>
             <div class="drg-cont flex">
             ${
                    this.zones.map(item =>{
                        return html`
                          <span class="draggable label" data-zone="${item}">
                             ${item}
                          </span>
                        `
                    })
                }
             </div>
          </div>
        </section>

        `
    }
}

customElements.define('drag-element', DragElement)