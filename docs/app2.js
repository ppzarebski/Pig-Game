var scores, roundScore, activePlayer, gamePlaying, previous, numInput;
var winScore = 100;
var numInput = document.querySelector("input");
numInput.addEventListener("change", function(){
	winScore = Number(numInput.value);
	init();
});

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		var dice1DOM = document.querySelector('.dice1');
		var score;
		diceDOM.style.display = 'block';
		dice1DOM.style.display = 'block';
		diceDOM.src = 'images/dice-' + dice + '.png';
		dice1DOM.src = 'images/dice-' + dice1 + '.png';
		if (dice !== 1 && dice1 !== 1) {
			score = dice + dice1;
			roundScore += score;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else if (dice === 1 && dice1 ===1) {
			twoOnes();
		} else {
			wait();
		};
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(roundScore !== 0) {
		if(gamePlaying) {
			scores[activePlayer] += roundScore;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			if (scores[activePlayer] >= winScore) {
				document.getElementById('name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.dice1').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;

			} else {
				nextPlayer();
			};
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('score-' + activePlayer).classList.remove('two-ones');
	document.querySelector('.alert').style.display = 'none';
	var elems = document.querySelectorAll('.btn-stop');
	for (var i = 0; i < elems.length; i++) {
    	elems[i].disabled = false;
	};
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice1').style.display = 'none';
};

function init() {
	gamePlaying = true;
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	document.querySelector('.dice').style.display = 'block';
	document.querySelector('.dice1').style.display = 'block';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
};

function wait() {
	document.querySelector('.alert').style.display = 'block';
	var elems = document.querySelectorAll('.btn-stop');
	for (var i = 0; i < elems.length; i++) {
    	elems[i].disabled = true;
	};
	setTimeout(nextPlayer, 1000);
}
function afterTwoOnes() {
	scores[activePlayer] = 0;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}
function twoOnes() {
	document.querySelector('.alert').style.display = 'block';
	document.getElementById('score-' + activePlayer).classList.add('two-ones');
	var elems = document.querySelectorAll('.btn-stop');
	for (var i = 0; i < elems.length; i++) {
    	elems[i].disabled = true;
	};
	setTimeout(afterTwoOnes, 1000);
	setTimeout(nextPlayer, 1000);
}

document.querySelector('.btn-rules').addEventListener('click', function() {
	var isVisible = document.querySelector('.rules');
	isVisible.style.display == 'block' ? isVisible.style.display = 'none' : isVisible.style.display = 'block';
});
document.querySelector('.close').addEventListener('click', function() {
	document.querySelector('.rules').style.display = "none";
});