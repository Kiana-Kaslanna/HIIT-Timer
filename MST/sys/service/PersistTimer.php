<?php
include 'Database.php';
$usn = $_POST['usn'];
$timer = $_POST['timer'];
echo $repo->record_timer($usn, $timer) ? 'true' : 'false';