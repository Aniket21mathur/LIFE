alert("Hey, I am Aniket and I am in a problem.The vampires 'assignment' and 'lecture' are haunting me.But I don't want to go to the dark zone.Believe me only you can save my LIFE.Please help me live longer.//////Warning their occurence gets more frequent as u go ahead.//////");

document.getElementById('write').innerHTML="Alert:My life can be controlled by the space bar.";


$(function () {
    

    var container = $('#container');

    var me = $('#me');

    var pole = $('.pole');

    var pole_1 = $('#pole_1');

    var pole_2 = $('#pole_2');

    var score = $('#score');

    var speed_span = $('#speed');

    var restart_btn = $('#restart_btn');

    
//declarations
    var container_width = parseInt(container.width());

    var container_height = parseInt(container.height());

    var pole_initial_position = parseInt(pole.css('right'));

    var pole_initial_height = parseInt(pole.css('height'));

    var me_left = parseInt(me.css('left'));

    var me_height = parseInt(me.height());

    var speed = 5;

    var go_up = false;

    var score_updated = false;

    var game_over = false;

    var anim_id;


    var the_game = function () {
        if (collision(me, pole_1) || collision(me, pole_2) ||parseInt(me.css('top')) <= 0 || parseInt(me.css('top')) > container_height - me_height) {
            stop_the_game();
        
        }

        else {
            var pole_current_position = parseInt(pole.css('right'));
            //Score update
            if (pole_current_position > container_width - me_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }
            //check whether the poles went out of the container
            if (pole_current_position > container_width) {
                var new_height1 = parseInt(Math.random() * 150);
                var new_height2 = parseInt(Math.random() * 50);
                
                //change pole height
                pole_1.css('height', pole_initial_height + new_height1);
                pole_2.css('height', pole_initial_height - new_height2);

                // speed++
                speed = speed + 1;
                speed_span.text(speed);
                score_updated = false;
                pole_current_position = pole_initial_position;
            }
            
            //move the poles
            pole.css('right', pole_current_position + speed);
            if (go_up === false) {
                go_down();
            }
        }
        anim_id = requestAnimationFrame(the_game);
    };
    anim_id = requestAnimationFrame(the_game);
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = requestAnimationFrame(up);
        }
    });
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            cancelAnimationFrame(go_up);
            go_up = false;
        }
    });

    function go_down() {
        me.css('top', parseInt(me.css('top')) + 3);
    }

    function up() {
        me.css('top', parseInt(me.css('top')) - 6);
        go_up = requestAnimationFrame(up);
    }

    function stop_the_game() {
        cancelAnimationFrame(anim_id);
        game_over = true;
        restart_btn.slideDown();
    document.getElementById('write').innerHTML="I think I lost my LIFE,one day u will!!";
    }
    restart_btn.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});

