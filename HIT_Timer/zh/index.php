<!doctype html>
<html>

<head>
    <!-- Basic -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Info -->
    <title>H.I.T</title>
    <link rel="icon" href="../sys/img/kokomi.jpg" type="image/jpg">
    <!-- script -->
    <script src="../.sys/main.js" defer></script>
    <!-- sound -->
    <script src="../.sys/sound/sound.js" defer></script>
    <!-- style -->
    <link rel="stylesheet" href="../.sys/main.css">
    <link rel="stylesheet" href="../.sys/switch.css">
</head>

<body>
    <di id="load">

    </di>
    <div id="msg" onclick="close_msg()">
        <div class='msg_txt' id="msg_t1">
            您的计时器不能为零。
        </div>
        <div class='msg_txt' id="msg_t2">
            您的重复次数不能为零。
        </div>
    </div>

    <div class="block_container">
        <div class="ins_text">运动 I</div>
        <div class="timer" id="timer1"></div>
    </div>

    <div class="block_container">
        <div class="ins_text">运动 II</div>
        <div class="timer" id="timer2"></div>
    </div>
    <div class="block_container">
        <div class="ins_text cycle_ins_text">重复</div>
        <div class="timer cycle_input">
            <div class="scrollport" id="cycle_scroll"></div>
        </div>
    </div>
    <div class='ios_style_switch'>
        <div class='ios_style_switch_text'>声音</div>
        <input class="ios_style_switch_toggle" type="checkbox" id="checkbox1" checked />
        <label for="checkbox1" class="ios_style_switch_checkbox" onclick="sound_on_off()"></label>
    </div>

    <div class="btbutton" onclick="timer_start()">开始</div>
    <div class="btbutton" onclick="reset()">重置</div>


</body>

</html>