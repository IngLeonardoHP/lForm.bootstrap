<?php
	$retorno=new stdClass();
	// Datos de retorno
	if(!empty($_FILES['imagen'])){
		copy($_FILES['imagen']['tmp_name'],$_FILES['imagen']['name']);
	}
	$retorno->datos="datos de retorno";
	// Cualquiera
	$json = json_encode($retorno);
	echo $json;
?>