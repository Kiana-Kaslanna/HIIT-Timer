
// function user_log_in() {
//     touch.play();
//     $.get("sys/func/user/user.php", { auth_type: 0 }, function(data) {
//         $("#user_panel_container").html(data).fadeIn('fast');
//     });

// }

// function user_sign_up() {
//     touch.play();
//     $.get("sys/func/user/user.php", { auth_type: 1 }, function(data) {
//         $("#user_panel_container").html(data).fadeIn('fast');
//     });
// }

// function user_log_out() {
//     touch.play();
//     $('#menu_sub_button_log_out').hide();
//     $('#menu_sub_button_log_in').show();
//     $('#menu_sub_button_sign_up').show();
//     setCookie('user', "", 0);
//     display_user_data();
// }

// function close_user_panel() {
//     touch.play();
//     $("#user_panel_container").fadeOut('fast');
// }

function user_form_submit() {
    var usn = $("#user_panel_usn").val();
    var psw = $("#user_panel_psw").val();
    start_loading();
    $.post("sys/service/Authentication.php", { 'usn': usn, 'psw': psw },
        function (data) {
            var user = JSON.parse(data);
            stop_loading();
            if (user['msg'] == 'ok') {
                setCookie('user', user['user'], 1);
                user_log_in();
                $("#user_panel_usn").val("");
                $("#user_panel_psw").val("");
            } else {
                create_msg(user['msg']);
            }
        }
    );
}

function user_log_in() {
    $("#onclick_open_user_panel").attr('class', 'round_button color_neg');
    $("#setting_onclick_open_user_panel").attr('class', 'round_button color_neg');
    $('.user_panel_close').show();
    $("#user_who_log_in").html(`Hello, ${getCookie('user')}`);
    $("#page_user").fadeOut();
    $('#page_user_logout').fadeIn();
    get_timers_from_cloud();
}

function user_log_out() {
    setCookie('user', "", 0);
    $("#onclick_open_user_panel").attr('class', 'round_button color_pos');
    $("#setting_onclick_open_user_panel").attr('class', 'round_button color_pos');
    $('#page_user_logout').fadeOut();
    $("#page_user").fadeIn();
    clear_timers_cache_from_local();
}

function user_not_logged() {
    return getCookie('user') == "";
}

function delete_account() {
    create_msg(`
    This action will delete your account and clear aLL data!<br>
    If you are not willing to do this, please return in 10 seconds.<br>
    Otherwise, all your data will be deleted after 10 seconds.
    `);
    setTimeout(() => {
        if ($('#page_msg').is(":visible")) {
            close_msg();
            start_loading();
            countdown_voice_switch(true);
            finish_voice_switch(true);
            screen_awake_switch(true);
            clear_timers_cache_from_local();
            if (!user_not_logged()) {
                $.post("sys/service/DeleteAll.php", { 'usn': getCookie('user') }, (data) => {

                    setCookie('user', "", 0);
                    location.reload();
                });
            } else {
                location.reload();
            }
        }
    }, 11000);
}

