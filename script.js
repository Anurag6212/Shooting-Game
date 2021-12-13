'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnShoot = document.querySelector('.btn--shoot');

let scores, currentScore1, currentScore2, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore1 = 100;
  currentScore2 = 100;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 100;
  current1El.textContent = 100;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  if (activePlayer === 0) {
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore1;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore2;
  }

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Shooting game functionality
btnShoot.addEventListener('click', function () {
  if (playing) {
    const shoot = Math.trunc(Math.random() * 6);
    console.log('shoot', shoot);
    if (activePlayer === 0) {
      currentScore1 -= shoot;
      document.getElementById(`current--0`).textContent = currentScore1;
      switchPlayer();
    } else {
      currentScore2 -= shoot;
      document.getElementById(`current--1`).textContent = currentScore2;
      switchPlayer();
    }
    if (currentScore1 <= 0) {
      afterOneRoundWin(activePlayer + 1);
    }
    if (currentScore2 <= 0) {
      afterOneRoundWin(activePlayer - 1);
    }
    // Finish the game

    if (scores[1] >= 3) {
      playing = false;

      document.querySelector(`.player--1`).classList.add('player--winner');
      document.querySelector(`.player--1`).classList.remove('player--active');
    }
    if (scores[0] >= 3) {
      playing = false;

      document.querySelector(`.player--0`).classList.add('player--winner');
      document.querySelector(`.player--0`).classList.remove('player--active');
    }
  }
});
// Aftter first round win
const afterOneRoundWin = function (activeEl) {
  scores[activeEl] += 1;
  console.log('Scores', scores[activeEl]);
  document.getElementById(`score--${activeEl}`).textContent = scores[activeEl];

  currentScore1 = 100;
  currentScore2 = 100;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 100;
  current1El.textContent = 100;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

btnNew.addEventListener('click', init);
