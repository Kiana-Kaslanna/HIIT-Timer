var timer_interval = [0, 0];
var timer_started = false;

function create_scroll_panel(div, n) {
    for (var i = 0; i < n; i++) {
        $(div).append(`
            <div class='cell'>${i}</div>
        `);
    }
}

function create_timer() {
    for (var i = 1; i < 3; i++) {
        $("#timer" + i).empty();
        for (var t = 0; t < 4; t++) {
            $("#timer" + i).append(`<div class="scrollport" id="timer${i}_n${t}"></div>`);
            if (t == 2) {
                create_scroll_panel(`#timer${i}_n${t}`, 6);
            } else {
                create_scroll_panel(`#timer${i}_n${t}`, 10);
            }
        }
    }
}


function create_cycle_scroll() {
    $("#cycle_scroll").empty();
    create_scroll_panel("#cycle_scroll", 100);
}



function get_scroll_value(div) {
    // var h = $(div).prop("scrollHeight");
    // h = h / n;
    // var c = $(div).scrollTop();
    // for (var i = 0; i < n; i++) {
    //     if ((h * i) >= c) {
    //         return i;
    //     }
    // }
    const ele = document.getElementById(div);
    const rect = ele.getBoundingClientRect();
    const centerCell = document.elementFromPoint(
        rect.left + ele.offsetWidth / 2,
        rect.top + ele.offsetHeight / 2
    );
    return centerCell.innerHTML;
    // $(div).each(function() {
    //     var centerLine = $(div).height() / 2;
    //     console.log(centerLine);
    //     var divStart = $(this).offset().top;
    //     var divEnd = divStart + $(this).height();
    //     console.log(divStart, divEnd);
    //     if (divStart < centerLine && divEnd > centerLine) {
    //         // console.log($(this).html());
    //     } else {
    //         //undo the thing
    //     };
    // });
}

function all_zero(array) {
    if (array.find(e => e > 0)) {
        return false;
    }
    return true;
}


function error_text(i) {
    $('.msg_txt').hide();

    $(`#msg_t${i}`).show();
    $('#msg').fadeIn();

}

function read_timer() {
    var lis = [];
    var timer = {};
    // read input
    for (var i = 1; i < 3; i++) {
        for (var t = 0; t < 4; t++) {
            if (t == 2) {
                var value = get_scroll_value(`timer${i}_n${t}`);
            } else {
                var value = get_scroll_value(`timer${i}_n${t}`);
            }
            lis.push(value);
        }
        timer[i] = [lis[(i - 1) * 4], lis[(i - 1) * 4 + 1], lis[(i - 1) * 4 + 2], lis[(i - 1) * 4 + 3]];
    }

    var cycle = get_scroll_value(`cycle_scroll`);

    if (all_zero(timer[1]) || all_zero(timer[2])) {
        error_text(1);
        no.play();
        return null;
    } else if (cycle == 0) {
        error_text(2);
        no.play();
        return null;
    } else {
        for (var i = 1; i < 3; i++) {
            for (var t = 0; t < 4; t++) {
                // $(`#timer${i}_n${t}`).empty();
                $(`#timer${i}_n${t}`).html(`
                    <div class='cell'>${timer[i][t]}</div>
                `);
            }
        }
        $(`#cycle_scroll`).html(`<div class='cell'>${cycle}</div>`);
        timer['cycle'] = cycle;
    }
    return timer;
}

function set_timer(i, lis) {
    for (var t = 0; t < 4; t++) {
        $(`#timer${i}_n${t}`).html(`<div class='cell'>${lis[t]}</div>`);
    }
}

function l2s(array) {
    return parseInt("" + array[0] + array[1]) * 60 + parseInt("" + array[2] + array[3]);
}

function s2l(sec) {
    var s = sec % 60;
    var m = Math.floor(sec / 60);
    s = s.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");
    return [m[0], m[1], s[0], s[1]];
}

function cycled_timer(cycle, tm1, tm2) {
    $(`#cycle_scroll`).html(`<div class='cell'>${cycle}</div>`);
    if (cycle == 0) {
        end.play();
        timer_started = false;
        return;
    }
    var tmp1 = tm1;
    var tmp2 = tm2;
    timer_interval[0] = setInterval(() => {
        touch.play();
        var t1 = s2l(tm1);
        if (tm1 == 0) {
            yes.play();
            clearInterval(timer_interval[0]);
            timer_interval[1] = setInterval(() => {
                touch.play();
                var t2 = s2l(tm2);
                if (tm2 == 0) {
                    yes.play();
                    clearInterval(timer_interval[1]);
                    cycled_timer(cycle - 1, tmp1, tmp2);
                };
                tm2--;
                set_timer(2, t2);
            }, 1000);
        }
        tm1--;
        set_timer(1, t1);
    }, 1000);
}


function timer_start() {
    if (!timer_started) {

        var timer = read_timer();
        if (timer) {
            // timer in s
            var tm1 = l2s(timer[1]);
            var tm2 = l2s(timer[2]);
            // console.log(tm1, tm2);
            // tm1 = s2l(tm1);
            // tm2 = s2l(tm2);
            // console.log(tm1, tm2);
            var cycle = timer['cycle'];
            timer_started = true;
            yes.play();
            cycled_timer(cycle, tm1, tm2);
        }
    }

    //
    //

}



function close_msg() {
    $('#msg').fadeOut();
}

function reset() {
    clearInterval(timer_interval[0]);
    clearInterval(timer_interval[1]);
    create_timer();
    create_cycle_scroll();
}


$(document).ready(function() {
    $('#msg').hide();
    reset();
    setTimeout(() => {
        $('#load').fadeOut(500);
    }, 500);
});