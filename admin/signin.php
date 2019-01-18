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
    require "../db_connect.php";
      $v=notEmpty($_POST,"userid","pwd");
      if(empty($v["error"]))
      {   
          $password = md5($_POST['pwd']);
          $stmt=$con->prepare("SELECT * FROM admin WHERE userid = ? and pwd = ?") or die(mysqli_error($con));
          $stmt->bind_param("ss",$_POST['userid'],$password) or die("Failed to connect to server: " . mysqli_error($con));
          $stmt->execute() or die("Failed to connect to MySQL: " . mysqli_error($con));
          $result=$stmt->get_result() or die("Failed to connect to MySQL: " . mysqli_error($con));
          
          $count = mysqli_num_rows($result);
          echo "  ";
          $row = $result->fetch_array(MYSQLI_ASSOC) or die("Failed to connect to MySQL: " . mysqli_error($con));
          
          if($count==1 && $row['access'] == 1){
            $_SESSION['admin_id'] = $row['userid'];
            $_SESSION['admin_in']=true;
            echo "Login Successful !";
          }
          else {
            $_SESSION['admin_id']='';
            $_SESSION['admin_in']=false;
            echo "Your Login Email or Password is invalid!";
          }
        }
      else{
        echo "Error :\n";
        foreach($v['error'] as $er)
          echo $er."\n"; 
      }
?>