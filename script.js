import generateText from './modules/text.mjs';
import showText from './modules/ui.mjs';
import {
  time,
  startTimer,
  stopTimer,
  resetTimer,
  stoptime
} from './modules/timer.mjs';
import {
  UISelectors,
  blurText,
  unblurText,
  animateSpacebar,
  animateRandKey,
  clearTypingField,
  changeStateToSettings,
  changeStateToFinish,
  changeParagraph,
  highlight
} from './modules/ui.mjs';

// Variables
const wordsArr = generateText(50);
let count = 0;
let correctChars = 0;
let wrongChars = 0;
let currentWord = wordsArr[0];
let wpm = 0;
let accuracy = 0;

// Load content
function loadContent() {
  showText(wordsArr);
  UISelectors.typingField.focus();
  updateText();
}

// Update Text
function updateText() {
  changeParagraph(count, wordsArr.length);
}

// App
function app(e) {
  if (e.key === 'Tab') {
    e.preventDefault();

    UISelectors.playBtn.focus();
  }

  if (UISelectors.typingField === document.activeElement) {
    // Keyboard animation
    try {
      if (e.key === ' ') {
        animateSpacebar();
      } else {
        animateRandKey(e.key);
      }
    } catch (error) {}

    // Start Timer
    if (stoptime === true) {
      startTimer();
    }

    if (e.key === ' ') {
      if (UISelectors.typingField.value !== '') {
        if (UISelectors.typingField.value.trim() === currentWord) {
          correctChars += currentWord.length;
          highlight('correct', count);
          correctChars += 1;
        } else {
          wrongChars += currentWord.length;
          highlight('wrong', count);
        }

        // Clear typing field
        clearTypingField();

        // Iterating count and current word
        count = count + 1;
        currentWord = wordsArr[count];

        // Update ui
        updateText();

        if (count === wordsArr.length) {
          // Stop timer
          stopTimer();

          // Calculate data
          const totalChars = correctChars + wrongChars + (wordsArr.length - 1);
          accuracy = Math.round((correctChars / totalChars) * 100);
          wpm = Math.round(correctChars / 5 / (time / 60));

          changeStateToFinish(wpm, accuracy, time);

          resetTimer();
        }
      }
      e.preventDefault();
    }
  }
}

// Event listeners
window.addEventListener('DOMContentLoaded', loadContent);
window.addEventListener('keydown', app);
UISelectors.typingField.addEventListener('focusin', unblurText);
UISelectors.typingField.addEventListener('focusout', blurText);
UISelectors.settingsBtn.addEventListener('click', changeStateToSettings);
