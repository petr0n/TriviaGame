/* app.js */

$(document).ready(function($) {

	let currentQuestion = 0;
	let countDownId;
	const questions = $('.question-wrapper');
	const totalQuestions = questions.length - 1; // account for zero indexing
	let isTimerRunning = false;

	$('.next-btn').on('click', next);

	const start = function(){
		$('.start-btn').on('click', function(){
			$('.start-wrapper').fadeOut(200, function() {
				$('.wrapper').fadeIn(300, function() {
					// countDown();
					questions.eq(0).fadeIn(200);
				});
			});
		});
	}
	start();


	const countDown = function(){
		let countDownTime = 10; // seconds
		let countDownEl = $('#countdown span');
		if (!isTimerRunning) {
			countDownId = setInterval(count, 1000);
		}
		function count(){
			isTimerRunning = true;
			countDownEl.text(timeConverter(countDownTime));
			countDownTime--;
			if (countDownTime === 0) {
				next();
			}
		}
		function timeConverter(t) {
			var minutes = Math.floor(t / 60);
			var seconds = t - (minutes * 60);
			seconds = seconds < 10 ? '0' + seconds : seconds;
			return minutes + ':' + seconds;
		}
	}


	function next() {
		isTimerRunning = false;
		clearInterval(countDownId);
		scoreKeeper(currentQuestion);
		questions.eq(currentQuestion).fadeOut(300, function() {
			if (currentQuestion === totalQuestions) { // end game
				gameOver();
			} else {
				currentQuestion++;
				questions.eq(currentQuestion).fadeIn(400, function(){
					countDown();
				});
			}
		});
	}


	let rightArr = [];
	let wrongArr = [];
	let missed = 0;
	const scoreKeeper = function(currentQuestion){
		const thisQuestion = questions.eq(currentQuestion);
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
		$('.finish-wrapper').animate({
			top: 0},
			1000, function() {
			$('#rightAnswers').text(rightArr.length);
			$('#wrongAnswers').text(wrongArr.length);
			$('#missed').text(missed);
			console.log('game over');
		});
	}


});