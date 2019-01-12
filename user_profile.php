<?php

require './db_connect.php';

$_SESSION["signed_in"]=signed_in();
  if(!$_SESSION['signed_in'])
    header("Location:./login.php");
  
  $stmt=$con->prepare("SELECT * FROM users where uid = ? ") or die(mysqli_error($con));
    $stmt->bind_param("s",$_SESSION['userid']);
  $stmt->execute() or die(mysqli_error($con));
  $result=$stmt->get_result() or die(mysqli_error($con));
    $user=$result->fetch_array(MYSQLI_ASSOC);
  if($result->num_rows === 0)
    {
        header("Location:./login.php");
    }
  $id = "%".$_SESSION['userid']."%";
  // $stmt=$con->prepare("SELECT e.eid,e.title,e.category,e.winner FROM events e WHERE e.winner LIKE ?") or die(mysqli_error($con));
    $stmt->bind_param("s",$id);
  $stmt->execute() or die(mysqli_error($con));
  $result=$stmt->get_result() or die(mysqli_error($con));
  
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!--StyleSheet-->
	<link rel="shortcut icon" type="images/png" href="/images/NU_LOGO_BW.png"/>
	<!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<!--=======Font Open Sans======-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <!-- Material Design Bootstrap -->
    <link href="https://mdbootstrap.com/previews/templates/landing-page/css/mdb.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/login/style.css">
  <link href="css/login/style-default.css" rel="stylesheet">
</head>
<style type="text/css">
           body {
  background-image: url("images/Background.png");
  /*background-repeat: no-repeat;*/
  background-repeat: repeat-y;
  background-size: 100% 100%;
}
html {
    height: 100%
}

.badge {
  font-size: 16px;
}
</style>
<body>
  
    <!--Navbar -->
<nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar">
  <a class="navbar-brand" href="index.php"><img src="images/NU_LOGO_WB.png" style="height: 40px"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="index.php">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="comingsoon.php">Gallery</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="comingsoon.php">Events</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="contact.php">Contact us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="ca.php">CA Program</a>
      </li>
      <li class="nav-item active">
        <?php
									if(!$_SESSION['signed_in'])
										echo '<a class="nav-link" href="login.php">Register</a>';
									else
										echo '<a class="nav-link" href="user_profile.php">User Profile</a>';
									?>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto nav-flex-icons">
      <!-- <li class="nav-item">
        <a class="nav-link" href="user_profile.php">View Profile</a>
      </li> -->
      <!-- <li class="nav-item">
          <a class="nav-link" href="#">Logout</a>
      </li> -->
    </ul>
  </div>
</nav>
<!--/.Navbar -->


<div id="content" style="margin-top:6em;">
            <div class="container">

        
                <div class="row ">
          
          <div class="col-md-12 text-center">
                            <div class="heading">
                                <h2>NITRUTSAV 2019</h2>
                            </div>
          </div>
          <div class="col-md-3"></div>
          
                    <div class="col-md-6" id="customer-orders">                        
    
            <div class="box">
                            <div class="table-responsive">
                                <table class="table table-hover ">
                                    
                                    <tbody>
                                        <tr>
                                            <th>NITRUTSAV ID</th>
                                            <td>NU-<?php echo $user['uid'];?></td>
                                            
                                        </tr>
                    <tr>
                                            <th>NAME</th>
                                            <td><?php echo $user['name'];?></td>
                                            
                                        </tr>
                    <tr>
                                            <th>EMAIL ID</th>
                                            <td><?php echo $user['email'];?></td>
                                            
                                        </tr>
                    <tr>
                                            <th>CONTACT NO.</th>
                                            <td><?php echo $user['contact'];?></td>
                                            
                                        </tr>
                                        <tr>
                                            <th>COLLEGE</th>
                                            <td><?php echo $user['college'];?></td>
                                            
                                        </tr>
                    <tr>
                                            <th>PAYMENT STATUS</th>
                                            <td>
                        <?php
                          if($user['paid'] == 0)
                            echo '<span class="badge badge-danger" style="font-family: patua;">UNPAID</span>';
                          elseif($user['paid'] == 1)
                            echo '<span class="badge badge-success" style="font-family: patua;">PAID</span>';
                        ?>
                          
                      </td>
                                            
                                        </tr>
                    <!--<tr>
                                            <th>CHECKIN STATUS</th>
                                            <td>
                        <?php
                          if($user['checkin'] == 0)
                            echo '<span class="badge badge-danger" style="font-family: patua;">UNCHECKED</span>';
                          elseif($user['checkin'] == 1)
                            echo '<span class="badge badge-success" style="font-family: patua;">CHECKED</span>';
                        ?>
                      </td>
                                            
                                        </tr>-->
                                      
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.table-responsive -->
            
            </div>
            
                    </div>
                    <!-- /.col-md-9 -->
          <div class="col-md-12 text-center">
                        <!--     <?php
              //if($user['checkin'] == 1 && $user['paid'] == 1)
                echo '
              <div class="heading">
                                <a href="certificate/generate_cert_p.php"><button style="font-family: patua;" type="button" class="btn btn-success">Download Participation Certificate</button></a>
                            </div>';
              
              ?> -->
              
          </div>
          
          <!-- <?php 
            if($result->num_rows != 0){
              
              echo '<div class="col-md-12 text-center">
                    <div class="heading">
                      <h3>Certificates</h3>
                    </div>
                </div>
            
              <div class="col-md-8 col-md-offset-2" id="customer-orders">

                        

                        <div class="box">

                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th>Title</th>
                                            <th>View Event</th>
                      <th>Certificate</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>';
                  $count = 1;
                  while($row=$result->fetch_array(MYSQLI_ASSOC)){
                                        echo'<tr>
                                            <th>'.$count.'</th>
                                            <td>'.$row['title'].'</td>';
                                            if($row['category'] == "informal")
                        echo '<td><a href="view.php?event='.$row['eid'].'" target="_BLANK"><i class="fa fa-eye" aria-hidden="true"></i></a></td>';
                      elseif($row['category'] == "flagship")
                        echo '<td><a href="view_flagship.php?event='.$row['eid'].'" target="_BLANK"><i class="fa fa-eye" aria-hidden="true"></i></a></td>';
                                            elseif($row['category'] == "fun")
                        echo '<td><a href="view_fun.php?event='.$row['eid'].'" target="_BLANK"><i class="fa fa-eye" aria-hidden="true"></i></a></td>';
                                            
                      elseif($row['category'] == "workshop" || $row['category'] == "exhibition")
                        echo '<td><a href="view_workshop.php?event='.$row['eid'].'" target="_BLANK"><i class="fa fa-eye" aria-hidden="true"></i></a></td>';
                                            
                      $events = json_decode($row['winner'],true);
                      
                      if(strpos("@".$events['1st']."",$_SESSION['userid']."") != false)
                        echo '<td><a href="certificate/generate_cert_wc.php?eid='.$row['eid'].'">Certificate</a></td>';
                      else if(strpos("@".$events['2nd']."",$_SESSION['userid']."") != false)
                        echo '<td><a href="certificate/generate_cert_wc.php?eid='.$row['eid'].'">Certificate</a></td>';
                      else{
                        echo '<td>N/A';
                        //print_r ($events['winner2']);
                        echo '</td>';
                      }
                      echo '</tr>';
                      $count = $count + 1;
                  }
                                    echo '    
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.table-responsive -->

                        </div>
                        <!-- /.box -->

                    </div>
                    <!-- /.col-md-9 -->';
            }
          ?> -->
          <div class="col-md-12 text-center">
                            <div class="heading">
                                <a href="signout.php"><button style="font-family: patua;" type="button" class="btn btn-success">Logout</button></a>
                            </div>
          </div>
          <!-- <div class="col-md-12">
            <h4 style="text-align:center" >In case of any query, drop a mail at nitrutsav2018@gmail.com</h4>
          </div> -->
        </div>
      </div>
    </div>
