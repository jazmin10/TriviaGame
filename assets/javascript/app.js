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
	}]


// SOLUTION 2
var index = 0;
var nextQuestion;
var countTimer = 20;
var intervalId;
var userChoice;

var correctQuestions;
var incorrectQuestions;
var unansweredQuestions;
// $('.choices').click(results);
$('.choices').on('click', function() {
	userChoice = $(this).attr('value');
	console.log(userChoice);
	results();
});
	
$('.choices').hide();
$('#startOver').hide();
$('#startGame').click(startQuiz);
$('#startOver').click(startQuiz);


function myTimer() {
	countTimer--;
	$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
	if (countTimer === 0) {
		results();
	}

}

function startQuiz() {
	correctQuestions = 0;
	incorrectQuestions = 0;
	unansweredQuestions = 0;

	index = 0;
	$('#startGame').hide();
	$('#results').hide();
	$('#startOver').hide();
	renderQuestion();
}

function renderQuestion() {
	$('#answer').hide();
	$('#question').show();
	intervalId = setInterval(myTimer, 1000);
	console.log(intervalId);
	$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
	$('#image').hide();
	$('.choices').show();
	$('#question').html(quiz[index].question);
	$('#choice1').text(quiz[index].options.option1[0]);
	$('#choice2').text(quiz[index].options.option2[0]);
	$('#choice3').text(quiz[index].options.option3[0]);
	$('#choice4').text(quiz[index].options.option4[0]);

	$('#result').hide();
}

function results() {
	$('#image').show();
	$('#answer').show();
	$('#question').hide();

	clearInterval(intervalId);


	$('.choices').hide();
	$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
	$('#answer').html("The correct answer: " + quiz[index].correctAnswer);
	$('#image').html("<img src=" + quiz[index].image + " />");


	$('#result').show();
	if (countTimer === 0){
		$('#result').html('Out of time!');
		unansweredQuestions++;
	}
	else if(quiz[index].options[userChoice][1] === "correct") {
		$('#result').html('Correct!');
		correctQuestions++;
	}
	else if(quiz[index].options[userChoice][1] === "incorrect") {
		$('#result').html('Nope!');
		incorrectQuestions++;
	}

	nextQuestion = setTimeout(clear, 3000);

	
}

function clear() {
	countTimer = 20;
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

		$('#timeRemaining').html("Time remaining: " + countTimer + " seconds");
		$('#result').html('Here is how you did!');
		$("#correct").html("Correct Answers: " + correctQuestions);
		$("#incorrect").html("Incorrect Answers: " + incorrectQuestions);
		$("#unanswered").html("Unanswered: " + unansweredQuestions)
		// setTimeout(startQuiz, 5000);	
	}
}






