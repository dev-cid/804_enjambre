 function numbersBehavior(target, draggable, cssClass){
    draggable.style.display = "none"
    target.querySelector("span").textContent = draggable.textContent
    target.classList.add(cssClass)
}

function clockBehavior(target, draggable, cssClass){
    draggable.style.display = "none"
    target.classList.add(cssClass)
}

 const functions = {
    numbersBehavior,
    clockBehavior
}

export default functions
