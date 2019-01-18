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

    <title>NITRUTSAV 2018</title>

    <meta name="keywords" content="nitrutsav,NU,nitr,cultural fest,fest,eastern india">

    <!--<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,500,700,800' rel='stylesheet' type='text/css'>  -->
		<link href='css/font-google.css' rel='stylesheet' type='text/css'> 

    <!-- Bootstrap and Font Awesome css -->
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/bootstrap-min.css">

    <!-- Css animations  -->
    <link href="css/animate.css" rel="stylesheet">

    <!-- Theme stylesheet, if possible do not edit this stylesheet -->
    <link href="css/style-default.css" rel="stylesheet" id="theme-stylesheet">
	<link href="css/splace.css" rel="stylesheet">

    <!-- Custom stylesheet - for your changes -->
    <link href="css/custom1.css" rel="stylesheet">
	
	

    <!-- Responsivity for older IE -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->


    <!-- Favicon and apple touch icons-->	
	<link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="img/favicon/android-icon-192x192.png">
	
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicon/nu_black_48x48.png">
	<link rel="icon" type="image/png" sizes="96x96" href="img/favicon/nu_black_48x48.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon/nu_black_48x48.png">
	<link rel="manifest" href="img/favicon/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
    <!-- owl carousel css -->

    <link href="css/owl.carousel.css" rel="stylesheet">
    <link href="css/owl.theme.css" rel="stylesheet">
	<!-- Sweet Alert -->
	<link href="css/sweetalert.css" rel="stylesheet">

</head>
<style>

@font-face {
   font-family: norton;
   src: url(css/fonts/NORTON.ttf);
}
@font-face {
   font-family: patua;
   src: url(css/fonts/PatuaOne-Regular.otf);
}

@font-face {
   font-family: haymaker;
   src: url(css/fonts/Haymaker.ttf);
}
@font-face {
   font-family: proxima;
   src: url(css/fonts/Proxima Nova Semibold.otf);
}
@font-face {
   font-family: bazar;
   src: url(css/fonts/Bazar.ttf);
}
@font-face {
   font-family: monthoers;
   src: url(css/fonts/Monthoers.ttf);
}



