<?php
include('../db_connect.php');
if(!signed_in())
header("Location:../");
die();
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://www.instamojo.com/api/1.1/payment-requests/');
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER,
            array("X-Api-Key:<API KEY HERE>",
                  "X-Auth-Token:<AUTH TOKEN HERE>"));
$payload = Array(
    'purpose' => 'NITRUTSAV-2K18 Registration Fees',
    'amount' => '500',
    'buyer_name' => $_SESSION['name'],
    'redirect_url' => 'nitrutsav.nitrkl.ac.in/profile.php',
    'webhook' => 'nitrutsav.nitrkl.ac.in/payment/payment_redirect_webhook.php',
    'send_email' => false,
    'send_sms' => false,
    'email' => $_SESSION['email'],
    'allow_repeated_payments' => false
);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
$response = curl_exec($ch);
curl_close($ch); 

$response=json_decode($response,true);
if($response['success']=="true")
header("Location:".$response['payment_request']['longurl']);
else
header("Location: try again page");
?>