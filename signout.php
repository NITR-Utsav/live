<?php
session_start();
setcookie("name",$row["name"],time()-3600,"/");
setcookie("id",$row["id"],time()-3600,"/");
setcookie("email_id",$row["email_id"],time()-3600,"/");
setcookie("signed_in",1,time()-3600,"/");
session_destroy();
header("Location: ./login.php");
?>