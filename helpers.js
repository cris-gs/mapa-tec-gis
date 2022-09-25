const aceras = document.getElementById('aceras');
const vialidad = document.getElementById('vialidad');
const edificios = document.getElementById('edificios');
const zonasVerdes = document.getElementById('zonasVerdes');
//console.log(checkbox)




function validaCheckboxAceras(){
    let acerasChecked = aceras.checked;
    let elements = document.getElementsByClassName("aceras")

    if(!acerasChecked){   
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="hidden"
        }
    }else{
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="visible"
        }
    }

}

function validaCheckboxVialidad(){
    let vialidadChecked = vialidad.checked;
    let elements = document.getElementsByClassName("vialidad")
    if(!vialidadChecked){
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="hidden"
        }
    }else{
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="visible"
        }
    }

}

function validaCheckboxEdificios(){
    let edificiosChecked = edificios.checked;
    let elements = document.getElementsByClassName("edificios")
    if(!edificiosChecked){
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="hidden"
            elements[i].style.stroke="transparent"   
        }
    }else{
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="visible"
            elements[i].style.stroke="black"        
        }
    }

}

function validaCheckboxZonasVerdes(){
    let zonasVerdesChecked = zonasVerdes.checked;
    let elements = document.getElementsByClassName("zonasVerdes")
    if(!zonasVerdesChecked){
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="hidden"
        }
    }else{
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="visible"
        }
    }

}



aceras.addEventListener("change", validaCheckboxAceras, false);
vialidad.addEventListener("change", validaCheckboxVialidad, false);
edificios.addEventListener("change", validaCheckboxEdificios, false);
zonasVerdes.addEventListener("change", validaCheckboxZonasVerdes, false);
