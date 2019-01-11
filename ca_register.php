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
$v=notEmpty($_POST,"name","college","email","contact_no","fb_link");

if(empty($v["error"]))
{
	$stmt=$con->prepare("SELECT * FROM campus_ambassador where ca_email = ? ") or die(mysqli_error($con));
	$stmt->bind_param("s",$_POST['email']) or die(mysqli_error($con));
	$stmt->execute() or die(mysqli_error($con));
	$result=$stmt->get_result() or die(mysqli_error($con));

	if($result->num_rows !=0)
		echo "Email already exists";
	else
	{
		$query = "INSERT INTO campus_ambassador(ca_name,ca_contact,ca_college,ca_email,ca_fb) VALUES (?,?,?,?,?)";
		$stmt=$con->prepare($query);
		$stmt->bind_param("sssss",$_POST['name'],$_POST['contact_no'],$_POST['college'],$_POST['email'],$_POST['fb_link']) or die("Failed to connect to MySQL: " . mysqli_error($con));
		$stmt->execute() or die("Failed to connect to MySQL1: " . mysqli_error($con));
		$stmt->prepare("SELECT * FROM campus_ambassador where ca_email = ? AND ca_fb = ?") or die("Failed to connect to MySQL2: " . mysqli_error($con));
		$stmt->bind_param("ss",$_POST['email'],$_POST['fb_link']) or die("Failed to connect to MySQL: " . mysqli_error($con));
		$stmt->execute() or die("Failed to connect to MySQL3: " . mysqli_error($con));
		$result=$stmt->get_result() or die("Failed to connect to MySQL4: " . mysqli_error($con));
		// $row = $result->fetch_array(MYSQLI_ASSOC) or die("Failed to connect to MySQL5: " . mysqli_error($con));

		if($row['ca_email']=$_POST['email'])
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