var sound_on = true;

function sound_on_off() {
    sound_on = !sound_on;
    console.log(sound_on);
}

class Sound {
    audio;
    constructor(file) {
        this.audio = new Audio(file);
    }
    play() {
        if (sound_on) {
            this.audio.play();
        }
    }
    stop() {
        if (sound_on) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
}

var touch = new Sound("../.sys/sound/mp3/touch.mp3");
var yes = new Sound("../.sys/sound/mp3/yes.mp3");
var no = new Sound("../.sys/sound/mp3/no.mp3");
var end = new Sound("../.sys/sound/mp3/end.mp3");