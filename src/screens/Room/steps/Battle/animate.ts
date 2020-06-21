import './animation.css';

const ScratchSfx = require('../../../../assets/audio/sfx/moves/scratch.mp3');

// enum Animation { Idle, TakingDamage, Attacking }

function refreshElementAnimation(
  animationClass: string,
  element: HTMLDivElement
) {
  element.classList.remove(animationClass);
  void element.offsetWidth;
}

function animateOnce(animationClass: string, element: HTMLDivElement) {
  element.classList.add(animationClass);
  setTimeout(() => refreshElementAnimation(animationClass, element), 200);
}

export function animateTakingDamage(element: HTMLDivElement | null) {
  if (element === null) return;
  animateOnce('taking-damage', element);
}

export function animateAttacking(element: HTMLDivElement | null) {
  if (element === null) return;
  new Audio(ScratchSfx).play();
  animateOnce('attacking', element);
}
