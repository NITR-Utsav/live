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
    
	<style>
        .box-simple{
            padding: 5px;
            border: 1px;
            border-top-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
        body{
            margin: 5%;
            padding: 0;
        }

        .btn-demo {
            margin: 5px;
            padding: 5px 10px;
            border-radius: 10px;
            color: #000;
            background-color: #FFFFFF;
        }

        .btn-demo:focus {
            outline: none;
        }

        .img-circle{
            max-width: 16em;
            overflow: hidden;
            border-radius: 30em;
        }

        .fade{
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
        }
        .modal{padding-top:100px;overflow:auto;background-color:transparent;text-align: left;}
        .modal-content{margin:auto;width:90%;max-width:1200px}

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
      <li class="nav-item">
        <a class="nav-link" href="all_events.php">Events</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Contact us
          <span class="sr-only">(current)</span></a>
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
    </ul>
    <ul class="navbar-nav ml-auto nav-flex-icons">
      <!-- <li class="nav-item">
        <a class="nav-link" href="user_profile.php">View Profile</a>
      </li> -->
      <!-- <li class="nav-item">
          <a class="nav-link" href="#">Logout</a>
      </li> -->
    </ul>
  </div>
</nav>
<!--/.Navbar -->


    <div id="content" style="margin-top:4em;">
        <div class="container">
            <section>
                <div class="row">
                    <div class="col-md-12">
                        <div class="heading">
							<center>
							<hr>
                            <h2>CONTACT US</h2>
                            </center>
                            <hr>
                        </div>
                    </div>
                </div>
				<div class="row">
                    <div class=" col-md-offset-2 col-md-2">
                        <div class="box-simple">
                            <i class="fa fa-paper-plane"></i>
                            <h3>Address</h3>
                            <p style="color:#000000">NITRUTSAV
                            <br>SAC, NIT Rourkela
                            <br>Sector-1, Rourkela 769008
                            <br>Odisha
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4">
                            <div class="box-simple">
                                <i class="fa fa-map"></i><br>
                                <iframe width="100%" height="150" src="https://maps.google.com/maps?q=SAC%20NIT%20Rourkela&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                <!--<iframe height="140" src="https://maps.google.com/maps?width=100%&amp;height=140&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(NIT%20Rourkela)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameborder="1" scrolling="no" marginheight="0" marginwidth="0"></iframe>-->
                            </div>
                    </div>
                    <div class="col-md-2 style="text-align:right;"">
                        <div class="box-simple">
                            <i class="fa fa-envelope"></i>
                            <h3>Media</h3>
                            <div>
                                <!-- Facebook -->
								<a href="https://www.facebook.com/nitrutsav.nitrkl/" target="_blank"  class="btn-floating btn-fb mx-1">
									<i class="fa fa-facebook-f"> </i>Facebook
                                </a><br>
                                <!-- Instagram -->
								<a href="https://www.facebook.com/nitrutsav.nitrkl/" target="_blank" class="btn-floating btn-ins mx-1">
									<i class="fa fa-instagram icon"></i>Instagram
								</a><br>
								<!-- Mail -->
								<a href="mailto:nitrutsav2019@gmail" target="_blank" class="btn-floating btn-email mx-1">
									<i class="fa fa-at icon"></i>Mail Us
								</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" style="text-align:right;">
                        <div class="box-simple">
                            <i class="fa fa-comments"></i>
                            <h3>Hospitality</h3>
                            <button type="button" class="btn btn-demo btn-red" data-toggle="modal" data-target="#myModal">
                                Accessibility
                            </button>
                            <button type="button" class="btn btn-demo btn-pink" data-toggle="modal" data-target="#myModal2">
                                Accommodation
                            </button><br>
                            <button type="button" class="btn btn-demo" style="background: lightcoral" data-toggle="modal" data-target="#myModal3">
                                Privacy Policy
                            </button>
                            <!-- <button type="button" class="btn btn-demo">
                                Chat for FAQ
                            </button> -->
                            <div id="myModal" class="modal fade" role="dialog" style="width:90vw;" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">How to reach</h4>
                                        </div>
                                        <div class="modal-body">
                                            <ul>
                                                <li><strong>RAIL:</strong></li>
                                                Rourkela is well connected with all parts of the country by train routes. It is situated on the Howrah-Mumbai line and as well as on Ranchi-Bhubaneswar line.  
                                                
                                                <li><strong>ROAD:</strong> </li>
                                                State Highway No. 10 and National Highway No. 23 connect Rourkela to various towns of the state of Odisha. 
                                                Thereby, it is also connected with cities like Ranchi, Raipur etc. 
                                                Several buses ply between Rourkela and the major cities of the state like Bhubaneswar, Puri, Sambalpur etc. 
                                                Once you reach the Railway Station, reaching NIT Rourkela is easy. The campus is around 7 kilometres from there and is linked by well-paved concrete roads. 
                                                The Autos are very receiving and the fare for the same is fixed at 120 INR. You could also call up an OLA Cab for the purpose.
                                                Local transport facility is also available from the bus terminals, the fare ranging somewhere around 120 INR.     
                                            </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-dialog btn-success" data-dismiss="modal">Dismiss</button>
                                            <!-- <a href="http://www.irctc.co.in"><button type="button" class="btn btn-dialog btn-success">Book Train</button></a> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="myModal3" class="modal fade" role="dialog" style="width:90vw;" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Your data is safe with us</h4>
                                        </div>
                                        <div class="modal-body">
                                            <ul class="modal-custom1-body" style="overflow-y:auto;">
                                                All the information collected from you via registration forms on the website, or otherwise, is exclusively used for the purpose of identifying you and improving your experience on our site. 
                        We collect your name, e-mail, telephonic contacts, mailing addresses, credit card/ debit card/ net banking and other such details as applicable when you register. All the monetary transactions are also recorded. However,we do have a policy where a participant can view the site anonymously and with discretion.
                        <br/><strong>Purpose of Collecting Information:</strong>
                                                <li>The information you provide is additionally used to process your transactions.</li>
                                                <li>Your feedback is handled in a careful and effective manner in order to find and resolve the short-comings of our site to improve your web experience</li>
                                                <li>Your information and remarks are important as they aid us in personalizing your experience,while on site, thoroughlyYour information and remarks are important as they aid us in personalizing your experience,while on site, thoroughly.</li>
                                                <li>Identification information shall also be used to organize events, competitions and online polls.</li>
                                                <li>You shall also be sent informative and periodic emails updating you with the latest details of our fest, via the email addresses that you register using.</li>
                        <br/><strong>Information Protection Policy:</strong>
                                                <li>We regard your information with utmost concern. We take concrete measures to protect your information when you make a transaction or registration on our website. 
                        All the data you enter on our website is protected using the secure server architecture for end-user interaction. Sensitive credit information as well as transaction details and steps shall be conveyed to you by Secure Socket Layer (SSL) technology which is then encrypted at our payment gateways. This is accessible only by the authorities trusted by our processing partners, who are, at all times required to keep the information confidential. After each transaction, all your personal/credit information (credit/debit card number, account number, etc.) shall be completely wiped out from our servers.
                        </li>
                        <br/><strong>Cookies</strong>
                        Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser which enables the sites or service providers systems to recognize your browser and retain certain information. 
                        Our website also accepts cookies to monitor data traffic and website interaction in order to personalize your web experience. 
                        However, you can remove the acceptance of cookies by changing the settings of your web browser or you can enable warning systems for your computer to alert the sending/ receiving of cookies on your system, according to your preference. This might result in improper functioning or unavailability of certain features on the website. Telephonic contacts for registration and transactions would still remain functional.
                        <br/><strong>Changes to Privacy Policy</strong>
                        The decision to change the privacy policy (if any), or any part thereof, shall be conducted with the utmost concern. These changes shall be accounted to the current information and user trends, and furthermore, shall also be informed on this website, with complete transparency.
                                            </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-dialog btn-success" data-dismiss="modal">Dismiss</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="myModal2" class="modal fade" role="dialog" style="width:90vw;" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Staying at NITR</h4>
                                        </div>
                                        <div class="modal-body">
                                            <ul class="modal-custom1-body" style="overflow-y:auto;">
                                                From its humble beginnings in 2005, Nitrutsav has evolved to be one of the largest cultural fests in Eastern India, today. Being the hosts of such an event, we, the organizing committee of Nitrutsav ‘18 have always strived to leave no stone unturned in providing comfort, care and a safe haven to each of its off-campus participants during their stay at NITR. We realize that, at the end of a hectic day of travel, moving around from here to there, a warm bed and homely delicious food is all that one requires. Hospitality management, therefore, is one of our top priorities this year. 
                                                For a successful completion of the event, we would require you to be refreshed, rejuvenated, and geared up for the wide assortment of events that NITRUTSAV has to offer. Our aim this year is to assure you of top-notch accommodation facilities and a varied and mixed bag of flavours to satiate every taste bud on campus. Should you require any information at any point of time, a team will always be ready to respond to your queries, details of which shall be provided to you. We would also try our level best to provide you with all the necessary conveniences at your very disposal, so that you do not face any real issues. 
                                                
                                                However, all said and done, there are a few etiquettes that all the participants are expected to follow at all times: 
                                                                        <li>Students carrying laptops or other high-end gadgets, are required to keep the same with their own selves at all times. NITR shall not be responsible for any losses.</li>
                                                                        <li>Students are requested to maintain decorum and not to indulge in any activity that might harm the peace of the event.</li>
                                                                        <li>While we shall be providing you with beds, furniture and mattresses, you are required to carry a bed sheet and other necessary things that you might require. Carrying a blanket would also be encouraged, as it might be a little cold during the event.</li>
                                                                        <li>All the participants must carry a valid Student ID Card to produce during the registration.</li>
                                                                        <li>Participants are requested to abide by the rules of each event, as informed to them.</li>
                                                                        
                                                We sincerely hope, that you make the most of Nitrutsav 2019, and that your stay here is something that you take back with you to cherish for days to come. We extend you, a hearty welcome from the entire fraternity.
                                                                    </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-dialog btn-success" data-dismiss="modal">Dismiss</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                
				<div class="row">
                    <div class="col-md-12">
                        <div class="heading">
							<center>
							<hr>
                            <h2>CONVENORS</h2>
                            </center>
                            <hr>
                        </div>
                    </div>
                </div>

				<div class="row">

                    <div class="col-md-4 col-xs-4" data-animate="fadeInDown"><center>
                        <div class="team-member">
                                <img src="images/anubhav.jpeg" alt="" class="img-circle">
                            <h3>Anubhav Sharma</h3>
							<h5>+91 73278 15289</h5>
                        </div>
                    </center>
                    </div>

                    <div class="col-md-offset-3 col-md-4 col-xs-4" data-animate="fadeInDown"><center>
                        <div class="team-member">
                            <img src="images/swapnil.jpeg" alt="" class="img-circle">
                            <h3>Swapnil Sahoo</h3>
							<h5>+91 88951 12417</h5>
                        </div>
                    </center>
                    </div>

					<div class="col-md-4 col-xs-4" data-animate="fadeInDown"><center>
                        <div class="team-member">
                                <img src="images/ranjeet.jpeg" alt="" class="img-circle">
                            <h3>Ranjeet Kumar</h3>
                            <h5>+91 70339 06925</h5>
                        </div>
                    </center>
                    </div> 
                </div>
                    <hr>
                    </div>
	        </section>
        </div>
    </div>
<br/><br/><br/><br/><br/>
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


</body>
</html>