<?php
    include('./db_connect.php');
    if(empty($_GET['event']))
        header("Location:./events.php");
    $stmt=$con->prepare("SELECT * FROM events where eid = ? AND category = 'fun'") or die(mysqli_error($con));
    $stmt->bind_param("s",$_GET['event']);
	$stmt->execute() or die(mysqli_error($con));
	$result=$stmt->get_result() or die(mysqli_error($con));
    $event=$result->fetch_array(MYSQLI_ASSOC);
	if($result->num_rows === 0)
    {
        header("Location:./index.php");
    }
	$_SESSION["signed_in"]=signed_in();
	if(file_exists($event['img_path'])) {
							$path = $event['img_path'];
						}
						else
							$path = "asset/images/events/logo_alt.png";
						
?>
<!DOCTYPE html>
<html lang="en">

<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111091736-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-111091736-1');
</script>
	<meta property="og:url"                 content="http://nitrutsav.nitrkl.ac.in/view_fun.php?event=<?php echo $event['eid']; ?>" />
	<meta property="og:type"               content="website" />
	<meta property="og:title"              content="<?php echo $event['title'];?>" />
	<meta property="og:description"        content="<?php echo $event['description'];?>" />
	<meta property="og:image"              content="http://nitrutsav.nitrkl.ac.in/<?php echo $event['img_path'];?>"/>
	<meta property="og:image:alt"          content="http://nitrutsav.nitrkl.ac.in/img/favicon/nu_black_200x200.png" />
	
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
    <link href="css/sweetalert.css" rel="stylesheet">
	
	

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

</head>
<style>
@font-face {
   font-family: patua;
   src: url(css/fonts/PatuaOne-Regular.otf);
}

@font-face {
   font-family: norton;
   src: url(css/fonts/NORTON.ttf);
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
								<li>
                                    <a href="all.php" style="z-index:12;color:black !important;text-decoration:none;font-size:1.2em;">Events </a>
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
                        <h1 style="font-family: patua;"><?php echo $event['title']?></h1>
                    </div>
                    <div class="col-md-5">
                        <ul class="breadcrumb">
                            <li><a style="font-family: patua;" href="index.php">HOME</a>
                            </li>
							 <li><a style="font-family: patua;" href="all.php">EVENTS</a>
                            </li>
                            <li><a style="font-family: patua;" href="fun.php">FUN EVENTS</a>
                            </li>
                            <li style="font-family: patua;"><?php echo $event['title']?></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
		    <div id="content">
            <div class="container">

           
                <div class="row portfolio-project">

                    <section>

					<div class="col-sm-4">                           
						<img src="<?php echo $path;?>" alt="" class="img-responsive">
								<!-- <h2><?php echo $event['img_path'] ?></h2> -->
						<br>
					</div>
					<div class="col-sm-8">
                        <div class="col-sm-12" >                            
							<div class="project-more" >
                                
								<div class="col-sm-6" >
								<h4 style="font-family: haymaker;">Date</h4>
								<p style="color:black;font-family: proxima;font-size:1em;"><?php echo nl2br($event['date'])?></p>
                                <h4 style="font-family: haymaker;">Venue</h4>
                                <p style="color:black;font-family: proxima;font-size:1em;"><?php echo nl2br($event['venue'])?></p>
                                </div>
								
								<div class="col-sm-6">
								<h4 style="font-family: haymaker;">Time</h4>
                                <p style="color:black;font-family: proxima;font-size:1em;"><?php echo nl2br($event['time'])?></p>
                                <h4 style="font-family: haymaker;">Coordinators</h4>
								<p style="color:black;font-family: proxima;font-size:1em;"><?php echo nl2br($event['coordinator'])?></p>
                                </div>
								 
                            </div>
						
							<div class="col-sm-6">
								<h5 style="font-family: haymaker;">You can register here</h5>
								<button id="event_button" class="btn btn-template-main" style="margin-bottom:1em;">Register</button>
									<br>
							</div>
							<div class="col-sm-6" id="share-buttons">
								<h5 style="font-family: haymaker;">You can share it on </h5>
								<!-- Facebook -->
								<a href="https://www.facebook.com/sharer/sharer.php?u=http://nitrutsav.nitrkl.ac.in/view_fun.php?event=<?php echo $event['eid']; ?>" target="_blank">
									<img src="facebook.png" alt="Facebook" />
								</a>
								
								<a class="hidden-lg" href="whatsapp://send?text=Hey! Come be a part of our fun event in NITRUTSAV 2018. http://nitrutsav.nitrkl.ac.in/view_fun.php?event=<?php echo $event['eid']; ?>" data-action="share/whatsapp/share">
								<img src="whatsapp.png" style="height:40px; width:40px">
								</a>
								<br>
								
								
							</div>
							
							
						
							
                        </div>
                        
						<div class="col-sm-12">
							<div class="tabs" >
								<ul class="nav nav-tabs ">
                                <?php if(!empty($event['description']))
									echo '<li class="active"><a style="font-family: haymaker;background-color:transparent;" href="#tab2-1" data-toggle="tab">Description</a>
                                    </li>';
                                    if(!empty($event['rules']))
									echo '<li class=""><a style="font-family: haymaker;background-color:transparent;" href="#tab2-2" data-toggle="tab">Rules</a>
                                    </li>';
                                    if(!empty($event['judging_criteria']))
									echo '<li class=""><a style="font-family: haymaker;background-color:transparent;" href="#tab2-3" data-toggle="tab">Judging criteria</a>
									</li>';
								  ?>
								</ul>
								<div class="tab-content tab-content-inverse">
									<div class="tab-pane active" style="font-family: proxima;font-size:1.2em;" id="tab2-1">
										<?php echo nl2br($event['description']); ?>
									</div>
									<!-- /.tab -->
									<div class="tab-pane" style="font-family: proxima;font-size:1.2em;" id="tab2-2">
                                    <?php echo nl2br($event['rules']); ?>
									
									</div>
									<!-- /.tab -->
									<div class="tab-pane" style="font-family: proxima;font-size:1.2em;" id="tab2-3">
                                    <?php echo nl2br($event['judging_criteria']); ?>
									</div>
									<!-- /.tab -->
									
									<!-- /.tab -->
								</div>
							</div>
							<!-- /.tabs -->
							
                        </div>
                        <!-- /.col-md-6 -->
						</div>
					</div>
                    </section>

                </div>

                

            </div>
            <!-- /.container -->


        </div>
        
      <?php
		include "footer.php";
	  ?>
	
    </div>
    <!-- /#all -->

    <!-- #### JAVASCRIPT FILES ### -->

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
	<script type="text/javascript" src="js/sweetalert.min.js"></script>
  
	
    <!-- owl carousel -->
    <script src="js/owl.carousel.min.js"></script>
	<script>
	
    $("#event_button").click(function(){
		
		<?php
			if($_SESSION["signed_in"]){
				echo '
						$.post("./reg_event.php",
									  {
										  uid : '.$_SESSION['userid'].',
										  eid :	'.$event['eid'].' 
					  
									},
									function(data,status){
										swal(data);
										
									});
					';
			}
			else
				echo 'swal({ 
							  title: "Error",
							   text: "You need to login first.",
								type: "error" 
							  },
							  function(){
								window.location.href = "login.php";
							});';
		?>
    });
                        </script>


</body>

</html>