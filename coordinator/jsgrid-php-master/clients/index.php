<?php
require("../../../db_connect.php");
include "../models/ClientRepository.php";

$clients = new ClientRepository($con);



switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = $clients->getAll(array(
            "name" => $_GET["name"],
            "email" => $_GET["email"],
        ));
        break;

    case "POST":
        $result = $clients->insert(array(
            "name" => $_POST["name"],
            "age" => intval($_POST["age"]),
            "address" => $_POST["address"],
            "married" => $_POST["married"] === "true" ? 1 : 0,
            "country_id" => intval($_POST["country_id"])
        ));
        break;

    case "PUT":
        parse_str(file_get_contents("php://input"), $_PUT);

        $result = $clients->update(array(
            "NUID" => intval($_PUT["NUID"]),
            "name" => $_PUT["name"],
            "email"=>$_PUT["email"],
            "contact" => intval($_PUT["contact"]),
            "college" => $_PUT["college"],
            "attendance" => intval($_PUT["attendance"]),
            "payment" => intval($_PUT["payment"])
        ));
        break;

    case "DELETE":
        parse_str(file_get_contents("php://input"), $_DELETE);

        $result = $clients->remove(intval($_DELETE["id"]));
        break;
}


header("Content-Type: application/json");
echo json_encode($result);
?>
