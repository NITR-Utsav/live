<?php

require './db_connect.php';

$_SESSION["signed_in"]=signed_in();
?>

<!DOCTYPE html>
<html> 

<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" type="images/png" href="images/NU_LOGO_BW.png"/>
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
	<!-- Material Design Bootstrap -->
  	<link href="https://mdbootstrap.com/previews/templates/landing-page/css/mdb.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link href="css/owl.carousel.css" rel="stylesheet">
    <link href="css/owl.theme.css" rel="stylesheet">
    <style type="text/css">
    	
.owl-carousel.owl-loaded {
    display: inline-block;
}
    </style>
</head>

<body >
	<div class="component-page-base component-page-album">
		<div class="component-navigation">
			<nav class="top-nav js-top-nav" data-page-state="home">
				<div class="nav-right">
					<section class="component-widget-language">
						<button type="button" class="toggle" data-current-locale="en_US">
							<span class="text"></span>
							<svg class="svg arrow icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 6.9 4.2" xml:space="preserve">
								<polyline class="st0" points="6.4,0.4 3.4,3.4 0.4,0.4 "/>
							</svg>
						</button>
					</section>
				</div>
 			</nav>

		</div>


		<div class="component-atmosphere-abyss">
			<div class="bg-img-layer bg-flat">
			</div>

			<div class="bg-img-layer bg-dark-overlay">
			</div>

			<div class="bg-img-layer bg-interface-dark-overlay" data-active="off">
			</div>
		</div>

		<div class="component-atmosphere-brink">
			<div class="image">
			</div>
		</div>

		<div class="component-container-scrollable">
			<div class="inner">
				<section class="component-section-base component-section-masthead masthead-section " data-type="masthead" data-id="masthead" >
					<div class="inner">
						<div class="content">
							<div class="component-section-masthead-content-container">
								<div class="inner" data-state="normal" data-active="off">
									<div class="row">
										<div class="cell">
											<div class="titles-out-wrap">
												<h1 class="pentakill-logo">NITR Utsav</h1>
											</div>
											
											<button class="pentakill-marque vs-transform">
												<div class="titles-out-wrap">
													<div class="marque-numerals">
														<span class="inner">
														</span>
													</div>
												</div>
												
												<div class="marque-mask">
													<div class="mask-scaler js-scroll-scale-1">
														<div class="the-mask js-the-mask">
														</div>
													</div>
												</div>
											</button>
										</div>
									</div>

									<div class="row">
										<div class="cell">
											<div class="titles-out-wrap">
												<h2 class="title" lang="en">
													<span class="loop-ani-skew mix-blend-overlay">
														<span class="loop-ani-traced-move">Scroll to Enter</span>
													</span>
												</h2>

												<div class="play-button-container">
													<button class="component-button-play teal" disabled="disabled" style="display: none;">
														<span class="text">Play</span>
														<span class="icon">
															<svg class="svg play before" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10 12" xml:space="preserve">	<g>
																	<polygon class="st0" points="10,6 0,0 0,12 	"/>
																</g>
															</svg>
															
															<svg class="svg play after" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10 12" xml:space="preserve">		<g>
																	<polygon class="st0" points="10,6 0,0 0,12 	"/>
																</g>
															</svg>
														</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<section class="component-section-base video-section" data-type="video" data-id="video" >
					<div class="inner">
						<div class="row pt-5">
							<div class="col-md-4 text-center">
								<a href="gallery.php"><img src="images/TENT1.png"></a>
							</div>
							<div class="col-md-4 text-center">
								<?php
									if(!$_SESSION['signed_in'])
										echo '<a href="login.php"><img src="images/TENT2.png"></a>';
									else
										echo '<a href="user_profile.php"><img src="images/TENT2.png"></a>';
									?>
							</div>
							<div class="col-md-4 text-center">
								<a href="contact.php"><img src="images/TENT3.png"></a>
							</div>
							<div class="col-md-4 text-center offset-2">
								<a href="all_events.php"><img src="images/TENT4.png"></a>
							</div>
							<div class="col-md-4 text-center">
								<a href="ca.php"><img src="images/TENT5.png"></a>
							</div>				
						</div>
						<div class="container-fluid" id="about">
							<!-- Section: Features v.1 -->
							<section id="features" class="section feature-box mt-5 mb-5">

								<!-- Section heading -->
								<h3 class="text-center dark-grey-text font-weight-bold mb-5 mt-5 pt-5 wow fadeIn" data-wow-delay="0.2s">
									<strong>ABOUT</strong>
								</h3>

								<!-- Section description -->
								<p class="text-center w-responsive mx-auto my-5 grey-text wow fadeIn lead" data-wow-delay="0.2s">
									Ladies and Gentlemen this is the moment that you've been waiting for... you just can't ignore! 
								</p>

								<p class="text-center w-responsive mx-auto my-5 grey-text wow fadeIn lead" data-wow-delay="0.2s">
									Stranger or bruvver, to 'The Great Nitrutsav Show' everyone will surrender!
								</p>

								<p class="text-center w-responsive mx-auto my-5 grey-text wow fadeIn lead" data-wow-delay="0.2s">
									Hold your breath & pull up your socks as we present to you Nitrutsav '19- the much-awaited cultural carousel, right here at NIT Rourkela! With many, many glittering shows, dazzling events and, superb workshops NU '19 promises you mighty exhilaration like never before. Get ready to experience artistic expression at its best as NITR paints Rourkela in the jovial hues of Red, Yellow and Blue!
								</p>
								<!--Grid row-->
							</section>
						</div>
						
						<!-- Streak -->
						<div class="streak streak-photo streak-long-2" style="background-image: url('images/IMG_5501.jpg');">
							<div class="flex-center mask rgba-indigo-strong">
								<div class="text-center white-text">
									<p class="font-weight-bold white-text">Friday 01/02/2019, 3:30 PM</p>

									<!--Grid row-->
									<div class="row mt-5 mb-5">
										<!--Grid column-->
										<div class="col-lg-4 col-md-4">
											<hr class="white mx-5">
											<h1 class="display-4 font-weight-bold white-text">
												<strong id="days">21</strong>
											</h1>

											<hr class="white mx-5">

											<p class="font-weight-bold spacing">DAYS</p>
										</div>
										<!--Grid column-->

										<!--Grid column-->
										<div class="col-lg-4 col-md-4">
											<h1 class="display-4 font-weight-bold white-text rgba-white-light mx-4 py-3 mt-3">
												<strong id="hours">23</strong>
											</h1>

											<p class="font-weight-bold spacing pt-3">HOURS</p>
										</div>
										<!--Grid column-->

										<!--Grid column-->
										<div class="col-lg-4 col-md-4">
											<hr class="white mx-5">
											<h1 class="display-4 font-weight-bold white-text">
												<strong id="minutes">34</strong>
											</h1>

											<hr class="white mx-5">

											<p class="font-weight-bold spacing">MINS</p>
										</div>
										<!--Grid column-->
									</div>
									<!--Grid row-->
								</div>	
							</div>
						</div>
						<!-- Streak -->
						<div class="container-fluid" id="about">
							<!-- Section: Features v.1 -->
							<section id="features" class="section feature-box mt-5 mb-5">

								<!-- Section heading -->
								<h3 class="text-center dark-grey-text font-weight-bold mb-5 mt-5 pt-5 wow fadeIn" data-wow-delay="0.2s">
									<strong>SPONSORS</strong>
								</h3>
								<div class="container">
				                <div class="row">
				                    <div class="col-md-12">
									<div class="heading text-center">
				                            <h3 style="font-family: bazar;">Our Current Sponsors</h3>
				                        </div>
				                        <div class="owl-carousel owl-theme">
			                                <img src="images/sponsors/new/BB.png" style="max-height:10em;max-width:10em;" alt="" class="img-responsive" >
			                                <img src="images/sponsors/new/BM.png" style="padding-top:1.5em;max-height:10em;max-width:10em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/Coca cola.png" style="padding-top:2em;max-height:10em;max-width:10em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/IOCL.png" style="max-height:8em;max-width:8em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/KJS.png" style="padding-top:1.5em;max-height:10em;max-width:10em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/RT.png" style="padding-top:1em;max-height:10em;max-width:10em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/OHM.jpg" style="padding-top:2em;max-height:10em;max-width:10em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/PPT.jpg" style="max-height:10em;max-width:10em;" alt="" class="img-responsive">
			                                <img src="images/sponsors/new/SRG.jpg" style="max-height:8em;max-width:8em;" alt="" class="img-responsive">
				                        </div>
				                        <!-- /.owl-carousel -->
				                    </div>

				                </div>
				            </div>
							</section>
						</div>
				        <section id="sponsor" class="bar background-white no-mb" style="background-image:url(images/images/background.jpg) !important;">
				            
				        </section>
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
						          <a href="https://www.facebook.com/nitrutsav.nitrkl/" target="_blank" class="btn-floating btn-tw mx-1">
						            <i class="fa fa-instagram icon"> </i>
						          </a>
						        </li>
						        <li class="list-inline-item">
						          <a href="mailto:nitrutsav2019@gmail" target="_blank" class="btn-floating btn-gplus mx-1">
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
					</div>
				</section>
			</div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
	<script type="text/javascript" src="js/require.js"></script>
	<script type="text/javascript" src="js/js.js"></script>
	<script type="text/javascript">require(["main"], function(main) {main.run({region: 'na',locale: 'en_US',landingUrlPattern: 'http://pentakill.leagueoflegends.com/{{locale}}/',versionedimagesPath: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/pentakill2/en_US/7bd32ba296c00775cac78023e40c62381f35cf2c/asset/',qualaroo: {"onLoadSurveyId":"177363","afterVideoPlayingSurveyIds":["177368","177367","177366","177365","177364"]}});});
	</script>
	<!--  MDB core JavaScript  -->
  	<script type="text/javascript" src="https://mdbootstrap.com/previews/templates/landing-page/js/mdb.min.js"></script> <!-- owl carousel -->
    <script src="js/owl.carousel.min.js"></script>
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

		$(document).ready(function() {
//Preloader
$(window).on("load", function() {
preloaderFadeOutTime = 500;
function hidePreloader() {
var preloader = $('.spinner');
preloader.fadeOut(preloaderFadeOutTime);
}
hidePreloader();
});
});
</script>
<script type="text/javascript">
	var countDownDate = new Date("Feb 1, 2019 15:30:00").getTime();
 	var x = setInterval(function(){
		var now = new Date().getTime();
 		var distance = countDownDate - now;
 		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		document.getElementById("days").innerHTML = days;
		document.getElementById("hours").innerHTML = hours;
		document.getElementById("minutes").innerHTML = minutes;
 	}, 1000);

$( '.owl-carousel' ).owlCarousel({
    items: 6,
    nav: true,
    dots: false,
    mouseDrag: true,
    responsiveClass: true,
    responsive: {
        0:{
          items: 1
        },
        480:{
          items: 3
        },
        769:{
          items: 6
        }
    }
});

//Background image
$( '.img-wrap' ).each( function(){
    var img = $( this ).find( 'img' );
    var src = img.attr( 'src' );
    $( this ).css( 'background-image', 'url( '+ src +' )' );
});
  	</script>

</body>
</html>