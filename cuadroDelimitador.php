<?php
/* conexión a la base de datos */
include 'conectarBD.php';
$conn = conectar();
/* Se extrae el id pasado por petición get */
$id=$_GET['id'];

/* Calcula un cuadro delimitador del edificio, sus rutas de evacuación y la zona de seguridad hace la búsqueda de la geometrías por medio del id del edificio */
$cuadroDelimitador = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                                        ST_ymax(bb)*-1 as ymax, 
                                        ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                                        ST_Ymax(bb)-ST_ymin(bb) as alto
                                        from 
                                        (select ST_Extent(cuadro_delimitador) bb 
                                        from 
                                          (select st_union(union_capas.geom) as cuadro_delimitador
                                          from (select geom from edificios where id='$id'
                                            union
                                            select geom from ruta_evacuacion where edificios_rutas='$id'
                                            union
                                            select geom from zonas_seguras where id_edificio_asig='$id') as union_capas) as cd ) as extent");
                               
if (!$cuadroDelimitador) 
{
  echo '{"error":"Error en la consulta 1 de base de datos en edificios"}';
  exit;
}

/* Se guardan en un objeto los datos consultados del cuadro delimitador */
$object_cuadroDelimitador= new stdClass();
$object_cuadroDelimitador->dimensiones = pg_fetch_all($cuadroDelimitador);

/* los objetos creados anteriomente se insertan en un array para ser convertidos en json */
echo json_encode(array($object_cuadroDelimitador));

?>