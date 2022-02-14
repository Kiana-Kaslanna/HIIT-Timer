<?php
include 'Database.php';
$usn = $_POST['usn'];
$repo->delete_user($usn);
echo "<script>console.log('$usn')</script>";
