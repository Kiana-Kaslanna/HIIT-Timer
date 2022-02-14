// Add timer

var CURRENT_EXERCISE_NUM = 0;

function init_page_add_timer() {
    CURRENT_EXERCISE_NUM = 0;
    $("#page_add_timer_content").html(`
    <div class="header inline_header">
        <div class="header_title_small">Title</div>
        <input type="text" id="timer_name">
    </div>
    <div class="header inline_header" id="add_new_exercise">
        <div class="header_title_small">Add an exercise</div>
        <div class="round_button color_pos" onclick="create_new_exercise_form()"></div>
    </div>
    `);
}

function create_new_exercise_form() {
    $(`
    <div class="header inline_header" id="timer_exercise_${CURRENT_EXERCISE_NUM}" style="flex-direction:column;">
        <div class="flex_header">
            <div class="header_title_small">Exercise</div>
            <div class="round_button color_neg" onclick="delete_exercise_form('timer_exercise_${CURRENT_EXERCISE_NUM}')"></div>
        </div>
        <div class="flex_header">
            <div class="header_title_small">Name</div>
            <input type="text" class="timer_exercise_name">
        </div>
        <div class="flex_header">
            <div class="header_title_small">Duration(s)</div>
            <input type="number" maxlength="3" onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : event.key == ' ' ? false : !isNaN(Number(event.key))" class="timer_exercise_duration">
        </div>
    </div>
    `).insertBefore("#add_new_exercise");
    CURRENT_EXERCISE_NUM++;
}

function delete_exercise_form(which) {
    $(`#${which}`).remove();
}

function timer_exercise_form_submit() {
    var valid = true;
    var timer_name = $('#timer_name').val();
    if (timer_name == "") {
        create_msg('Please name the timer!');
        valid = false;
        return;
    }
    if (timer_name_exist(timer_name)) {
        create_msg('Timer name exist!');
        valid = false;
        return;
    }
    if (timer_name.length > 20) {
        create_msg('Exercise name too long! Please set it below length of 20.');
        valid = false;
        return;
    }
    var timer_exercise_name = [];
    $('.timer_exercise_name').each((i, object) => {
        if (object.value == "") {
            create_msg('Please name the exercise!');
            valid = false;
            return;
        }
        if (object.value.length > 20) {
            create_msg('Exercise name too long! Please set it below length of 20.');
            valid = false;
            return;
        }
        timer_exercise_name.push(object.value);
    });
    var timer_exercise_duration = [];
    $('.timer_exercise_duration').each((i, object) => {
        if (object.value == "") {
            create_msg('Please set the duration of exercise!');
            valid = false;
            return;
        }
        var dur = parseInt(object.value);
        if (dur > 999) {
            create_msg('Duration too long! Please set it below 1000s.');
            valid = false;
            return;
        } else if (dur <= 0) {
            create_msg('Please set the duration of exercise!');
            valid = false;
            return;
        }
        timer_exercise_duration.push(dur);
    });
    if (timer_exercise_name.length == 0 && timer_exercise_duration.length == 0) {
        create_msg('Please add at least one exercise!');
        valid = false;
        return;
    }
    if (valid) {
        var timer = {
            'title': timer_name,
            'timers': []
        };
        for (let i = 0; i < timer_exercise_name.length; i++) {
            timer.timers.push({
                'name': timer_exercise_name[i],
                'time': timer_exercise_duration[i]
            });
        }

        if (user_not_logged()) {
            add_timer_to_local(timer);
        } else {
            add_timer_to_cloud(timer);
            add_timer_to_local(timer);
        }
        close_page_add_timer();
    }
}

// Manage timer

class Timer {
    FULL_DASH_ARRAY = 283;
    timer_duration;
    timer_left;
    timer_passed = 0;
    timer_interval;
    constructor(timer_duration) {
        this.new(timer_duration);
    }
    new(timer_duration) {
        this.timer_duration = timer_duration;
        this.timer_left = timer_duration;
        $("#timer_container").html(`
            <div class="base_timer">
                <svg class="base_timer_svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g class="base_timer_circle">
                    <circle class="base_timer_path_elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                        id="base_timer_path_remaining"
                        stroke-dasharray="283"
                        class="base_timer_path_remaining"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                    </g>
                </svg>
                <span id="base_timer_label" class="base_timer_label">${timer_duration}</span>
            </div>
        `);
    }

