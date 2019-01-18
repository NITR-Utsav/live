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

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


$v=notEmpty($_POST,"name","gender","college","email","contact_no","password");

if(empty($v["error"]))
{
	$stmt=$con->prepare("SELECT * FROM users where email = ? ") or die(mysqli_error($con));
	$stmt->bind_param("s",$_POST['email']) or die(mysqli_error($con));
	$stmt->execute() or die(mysqli_error($con));
	$result=$stmt->get_result() or die(mysqli_error($con));
	if($result->num_rows !=0)
		echo "Email already exists";
	else
	{
		$mobileregex = "/^[6-9][0-9]{9}$/" ;
		$val = preg_match($mobileregex, $_POST['contact_no']);
		if(!$val)
			echo 'Please provide a valid phone number';
		
		else 
		{
			$email = test_input($_POST["email"]);
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
			{
  				echo "Enter a valid Email address";
  				else
  				{

					$con=mysqli_connect($_SESSION["host"],$_SESSION["db_user"],$_SESSION["db_password"]) or die("Failed to connect to MySQL: " . mysqli_error($this->con));

        			mysqli_select_db($con,$_SESSION["db_name"]) or die("Failed to connect to MySQL: " . mysqli_error($con)); 
		
					$query = "INSERT INTO users(name,gender,college,email,contact,pwd) VALUES (?,?,?,?,?,?)";
		
					$stmt=$con->prepare($query) or die(mysqli_error($con));
					$_POST['password']=md5($_POST['password']);
					$stmt->bind_param("ssssss",$_POST['name'],$_POST['gender'],$_POST['college'],$_POST['email'],$_POST['contact_no'],$_POST['password']) or die("Failed to connect to MySQL: " . mysqli_error($con));
		
					$stmt->execute() or die("Failed to connect to MySQL: " . mysqli_error($con));
					$con=mysqli_connect($_SESSION["host"],$_SESSION["db_user"],$_SESSION["db_password"]) or die("Failed to connect to MySQL: " . mysqli_error($this->con));
        			mysqli_select_db($con,$_SESSION["db_name"]) or die("Failed to connect to MySQL: " . mysqli_error($con));
					$stmt=$con->prepare("SELECT * FROM users where email = ? AND pwd = ? ");
					$stmt->bind_param("ss",$_POST['email'],$_POST['password']);
					$stmt->execute() or die("Failed to connect to MySQL:3 " . mysqli_error($con));
					$result=$stmt->get_result() or die("Failed to connect to MySQL:4 " . mysqli_error($con));
					$row = $result->fetch_array(MYSQLI_ASSOC) or die("Failed to connect to MySQL: 5" . mysqli_error($con));

					if( ($row['email']=$_POST['email'])  && ($row['password']=md5($_POST['password'])) )
						echo "Registration Successful !";
					else
						echo "Pls try again";
				}
  			}
		}
}
else{
    echo "Error :\n";
    foreach($v['error'] as $er)
        echo $er."\n"; 
}
?>