<?php
include("../db_connect.php");
$stmt=$con->prepare("SELECT COUNT(*) from users");
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_array(MYSQLI_ASSOC);
$registered=$row['COUNT(*)'];

$stmt=$con->prepare("SELECT COUNT(*) from users WHERE paid=1");
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_array(MYSQLI_ASSOC);
$paid=$row['COUNT(*)'];

$stmt=$con->prepare("SELECT COUNT(*) from users where checkin=1");
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_array(MYSQLI_ASSOC);
$checkedin=$row['COUNT(*)'];

$x=array("registered"=>$registered,"paid"=>$paid,"checkedin"=>$checkedin);
echo json_encode($x);
?>