<?php

require '../db_connect.php';

$_SESSION["coordinator_in"]=signed_in(2);
	if(!$_SESSION['coordinator_in'])
		header("Location:./");
	
	$stmt=$con->prepare("SELECT * FROM events where eid = ?") or die(mysqli_error($con));
    $stmt->bind_param("s",$_SESSION['event_id']);
	$stmt->execute() or die(mysqli_error($con));
	$result=$stmt->get_result() or die(mysqli_error($con));
    $event=$result->fetch_array(MYSQLI_ASSOC);
	if($result->num_rows === 0)
    {
        header("Location:./");
    }
	
	$stmt=$con->prepare("SELECT COUNT(*) from event_user WHERE eid = ?") or die(mysqli_error($con));
	$stmt->bind_param("s",$_SESSION['event_id']);
	$stmt->execute();
	$result=$stmt->get_result();
	$row=$result->fetch_array(MYSQLI_ASSOC);
	$count=$row['COUNT(*)'];
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
    <link href="../css/custom1.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="./jsgrid/dist/jsgrid.min.css">
    <link type="text/css" rel="stylesheet" href="./jsgrid/dist/jsgrid-theme.min.css">
    <link type="text/css" rel="stylesheet" href="./jsgrid-php-master/public/css/style.css">

	

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
<body style="background-image:url(../assets/images/background.jpg) !important;">

	<div id="all"  style="background-image:url(../assets/images/background.jpg) !important;">

        

            
		<div id="content">
            <div class="container">

				
                <div class="row ">
					
					<div class="col-md-12 text-center">
                            <div class="heading">
                                <h2>NITRUTSAV 2018</h2> <br>
								<h3>EVENT COORDINATOR DASHBOARD</h3>
                            </div>
					</div>

					
                    <div class="col-md-6 col-md-offset-3 " id="customer-orders">                        
		
						<div class="box">
                            <div class="table-responsive">
                                <table class="table table-hover ">
                                    
                                    <tbody>
                                        <tr>
                                            <th>NITRUTSAV EVENT ID</th>
                                            <td><?php echo $event['eid'] ?></td>
                                        </tr>
										   <tr>
                                            <th>TITLE</th>
                                            <td><?php echo $event['title'] ?></td>
                                        </tr>
										   <tr>
                                            <th>DATE</th>
                                            <td><?php echo $event['date'] ?></td>
                                        </tr>
										   <tr>
                                            <th>TIME</th>
                                            <td><?php echo $event['time'] ?></td>
                                        </tr>
										   <tr>
                                            <th>VENUE</th>
                                            <td><?php echo $event['venue'] ?></td>
                                        </tr>
										<tr>
                                            <th>Total Participants</th>
                                            <td><?php echo $count ?></td>
                                        </tr>
                                      
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.table-responsive -->
						
						</div>
						
                    </div>
                    <!-- /.col-md-9 -->
					
                    <div id="jsGrid"></div>
					<h2>Enter the NU IDs of the winners(Comma separated with no space) : </h2>
					<div class="col-md-8 col-md-offset-2" style="padding-top:2em">
					
                     <div class="col-md-4 col-md-offset-2">
                        <h4>1st</h4>
						<textarea  id="winner1"></textarea>
                     </div>
                     <div class="col-md-4 col-md-offset-2">
                        <h4>2nd</h4>
						<textarea id="winner2"></textarea>
                    </div>
                     
                     <div class="col-md-12 text-center" style="padding-top:1em;margin-bottom:1em;"><button id="submit_winner" style="font-family: patua;" type="button" class="btn btn-success">Submit</button></div>
                     
                     </div>
						 <div class="col-md-12 text-center">
                            <div class="heading">
                                <a href="signout.php"><button style="font-family: patua;" type="button" class="btn btn-success">Logout</button></a>
                            </div>
				</div>
			</div>
		</div>
		
		
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
	
	<script>
$("#submit_winner").click(function(){
    $.post("./winner.php",{
        eid:<?php echo $_SESSION['event_id'] ?>,
        winner1:$("#winner1").val(),
        winner2:$("#winner2").val()
    },function(data,status){
            alert(data);
			location.reload();
    });
});
</script>



</body>

</html>