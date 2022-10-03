<?php
/* conexión a la base de datos */
include 'conectarBD.php';
$conn = conectar();
/* Se extrae la latitud y longitud del usuario por petición get */
$lat=$_GET['lat'];
$lng=$_GET['lng'];

/* Crea un punto de la ubicación geografica del usuario y lo pasa a formato svg  */
$ubicacionUsuario = pg_query($conn, "select ST_AsSVG(ST_SetSRID(ST_MakePoint('$lat', '$lng'), 5367), 0, 2) as svg;");
                               
if (!$ubicacionUsuario) 
{
  echo '{"error":"Error en la consulta 1 de base de datos en edificios"}';
  exit;
}

/* Se guardan en un objeto los datos consultados */
$object_ubicacionUsuario= new stdClass();
$object_ubicacionUsuario->ubicacion = pg_fetch_all($ubicacionUsuario);

/* los objetos creados anteriomente se insertan en un array para ser convertidos en json */
echo json_encode(array($object_ubicacionUsuario));

?>