<?php
include("../db_connect.php");
if(!signed_in())
	die("invalid request"); 
$stmt=$con->prepare("SELECT * from users where uid=?");
$stmt->bind_param("s",$_SESSION['userid']);
$stmt->execute();
$result=$stmt->get_result() or die(mysqli_error($con));
$user=$result->fetch_array(MYSQLI_ASSOC);
$certificate_id = $_SESSION['userid'];

if(($user['paid']!='1' || $user['checkin']!='1') AND $user['college'] != 'NIT Rourkela')
	die("cannot generate certificate for this user.");
$fontname = 'font/FRSCRIPT.TTF';
// controls the spacing between text
$i=30;
$quality = 100;
$value =array(
		'name'=> ucwords($user['name']), 
		'uid' =>$user['uid'],
		'font-size'=>'150',
		'color'=>'grey');
function create_image($user){

		global $certificate_id; 
		global $fontname;	
		global $quality;
		$file = "participation/".$certificate_id.".jpg";		
	if (!file_exists($file)) {	
			$im = imagecreatefromjpeg("cert-pc.jpg");
			$color['black'] = imagecolorallocate($im, 0, 0, 0);
			$height=0;
			// this defines the starting height for the text block
			$y = imagesy($im) - $height - 2000;
			$i=32;
			$x = center_text($user['name'], $user['font-size']);
			$i = $i+660;	
			imagettftext($im, $user['font-size'], 0, $x, $y+$i, $color[$user['color']], $fontname,$user['name']);
			imagettftext($im,100, 0, 2010, 410, $color[$user['color']], $fontname,$certificate_id);
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
$filename = create_image($value);
if(file_exists($filename))
echo "Certificate generated successfully";

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
