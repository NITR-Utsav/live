<?php
if(empty($_POST))
    header("Location:./");
require "db_connect.php";
function notEmpty(){
        $response=array();
        $response['error']=array();
        $n=func_num_args();
        $a_bind_params=func_get_args();
        if(!is_array($a_bind_params[0]))
            return "no";
        for($i=1;$i<$n;$i++){
           if(empty($a_bind_params[0][$a_bind_params[$i]]))
               array_push($response['error'],$a_bind_params[$i]." not found");
           elseif($a_bind_params[0][$a_bind_params[$i]]=="")
                array_push($response['error'],$a_bind_params[$i]." cannot be empty");
        }
        return $response;
}
$v=notEmpty($_POST,"eid","uid");

if(empty($v["error"]))
{
	$stmt=$con->prepare("SELECT * FROM event_user where eid = ? AND uid = ? ") or die(mysqli_error($con));
	$stmt->bind_param("ss",$_POST['eid'],$_POST['uid']) or die(mysqli_error($con));
	$stmt->execute() or die(mysqli_error($con));
	$result=$stmt->get_result() or die(mysqli_error($con));

	if($result->num_rows !=0)
		echo "You have already registered for this event.";
	else
	{
		$query = "INSERT INTO event_user(eid,uid) VALUES (?,?)";
		$stmt=$con->prepare($query);
		$stmt->bind_param("ss",$_POST['eid'],$_POST['uid']) or die("Failed to connect to MySQL: " . mysqli_error($con));
		$stmt->execute() or die("Failed to connect to MySQL: " . mysqli_error($con));
		$stmt->prepare("SELECT * FROM event_user where eid = ? AND uid = ?") or die("Failed to connect to MySQL: " . mysqli_error($con));
		$stmt->bind_param("ss",$_POST['eid'],$_POST['uid']) or die("Failed to connect to MySQL: " . mysqli_error($con));
		$stmt->execute() or die("Failed to connect to MySQL: " . mysqli_error($con));
		$result=$stmt->get_result() or die("Failed to connect to MySQL: " . mysqli_error($con));
		$row = $result->fetch_array(MYSQLI_ASSOC) or die("Failed to connect to MySQL: " . mysqli_error($con));

		if($row['eid']=$_POST['eid'] && $row['uid']=$_POST['uid'])
			echo "Registration Successful !";
		
		else
			echo "Pls try again";
	}
}
else{
    echo "Error :\n";
    foreach($v['error'] as $er)
        echo $er."\n"; 
}
?>