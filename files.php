<?php

$remote_addr = $_SERVER["REMOTE_ADDR"];

$donnees="";
$salle="";
$ip = "Adresse de sortie";

function infiltre($soft){
	$jsonfilter = file_get_contents("filter.json");
	$datafilter = json_decode($jsonfilter,true);
	$lenght_filter = count($datafilter["result"]);
	$j="";
	$res = false;
	for($j=0; $j < $lenght_filter; $j++)
	{
		if($soft == $datafilter["result"][$j]["name"]){
			$res = true;
		}
	}
	return($res);
}

if($remote_addr == $ip){
	$data = $_POST["donnees"];
	//echo $data;
	$salle = $_POST["salle"];
	
	$data = json_decode($data,true);
	$length = count($data["result"]);
	//echo $length;
	$i="";
	for($i=0; $i < $length; $i++){
		if( infiltre($data["result"][$i]["name"]) == true )
		{
			echo "true ". $data["result"][$i]["name"];
			unset($data["result"][$i]);
		}
	}
	$data = json_encode($data,true);
	$nom = $salle.".json";
	$fp = fopen($nom,"w");
	fwrite($fp,$data);
	fclose($fp);
}
?>