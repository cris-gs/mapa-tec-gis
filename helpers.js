/* se extraen los elementos checkbox de para cada capa */
const aceras = document.getElementById('aceras');
const vialidad = document.getElementById('vialidad');
const edificios = document.getElementById('edificios');
const zonasVerdes = document.getElementById('zonasVerdes');

/* muestra o esconde la capa de aceras, según el valor del checkbox */
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

/* muestra o esconde la capa de vialidad, según el valor del checkbox */
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

/* muestra o esconde la capa de edificios, según el valor del checkbox */
function validaCheckboxEdificios(){
    let edificiosChecked = edificios.checked;
    let elements = document.getElementsByClassName("edificios")
    if(!edificiosChecked){
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="hidden" 
        }
    }else{
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.visibility="visible"
     
        }
    }

}

/* muestra o esconde la capa de zonas verdes, según el valor del checkbox */
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


/* escucha cuando el estado del los checkbox cambia para llamar a la función correspondiente */
aceras.addEventListener("change", validaCheckboxAceras, false);
vialidad.addEventListener("change", validaCheckboxVialidad, false);
edificios.addEventListener("change", validaCheckboxEdificios, false);
zonasVerdes.addEventListener("change", validaCheckboxZonasVerdes, false);
