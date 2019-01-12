<?php
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
    require "db_connect.php";
      $v=notEmpty($_POST,"email","password");
      if(empty($v["error"]))
      {
          $password = md5($_POST['password']);
          $stmt=$con->prepare("SELECT * FROM users WHERE email = ? and pwd = ?") or die(mysqli_error($con));
          $stmt->bind_param("ss",$_POST['email'],$password) or die("Failed to connect to server: " . mysqli_error($con));
          $stmt->execute() or die("Failed to connect to MySQL: " . mysqli_error($con));
          $result=$stmt->get_result() or die("Failed to connect to MySQL: " . mysqli_error($con));
          
          $count = mysqli_num_rows($result);
          if($count==1){
            $row = $result->fetch_array(MYSQLI_ASSOC) or die("F2ailed to connect to MySQL: " . mysqli_error($con));
            $_SESSION['userid'] = $row['uid'];
            $_SESSION['signed_in']=true;
            echo "Login Successful !";
          }
          else {
            $_SESSION['userid']='';
            $_SESSION['signed_in']=false;
            echo "Your Login Email or Password is invalid!";
          }
        }
      else{
        echo "Error :\n";
        foreach($v['error'] as $er)
          echo $er."\n"; 
      }
?>