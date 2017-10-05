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
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'images/dice-' + dice + '.png';
		if (dice !== 1) {
			if (dice === 6 && dice === previous) {
				roundScore = 0;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
				document.querySelector('.dice').src = 'images/dice-6-r.png';
				wait();
			} else {
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			};
		} else {
			wait();
		}
		previous = dice;
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
	previous = 0;
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
};

function init() {
	gamePlaying = true;
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	document.querySelector('.dice').style.display = 'block';
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

document.querySelector('.btn-rules').addEventListener('click', function() {
	var isVisible = document.querySelector('.rules');
	isVisible.style.display == 'block' ? isVisible.style.display = 'none' : isVisible.style.display = 'block';
});
document.querySelector('.close').addEventListener('click', function() {
	document.querySelector('.rules').style.display = "none";
});
