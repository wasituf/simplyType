import convertKeyToInt from './keyboard.mjs';

export const UISelectors = {
  card: document.querySelector('.card'),
  keyboard: document.querySelector('.keyboard'),
  text: document.querySelector('.text'),
  spans: document.getElementsByTagName('span'),
  typingField: document.querySelector('#typing-field'),
  spacebar: document.querySelector('.spacebar'),
  keys: document.querySelectorAll('td'),
  playBtn: document.querySelector('.play-btn'),
  settingsBtn: document.querySelector('.settings-btn'),
  settingsState: document.querySelector('.settings-state'),
  wpm: document.querySelector('.wpm h2'),
  accuracy: document.querySelector('.accuracy h2'),
  time: document.querySelector('.time h2'),
  finishState: document.querySelector('.finish-state')
};

export default function showText(words) {
  words.forEach(word => {
    UISelectors.text.innerHTML += `<span>${word}</span>`;
  });
}

export function addBlur() {
  const words = Array.from(UISelectors.spans);

  words.forEach(word => word.classList.add('blur'));
}

export function removeBlur() {
  const words = Array.from(UISelectors.spans);

  words.forEach(word => word.classList.remove('blur'));
}

export function animateSpacebar() {
  UISelectors.spacebar.style.backgroundColor = '#007acc';
  UISelectors.spacebar.style.opacity = '0.7';

  setTimeout(() => {
    UISelectors.spacebar.style.backgroundColor = 'transparent';
  }, 400);
  setTimeout(() => {
    UISelectors.spacebar.style.opacity = '0.8';
  }, 300);
}

export function animateRandKey(pressedKey) {
  const keys = Array.from(UISelectors.keys);
  const key = keys[convertKeyToInt(pressedKey)];

  key.style.backgroundColor = '#007acc';
  key.style.opacity = '0.6';
  setTimeout(() => {
    key.style.backgroundColor = 'transparent';
  }, 400);
  setTimeout(() => {
    key.style.opacity = '0.8';
  }, 300);
}

export function clearTypingField() {
  UISelectors.typingField.value = null;
}

export function changeParagraph(count, max) {
  const spans = Array.from(UISelectors.spans);
  spans.forEach(word => {
    word.classList.remove('highlight');
  });

  if (count < max) {
    spans[count].classList.add('highlight');
  }
}

export function highlight(type, count) {
  const spans = Array.from(UISelectors.spans);

  spans[count].classList.add(type);
}

export function removeHighlight(type, count) {
  const spans = Array.from(UISelectors.spans);

  spans[count].classList.remove(type);
}

export function changeStateToSettings() {
  UISelectors.card.style.display = 'none';
  UISelectors.keyboard.style.display = 'none';
  UISelectors.spacebar.style.display = 'none';
  UISelectors.finishState.style.display = 'none';

  UISelectors.settingsState.style.display = 'block';
}

export function changeStateToFinish(wpm, accuracy, time) {
  UISelectors.wpm.innerHTML = `${wpm} WPM`;
  UISelectors.accuracy.innerHTML = `${accuracy}%`;
  UISelectors.time.innerHTML = `${time}`;

  UISelectors.card.style.display = 'none';
  UISelectors.keyboard.style.display = 'none';
  UISelectors.spacebar.style.display = 'none';

  UISelectors.finishState.style.opacity = 1;
  setTimeout(() => {
    UISelectors.wpm.style.opacity = 1;
  }, 300);
  setTimeout(() => {
    UISelectors.accuracy.style.opacity = 1;
  }, 600);
  setTimeout(() => {
    UISelectors.time.style.opacity = 1;
  }, 900);
}
