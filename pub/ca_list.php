<?php

require "../db_connect.php";

//$setSql = "SELECT * FROM campus_ambassador";  
//$setRec = mysqli_query($con, $setSql);  

	
	$setSql=$con->prepare("SELECT ca_name,ca_contact,ca_email,ca_college,ca_fb FROM campus_ambassador") or die(mysqli_error($con));
	$setSql->execute() or die(mysqli_error($con));
	$setRec=$setSql->get_result() or die(mysqli_error($con));
	
$Header = '';
$Header = "Name" . "\t" . "Contact" . "\t" . "Email" . "\t" . "College" . "\t" . "FB profile link"  ;  
  
$setData = '';  
  
while ($rec = mysqli_fetch_row($setRec)) {  

      $rowData = '';
    foreach( $rec as $value )
    {                                            
        if ( ( !isset( $value ) ) || ( $value == "" ) )
        {
            $value = "\t";
        }
        else
        {
            $value = str_replace( '"' , '""' , $value );
            $value = '"' . $value . '"' . "\t";
        }
        $rowData .= $value;
    }
    $setData .= trim( $rowData ) . "\n";

}  
  $setData = str_replace( "\r" , "" , $setData );
  if ( $setData == "" )
{
    $setData = "\nNo Record(s) Found!\n";                        
}
header("Content-type: application/octet-stream");  
header("Content-Disposition: attachment; filename=CA_List.xls");  
header("Pragma: no-cache");  
header("Expires: 0");    
echo  ucwords($Header) ."\n" .$setData ."\n";   

header("Location:./dashboard.php");
?>