<?php

require './db_connect.php';

$_SESSION["signed_in"]=signed_in();
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!--StyleSheet-->
	<!-- Font Awesome -->
	
	<link rel="shortcut icon" type="images/png" href="/images/NU_LOGO_BW.png"/>
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
        <a class="nav-link" href="all_events.php">Events</a>
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

<br/>
<br/>
<br/>
    
<div class="forms">
	<ul class="tab-group">
		<li class="tab active"><a href="#login">Log In</a></li>
		<li class="tab"><a href="#signup">Sign Up</a></li>
	</ul>

              <form method="post" id="login" name="login">

                  <div class="md-form">
                      <input type="email" id="email" name="email" class="form-control form-input" style="align-content: center;" value="">
                      <label for="email">Email</label>
                  </div>

                  <div class="md-form">
                      <input type="password" id="password" name="password" class="form-control form-input" style="align-content: center;" value="">
                      <label for="password">Password</label>
                  </div>

                  <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" id="loginBtn" ><strong>Submit</strong></button>
              </form>

              <form method="post" id="signup" name="signup">
                  <div class="md-form">
                      <input type="text" id="name" name="name" class="form-control form-input" style="align-content: center;" value="">
                      <label for="name">Name</label>
                  </div>

                  <div class="md-form">
                      <input type="email" id="email" name="email" class="form-control form-input" style="align-content: center;" value="">
                      <label for="email">Email</label>
                  </div>

                  <div class="md-form">
                      <input type="number" id="contact_no" name="contact_no" class="form-control form-input" style="align-content: center;" value="">
                      <label for="contact_no">Phone No</label>
                  </div>
                  <div class="row" id="gender">
                  <div class="md-form col-md-6">
                      <label for="male">Male</label>
                      <input type="radio" id="male" name="gender" class="form-control form-input" style="align-content: center;" value="male">
                  </div>
                  <div class="md-form col-md-6">
                      <input  type="radio" id="female" name="gender" class="form-control form-input" style="align-content: center;" value="female">
                      <label for="female">Female</label>
                  </div>
                  </div>
                  <div class="md-form">
                      <input type="text" id="institute" name="college" class="form-control form-input" style="align-content: center;" value="">
                      <label for="institute">College Name</label>
                  </div>

                  <div class="md-form">
                      <input type="password" id="pass" name="password" class="form-control form-input" style="align-content: center;" value="">
                      <label for="pass">Password</label>
                  </div>

                  <div class="md-form">
                      <input type="password" id="confirmPass" name="confirmPass" class="form-control form-input" style="align-content: center;" value="">
                      <label for="confirmPass">Confirm Password</label>
                  </div>

                  <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" id="regBtn" ><strong>Submit</strong></button>
              </form>
</div>
<br/><br/><br/><br/><br/><br/>
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