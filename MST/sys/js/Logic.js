$(document).ready(function () {
    $('#page_msg').hide();
    $('.user_panel_close').hide();
    $('#container').hide();
    $('#page_add_timer').hide();
    $('#page_timer').hide();
    $('#page_setting').hide();
    $('#page_user').hide();
    $('#page_user_logout').hide();

    setTimeout(() => {
        if (user_not_logged()) {
            get_timers_from_local();
            $('#page_load').fadeOut();
            $('#page_user').fadeIn();
        } else {
            $("#user_who_log_in").html(`Hello, ${getCookie('user')}`);
            get_timers_from_cloud();
            $("#onclick_open_user_panel").attr('class', 'round_button color_neg');
            $("#setting_onclick_open_user_panel").attr('class', 'round_button color_neg');
            $('#page_load').fadeOut();
            $('#container').fadeIn();
        }

    }, 1000);
});


function close_msg() {
    $('#page_msg').fadeOut();
}

function create_msg(txt) {
    $('#msg_txt').html(txt);
    $('#page_msg').fadeIn();
}

function open_user_panel() {
    $('.user_panel_close').show();
    $("#user_panel_escape").hide();
    if (user_not_logged()) {
        $('#page_user').fadeIn();
    } else {
        $('#page_user_logout').fadeIn();
    }
    // $("#onclick_open_user_panel").attr('class', 'round_button color_neg');

}

function close_user_panel() {
    // $("#onclick_open_user_panel").attr('class', 'round_button color_neg');
    $('#page_user').fadeOut();
    $('#page_user_logout').fadeOut();
    $('#container').fadeIn();
}

function escape_user_panel() {
    $('#page_user').fadeOut();
    $('#container').fadeIn();
}

async function stop_loading() {
    await $('#page_load').fadeOut();
}

function start_loading() {
    $('#page_load').fadeIn();
}


function open_page_add_timer() {
    init_page_add_timer();
    switch_pages('page_home', 'page_add_timer');
}
function close_page_add_timer() {
    switch_pages('page_add_timer', 'page_home');
}


function open_page_timer(title) {
    set_up_timer(title);
    switch_pages('page_home', 'page_timer');
}

function close_page_timer() {
    switch_pages('page_timer', 'page_home');
    timer_reset();
}

function open_page_setting() {
    switch_pages('page_home', 'page_setting');
}
function close_page_setting() {
    switch_pages('page_setting', 'page_home');
}

function switch_pages(p1, p2) {
    $(`#${p1}`).fadeOut();
    $(`#${p2}`).fadeIn();
}


function setting_switch(key, yes) {
    if (yes) {
        $(`#${key}`).attr('class', 'round_button color_pos');
        $(`#${key}`).attr('onclick', `${key}(false)`);
    } else {
        $(`#${key}`).attr('class', 'round_button color_neg');
        $(`#${key}`).attr('onclick', `${key}(true)`);
    }
}

