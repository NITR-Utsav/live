<?php
include("../db_connect.php");

$_SESSION["admin_in"]=signed_in("1");
	if(!$_SESSION['admin_in'])
		header("Location:./");
	
$stmt=$con->prepare("SELECT COUNT(*) from users");
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_array(MYSQLI_ASSOC);
$registered=$row['COUNT(*)'];

$stmt=$con->prepare("SELECT COUNT(*) from users WHERE paid=1");
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_array(MYSQLI_ASSOC);
$paid=$row['COUNT(*)'];

$stmt=$con->prepare("SELECT COUNT(*) from users WHERE checkin=1");
$stmt->execute();
$result=$stmt->get_result();
$row=$result->fetch_array(MYSQLI_ASSOC);
$checkedin=$row['COUNT(*)'];

$x=array("registered"=>$registered,"paid"=>$paid,"checkedin"=>$checkedin);
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
		<link href='../css/font-google.css' rel='stylesheet' type='text/css'> 

    <!-- Bootstrap and Font Awesome css -->
    <link rel="stylesheet" href="../css/font-awesome.css">
    <link rel="stylesheet" href="../css/bootstrap-min.css">

    <!-- Css animations  -->
    <link href="../css/animate.css" rel="stylesheet">

    <!-- Theme stylesheet, if possible do not edit this stylesheet -->
    <link href="../css/style-default.css" rel="stylesheet" id="theme-stylesheet">


    <!-- Custom stylesheet - for your changes -->
    <link href="../css/custom.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="./jsgrid/dist/jsgrid.min.css">
    <link type="text/css" rel="stylesheet" href="./jsgrid/dist/jsgrid-theme.min.css">
    <link type="text/css" rel="stylesheet" href="./jsgrid-php-master/public/css/style.css">
    </head>

	

    <!-- Responsivity for older IE -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->


    <!-- Favicon and apple touch icons-->	
	<link rel="apple-touch-icon" sizes="57x57" href="../img/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="../img/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="../img/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="../img/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="../img/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="../img/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="../img/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="../img/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="../img/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="../img/favicon/android-icon-192x192.png">
	
	<link rel="icon" type="image/png" sizes="32x32" href="../img/favicon/nu_black_48x48.png">
	<link rel="icon" type="image/png" sizes="96x96" href="../img/favicon/nu_black_48x48.png">
	<link rel="icon" type="image/png" sizes="16x16" href="../img/favicon/nu_black_48x48.png">
	
	<link rel="manifest" href="../img/favicon/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="../img/favicon/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
    <!-- owl carousel css -->

    <link href="../css/owl.carousel.css" rel="stylesheet">
    <link href="../css/owl.theme.css" rel="stylesheet">

</head>
<style>

@font-face {
   font-family: patua;
   src: url(../css/fonts/PatuaOne-Regular.otf);
}

@font-face {
   font-family: norton;
   src: url(../css/fonts/NORTON.ttf);
}

@font-face {
   font-family: haymaker;
   src: url(../css/fonts/Haymaker.ttf);
}
@font-face {
   font-family: proxima;
   src: url(../css/fonts/Proxima Nova Semibold.otf);
}
@font-face {
   font-family: bazar;
   src: url(../css/fonts/Bazar.ttf);
}
@font-face {
   font-family: monthoers;
   src: url(../css/fonts/Monthoers.ttf);
}


h1 {
  text-align: center;
  color: #c76069;
  font-weight: 300;
  margin: 0 0 40px;
  font-family: 'norton', sans-serif;
}

input[type="radio"]{
	height:auto;
	width:auto;
	display:initial;
	margin-top:0.5em;
	margin-left: 3em;
}

</style>
<body style="background-image:url(../asset/images/background.jpg) !important;">

	<div id="all"  style="background-image:url(../asset/images/background.jpg) !important;">

        

            
		
					
		<section id="figures" class="bar background-pentagon no-mb" style="background-image:url(../assets/images/background.jpg) !important;">
            <div class="container">
                <div class="row showcase">
				

                   
                    <div class="col-md-4 col-sm-4">
                        <div class="item">
                            <div class="icon"><i class="fa fa-users"></i>
                            </div>
                            <h4><span class="counter" id="registered" ><?php echo $x['registered']?></span><br>Registered</h4>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="item">
                            <div class="icon"><i class="fa fa-users"></i>
                            </div>
                            <h4><span class="counter" id="paid"><?php echo $x['paid']?></span><br>Paid</h4>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="item">
                            <div class="icon"><i class="fa fa-users"></i>
                            </div>
                            <h4><span class="counter" id="checkedin"><?php echo $x['checkedin']?></span><br>Checked In</h4>
                        </div>
                    </div>
					     <div id="jsGrid"></div>
						  
						 <div class="col-md-12 text-center">
                            <div class="heading">
                                <a href="signout.php"><button style="font-family: patua;" type="button" class="btn btn-success">Logout</button></a>
                            </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </section>
   
		
		
	</div>


    <!-- #### JAVASCRIPT FILES ### -->

    <script src="../js/jquery-1.11.0.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="../js/jquery-1.11.0.min.js"><\/script>')
    </script>
    <script src="../js/bootstrap.min.js"></script>
    
    <script src="../js/jquery.cookie.js"></script>
    <script src="../js/waypoints.min.js"></script>
    <script src="../js/jquery.counterup.min.js"></script>
    <script src="../js/jquery.parallax-1.1.3.js"></script>
    <script src="../js/front.js"></script>
	   <script type="text/javascript" src="../js/scroll.js"></script>
       <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js"></script>
       <script type="text/javascript" src="./jsgrid/dist/jsgrid.min.js"></script>
<script type="text/javascript" src="./jsgrid-php-master/public/js/sample.js"></script>

	   
    

    <!-- owl carousel -->
    <script src="../js/owl.carousel.min.js"></script>
	
	



</body>

</html>