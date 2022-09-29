<?php
    $conn = pg_connect("host=localhost port=5432 dbname=mapa_tec_gis user=postgres password=servidor1") or die('{"error":"Error de conexión con la base de datos"}');
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
    
    $object_resultEdificios= new stdClass();
    $object_resultEdificios->dimensiones = pg_fetch_all($resultEdificios);
    $resultEdificios = pg_query($conn, "select id,nombre,niveles,st_assvg(geom,1, 2) as svg from edificios");
    if (!$resultEdificios) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en edificios"}';
      exit;
    }
    $object_resultEdificios->objetos = pg_fetch_all($resultEdificios);


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
    $object_resultAceras= new stdClass();
    $object_resultAceras->dimensiones = pg_fetch_all($resultAceras);
    $resultAceras = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from aceras");
    if (!$resultAceras) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en aceras"}';
      exit;
    }
    $object_resultAceras->objetos = pg_fetch_all($resultAceras);


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
    $object_resultVialidad= new stdClass();
    $object_resultVialidad->dimensiones = pg_fetch_all($resultVialidad);
    $resultVialidad = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from vialidad");
    if (!$resultVialidad) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en vialidad"}';
      exit;
    }
    $object_resultVialidad->objetos = pg_fetch_all($resultVialidad);

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
    $object_resultZonasVerdes= new stdClass();
    $object_resultZonasVerdes->dimensiones = pg_fetch_all($resultZonasVerdes);
    $resultZonasVerdes = pg_query($conn, "select id, st_assvg(geom,1, 2) as svg from zonas_verdes");
    if (!$resultZonasVerdes) 
    {
      echo '{"error":"Error en la consulta 2 de base de datos en zonas verdes"}';
      exit;
    }
    $object_resultZonasVerdes->objetos = pg_fetch_all($resultZonasVerdes);

    echo json_encode(array($object_resultEdificios, $object_resultAceras, $object_resultVialidad, $object_resultZonasVerdes));

?>    
