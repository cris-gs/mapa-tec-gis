function cargar_figura() 
{   
    fetch('dimensiones.php')
    .then(response => response.json())
    .then(data => verMapa('100%', '80vh', data, 'edificios'));
}

let test;
function verMapa(width, height, geometrias) 
{   
    svg = crearSVG(width, height, geometrias[0].dimensiones[0])
    const tipo = ['edificios', 'aceras', 'vialidad', 'zonasVerdes']
    for (let i = 0; i < 4; i++) { 
        ancho = parseFloat(geometrias[i].dimensiones[0].ancho)
        alto = parseFloat(geometrias[i].dimensiones[0].alto)
        if (alto > ancho)
            ancho_proporcional = alto / height;
        else
            ancho_proporcional = ancho / width;
        crear_path(svg, geometrias[i].objetos, ancho_proporcional, tipo[i]);
        document.getElementById("mapa").appendChild(svg);
     }
    

}

function crearSVG(width, height, dimensiones) {
    let xmlns = "http://www.w3.org/2000/svg";
    let o_svg = document.createElementNS(xmlns, "svg");
    o_svg.setAttribute('id', 'svgMapa');
    o_svg.setAttribute('width', width);
    o_svg.setAttribute('height', height);
    vb = dimensiones.xmin + ' ' + dimensiones.ymax + ' ' + dimensiones.ancho + ' ' + dimensiones.alto
    o_svg.setAttribute('viewBox', vb);
    return (o_svg)
}

function crear_path(svg, geometrias, ancho_proporcional, tipo) {
    let xmlns = "http://www.w3.org/2000/svg";
    for (geom in geometrias) {
        figura = document.createElementNS(xmlns, "path");
        figura.setAttribute("d", geometrias[geom].svg);
        if (tipo === "edificios"){
            figura.setAttribute("stroke", "black");
        }else{
            figura.setAttribute("stroke", "transparent");
        }
        
        figura.setAttribute("class", tipo);
        figura.setAttribute("fill", colorRGB(tipo));
        figura.setAttribute("stroke-width", ancho_proporcional+1000);
        figura.setAttribute("onclick", `mostrarEdificio(${geometrias[geom].id}, ${tipo})`);
        svg.appendChild(crear_grupoSVG(figura, geometrias[geom].nombre));
    }
}

function crear_grupoSVG(svg, descripcion) {
    let xmlns = "http://www.w3.org/2000/svg";
    grupo = document.createElementNS(xmlns, "g");
    titulo = document.createElementNS(xmlns, "title");
    titulo.innerHTML = descripcion
    grupo.appendChild(titulo);
    grupo.appendChild(svg);
    return (grupo)
}

function mostrarEdificio(id, tipo)
{   
    if(tipo.id === "edificios"){
        alert(`Soy el edificio id: ${id}`)
    }else if(tipo.id === "aceras"){
        alert(`Soy la acera id: ${id}`)
    }else if(tipo.id === "vialidad"){
        alert(`Soy la via id: ${id}`)
    }else{
        alert(`Soy la zona verde id: ${id}`)
    } 
}

function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
}

function colorRGB(tipo){
    if(tipo === "edificios"){
        let coolor = "(" + generarNumero(255) + "," + generarNumero(255) + "," + generarNumero(255) + ", 0.5)";
        return "rgba" + coolor;
    }else if(tipo === "aceras"){
        return "grey";
    }else if(tipo === "vialidad"){
        return "rgba(54, 54, 54)";
    }else{
        return "rgba(37, 175, 106)";
    } 
    
}
