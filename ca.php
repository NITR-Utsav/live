<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>CA Registration</title>
  
    <link rel="shortcut icon" type="images/png" href="/images/NU_LOGO_BW.png"/>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="https://mdbootstrap.com/previews/templates/landing-page/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="https://mdbootstrap.com/previews/templates/landing-page/css/mdb.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
  <link href="css/login/style.css" rel="stylesheet">
  <style type="text/css">
.form-input{
  text-align: center;
}
#form-title{
  padding-top: 40px;
  padding-left: 60px;
  font-size: 18px;
}

@media (max-width: 700px), (max-device-width: 700px){

#form-title{
  padding-top: 40px;
  padding-left: 10px;
  font-size: 17px;
}
}

body {
  background-image: url("images/Background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
html {
    height: 100%
}


</style>
</head>

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
      <li class="nav-item active">
        <a class="nav-link" href="#">CA Program
          <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
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
<div class="row">
<div class="col-md-4"></div>
<div class="col-md-4 col-sm-12">

   <!--  <h5 class="card-header indigo white-text text-center py-4">
        <strong>CAMPUS AMBASSADOR REGISTRATION</strong>
        <hr>
    </h5> -->
<div class="forms">
    <div id="form-title"><strong>CAMPUS AMBASSADOR REGISTRATION</strong></div>
        <form method="post" id="caForm" name="caForm">
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
                <label for="contact_no">Contact</label>
            </div>
            <div class="md-form">
                <input type="text" id="college" name="college" class="form-control form-input" style="align-content: center;" value="">
                <label for="college">College</label>
            </div>
            <div class="md-form">
                <input type="text" id="fb_link" name="fb_link" class="form-control form-input" style="align-content: center;" value="">
                <label for="fb_link">Link</label>
            </div>
            <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" id="ca_button"><strong>Submit</strong></button>
        </form>
    </div>
</div>
</div>
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
$("#ca_button").click(function(e){
  e.preventDefault();
  $("#caForm").ajaxSubmit({
            url:'./ca_register.php',
            success:function(responseText){
                alert(responseText);
        if(responseText=='Registration Successful !')
                location.reload();
            }
        });
});

</script>
</body>

</html>