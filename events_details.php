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
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <!-- Material Design Bootstrap -->
    <link href="https://mdbootstrap.com/previews/templates/landing-page/css/mdb.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="css/style.css" rel="stylesheet">
  
    <style>
      html,
        body,
        header,
        .jarallax {
          height: 100%;
        }
        body{
            margin: 5%;
            padding: 0;
        }
        @media (min-width: 560px) and (max-width: 740px) {
          html,
          body,
          header,
          .jarallax {
            height: 500px;
          }
        }

        @media (min-width: 800px) and (max-width: 850px) {
            .navbar:not(.top-nav-collapse) {
                background: #3f51b5!important;
            }
            .navbar {
              box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12) !important;
            }
        }

        .font-small {
            font-size: 0.9rem;
        }
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
    <script>document.documentElement.className="js";var supportsCssVars=function(){var e,t=document.createElement("style");return t.innerHTML="root: { --tmp-var: bold; }",document.head.appendChild(t),e=!!(window.CSS&&window.CSS.supports&&window.CSS.supports("font-weight","var(--tmp-var)")),t.parentNode.removeChild(t),e};supportsCssVars()||alert("Please view this demo in a modern browser that supports CSS Variables.");</script>
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
        <li class="nav-item active">
          <a class="nav-link" href="all_events.php">Events
            <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="contact.php">Contact us</a>
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
      
      <!-- <ul class="navbar-nav ml-auto nav-flex-icons">
        <li class="nav-item">
          <a class="nav-link" href="user_profile.php">View Profile</a>
        </li>
         <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
        </li> -->
       
    </div>
  </nav>
<!--/.Navbar -->
<br><br>
<main>
<div class="container text-left">
  <h3 style="font-weight:bold;padding-bottom: 10px;"><span">ALOHOMORA</span></h3>
    <div class="row">
      <div class="col-lg-6 col-md-4 col-sm-12">
        <img src="img/aa.png" style="width:70%;border-radius:15px;box-shadow:2px 2px 8px #808080;" alt="Image">
      </div> 
      <div class="col-lg-3 col-md-4 col-sm-12">
        <div class="well-lg">
          <h4 style="font-weight:bold;"><span> DATE</span></h4>
          <span>22/10/2018</span>
        </div>
        <div class="well-lg">
          <h4 style="font-weight:bold;"><span> VENUE</span></h4>
          <span>MAIN BUILDING</span>
        </div>
        <div class="well-lg">
          <h4 style="font-weight:bold;"><span> You can register now</span></h4></h5><button class="btn" style="color: black;"id="event_button" class="betn btn-template-main" style="margin-bottom:1em;"><h4><span>Register</span></h4></button>
        </div>
      </div> 
      <div class="col-lg-3 col-md-4 col-sm-12">
        <div class="well-lg">
          <h4 style="font-weight:bold;"><span>TIME</span></h4>
          <span>9:00 am  to 12:00 pm</span>
        </div>
        <div class="well-lg">
          <h4 style="font-weight:bold;"><span>COORDINATORS<span></h4>
          <span>PAWAN</span>
        </div>
        <!-- <div class="well-lg">
          <h5 style="font-weight:bold;">
          <span>You can share it on</span></h5><a href="#" class="fa fa-facebook" style="padding:10px;border-radius:20px;">
        </div> -->
      </div> 
    </div>
    <div class="row" style="color: black;">
      <div class="col-lg-12 col-md-12 col-sm-12" style="border:1px solid white; box-shadow:2px 2px 8px #808080; border-radius:10px;margin: 20px;">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#home">DESCRIPTION</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu1">RULES</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu2">JUDGING CRITERIA </a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content" >
          <div id="home" class="tab-pane fade in active"><br>
              <p>The entire event will consist of two rounds, which will be as follows:<br><br>
               1. A quiz<br><br>
               2. A rally alongwith a treasure hunt<br><br>
             </p>
          </div>
          <div id="menu1" class="tab-pane fade">
                <p><br>
               The event contains of two rounds:-
               <br><br>
                1. Elimination round - all the registered teams have to pass through elimination round which contains a quiz based on Food and Food companies.
                The quiz would not be a typical pen-paper quiz but an interesting quiz. The top 5-7 teams (or solo) would be selected for next round.
                <br><br>
                2. Treasure hunt - the shortlisted team have to find the hidden treasure in order to win the event. The major point to keep track of is that all the groups participating must at least have an android enabled phone. The helping members would be provided all around the campus.</p>
            </div>
            <div id="menu2" class="tab-pane fade"><br>
              <p>In both the rounds, the coordinators and volunteers would be the judge.<br> 
               For first round, all answers are with the coordinators and for the second round, answers of the hunt are with the coordinators thus coordinators only would be the judge.
              </p>
            </div>
        </div>
      </div>
    </div>
</div>
   <!--  <div class="container" style="width:100%;border:1px solid white; box-shadow:2px 2px 8px #808080; border-radius:10px;"> -->
	</main>
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
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.1/TweenMax.min.js'></script>
    <!--  Bootstrap tooltips  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/popper.min.js"></script>
    <!--  Bootstrap core JavaScript  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/bootstrap.min.js"></script>
    <!--  MDB core JavaScript  -->
    <script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/mdb.min.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/imagesloaded.pkgd.min.js"></script>
    <script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
    <script type="text/javascript" src="js/charming.min.js"></script>
  <!--  <script type="text/javascript" src="js/TweenMax.min.js"></script>-->
    <script type="text/javascript" src="js/demo.js"></script>
      <script>
    //Animation init
    new WOW().init();
    
    //Modal
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').focus()
    })
    
    // MDB Lightbox Init
    $(function () {
      $("#mdb-lightbox-ui").load("https://mdbootstrap.com/previews/templates/landing-page/mdb-addons/mdb-lightbox-ui.html");
    });
    </script>
    <script>
      // Load app.js script after document has rendered.
      var script = document.createElement('script');
      script.src = 'js/app.js';
      script.type = 'text/javascript';
      document.getElementsByTagName('body')[0].appendChild(script);
    </script>

</body>
</html>