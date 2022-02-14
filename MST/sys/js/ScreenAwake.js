var screen_awake_on = getCookie('screen_awake_on');
screen_awake_on = screen_awake_on === "" ? true : screen_awake_on;


$(document).ready(function () {
    $("body").append(`
    <video id="keep_screen_awake" loop autoplay muted hidden>
        <source src="sys\\static\\loop.mp4" type="video/mp4"/>
    </video>
    `);
    screen_awake_switch(screen_awake_on);
});

function screen_awake_switch(bol) {
    screen_awake_on = bol;
    setCookie('screen_awake_on', screen_awake_on, 1);
    setting_switch('screen_awake_switch', screen_awake_on);
    if (screen_awake_on) {
        $('#keep_screen_awake').get(0).play();
    } else {
        $('#keep_screen_awake').get(0).pause();
    }
}