<?php
	include("../db_connect.php");
		$fontname = 'font/FRSCRIPT.TTF';
	$quality=100;
	$key=array("team","name","post");
	$file = fopen("certificate_details.csv","r") or die("import file failed");
	while(! feof($file))
	  {
		$person=fgetcsv($file);
		$b=array_combine($key,$person);
		create_certificate($b);
	  }
	
	function create_certificate($entry){
		global $con;
		$stmt=$con->prepare("SELECT MAX(sno) from certificate_new");
		$stmt->execute();
		$result=$stmt->get_result() or die("error");
		$row=$result->fetch_array(MYSQLI_ASSOC);
		$sno=$row['MAX(sno)']+1;	
		$certificate_id=$sno;
		$stmt=$con->prepare("INSERT INTO certificate_new(certificate_id,name,team,post) values (?,?,?,?)") or die("error");
		$stmt->bind_param("ssss",$certificate_id,$entry['name'],$entry['team'],$entry['post']);
		if($stmt->execute()){
			$d = array("name"=>$entry['name'],"certificate_id"=>$certificate_id,"team"=>$entry['team'],"post"=>$entry['post']);
			$filename = create_image($d);
		}
	}

	function create_image($user){
//coordinates 
	$head=array(1550,0,3300);
	$coordinator=array(1550,0,3250);
	$volunteer=array(1550,0,3300);
	global $fontname;	
	global $quality;
		$file = "post_certificates/".$user['certificate_id'].".jpg";	
	
	
	// if the file already exists dont create it again just serve up the original	
			// define the base image that we lay our text on
			switch($user['post']){
				case 'Head':
				$cert_filename="cert-head.jpg";
				$xy=$head;
				break;
				case 'Coordinator':
				$cert_filename="cert-c.jpg";
				$xy=$coordinator;
				break;
				case 'Volunteer':
				$cert_filename="cert-vc.jpg";
				$xy=$volunteer;
				break;
			}
			$im = imagecreatefromjpeg($cert_filename);
			
			// setup the text colours
			$color['grey'] = imagecolorallocate($im, 0, 0, 0);
			// this defines the starting height for the text block
			$x = center_text($user['name'], 120);	
			imagettftext($im, 120, 0, $x,1252, $color["grey"], $fontname,$user['name']);
            imagettftext($im,90, 0, 2020, 410, $color["grey"], $fontname,sprintf("%03d",$user['certificate_id']));
			$x = $xy[1]+center_text($user['team'], 120,$xy[2]);
			imagettftext($im, 120, 0, $x, $xy[0], $color["grey"], $fontname,$user['team']);
			imagejpeg($im, $file, $quality);	
			
	
						
		return $file;	
}
	
	function center_text($string, $font_size, $image_width=3300){

			global $fontname;
			$dimensions = imagettfbbox($font_size, 0, $fontname, $string);
			
			return ceil(($image_width - $dimensions[4]) / 2);				
}
?>