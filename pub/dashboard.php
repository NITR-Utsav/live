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

    <title>NITRUTSAV 2019</title>

    <meta name="keywords" content="nitrutsav,NU,nitr,cultural fest,fest,eastern india">

  <link rel="shortcut icon" type="images/png" href="/images/NU_LOGO_BW.png"/>
  <!--=======Font Open Sans======-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">


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

    <link href="../css/owl.carousel.css" rel="stylesheet">
    <link href="../css/owl.theme.css" rel="stylesheet">

</head>
<style>

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
<body>

	<div id="all">

				
		<section id="figures" class="bar background-pentagon no-mb">
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
						 
					
                </div>
                <!-- /.row -->
			
            </div>
            <!-- /.container -->
        </section>
		<div class="col-md-12 text-center">
						<div class="heading">
							<a href="user_list.php"><button type="button" class="btn btn-success">Download User List</button></a>
							<a href="ca_list.php"><button type="button" class="btn btn-success">Download CA List</button></a>
							<a href="signout.php"><button type="button" class="btn btn-success">Logout</button></a>
						</div>
					</div>
	</div>
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