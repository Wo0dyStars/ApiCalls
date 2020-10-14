<?php

    $URL = "";
    if ($_REQUEST["API"] === "postalCodes") {
        $URL = "http://api.geonames.org/postalCodeSearchJSON?postalcode=" . $_REQUEST["postalCode"] . "&maxRows=" . $_REQUEST["maxRows"] . "&username=wo0dystars";
    } else if ($_REQUEST["API"] === "weatherObservations") {
        $URL = "http://api.geonames.org/weatherJSON?north=" . $_REQUEST["north"] . "&south=" . $_REQUEST["south"] . "&east=" . $_REQUEST["east"] . "&west=" . $_REQUEST["west"] . "&username=wo0dystars";
    } else if ($_REQUEST["API"] === "ocean") {
        $URL = "http://api.geonames.org/oceanJSON?lat=" . $_REQUEST["lat"] . "&lng=" . $_REQUEST["lng"] . "&username=wo0dystars";
    }
    
    $CurlHandle = curl_init();
    curl_setopt($CurlHandle, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($CurlHandle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($CurlHandle, CURLOPT_URL, $URL);

    $Result = json_decode(curl_exec($CurlHandle), true);

    curl_close($CurlHandle);

    $Output["status"]["code"] = "200";
    $Output["status"]["name"] = "OK";
    $Output["status"]["description"] = $_REQUEST["API"];
    $Output["data"] = $Result[$_REQUEST["API"]];

    header("Content-Type: application/json; charset=UTF-8");

    echo json_encode($Output);

?>