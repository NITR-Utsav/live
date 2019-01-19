<?php
include("../db_connect.php");
if(!signed_in())
	die("invalid request"); 
if(empty($_GET['eid']))
	die("invalid request"); 
$stmt=$con->prepare("SELECT * from users where uid=?");
$stmt->bind_param("s",$_SESSION['userid']);
$stmt->execute();
$result=$stmt->get_result() or die(mysqli_error($con));
$user=$result->fetch_array(MYSQLI_ASSOC);

$stmt=$con->prepare("SELECT e.eid,e.title,e.category,e.winner FROM events e WHERE e.eid=?") or die(mysqli_error($con));
$stmt->bind_param("s",$_GET['eid']);
$stmt->execute() or die(mysqli_error($con));
$result=$stmt->get_result() or die(mysqli_error($con));
$event=$result->fetch_array(MYSQLI_ASSOC);

$positions=json_decode($event['winner'],true);
$pos="";
foreach($positions as $position=>$ids){
	if(strpos("@".$ids,$_SESSION['userid']."")!=0){
		$pos=$position;
		break;
	}
	}
if($user['paid']!='1' || $user['checkin']!='1' AND $user['college'] != 'NIT Rourkela')
	die("cannot generate certificate for this user.");



$stmt=$con->prepare("SELECT * from certificate where user_id=? and event_id=?");
	$stmt->bind_param("ss",$_SESSION['userid'],$event['eid']);
	$stmt->execute();
	
	$result=$stmt->get_result() or die(mysqli_error($con));
	if($result->num_rows === 0){
		$stmt=$con->prepare("INSERT INTO certificate(user_id,event_id) values (?,?)");
	$stmt->bind_param("ss",$_SESSION['userid'],$event['eid']);
	$stmt->execute();
	
	$stmt=$con->prepare("SELECT * from certificate where user_id=? and event_id=?");
	$stmt->bind_param("ss",$_SESSION['userid'],$event['eid']);
	$stmt->execute();	
	$result=$stmt->get_result() or die(mysqli_error($con));
	}	
	$row=$result->fetch_array(MYSQLI_ASSOC);
	
	$certificate_id=$row['certificate_id'];
	$d = array("name"=>$user['name'],"certificate_id"=>$certificate_id,"event"=>$event['title'],"position"=>$pos);
	
// link to the font file no the server
$fontname = 'font/FRSCRIPT.TTF';
// controls the spacing between text
$i=30;
//JPG image quality 0-100
$quality = 100;

function create_image($user){

        global $certificate_id;
        global $position;
        global $event; 
		global $fontname;	
		global $quality;
		global $con;
		$file = "winners/".$user['certificate_id'].".jpg";	
	
	// if the file already exists dont create it again just serve up the original	
	if (!file_exists($file)) {	
	
		
	
	
			// define the base image that we lay our text on
			$im = imagecreatefromjpeg("cert-wc.jpg");
			
			// setup the text colours
			$color['grey'] = imagecolorallocate($im, 0, 0, 0);
			// this defines the starting height for the text block
			$y = imagesy($im) - 2010;
			 $i=32;
			$x = center_text($user['name'], 150);
			$i = $i+660;	
			imagettftext($im, 120, 0, $x, $y+$i, $color["grey"], $fontname,$user['name']);
            imagettftext($im,90, 0, 2020, 410, $color["grey"], $fontname,$user['certificate_id']);
            imagettftext($im,110, 0, 1550, 1370, $color["grey"], $fontname,$user['position']);
            $x = center_text($user['event'], 150, 2454);
            imagettftext($im,110, 0, $x, 1500, $color["grey"], $fontname,$user['event']);
			imagejpeg($im, $file, $quality);	
			
	}
						
		return $file;	
}

function center_text($string, $font_size, $image_width=3300){

			global $fontname;
			$dimensions = imagettfbbox($font_size, 0, $fontname, $string);
			
			return ceil(($image_width - $dimensions[4]) / 2);				
}
// run the script to create the image
$filename = create_image($d);
if(file_exists($filename)){
echo "Certificate generated successfully";

}
    header('Content-Description: File Transfer');
    header('Content-Type: application/force-download');
    header("Content-Disposition: attachment; filename=\"" . basename($filename) . "\";");
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename));
    ob_clean();
    flush();
    readfile($filename); //showing the path to the server where the file is to be download
    exit;
?>
?>
