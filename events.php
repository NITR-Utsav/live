<?php
require './db_connect.php';
$query = "SELECT * FROM event";
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
        <!-- <link rel="stylesheet" type="text/css" href="css/style.css"/> -->
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- Bootstrap core CSS -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
        <!-- Material Design Bootstrap -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.15/css/mdb.min.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/base.css" />
        <link rel="stylesheet" type="text/css" href="css/particles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.theme.min.css">
        <script>document.documentElement.className="js";var supportsCssVars=function(){var e,t=document.createElement("style");return t.innerHTML="root: { --tmp-var: bold; }",document.head.appendChild(t),e=!!(window.CSS&&window.CSS.supports&&window.CSS.supports("font-weight","var(--tmp-var)")),t.parentNode.removeChild(t),e};supportsCssVars()||alert("Please view this demo in a modern browser that supports CSS Variables.");</script>

        <style type="text/css">
          
  h2{
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
        </style>
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
      <main>
          <div class="grid-wrap">
            <h2>Events</h2>
              <div class="grid">
                <?php 
            while($row) {?>
                <a href="#" class="grid__item">
                  <div class="grid__item-bg"></div>
                  <div class="grid__item-wrap">
                    <img class="grid__item-img" src="images/nuposters/<?php echo $row['image'];?>" alt="<?php echo $row['image'];?>" />
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
                <?php 
            while($row2) {?>
              <div class="content__item">
                <div class="content__item-intro">
                  <img class="content__item-img" src="images/nuposters/<?php echo $row2['image'];?>" alt="<?php echo $row2['image'];?>" />
                  <h2 class="content__item-title"></h2>
                </div>
                <h3 class="content__item-subtitle"><?php echo $row2['name'];?></h3>
                <div class="content__item-text">
                  <span><p>Date : </p><?php echo $row2['date']; ?></span>
                  <span><p>Time : </p><?php echo $row2['time']; ?></span>
                  <span><p>Venue : </p><?php echo $row2['venue']; ?></span>
                  <span><p>Coordinator1 : </p><?php echo $row2['coordinator1']; ?></span>
                  <span><p>Coordinator2 : </p><?php echo $row2['coordinator2']; ?></span>
                  <span><p>Number1 : </p><?php echo $row2['number1']; ?></span>
                  <span><p>Number2 : </p><?php echo $row2['number2']; ?></span>
                  <span><p>Description : </p><?php echo $row2['description']; ?></span>
                  <span><p>Rules : </p><?php echo $row2['rules']; ?></span>
                  <span><p>Criteria : </p><?php echo $row2['criteria']; ?></span>
                </div>
              </div>
            <?php
                $row2 =  mysqli_fetch_array($result2);
              }?>
              <button class="content__close">Close</button>
              <svg class="content__indicator icon icon--caret"><use xlink:href="#icon-caret"></use></svg>
            </div>
      </main>
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
    </body>
</html>