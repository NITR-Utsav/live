<?php
include "../db_connect.php";
if(isset($_POST['winner1']) && isset($_POST['winner2'])){
    $data=json_encode(array("1st"=>$_POST['winner1'],"2nd"=>$_POST['winner2']));
    $stmt=$con->prepare("UPDATE events set winner=? where eid=?");    
    $stmt->bind_param("ss",$data,$_POST['eid']);
    if($stmt->execute())
        echo 'successful';
    else echo 'failed';
}

?>