    start() {
        countdown_voice_on ? countdown_voice.play() : 0;
        this.timer_interval = setInterval(() => {
            this.timer_passed = this.timer_passed += 1;
            this.timer_left = this.timer_duration - this.timer_passed;
            document.getElementById("base_timer_label").innerHTML = this.timer_left;
            //  
            this.set_dash_array();
            // this.set_path_color();
            countdown_voice_on ? countdown_voice.play() : 0;
            //
            if (this.timer_left === 0) {
                this.stop();
                finish_voice_on ? finish_voice.play() : 0;
            }
        }, 1000);
    }
    stop() {
        clearInterval(this.timer_interval);
    }
    frac() {
        const temp = (this.timer_left) / this.timer_duration;
        return temp - (1 / this.timer_duration) * (1 - temp);
    }
    set_dash_array() {
        const dash_array = `${(this.frac() * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
        $("#base_timer_path_remaining").attr("stroke-dasharray", dash_array);
    }
}

var TIMER = new Timer();
var EXE_QUEUE = [];
var TIMER_TIME_OUT = null;

function timer_name_exist(name) {
    try {
        return name in JSON.parse(localStorage.getItem("timers"));
    } catch (error) {
        return false;
    }
}

function clear_timers_cache_from_local() {
    localStorage.setItem("timers", "{}");
    $("#page_home_content").html("");
}
function save_timers_to_local(timers) {
    localStorage.setItem("timers", JSON.stringify(timers));
}

function get_timers_from_local() {
    var timers = JSON.parse(localStorage.getItem("timers"));
    if (timers) {
        display_timers(timers);
    }
}

function get_timers_from_cloud() {
    start_loading();
    clear_timers_cache_from_local();
    $.post("sys/service/GetTimers.php", { 'usn': getCookie('user') },
        (data) => {
            data = JSON.parse(data);
            save_timers_to_local(data);
            display_timers(data);
            setTimeout(() => {
                stop_loading();
            }, 1000);
        }
    );
}

function add_timer_to_local(timer) {
    start_loading();
    var timers = JSON.parse(localStorage.getItem("timers"));
    if (timers) {
        timers[timer.title] = timer.timers
    } else {
        timers = {};
        timers[timer.title] = timer.timers
    }
    save_timers_to_local(timers);
    display_timers(timers);
    setTimeout(() => {
        stop_loading();
    }, 1000);
}

function add_timer_to_cloud(timer) {
    start_loading();
    $.post("sys/service/PersistTimer.php", { 'usn': getCookie('user'), 'timer': JSON.stringify(timer) },
        (data) => {
            stop_loading();
        }
    );
}



function delete_timer(title) {
    $(`#display_timer_${title}`).remove();
    delete_timer_from_local(title);
    if (!user_not_logged()) {
        delete_timer_from_cloud(title);
    }
}

function delete_timer_from_local(title) {
    var timers = JSON.parse(localStorage.getItem("timers"));
    delete timers[title];
    save_timers_to_local(timers);
}

function delete_timer_from_cloud(title) {
    start_loading();
    $.post("sys/service/DeleteTimer.php", { 'usn': getCookie('user'), 'title': title }, () => {
        stop_loading();
    });
}

function display_timers(timers) {
    $("#page_home_content").html("");
    for (const [key, value] of Object.entries(timers)) {
        var html = `
        <div class="header inline_header touch_opacity" id="display_timer_${key}" style="flex-direction:column;" onclick="open_page_timer('${key}')">
            <div class="flex_header">
                <div class="header_title">${key}</div>
                <div class="round_button color_neg" style="align-self: flex-start;" onclick="delete_timer('${key}')"></div>
            </div>`;
        for (const tm of value) {
            html += `
            <div class="flex_header">
                <div class="header_title_small">${tm.name}</div>
                <div class="header_title_small">${tm.time}s</div>
            </div>
            `;
        }
        html += `</div>`;
        $("#page_home_content").append(html);
    }
}

// Execute timer

function set_up_timer(title) {
    $("#page_timer_title").html(title);
    EXE_QUEUE = JSON.parse(localStorage.getItem("timers"))[title];
    timer_reset();
    console.log(EXE_QUEUE);
}

function timer_start(i) {
    if (i == 0) {
        $('#onclick_start_timer').html("Reset");
        $('#onclick_start_timer').attr('onclick', 'timer_reset()');
    }
    if (i < EXE_QUEUE.length) {
        const tm = EXE_QUEUE[i];
        timer_exercise_name_set_up(i);
        TIMER_TIME_OUT = setTimeout(() => {
            // TIMER.stop();
            timer_start(i + 1);
        }, (parseInt(tm.time) + 1) * 1000);
        TIMER.start();
    } else {
        $("#current_exercise").html("Finished!");
    }
}

function timer_reset() {
    clearInterval(TIMER_TIME_OUT);
    TIMER.stop();
    timer_exercise_name_set_up(0);
    $('#onclick_start_timer').html("Start");
    $('#onclick_start_timer').attr('onclick', 'timer_start(0)');
}

function timer_exercise_name_set_up(i) {
    const tm = EXE_QUEUE[i];
    console.log(tm.time);
    TIMER = new Timer(parseInt(tm.time));
    console.log(tm);
    $("#current_exercise").html(tm.name);
    if (i + 1 == EXE_QUEUE.length) {
        $("#next_exercise").html("About to finish!");
    } else {
        const ntm = EXE_QUEUE[i + 1];
        $("#next_exercise").html(ntm.name);
    }

}

