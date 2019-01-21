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
	<link href="css/style.css" rel="stylesheet">
  
	<style>
    	html,
        body,
        header,
        .jarallax {
          height: 100%;
        }
        body{
            margin: 5%;
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
	     
	  </div>
	</nav>
<!--/.Navbar -->
	<!-- Main content -->
  	<main>
      		<h3 class="text-center dark-grey-text font-weight-bold mt-5 pt-5 wow fadeIn" data-wow-delay="0.2s">
          		<strong>EVENTS</strong>
        	</h3>
			<div class="grid-wrap">
				<div class="grid">
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/1.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Tour of my Life</h3>
						<h4 class="grid__item-number">B05</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/2.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">One day in Africa</h3>
						<h4 class="grid__item-number">A21</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/3.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Wrecked and happy</h3>
						<h4 class="grid__item-number">XB3</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/4.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">The silent thief</h3>
						<h4 class="grid__item-number">HK9</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/5.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Locked away</h3>
						<h4 class="grid__item-number">FW1</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/6.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Isolation and me</h3>
						<h4 class="grid__item-number">DZ5</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/7.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Desert races</h3>
						<h4 class="grid__item-number">M02</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/8.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Transcendence</h3>
						<h4 class="grid__item-number">KL7</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/9.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Loosing my mind</h3>
						<h4 class="grid__item-number">UY6</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/10.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Holding your breath</h3>
						<h4 class="grid__item-number">OP2</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/11.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Making the best of it</h3>
						<h4 class="grid__item-number">EC5</h4>
					</a>
					<a href="#" class="grid__item">
						<div class="grid__item-bg"></div>
						<div class="grid__item-wrap">
							<img class="grid__item-img" src="images/12.jpg" alt="Some image" />
						</div>
						<h3 class="grid__item-title">Haunted Blessings</h3>
						<h4 class="grid__item-number">2VX</h4>
					</a>
				</div>
			</div><!-- /grid-wrap -->
			<div class="content">
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/1.jpg" alt="Some image" />
						<h2 class="content__item-title">Tour of my life</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/2.jpg" alt="Some image" />
						<h2 class="content__item-title">One day in Africa</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/3.jpg" alt="Some image" />
						<h2 class="content__item-title">Wrecked and happy</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/4.jpg" alt="Some image" />
						<h2 class="content__item-title">The silent thief</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/5.jpg" alt="Some image" />
						<h2 class="content__item-title">Locked away</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/6.jpg" alt="Some image" />
						<h2 class="content__item-title">Isolation and me</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/7.jpg" alt="Some image" />
						<h2 class="content__item-title">Desert races</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/8.jpg" alt="Some image" />
						<h2 class="content__item-title">Transcendence</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/9.jpg" alt="Some image" />
						<h2 class="content__item-title">Loosing my mind</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/10.jpg" alt="Some image" />
						<h2 class="content__item-title">Holding your breath</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/11.jpg" alt="Some image" />
						<h2 class="content__item-title">Making the best of it</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<div class="content__item">
					<div class="content__item-intro">
						<img class="content__item-img" src="images/12.jpg" alt="Some image" />
						<h2 class="content__item-title">Haunted Blessings</h2>
					</div>
					<h3 class="content__item-subtitle">"How I learned to cherish life after a trip to hell"</h3>
					<div class="content__item-text">
						<p>When I was in the islands nearly a generation ago, I was acquainted with a young American couple who had among their belongings an attractive little son of the age of seven—attractive but not practicably companionable with me, because he knew no English. He had played from his birth with the little Kanakas on his father’s plantation, and had preferred their language and would learn no other. The family removed to America a month after I arrived in the islands, and straightway the boy began to lose his Kanaka and pick up English. By the time he was twelve he hadn’t a word of Kanaka left; the language had wholly departed from his tongue and from his comprehension. Nine years later, when he was twenty-one, I came upon the family in one of the lake towns of New York, and the mother told me about an adventure which her son had been having. By trade he was now a professional diver. A passenger boat had been caught in a storm on the lake, and had gone down, carrying her people with her. A few days later the young diver descended, with his armor on, and entered the berth-saloon of the boat, and stood at the foot of the companionway, with his hand on the rail, peering through the dim water. Presently something touched him on the shoulder, and he turned and found a dead man swaying and bobbing about him and seemingly inspecting him inquiringly. He was paralyzed with fright.</p>
						<p>His entry had disturbed the water, and now he discerned a number of dim corpses making for him and wagging their heads and swaying their bodies like sleepy people trying to dance. His senses forsook him, and in that condition he was drawn to the surface. He was put to bed at home, and was soon very ill. During some days he had seasons of delirium which lasted several hours at a time; and while they lasted he talked Kanaka incessantly and glibly; and Kanaka only. He was still very ill, and he talked to me in that tongue; but I did not understand it, of course. The doctor-books tell us that cases like this are not uncommon. Then the doctors ought to study the cases and find out how to multiply them. Many languages and things get mislaid in a person’s head, and stay mislaid for lack of this remedy.</p>
						<p>Several of our passengers belonged in Honolulu, and these were sent ashore; but nobody could go ashore and return. There were people on shore who were booked to go with us to Australia, but we could not receive them; to do it would cost us a quarantine-term in Sydney. They could have escaped the day before, by ship to San Francisco; but the bars had been put up, now, and they might have to wait weeks before any ship could venture to give them a passage any whither. And there were hardships for others. An elderly lady and her son, recreation-seekers from Massachusetts, had wandered westward, further and further from home, always intending to take the return track, but always concluding to go still a little further; and now here they were at anchor before Honolulu positively their last westward-bound indulgence—they had made up their minds to that—but where is the use in making up your mind in this world? It is usually a waste of time to do it. These two would have to stay with us as far as Australia. Then they could go on around the world, or go back the way they had come; the distance and the accommodations and outlay of time would be just the same, whichever of the two routes they might elect to take. Think of it: a projected excursion of five hundred miles gradually enlarged, without any elaborate degree of intention, to a possible twenty-four thousand. However, they were used to extensions by this time, and did not mind this new one much.</p>
					</div>
				</div><!-- /content__item -->
				<button class="content__close">Close</button>
				<svg class="content__indicator icon icon--caret"><use xlink:href="#icon-caret"></use></svg>
			</div>
  	</main>
  	<!-- Main content -->
	
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
	<script type="text/javascript" src="js/index.js"></script>
	<script type="text/javascript" src="js/imagesloaded.pkgd.min.js"></script>
	<script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
	<script type="text/javascript" src="js/charming.min.js"></script>
<!--	<script type="text/javascript" src="js/TweenMax.min.js"></script>-->
	<script type="text/javascript" src="js/demo.js"></script>
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
	<script>
		// Load app.js script after document has rendered.
		var script = document.createElement('script');
		script.src = 'js/app.js';
		script.type = 'text/javascript';
		document.getElementsByTagName('body')[0].appendChild(script);
	</script>
</body>
</html>