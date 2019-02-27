/* app.js */

$(document).ready(function($) {

    const start = function(){
        $('.start-btn').on('click', function(){
            $('.start-wrapper').fadeOut(200, function() {
                $('.wrapper').fadeIn(300, function() {
                    countDown();
                });
            });
        });
    }
    start();
    
    const countDown = function(){
        let countDownId;
        let countDownTime = 10; // seconds
        let countDownEl = $('#countdown span.timer');

        countDownId = setInterval(count, 1000);

        function count(){
            countDownTime--;
            countDownEl.text(timeConverter(countDownTime));
            if (countDownTime === 0) {
                clearInterval(countDownId);
                scoreKeeper();
                gameOver();
            }
        }
        function timeConverter(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return minutes + ':' + seconds;
        }
    }

    const scoreKeeper = function(){
        let totalQuestions = $('.question-wrapper').length;
        let rightArr = [];
        let wrongArr = [];
        let missed = 0;
        for (var x = 1; x <= totalQuestions; x++) {
            var q = $('input:radio[name="question' + x + '"]:checked');
            if (q.length !== 0){
                if (q.attr('data-a') === 't'){
                    rightArr.push(q.val());
                } else {
                    wrongArr.push(q.val());
                }
            } else {
                missed++;
            }
            $('#rightAnswers').text(rightArr.length);
            $('#wrongAnswers').text(wrongArr.length);
            $('#missed').text(missed);
        }
    }

    const gameOver = function(){
        $('.gameover').addClass('show');
        $('body').addClass('fixed');
        $('.overlay').addClass('on');
    }

    const sticky = function(){
        let header = $('header');
        let top = header.offset().top + 30;

        $(window).scroll(function (event) {
            var y = $(this).scrollTop();
            if (y > top)
                header.addClass('sticky');
            else
                header.removeClass('sticky');
        });
    }
    sticky();

});