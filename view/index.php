<?php

require '../db_connect.php';

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
	<link href="../css/nishant_css/splace.css" rel="stylesheet">

    <!-- Custom stylesheet - for your changes -->
    <link href="../css/custom.css" rel="stylesheet">
	<!--form stylesheet-->
    <link rel="stylesheet" type="text/css" href="../css/form.css">
	

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

      
		<div id="content">
            <div class="container" id="contact">
			<section>

                    <div class="row text-center">

                       <br><br>
                        <div class="col-md-8 col-md-offset-2">
						
							<div class="form">
  
						
							  
							  <div class="tab-content" style="border: none;">
								<div id="signup">   
								  <h1 style="font-family: patua;">Login</h1>
								  
								  <form id="login-form" method="post">
								  
									<div class="field-wrap">
									<label style="font-family: patua;" class="registration-label">
									  User ID<span class="req">*</span>
									</label>
									<input name="userid" type="email"required autocomplete="off"/>
								  </div>
								  
								  <div class="field-wrap">
									<label style="font-family: patua;" class="registration-label">
									  Password<span class="req">*</span>
									</label>
									<input name="pwd" type="password"required autocomplete="off"/>
								  </div>
								  
								  <!-- <p class="forgot"><a href="#">Forgot Password?</a></p> -->
								  
								  <button class="registration-button registration-button-block" id="loginBtn"/>Log In</button>
								  
								  </form>

								</div>
								
								<div id="login"> </div>  
								  
								
							  </div><!-- tab-content -->
							  
							</div> 
							<!-- /form -->                         
						</div>
                    </div>
                    <!-- /.row -->

                </section>

			</div>
		</div>
		
		
		
		</div>


    
    <!-- #### JAVASCRIPT FILES ### -->
	
    <script src="../js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="../js/form.js"></script>
	 <script>
        window.jQuery || document.write('<script src="../js/jquery-1.11.0.min.js"><\/script>')
    </script>
    <script src="../js/bootstrap.min.js"></script>
    
    <script src="../js/jquery.cookie.js"></script>
		<script src="../js/jquery.form.min.js"></script>
    <script src="../js/waypoints.min.js"></script>
    <script src="../js/jquery.counterup.min.js"></script>
    <script src="../js/jquery.parallax-1.1.3.js"></script>
    <script src="../js/front.js"></script>
	   <script type="text/javascript" src="../js/scroll.js"></script>
       <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js"></script>
       
	
    
<script>

$("#loginBtn").click(function(e){
	e.preventDefault();
	$("#login-form").ajaxSubmit({
            url:'./signin.php',
            success:function(responseText){
                alert(responseText);
								if(responseText=='Login Successful !')
									window.location.href="./dashboard.php";
								//redirect to the required page
								
            }
        });
});

</script>
    <!-- owl carousel -->
    <script src="../js/owl.carousel.min.js"></script>
	
	



</body>

</html>