</style>
<body>
		
    <!-- <center>
    
    <div id="splace">
        <img src="img/giphy.gif" >
    </div>
   </center> 
   -->
	<div id="all"  style="background-image:url(asset/images/background.jpg) !important;">

        <header>

            

               <!-- *** NAVBAR ***
    _________________________________________________________ -->

            <div class="navbar-affixed-top" data-spy="affix" style="z-index:13;background-image:url(asset/images/background.jpg) !important; box-shadow: 0px 2px 5px black;"> 

                <div class="navbar navbar-default yamm" role="navigation" id="navbar" style="background-image:url(asset/images/background.jpg) !important;"> 

                    <div class="container" >
                        <div class="navbar-header">

                            <a class="navbar-brand home" href="index.php">
								<img src="img/favicon/nu_144.png" alt="NITRUTSAV logo" style="position:fixed;left:45%;top:-25%;z-index:13;"class="hidden-xs hidden-sm" >
                                <img src="img/favicon/nu_black_48x48.png" alt="NITRUTSAV logo" class="visible-xs visible-sm"><span class="sr-only">NITRUTSAV</span>
                            </a>
                            <div class="navbar-buttons">
                                <button type="button" class="navbar-toggle btn-template-main" data-toggle="collapse" data-target="#navigation">
                                    <span class="sr-only">Toggle navigation</span>
                                    <i class="fa fa-align-justify"></i>
                                </button>
                            </div>
                        </div>
                        <!--/.navbar-header -->

                        <div class="navbar-collapse collapse" style="font-family: patua;" id="navigation">

                            <ul class="nav navbar-nav navbar-left"  >
                           
								<li>
                                    <a href="index.php" style="z-index:12;color:black !important;text-decoration:none;font-size:1.2em;">Home </a>
								</li>
								<!--<li>
                                    <a href="#aboutus">About Us </a>
								</li>-->
								<li>
                                    <a href="index.php#gallery" style="z-index:12;color:black !important;text-decoration:none;font-size:1.2em;">Gallery </a>
								</li>
								<li class="active">
                                    <a href="#" style="z-index:12;color:black !important;text-decoration:none;font-size:1.2em;">Events </a>
								</li>
							</ul>
							<ul class="nav navbar-nav navbar-right"  >
								<li>
                                    <a href="contact.php" style="z-index:12;color:black !important;text-decoration:none;font-size:1.2em;" >Contact</a>
								</li>
								<li>
                                    <a href="ca.php" style="color:black !important;text-decoration:none;font-size:1.2em;" >CA Program</a>
								</li>
								<li>
								<?php
									if(!$_SESSION['signed_in'])
										echo '<a href="login.php" style="color:black !important;text-decoration:none;font-size:1.2em;">Register</a>';
									else
										echo '<a href="user_profile.php" style="color:black !important;text-decoration:none;font-size:1.2em;">User Profile</a>';
									?>
								</li>
							
							</ul>

                        </div>
                        <!--/.nav-collapse -->



                        <div class="collapse clearfix" id="search">

                            <form class="navbar-form" role="search">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search">
                                    <span class="input-group-btn">

                    <button type="submit" class="btn btn-template-main">SUBMIT<i class="fa fa-search"></i></button>

                </span>
                                </div>
                            </form>

                        </div>
                        <!--/.nav-collapse -->

                    </div>


                </div>
                <!-- /#navbar -->

            </div>

            <!-- *** NAVBAR END *** -->

        </header>

	<div id="heading-breadcrumbs" style="background-image:url(asset/images/background.jpg) !important;margin-bottom:0px;margin-top:4em;">
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <h1 style="font-family: patua;">EVENTS</h1>
                    </div>
                    <div class="col-md-5">
                        <ul class="breadcrumb">
                            <li style="font-family: patua;"><a href="index.php">HOME</a>
                            </li>
							<li style="font-family: patua;">EVENTS</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>

    <div id="content">
            <div class="container">

                <section>

                    <!--<div class="row">
                        <div class="col-md-12">
                            <div class="heading">
							<center>
                                <h2>CONTACT US</h2>
								</center>
                            </div>

                            
                        </div>
                    </div> -->
			
					
					<div class="row services">
						
                        <div class="col-md-6 col-sm-6 col-xs-6 ">
                            <div class="col-md-4 col-md-offset-4 team-member" data-animate="fadeInDown">
                                
								<div class="image">
                                    <a href="events.php">
                                        <img src="asset/icons/Competitions.png" alt="" class="img-responsive ">
										<h3 style="margin-top:0.5em !important">Competitions</h3>
                                    </a>									
                                </div>
                            </div>
                            <!-- /.team-member -->
                        </div>
						<div class="col-md-6 col-sm-6 col-xs-6 ">
                            <div class="col-md-4 col-md-offset-4 team-member" data-animate="fadeInDown">
                                
								<div class="image">
                                    <a href="flagship.php" id="flagship_a">
                                        <img src="asset/icons/Flagship.png" alt="" class="img-responsive ">
										<h3 style="margin-top:0.5em !important">Flagships</h3>
                                    </a>									
                                </div>
                            </div>
                            <!-- /.team-member -->
                        </div>
						
						<div class="col-md-6 col-sm-6 col-xs-6 ">
                            <div class="col-md-4 col-md-offset-4 team-member" data-animate="fadeInDown">
                                
								<div class="image">
                                    <a href="proshows.php" id="proshows_a">
                                        <img src="asset/icons/Proshows.png" alt="" class="img-responsive ">
										<h3 style="margin-top:0.5em !important">Proshows</h3>
                                    </a>									
                                </div>
                            </div>
                            <!-- /.team-member -->
                        </div>
						<div class="col-md-6 col-sm-6 col-xs-6 ">
                            <div class="col-md-4 col-md-offset-4 team-member" data-animate="fadeInDown">
                                
								<div class="image">
                                    <a href="musical.php" id="musical_a">
                                        <img src="asset/icons/Musical Night.png" alt="" class="img-responsive ">
										<h3 style="margin-top:0.5em !important">Musical Night</h3>
                                    </a>									
                                </div>
                            </div>
                            <!-- /.team-member -->
                        </div>
						<div class="col-md-6 col-sm-6 col-xs-6 ">
                            <div class="col-md-4 col-md-offset-4 team-member" style="margin-bottom:0px" data-animate="fadeInDown">
                                
								<div class="image">
                                    <a href="workshop.php" id="workshops_a">
                                        <img src="asset/icons/Workshops.png" alt="" class="img-responsive ">
										<h3 style="margin-top:0em !important">Workshops, Exhibitions & Guest Talks</h3>
                                    </a>									
                                </div>
                            </div>
                            <!-- /.team-member -->
                        </div>
						<div class="col-md-6 col-sm-6 col-xs-6 ">
                            <div class="col-md-4 col-md-offset-4 team-member" data-animate="fadeInDown">
                                
								<div class="image">
                                    <a href="fun.php" id="exhibitions_a">
                                        <img src="asset/icons/Exhibitions.png" alt="" class="img-responsive ">
										<h3 style="margin-top:0.5em !important">Fun Events</h3>
                                    </a>									
                                </div>
                            </div>
                            <!-- /.team-member -->
                        </div>
                    </div>
                    <!-- /.row -->
	</section>
	</div>
	</div>
       
	<?php
		include "footer.php";
	?>
    </div>
    <!-- /#all -->

    <!-- #### JAVASCRIPT FILES ### -->
	<script src="js/sweetalert.min.js"></script>
    <script src="js/jquery-1.11.0.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="js/jquery-1.11.0.min.js"><\/script>')
    </script>
    <script src="js/bootstrap.min.js"></script>

    <script src="js/jquery.cookie.js"></script>
    <script src="js/waypoints.min.js"></script>
    <script src="js/jquery.counterup.min.js"></script>
    <script src="js/jquery.parallax-1.1.3.js"></script>
    <script src="js/front.js"></script>
	<script type="text/javascript" src="js/scroll.js"></script>
	<!-- owl carousel -->
    <script src="js/owl.carousel.min.js"></script>
	 


</body>

</html>