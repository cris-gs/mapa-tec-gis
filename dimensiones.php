<?php
    /* conexión a la base de datos */
    include 'conectarBD.php';
    $conn = conectar();
    
    /* extrae los voleres maximos y minimos en el eje X y Y correspondiente a los edificios */
    $resultEdificios = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                                    ST_ymax(bb)*-1 as ymax, 
                                    ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                                    ST_Ymax(bb)-ST_ymin(bb) as alto
                                from 
                                  (select ST_Extent(geom) bb from edificios) as extent  ");
                               
    if (!$resultEdificios) 
    {
      echo '{"error":"Error en la consulta 1 de base de datos en edificios"}';
      exit;
    }

    /* extrae el id, nombre, niveles, figuras geográficas de los edificios */
    $object_resultEdificios= new stdClass();
    $object_resultEdificios->dimensiones = pg_fetch_all($resultEdificios);
    $resultEdificios = pg_query($conn, "select id,nombre,niveles,st_assvg(geom,1, 2) as svg from edificios");
    if (!$resultEdificios) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en edificios"}';
      exit;
    }
    /* Se guardan en un objeto los datos consultados anteriormente de la tabla de edificios */
    $object_resultEdificios->objetos = pg_fetch_all($resultEdificios);

    /* extrae los voleres maximos y minimos en el eje X y Y correspondiente a las aceras */
    $resultAceras = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                                    ST_ymax(bb)*-1 as ymax, 
                                    ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                                    ST_Ymax(bb)-ST_ymin(bb) as alto
                                from 
                                    (select ST_Extent(geom) bb from aceras) as extent  ");

    if (!$resultAceras) 
    {
      echo '{"error":"Error en la consulta 1 de base de datos en aceras"}';
      exit;
    }
    /* extrae el id, figuras geográficas de las aceras */
    $object_resultAceras= new stdClass();
    $object_resultAceras->dimensiones = pg_fetch_all($resultAceras);
    $resultAceras = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from aceras");
    if (!$resultAceras) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en aceras"}';
      exit;
    }
    /* Se guardan en un objeto los datos consultados anteriormente de la tabla de aceras */
    $object_resultAceras->objetos = pg_fetch_all($resultAceras);

    /* extrae los voleres maximos y minimos en el eje X y Y correspondiente a la vialidad */
    $resultVialidad = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                                      ST_ymax(bb)*-1 as ymax, 
                                      ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                                      ST_Ymax(bb)-ST_ymin(bb) as alto
                                  from 
                                      (select ST_Extent(geom) bb from vialidad) as extent  ");

    if (!$resultVialidad) 
    {
      echo '{"error":"Error en la consulta 1 de base de datos en vialidad"}';
      exit;
    }
    /* extrae el id, figuras geográficas de la vialidad */
    $object_resultVialidad= new stdClass();
    $object_resultVialidad->dimensiones = pg_fetch_all($resultVialidad);
    $resultVialidad = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from vialidad");
    if (!$resultVialidad) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en vialidad"}';
      exit;
    }
    /* Se guardan en un objeto los datos consultados anteriormente de la tabla de vialidad */
    $object_resultVialidad->objetos = pg_fetch_all($resultVialidad);

    /* extrae los valores maximos y minimos en el eje X y Y correspondiente a las zonas verdes */
    $resultZonasVerdes = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                              ST_ymax(bb)*-1 as ymax, 
                              ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                              ST_Ymax(bb)-ST_ymin(bb) as alto
                          from 
                              (select ST_Extent(geom) bb from zonas_verdes) as extent  ");

    if (!$resultZonasVerdes) 
    {
      echo '{"error":"Error en la consulta 1 de base de datos  en zonas verdes"}';
      exit;
    }
    /* extrae el id, figuras geográficas de las zonas verdes */
    $object_resultZonasVerdes= new stdClass();
    $object_resultZonasVerdes->dimensiones = pg_fetch_all($resultZonasVerdes);
    $resultZonasVerdes = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from zonas_verdes");
    if (!$resultZonasVerdes) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en zonas verdes"}';
      exit;
    }
    /* Se guardan en un objeto los datos consultados anteriormente de la tabla de zonas verdes */
    $object_resultZonasVerdes->objetos = pg_fetch_all($resultZonasVerdes);

    /* extrae los valores maximos y minimos en el eje X y Y correspondiente a las rutas evacuación */
    $resultRutasEvacuacion = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                              ST_ymax(bb)*-1 as ymax, 
                              ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                              ST_Ymax(bb)-ST_ymin(bb) as alto
                          from 
                              (select ST_Extent(geom) bb from ruta_evacuacion) as extent  ");

    if (!$resultRutasEvacuacion) 
    {
      echo '{"error":"Error en la consulta 1 de base de datos  en rutas evacuación"}';
      exit;
    }
    /* extrae el id, figuras geográficas de las rutas evacuación */
    $object_resultRutasEvacuacion= new stdClass();
    $object_resultRutasEvacuacion->dimensiones = pg_fetch_all($resultRutasEvacuacion);
    $resultRutasEvacuacion = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from ruta_evacuacion");
    if (!$resultRutasEvacuacion) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en rutas evacuación"}';
      exit;
    }
    /* Se guardan en un objeto los datos consultados anteriormente de la tabla de rutas evacuación */
    $object_resultRutasEvacuacion->objetos = pg_fetch_all($resultRutasEvacuacion);

    /* extrae los valores maximos y minimos en el eje X y Y correspondiente a las zonas seguras */
    $resultZonasSeguras = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                              ST_ymax(bb)*-1 as ymax, 
                              ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                              ST_Ymax(bb)-ST_ymin(bb) as alto
                          from 
                              (select ST_Extent(geom) bb from zonas_seguras) as extent  ");

    if (!$resultZonasSeguras) 
    {
      echo '{"error":"Error en la consulta 1 de base de datos  en zonas seguras"}';
      exit;
    }
    /* extrae el id, figuras geográficas de las zonas seguras */
    $object_resultZonasSeguras= new stdClass();
    $object_resultZonasSeguras->dimensiones = pg_fetch_all($resultZonasSeguras);
    $resultZonasSeguras = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from zonas_seguras");
    if (!$resultZonasSeguras) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en zonas seguras"}';
      exit;
    }
    /* Se guardan en un objeto los datos consultados anteriormente de la tabla de zonas seguras */
    $object_resultZonasSeguras->objetos = pg_fetch_all($resultZonasSeguras);

    /* los objetos creados anteriomente se insertan en un array para ser convertidos en json */
    echo json_encode(array($object_resultEdificios, $object_resultAceras, $object_resultVialidad, $object_resultZonasVerdes, $object_resultRutasEvacuacion, $object_resultZonasSeguras));

?>    
