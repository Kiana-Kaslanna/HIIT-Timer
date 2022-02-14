<?php
include 'Database.php';
$usn = $_POST['usn'];
$timers = $repo->get_timers($usn);
$result = array();
if (sizeof($timers) != 0) {
    //["hongchen","32","0","1","2"]
    foreach ($timers as $tm) {
        try {
            array_push($result[$tm[1]], [
                'name' => $tm[3],
                'time' => $tm[4]
            ]);
        } catch (\Throwable $th) {
            $result[$tm[1]] = [];
            array_push($result[$tm[1]], [
                'name' => $tm[3],
                'time' => $tm[4]
            ]);
        }
    }
}
echo json_encode($result);