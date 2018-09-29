// Trivia Game

$(document).ready(function() { 
	// Questions, Options, Answers, and Images
	var quiz = [{
		question: "What quidditch position does Harry play?",
		options: {
			option1: ["Seeker", "correct"], 
			option2: ["Chaser", "incorrect"],
			option3: ["Keeper", "incorrect"],
			option4: ["Beater", "incorrect"],
			},
		correctAnswer: "Seeker",
		image: "assets/images/image2.gif"
		}, {
		question: "Where do students board the Hogwarts Express?",
		options: {
			option1: ["Platform 8", "incorrect"], 
			option2: ["Platform 9 3/4", "correct"],
			option3: ["Platform 7 1/2", "incorrect"],
			option4: ["Platform 13", "incorrect"],
			},
		correctAnswer: "Platform 9 3/4",
		image: "assets/images/image1.gif"
		}, {
		question: "Who is the Headmaster?",
		options: {
			option1: ["Hagrid", "incorrect"], 
			option2: ["Mad-Eye Moody", "incorrect"],
			option3: ["Dumbledore", "correct"],
			option4: ["Voldemort", "incorrect"],
			},
		correctAnswer: "Dumbledore",
		image: "assets/images/image4.gif"
		}, {
		question: "What is Professor McGonagall's Animagus?",
		options: {
			option1: ["Eagle", "incorrect"], 
			option2: ["Horse", "incorrect"],
			option3: ["Owl", "incorrect"],
			option4: ["Cat", "correct"],
			},
		correctAnswer: "Cat",
		image: "assets/images/image5.gif"
		}, {
		question: "Who was the potion's professor?",
		options: {
			option1: ["Snape", "correct"], 
			option2: ["Lupin", "incorrect"],
			option3: ["Flitwick", "incorrect"],
			option4: ["Trelawney", "incorrect"],
			},
		correctAnswer: "Snape",
		image: "assets/images/image6.gif" 
		}];

	var index = 0;
	var nextQuestion;
	var countTimer = 20;
	var intervalId;
	var userChoice;
	var correctQuestions;
	var incorrectQuestions;
	var unansweredQuestions;

	$('.choices').hide();
	$('#startOver').hide();

	// Quiz starts when start button is clicked...	
	$('#startGame').click(startQuiz);

	// When a choice is clicked, display question results...
	$('.choices').on('click', function() {
		userChoice = $(this).attr('value');
		console.log(userChoice);
		results();
	});
		
	// Quiz restarts when start over button is clicked...
	$('#startOver').click(startQuiz);

	// Question's Timer 
	function myTimer() {
		countTimer--;
		$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");

		// If time runs out, show results
		if (countTimer === 0) {
			results();
		}
	}

	// Begin the quiz...
	function startQuiz() {
		correctQuestions = 0;
		incorrectQuestions = 0;
		unansweredQuestions = 0;
		index = 0;

		$('#startGame').hide();
		$('#results').hide();
		$('#startOver').hide();

		//Show the first question...
		renderQuestion();
	}

	// Displaying the question...
	function renderQuestion() {
		$('#answer').hide();
		$('#result').hide();
		$('#image').hide();
		$('.choices').show();
		$('#question').show();

		// Runs the timer...
		intervalId = setInterval(myTimer, 1000);

		// Question and choices
		$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
		$('#question').html(quiz[index].question);
		$('#choice1').text(quiz[index].options.option1[0]);
		$('#choice2').text(quiz[index].options.option2[0]);
		$('#choice3').text(quiz[index].options.option3[0]);
		$('#choice4').text(quiz[index].options.option4[0]);
	}

	function results() {
		$('#question').hide();
		$('.choices').hide();
		$('#image').show();
		$('#result').show();

		// Stop the timer...
		clearInterval(intervalId);

		// Question results...
		$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
		$('#answer').html("The correct answer: " + quiz[index].correctAnswer);
		$('#image').html("<img src=" + quiz[index].image + " />");

		if (countTimer === 0){
			$('#answer').show();
			$('#result').html('Out of time!');
			unansweredQuestions++;
		}
		else if(quiz[index].options[userChoice][1] === "correct") {
			$('#result').html('Correct!');
			correctQuestions++;
		}
		else if(quiz[index].options[userChoice][1] === "incorrect") {
			$('#answer').show();
			$('#result').html('Nope!');
			incorrectQuestions++;
		}

		// Run reset function after 5 seconds
		nextQuestion = setTimeout(reset, 5000);
	}

	// Resets paramaters for next question...
	function reset() {
		countTimer = 20;

		// If you are not with the quiz go to next question, otherwise display quiz results
		if (index < (quiz.length - 1)) {
			index++;
			renderQuestion();
		}
		else {
			$('#image').hide();
			$('#answer').hide();
			$('#question').hide();
			$('#results').show();
			$('#startOver').show();

			// Display quiz results...
			$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
			$('#result').html('All done, here is how you did!');
			$("#correct").html("Correct Answers: " + correctQuestions);
			$("#incorrect").html("Incorrect Answers: " + incorrectQuestions);
			$("#unanswered").html("Unanswered: " + unansweredQuestions)
		}
	}
});
