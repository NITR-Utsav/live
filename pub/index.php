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

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
	<!-- Material Design Bootstrap -->
  	<link href="https://mdbootstrap.com/previews/templates/landing-page/css/mdb.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
	<!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Css animations  -->
    <link href="../css/animate.css" rel="stylesheet">

    <!-- Theme stylesheet, if possible do not edit this stylesheet -->
    <link href="../css/style-default.css" rel="stylesheet" id="theme-stylesheet">
	<link href="../css/nishant_css/splace.css" rel="stylesheet">

    <!-- Custom stylesheet - for your changes -->
    <link href="../css/custom.css" rel="stylesheet">
	<!--form stylesheet-->
    <link rel="stylesheet" type="text/css" href="../css/form.css">

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
		

	<div id="all"">

      
		<div id="content">
            <div class="container" id="contact">
			<section>

                    <div class="row text-center">

                       <br><br>
                        <div class="col-md-8 col-md-offset-2">
						
							<div class="form">
  
						
							  
							  <div class="tab-content" style="border: none;">
								<div id="signup">   
								  <h1 style="font-family: patua;">Management Login</h1>
								  
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
		<script src="../js/jquery.form.js"></script>
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