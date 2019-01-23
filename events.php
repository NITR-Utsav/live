<?php
require './db_connect.php';
$query = "SELECT * FROM event WHERE category = '".$_GET['etype']."'";
$result2 = mysqli_query($con, $query);
$row2 = mysqli_fetch_array($result2);
$result = mysqli_query($con, $query);
$row = mysqli_fetch_array($result);
?>
<!DOCTYPE html>
<html  lang="en" class="no-js">
    <head>
        <title>Events</title>
        <meta charset="UTF-8" />
        <link rel="shortcut icon" href="favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
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
            margin: 5% 5% 0;
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
	<script type="text/javascript" src="https://tympanus.net/codrops/adpacks/analytics.js"></script>
		
    </head>
    <body class="loading">
      <!--Put preloader here-->
      <svg class="hidden">
          <symbol id="icon-arrow" viewBox="0 0 24 24">
            <title>arrow</title>
            <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "/>
          </symbol>
          <symbol id="icon-drop" viewBox="0 0 24 24">
            <title>drop</title>
            <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"/><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"/>
          </symbol>
          <svg id="icon-github" viewBox="0 0 33 33">
            <title>github</title>
            <path d="M16.608.455C7.614.455.32 7.748.32 16.745c0 7.197 4.667 13.302 11.14 15.456.815.15 1.112-.353 1.112-.785 0-.386-.014-1.411-.022-2.77-4.531.984-5.487-2.184-5.487-2.184-.741-1.882-1.809-2.383-1.809-2.383-1.479-1.01.112-.99.112-.99 1.635.115 2.495 1.679 2.495 1.679 1.453 2.489 3.813 1.77 4.741 1.353.148-1.052.569-1.77 1.034-2.177-3.617-.411-7.42-1.809-7.42-8.051 0-1.778.635-3.233 1.677-4.371-.168-.412-.727-2.069.16-4.311 0 0 1.367-.438 4.479 1.67a15.602 15.602 0 0 1 4.078-.549 15.62 15.62 0 0 1 4.078.549c3.11-2.108 4.475-1.67 4.475-1.67.889 2.242.33 3.899.163 4.311C26.37 12.66 27 14.115 27 15.893c0 6.258-3.809 7.635-7.437 8.038.584.503 1.105 1.497 1.105 3.017 0 2.177-.02 3.934-.02 4.468 0 .436.294.943 1.12.784 6.468-2.159 11.131-8.26 11.131-15.455 0-8.997-7.294-16.29-16.291-16.29"></path>
          </svg>
          <svg id="icon-caret" viewBox="0 0 32 19">
            <title>caret</title>
            <path d="M31.423 3.976l-14.319 14.32a1.631 1.631 0 0 1-2.306 0L.478 3.976a1.631 1.631 0 0 1 0-2.307L1.63.516a1.631 1.631 0 0 1 2.307 0l12.013 12.013L27.964.516a1.63 1.63 0 0 1 2.306 0l1.154 1.153a1.63 1.63 0 0 1-.001 2.307z"></path>
          </svg>
          <svg id="icon-rewind" viewBox="0 0 36 20">
              <title>rewind</title>
              <path d="M16.315.061c.543 0 .984.44.984.984v17.217c0 .543-.44.983-.984.983L.328 10.391s-.738-.738 0-1.476C1.066 8.178 16.315.061 16.315.061zM35.006.061c.543 0 .984.44.984.984v17.217c0 .543-.44.984-.984.984L19.019 10.39s-.738-.738 0-1.475C19.757 8.178 35.006.06 35.006.06z"/>
            </svg>
        </svg>
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
			  </ul>
		  </div>
		</nav>
      <main>
          <h3 class="text-center dark-grey-text text-uppercase font-weight-bold mt-5 pt-5 wow fadeIn" data-wow-delay="0.2s">
          	  <strong>
				    <?php 
						if(isset($_GET['etype'])) {
							echo $_GET['etype'];
						}
				    ?>
			  </strong>
        	</h3>
			<div class="grid-wrap">
				<div class="grid">
					<?php while($row) {?>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/nuposters/<?php echo $row['image'];?>" alt="<?php echo $row['image'];?>">
						</div>
						<h3 class="grid__item-title"><?php echo $row['name'];?></h3>
						<h4 class="grid__item-number">NU<?php echo $row['eid'];?></h4>
					</a>
					<?php
                		$row =  mysqli_fetch_array($result);
              		}?>
				</div>
			</div><!-- /grid-wrap -->
			<div class="content">
				<?php while($row2) {?>
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/nuposters/<?php echo $row2['image'];?>" alt="<?php echo $row2['image'];?>">
						<h2 class="content__item-title"><?php echo $row['name'];?></h2>
					</div>
					<h3 class="content__item-subtitle"><?php echo $row['name'];?></h3>
					<div class="content__item-text">
						<p><?php echo $row2['description']; ?></p>
					</div>
					<div class="content__see more text-center mt-5">
						<a href="event_details.php?eid=<?php echo $row2['eid'];?>" class="btn btn-secondary">See More</a>
					</div>
				</div>
				<?php
					$row2 =  mysqli_fetch_array($result2);
				}?>
				<button class="content__close">Close</button>
				<svg class="content__indicator icon icon--caret"><use xlink:href="#icon-caret"></use></svg>
			</div>
      </main>
		
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
        <!-- JQuery -->
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <!-- Bootstrap tooltips -->
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
        <!-- Bootstrap core JavaScript -->
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <!-- MDB core JavaScript -->
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.15/js/mdb.min.js"></script>
      <script src="js/imagesloaded.pkgd.min.js"></script>
		<script src="js/masonry.pkgd.min.js"></script>
		<script src="js/charming.min.js"></script>
		<script src="js/TweenMax.min.js"></script>
    <script src="js/demo.js"></script>
    <script src="js/particles.js"></script>
    <script src="js/anime.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js"></script>
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
    </body>
</html>