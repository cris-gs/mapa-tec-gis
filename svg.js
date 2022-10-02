/* función que recorre el json que proviene de dimensiones.php 
    y lo carga en la función de verMapa */
function cargar_figura() 
{   
    fetch('dimensiones.php')
    .then(response => response.json())
    .then(data => verMapa('500px', '500px', data));
}

/* función que llama a las otras funciones para crear 
    las partes del svg según las dimensiones traidas en el json */
let test;
let dimensions;
let active = true;
function verMapa(width, height, geometrias) 
{   
    console.log(geometrias[0])
    svg = crearSVG(width, height, geometrias[0].dimensiones[0])
    const tipo = ['edificios', 'aceras', 'vialidad', 'zonasVerdes', 'rutasEvacuacion', 'zonasSeguras']
    for (let i = 0; i < 6; i++) { 
        ancho = parseFloat(geometrias[i].dimensiones[0].ancho)
        alto = parseFloat(geometrias[i].dimensiones[0].alto)
        if (alto > ancho)
            ancho_proporcional = alto / height;
        else
            ancho_proporcional = ancho / width;
        crear_path(svg, geometrias[i].objetos, ancho_proporcional, tipo[i]);
        document.getElementById("mapa").appendChild(svg);
     }
     test = svg
}

/* función que se encarga de ir cargando en un svg los 
    paths correspondientes asignandole a este ciertas propiedades como id, ancho, alto... */
function crearSVG(width, height, dimensiones) {
    let xmlns = "http://www.w3.org/2000/svg";
    let o_svg = document.createElementNS(xmlns, "svg");
    o_svg.setAttribute('id', 'svgMapa');
    o_svg.setAttribute('width', width);
    o_svg.setAttribute('height', height);
    dimensions = dimensiones;
    vb = dimensiones.xmin + ' ' + dimensiones.ymax + ' ' + dimensiones.ancho + ' ' + dimensiones.alto
    o_svg.setAttribute('viewBox', vb);
    return (o_svg)
}

/* función que se encarga de formar las figuras geometricas traídas del json
    asignandole atributos como relleno, borde, acción... */
function crear_path(svg, geometrias, ancho_proporcional, tipo) {
    let xmlns = "http://www.w3.org/2000/svg";
    for (geom in geometrias) {
        figura = document.createElementNS(xmlns, "path");
        figura.setAttribute("d", geometrias[geom].svg);
        if (tipo === "edificios"){
            figura.setAttribute("stroke", "black");
            figura.setAttribute("onclick", `mostrarEdificio(${geometrias[geom].id})`);
        }else{
            figura.setAttribute("stroke", "transparent");
        }

        figura.setAttribute("class", tipo);
        figura.setAttribute("fill", colorRGB(tipo, geometrias[geom].id));
        figura.setAttribute("stroke-width", ancho_proporcional+1000);
        svg.appendChild(crear_grupoSVG(figura, geometrias[geom].nombre));
    }
}

/* función que agrupa las figuras creadas en la función anterior, basandose en las
    geometrias correspondientes */
function crear_grupoSVG(svg, descripcion) {
    let xmlns = "http://www.w3.org/2000/svg";
    grupo = document.createElementNS(xmlns, "g");
    titulo = document.createElementNS(xmlns, "title");
    titulo.innerHTML = descripcion
    grupo.appendChild(titulo);
    grupo.appendChild(svg);
    return (grupo)
}

/* función para agregar acción a los elementos del svg que 
    corresponden a edificios*/
function mostrarEdificio(id)
{ 
    let vb;
    if(active) {
        //figura.setAttribute("class", "active");
        let url="/mapa-tec-gis/cuadroDelimitador.php?id="+id;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200){
                const datos = eval('('+this.responseText+')');
                const coordinates = datos[0].dimensiones[0];
                vb = coordinates.xmin  + ' ' + coordinates.ymax + ' ' + coordinates.ancho + ' ' + coordinates.alto;
                test.setAttribute('viewBox', vb);
                test.setAttribute('class', 'active');
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        active = false;
        validaCapas("rutasEvacuacion", active);
        validaCapas("zonasSeguras", active);
    } else {
        vb = dimensions.xmin + ' ' + dimensions.ymax + ' ' + dimensions.ancho + ' ' + dimensions.alto;
        test.setAttribute('viewBox', vb);
        test.removeAttribute('class', 'active');
        active = true;
        validaCapas("rutasEvacuacion", active);
        validaCapas("zonasSeguras", active);
    }
}

/* función que se encarga de asignar color a los elementos del svg */
function colorRGB(tipo, id){
    if(tipo === "edificios"){
        if(['2', '16', '17', '29', '30', '41', '46'].includes(id)){
            return "rgba(30, 102, 236)"; 
        }else{
            return "#E03616"; 
        }
    }else if(tipo === "aceras"){
        return "grey";
    }else if(tipo === "vialidad"){
        return "rgba(54, 54, 54)";
    }else if(tipo === "zonasVerdes"){
        return "rgba(37, 175, 106)";
    }else if(tipo === "rutasEvacuacion"){
        return "#FAC748";
    }else{
        return "#1D2F6F"
    }
    
}

/* muestra o esconde una capa, según si está en vista general o no */
function validaCapas(capa, active){
    let elements = document.getElementsByClassName(capa);
    if(!active){
        for(let i = 0; i < elements.length; i++) {
            elements[i].classList.add('show');
        }
    } else {
        for(let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('show');
        }
    }
    
}
