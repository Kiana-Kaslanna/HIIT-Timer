<?php
include 'Database.php';
$usn = $_POST['usn'];
$psw = $_POST['psw'];
$msg = 'ok';
$user = 'null';
if (!preg_match("/^[a-zA-Z0-9]*$/", $usn)) {
    $msg = "Username should only contain letters and numbers.";
} else if (strlen($usn) < 6 && strlen($psw) < 6) {
    $msg = "Username and password should have minimum length of 6";
} else if (strlen($usn) > 20 && strlen($psw) > 20) {
    $msg = "Username and password should have maximum length of 20";
} else {
    if ($repo->user_auth($usn, $psw)) {
        $user = $usn;
    } else {
        $msg = "You either input an existed username or invalid password.";
    }
}

$array = array('user' => $user, 'msg' => $msg);
echo json_encode($array);
