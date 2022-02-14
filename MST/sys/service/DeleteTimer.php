<?php
include 'Database.php';
$usn = $_POST['usn'];
$title = $_POST['title'];
$repo->delete_timer($usn, $title);