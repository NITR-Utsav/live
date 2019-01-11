<?php

require './db_connect.php';

$_SESSION["signed_in"]=signed_in();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="robots" content="all,follow">
    <meta name="googlebot" content="index,follow,snippet,archive">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>NITRUTSAV 2019</title>

    <meta name="keywords" content="nitrutsav,NU,nitr,cultural fest,fest,eastern india">
    
    <link rel="shortcut icon" type="images/png" href="/images/NU_LOGO_BW.png"/>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,500,700,800' rel='stylesheet' type='text/css'>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.15/css/mdb.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Theme stylesheet, if possible do not edit this stylesheet -->
    
    <style>
        .box-simple{
            padding: 5px;
            border: 1px;
            border-top-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
        body{
            margin: 5%;
            padding: 0;
        }

        .btn-demo {
            margin: 5px;
            padding: 5px 10px;
            border-radius: 10px;
            color: #000;
            background-color: #FFFFFF;
        }

        .btn-demo:focus {
            outline: none;
        }

        .icon{
            margin: 10px;
        }

        .img-circle{
            max-width: 16em;
            overflow: hidden;
            border-radius: 30em;
        }

        .fade{
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
        }
        .modal{padding-top:100px;overflow:auto;background-color:transparent;text-align: left;}
        .modal-content{margin:auto;width:90%;max-width:1200px}

           body {
  background-image: url("images/Background.png");
  /*background-repeat: no-repeat;*/
  background-repeat: repeat-y;
  background-size: 100% 100%;
}
section {
    background-color: #ffffff;
    padding: 20px;
}
html {
    height: 100%
}
    </style>

    <!-- Custom stylesheet - for your changes -->
    <style>.row>.column{padding:0 8px}.row:after{content:"";display:table;clear:both}.column{float:left;width:25%}img.demo{opacity:.6}.active,.demo:hover{opacity:1}img.hover-shadow{transition:.3s}.hover-shadow:hover{box-shadow:0 4px 8px 0 rgba(0,0,0,.2) , 0 6px 20px 0 rgba(0,0,0,.19)}body::-webkit-scrollbar{width:.4em}body::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3)}body::-webkit-scrollbar-thumb{background-color:#cc4444;outline:1px solid #ee8139}</style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
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
        <a class="nav-link" href="#">Gallery</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Events</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="contact.php">Contact us
          <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="ca.php">CA Program</a>
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

    <div id="content" style="margin-top:4em;">
        <div class="container">
            <section>
                <div class="row">
                    <div class="col-md-12">
                        <div class="heading">
                            <center>
                            <hr>
                            <h2>COMING SOON!!!</h2>
                            </center>
                            <hr>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    
        
    </div>
       
    <!--  JQuery  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/jquery-3.3.1.min.js"></script>
    
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.1/TweenMax.min.js'></script>
    <!--  Bootstrap tooltips  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/popper.min.js"></script>
    <!--  Bootstrap core JavaScript  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/bootstrap.min.js"></script>
    <!--  MDB core JavaScript  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/mdb.min.js"></script>


</body>
</html>