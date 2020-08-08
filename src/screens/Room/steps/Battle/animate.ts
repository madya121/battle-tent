import './animation.css';
import { Move } from '../../../../types/Pokemon';
import audio from '../../../../audio';

const ATTACK_DIRECTION_DOWN_CLASS = 'attack-direction-down';

function refreshElementAnimation(
  animationClass: string,
  element: HTMLDivElement
) {
  element.classList.remove(animationClass);
  element.classList.remove(ATTACK_DIRECTION_DOWN_CLASS);
  void element.offsetWidth;
}

async function animateOnce(
  animationClass: string,
  element: HTMLDivElement,
  attackDirection?: 'up' | 'down'
) {
  element.classList.add(animationClass);
  attackDirection === 'down' && element.classList.add(ATTACK_DIRECTION_DOWN_CLASS);
  return new Promise(resolve => {
    setTimeout(() => {
      refreshElementAnimation(animationClass, element);
      resolve();
    }, 1000);
  });
}

export function animateTakingDamage(element: HTMLDivElement | null) {
  if (element === null) return;
  animateOnce('taking-damage', element);
}

export function animateAttacking(
  move: Move,
  element: HTMLDivElement | null,
  attackDirection: 'up' | 'down'
) {
  if (element === null) return;
  let moveSfx;
  try {
    // move SFX based on Gen III asset.
    // currently support move starts from A to D
    moveSfx = require(`../../../../assets/audio/sfx/moves/${move.name}.mp3`);
  } catch (e) {
    // fallback for unsupported move (E onwards, except Scratch)
    moveSfx = require(`../../../../assets/audio/sfx/moves/Cut.mp3`);
  }
  audio.playSfx(moveSfx);
  animateOnce('attacking', element, attackDirection);
}

export function animateFainted(element: HTMLDivElement | null) {
  if (element === null) return;
  // audio.playSfx(crySfx);
  animateOnce('returning-to-pokeball', element).then(() => {
    element.classList.add('fainted');
  });
}
