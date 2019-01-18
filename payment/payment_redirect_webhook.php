<?php
include('../db_connect.php');
if(!empty($_POST['data'])){
    $data=json_decode($_POST['data'],true);
    $uid=substr($data['cq2'],strstr($data['cq2'],"NU-")+3);
    $stmt=$con->prepare("UPDATE users set paid=1,payment_id=? where email=? and uid=?");
    $stmt->bind_param("sss",$data['uniqueOrderId'],$data['userEmailId'],$uid);
    $stmt->execute();
}
?>