<?php
/* llama a conectar que conecta a la base de datos
y extrae los datos de la finca segun la cedula juridica */
$conn = pg_connect("host=localhost port=5432 dbname=mapa_tec_gis user=postgres password=servidor1") or die('{"error":"Error de conexión con la base de datos"}');
$id=$_GET['id'];

$_SESSION["cedulaJuridica"] = $cedulaJuridica;

$cuadroDelimitador = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                                        ST_ymax(bb)*-1 as ymax, 
                                        ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                                        ST_Ymax(bb)-ST_ymin(bb) as alto
                                      from 
                                        (select ST_Extent(geom) bb from edificios where id='$id') as extent  ");
                               
if (!$cuadroDelimitador) 
{
  echo '{"error":"Error en la consulta 1 de base de datos en edificios"}';
  exit;
}

$object_cuadroDelimitador= new stdClass();
$object_cuadroDelimitador->dimensiones = pg_fetch_all($cuadroDelimitador);

echo json_encode(array($object_cuadroDelimitador));

?>