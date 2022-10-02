<?php

/* Se conecta con la base de datos */
function conectar()
{
    $conn = pg_connect("host=localhost port=5432 dbname=mapa_tec_gis user=postgres password=12345") or die('{"error":"Error de conexión con la base de datos"}');
    return ($conn);
}

?>