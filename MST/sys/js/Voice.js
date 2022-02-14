class Sound {
    audio;
    constructor(file) {
        this.audio = new Audio(file);
    }
    play() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}
//
var countdown_voice = new Sound("sys/static/mp3/touch.mp3");
var countdown_voice_on = getCookie('screen_awake_on');
countdown_voice_on = (countdown_voice_on === "" || countdown_voice_on === true) ? true : false;

function countdown_voice_switch(bol) {
    countdown_voice_on = bol;
    setCookie('countdown_voice_on', countdown_voice_on, 1);
    setting_switch('countdown_voice_switch', countdown_voice_on);
}
//
var finish_voice = new Sound("sys/static/mp3/end.mp3");
var finish_voice_on = getCookie('screen_awake_on');
finish_voice_on = (finish_voice_on === "" || finish_voice_on === true) ? true : false;

function finish_voice_switch(bol) {
    finish_voice_on = bol;
    setCookie('finish_voice_on', finish_voice_on, 1);
    setting_switch('finish_voice_switch', finish_voice_on);
}
//
$(document).ready(function () {
    countdown_voice_switch(countdown_voice_on);
    finish_voice_switch(finish_voice_on);
});

