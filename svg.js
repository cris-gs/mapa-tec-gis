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
let buildings;
let dimensions;
let active = true;
function verMapa(width, height, geometrias) 
{   
    console.log(geometrias[0])
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
    if (tipo === 'edificios') {
        buildings = geometrias;
    }
    for (geom in geometrias) {
        figura = document.createElementNS(xmlns, "path");
        figura.setAttribute("d", geometrias[geom].svg);
        if (tipo === "edificios"){
            figura.setAttribute("stroke", "black");
        }else{
            figura.setAttribute("stroke", "transparent");
        }
        
        figura.setAttribute("class", tipo);
        figura.setAttribute("fill", colorRGB(tipo, geometrias[geom].id));
        figura.setAttribute("stroke-width", ancho_proporcional+1000);
        figura.setAttribute("onclick", `mostrarEdificio(${geom}, ${tipo})`);
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
function mostrarEdificio(geom, tipo)
{ 
    const building = buildings[geom];
    const svg = building.svg
    const coordinates = svg.split(' ');
    
    let vb;
    if(active) {
        vb = (parseFloat(coordinates[1]) - 25).toString()  + ' ' + (parseFloat(coordinates[2]) - 50).toString() + ' ' + '100' + ' ' + '100';
        active = false;
    } else {
        vb = dimensions.xmin + ' ' + dimensions.ymax + ' ' + dimensions.ancho + ' ' + dimensions.alto;
        active = true;
    }
    test.setAttribute('viewBox', vb);
    console.log(dimensions.xmin + ' ' + dimensions.ymax + ' ' + dimensions.ancho + ' ' + dimensions.alto)
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
    }else{
        return "rgba(37, 175, 106)";
    } 
    
}
