/* app.js */

$(document).ready(function($) {

	let countDownId, answerCountDownId, countDownCircleId;
	let currentQuestion = 0;
	let isTimerRunning = false;

	const countDownEl = $('#countdown span');
	const questionsEl = $('.question-wrapper');
	const totalQuestions = questionsEl.length - 1; // account for zero indexing

	$('input[type="radio"]').on('change', function(){
		var radioEl = $(this);
		if (radioEl.val()) {
			next(radioEl);
			progessBar(true);
		}
	});
	$('.start-over-btn').on('click', start);

	function start(){
		$('.start-btn').on('click', function(){
			$('.start-wrapper').fadeOut(200, function() {
				$('.wrapper').fadeIn(300, function() {
					countDown();
					questionsEl.eq(0).fadeIn(200);
				});
			});
		});
	}
	start();


	const countDown = function(){
		let countDownTime = 10; // seconds
		if (!isTimerRunning) {
			countDownId = setInterval(count, 1000);
		}
		function count(){
			isTimerRunning = true;
			countDownTime--;
			// console.log('width: ' + width);
			progessBar(false);
			countDownEl.text(timeConverter(countDownTime));
			if (countDownTime === 0) {
				next();
				progessBar(true);
			}
		}
		function timeConverter(t) {
			var minutes = Math.floor(t / 60);
			var seconds = t - (minutes * 60);
			seconds = seconds < 10 ? '0' + seconds : seconds;
			return minutes + ':' + seconds;
		}
	}

	function progessBar(reset){
		if (reset) {
			$('header .progress span').css({width: '100%', transitionDuration: '0s'});
		} else {
			$('header .progress span').css({width: 0, transitionDuration: '9s'});
		}
	}

	function next(radioEl) {
		clearInterval(countDownId);
		scoreKeeper(currentQuestion);
		isTimerRunning = false;
		questionsEl.eq(currentQuestion).fadeOut(300, function() {
			if (currentQuestion === totalQuestions) { // end game
				gameOver();
			} else {
				currentQuestion++;
				//console.log(radioEl);
				answer(currentQuestion, radioEl);
				// questions.eq(currentQuestion).fadeIn(400, function(){
				// 	countDown();
				// });
			}
		});
	}

	function answer(curr, radioEl){
		var answerEl = $('.answer');
		countDownEl.text('0:00');
		clearTimeout(answerCountDownId);
		answerEl.fadeIn(300, function() {
			progressCircle();
			var answerMessage = 'MISSED?!';
			if (radioEl != undefined && radioEl.length) {
				answerMessage = radioEl.attr('data-a') == 't' ? 'RIGHT!' : 'WRONG!';
			}
			$('.response').text(answerMessage);
			answerCountDownId = setTimeout(function() {
				questionsEl.eq(curr).fadeIn(400, function(){
					countDown();
				});
			}, 5000);
		})
	}


	let rightArr = [];
	let wrongArr = [];
	let missed = 0;
	const scoreKeeper = function(currentQuestion){
		const thisQuestion = questionsEl.eq(currentQuestion);
		const q = thisQuestion.find('input[type="radio"]:checked');
		if (q.length !== 0){
			if (q.attr('data-a') === 't'){
				rightArr.push(q.val());
			} else {
				wrongArr.push(q.val());
			}
		} else {
			missed++;
		}

	}

	const gameOver = function(){
		clearInterval(countDownId);
		console.log('game over');
		$('#rightAnswers').text(rightArr.length);
		$('#wrongAnswers').text(wrongArr.length);
		$('#missed').text(missed);
		$('.gameover').addClass('show');
		$('body').addClass('fixed');
		$('.overlay').addClass('on');
	}

	function progressCircle(){
		clearInterval(countDownCircleId);
		let countDownCircleEl = $('.countdown-circle');
		let countDown = 5;

		countDownCircleEl.text(countDown);
		circle = document.getElementById('circle');
		countDownCircleId = setInterval(function() {
			//countDown = --countdown <= 0 ? 5 : countDown;
			// <= 0 ? 5 : countDown;
			// circle.style.animation = 'none'; 
			countDown--;
			countDownCircleEl.text(countDown);
			if (countDown === 0) {
				circle.style.animation = ''; 
				clearInterval(countDownCircleId);
			}
			console.log(countDown);
		}, 1000);
		// circle.style.animation = 'none'; 

	}

});