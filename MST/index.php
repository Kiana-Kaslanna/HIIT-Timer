<!doctype html>
<html>

<head>
    <title>M.S.T</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--  -->
    <link rel="icon" href="sys/kokomi.jpg" type="image/jpg">
    <!--  -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="sys/js/Cookie.js" defer></script>
    <script src="sys/js/ScreenAwake.js" defer></script>
    <script src="sys/js/Voice.js" defer></script>
    <script src="sys/js/User.js" defer></script>
    <script src="sys/js/Logic.js" defer></script>
    <script src="sys/js/TimerManager.js" defer></script>
    <!--  -->
    <link rel="stylesheet" href="sys/css/User.css">
    <link rel="stylesheet" href="sys/css/Component.css">
    <link rel="stylesheet" href="sys/css/General.css">
    <link rel="stylesheet" href="sys/css/Timer.css">
</head>

<body>

    <div class="page" id="page_load">
        <div id="load_gif">
            <img src="sys/static/loader.gif">
        </div>
    </div>

    <div class="page" id="page_msg" onclick="close_msg()">
        <div id='msg_txt'>
        </div>
    </div>

    <div class="page" id="page_user">
        <div id="user_panel">
            <div class="user_panel_close round_button color_neg float_right" onclick="close_user_panel()"></div>
            <div id="user_panel_form">
                <div class="user_panel_form_label component" id="user_panel_form_label1">Username</div>
                <input type="text" id="user_panel_usn" class="user_panel_form_input component" name="sign_in_usn"><br>
                <div class="user_panel_form_label component" id="user_panel_form_label2">Password</div>
                <input type="password" id="user_panel_psw" class="user_panel_form_input component" name="sign_in_psw"><br>
                <div id="user_panel_log_in" class="button component" onclick="user_form_submit()">
                    Synchronize
                </div>
            </div>
            <div id="user_panel_escape" onclick="escape_user_panel()">Enter without log in</div>
        </div>
    </div>
    <div class="page" id="page_user_logout">
        <div id="user_panel">
            <div class="user_panel_close round_button color_neg float_right" onclick="close_user_panel()"></div>
            <div id="user_who_log_in"></div>
            <div id="user_panel_log_in" class="button component" onclick="user_log_out()">
                Log out
            </div>
        </div>
    </div>

    <div class="page" id="container">

        <div class="page" id="page_home">
            <div class="header">
                <div class="header_title">Your Timers</div>
                <div class="round_button color_pos" onclick="open_page_add_timer()"></div>
            </div>
            <div class="content" id="page_home_content"></div>
            <div class="footer">
                <div class="footer_tag">
                    <div class="round_button color_pos" id="onclick_open_user_panel" onclick="open_user_panel()"></div>
                    <div class="footer_tag_text">USER</div>
                </div>
                <div class="footer_tag">
                    <div class="round_button color_neg"></div>
                    <div class="footer_tag_text">TIMER</div>
                </div>
                <div class="footer_tag">
                    <div class="round_button color_pos" onclick="open_page_setting()"></div>
                    <div class="footer_tag_text">SETTING</div>
                </div>
            </div>
        </div>

        <div class="page" id="page_add_timer">
            <div class="header">
                <div class="header_title">New Timer</div>
                <div style="display: flex;">
                    <div class="round_button color_pos" onclick="timer_exercise_form_submit()"></div>
                    <div class="round_button color_neg" onclick="close_page_add_timer()"></div>
                </div>
            </div>
            <div class="content no_footer" id="page_add_timer_content">
            </div>

        </div>

        <div class="page" id="page_timer">
            <div class="header">
                <div class="header_title" id="page_timer_title"></div>
                <div class="round_button color_neg" onclick="close_page_timer()"></div>
            </div>
            <div class="content no_footer" id="page_add_timer_content">
                <div id="timer_app" class="inline_header">
                    <div class="header_title exercise_title" id="current_exercise"></div>
                    <div id="timer_container"></div>
                    <div class="header_title_small">Next</div>
                    <div class="header_title_medium exercise_title" id="next_exercise"></div>
                    <div class="button" onclick="timer_start(0)" id="onclick_start_timer">Start</div>
                </div>
            </div>
        </div>

        <div class="page" id="page_setting">
            <div class="header">
                <div class="header_title">Settings</div>
            </div>
            <div class="content">
                <div class="header inline_header">
                    <div class="header_title_small">Countdown Voice</div>
                    <div id="countdown_voice_switch" class="round_button color_pos" onclick="countdown_voice_switch(false)"></div>
                </div>
                <div class="header inline_header">
                    <div class="header_title_small">Exercise Finish Voice</div>
                    <div id="finish_voice_switch" class="round_button color_pos" onclick="finish_voice_switch(false)"></div>
                </div>
                <div class="header inline_header">
                    <div class="header_title_small">Screen Awake</div>
                    <div id="screen_awake_switch" class="round_button color_pos" onclick="screen_awake_switch(false)"></div>
                </div>
                <div class="header inline_header danger_box_shadow">
                    <div class="danger_text header_title_small">Delete Account</div>
                    <div class="round_button color_neg" onclick="delete_account()"></div>
                </div>
            </div>
            <div class="footer">
                <div class="footer_tag">
                    <div class="round_button color_pos" id="setting_onclick_open_user_panel" onclick="open_user_panel()"></div>
                    <div class="footer_tag_text">USER</div>
                </div>
                <div class="footer_tag">
                    <div class="round_button color_pos" onclick="close_page_setting()"></div>
                    <div class="footer_tag_text">TIMER</div>
                </div>
                <div class="footer_tag">
                    <div class="round_button color_neg"></div>
                    <div class="footer_tag_text">SETTING</div>
                </div>
            </div>
        </div>
    </div>



</body>

</html>