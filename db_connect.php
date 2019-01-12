<?php 
    session_start();
	$_SESSION["host"] = "localhost";
	$_SESSION["db_user"] = "nitrutsav";
	$_SESSION["db_password"] = "Nit@2019";
    $_SESSION["db_name"]="nitrutsa_nu2019";
    $con=mysqli_connect($_SESSION["host"],$_SESSION["db_user"],$_SESSION["db_password"]) or die("Failed to connect to MySQL: " . mysqli_error($con));
    mysqli_select_db($con,$_SESSION["db_name"]) or die("Failed to connect to MySQL: " . mysqli_error());
    function signed_in( $check = 0)
    {
        global $con;
		
        if($check == 0 and array_key_exists("signed_in",$_SESSION) and (bool)$_SESSION['signed_in'])
        {
            $stmt=$con->prepare("SELECT * from users where uid=?");
            $stmt->bind_param("s",$_SESSION['userid']);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = mysqli_num_rows($result);
            if($count==1){
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $_SESSION['name'] = $row['name']; 
            $_SESSION['email'] = $row['email']; 
			$_SESSION['contact'] = $row['contact'];
			$_SESSION['gender'] = $row['gender'];
			$_SESSION['college'] = $row['college'];
            $_SESSION['checkin']=$row['checkin'];
			$_SESSION['paid']=$row['paid'];
            return true;
            }
            return false;
        }
		elseif($check == 1 and array_key_exists("admin_in",$_SESSION) and (bool)$_SESSION['admin_in'])
		{
			$stmt=$con->prepare("SELECT * from admin where userid=?");
            $stmt->bind_param("s",$_SESSION['admin_id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = mysqli_num_rows($result);
            if($count==1){
            $row = $result->fetch_array(MYSQLI_ASSOC);
				$_SESSION['admin_id'] = $row['userid'];
            return true;
            }
            return false;
		}
		elseif($check == 2 and array_key_exists("coordinator_in",$_SESSION) and (bool)$_SESSION['coordinator_in'])
		{
			$stmt=$con->prepare("SELECT * from coordinator where c_id=?");
            $stmt->bind_param("s",$_SESSION['coordinator_id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = mysqli_num_rows($result);
            if($count==1){
            $row = $result->fetch_array(MYSQLI_ASSOC);
				$_SESSION['coordinator_id'] = $row['c_id'];
				$_SESSION['event_id'] = $row['eid'];
				
            return true;
            }
            return false;
		}
        else
            return false;
    }

?>