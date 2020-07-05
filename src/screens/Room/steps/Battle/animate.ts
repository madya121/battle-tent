import './animation.css';

const ScratchSfx = require('../../../../assets/audio/sfx/moves/scratch.mp3');

// enum Animation { Idle, TakingDamage, Attacking }

const ATTACK_DIRECTION_DOWN_CLASS = 'attack-direction-down';

function refreshElementAnimation(
  animationClass: string,
  element: HTMLDivElement
) {
  element.classList.remove(animationClass);
  element.classList.remove(ATTACK_DIRECTION_DOWN_CLASS);
  void element.offsetWidth;
}

function animateOnce(
  animationClass: string,
  element: HTMLDivElement,
  attackDirection: 'up' | 'down' = 'up'
) {
  element.classList.add(animationClass);
  attackDirection === 'down' && element.classList.add(ATTACK_DIRECTION_DOWN_CLASS);
  setTimeout(() => refreshElementAnimation(animationClass, element), 200);
}

export function animateTakingDamage(element: HTMLDivElement | null) {
  if (element === null) return;
  animateOnce('taking-damage', element);
}

export function animateAttacking(element: HTMLDivElement | null, attackDirection: 'up' | 'down') {
  if (element === null) return;
  new Audio(ScratchSfx).play();
  animateOnce('attacking', element, attackDirection);
}
