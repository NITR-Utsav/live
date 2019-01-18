<?php

require "../db_connect.php";

//$setSql = "SELECT * FROM campus_ambassador";  
//$setRec = mysqli_query($con, $setSql);  

	
	$setSql=$con->prepare("SELECT name,email,contact,college,gender,checkin,paid FROM users") or die(mysqli_error($con));
	$setSql->execute() or die(mysqli_error($con));
	$setRec=$setSql->get_result() or die(mysqli_error($con));
	
$Header = '';
$Header = "Name" . "\t" . "Email" . "\t" . "Contact" . "\t" . "College" . "\t" . "Gender" . "\t" . "Checkin" . "\t" . "Paid"  ;  
  
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
header("Content-Disposition: attachment; filename=User_List.xls");  
header("Pragma: no-cache");  
header("Expires: 0");
echo  ucwords($Header) ."\n" .$setData ."\n"; 

 // header("Location:./dashboard.php");
?>