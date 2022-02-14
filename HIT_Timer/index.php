<?php
$lang  = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
header("Location: $lang");