<br/>
<br/>
<br/><br/><br/>
    <!-- Footer -->
    <footer class="page-footer font-small special-color-dark pt-4">
        <!-- Footer Elements -->
        <div class="container">
          <!-- Social buttons -->
          <ul class="list-unstyled list-inline text-center">
            <li class="list-inline-item">
              <a href="https://www.facebook.com/nitrutsav.nitrkl/" target="_blank" class="btn-floating btn-fb mx-1">
                <i class="fa fa-facebook-f"> </i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.facebook.com/nitrutsav.nitrkl/" target="_blank" class="btn-floating btn-ins mx-1">
                <i class="fa fa-instagram icon"> </i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="mailto:nitrutsav2019@gmail" target="_blank" class="btn-floating btn-email mx-1">
                <i class="fa fa-at icon"> </i>
              </a>
            </li>
          </ul>
          <!-- Social buttons -->

        </div>
        <!-- Footer Elements -->

        <!-- Copyright -->
        <div class="footer-copyright text-center py-3">© 2019 Copyright:
          <a href="https://www.nitrutsav.com/"> NITRUTSAV</a>
        </div>
        <!-- Copyright -->

      </footer>
    <!-- End Footer -->
  <!--  JQuery  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/jquery-3.3.1.min.js"></script>
    <!-- <script type="text/javascript" src="js/index.js"></script> -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js"></script>
  <script src="js/jquery.form.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.1/TweenMax.min.js'></script>
    <!--  Bootstrap tooltips  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/popper.min.js"></script>
    <!--  Bootstrap core JavaScript  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/bootstrap.min.js"></script>
    <!--  MDB core JavaScript  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/mdb.min.js"></script>


<script type="text/javascript">
$(document).ready(function(){
	  $('.tab a').on('click', function (e) {
	  e.preventDefault();
	  
	  $(this).parent().addClass('active');
	  $(this).parent().siblings().removeClass('active');
	  
	  var href = $(this).attr('href');
	  $('.forms > form').hide();
	  $(href).fadeIn(500);
	});
});

$("#regBtn").click(function(e){
  e.preventDefault();
  if($("#pass").val()==$("#confirmPass").val()){
  $("#signup").ajaxSubmit({
            url:'./signup.php',
            success:function(responseText){
                alert(responseText);
        if(responseText=='Registration Successful !')
                location.reload();
            }
        });
      }
  else{
    alert("passwords dont match!");
  }
});
$("#loginBtn").click(function(e){
  e.preventDefault();
  $("#login").ajaxSubmit({
            url:'./signin.php',
            success:function(responseText){
                alert(responseText);
                if(responseText=='Login Successful !')
                  window.location.href="./user_profile.php";
                //redirect to the required page
                
            }
        });
});
</script>
</body>
</html>