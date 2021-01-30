import React, { useState, Dispatch, SetStateAction } from 'react';
import { kantoDex } from '../constants/pokemonList';
import { getPokemonModel } from './animatedPokemon';

interface PreloadContextValue {
  splashScreenLoading: boolean;
  setSplashScreenLoading: Dispatch<SetStateAction<boolean>>;
  lobbyScreenLoading: boolean;
  setLobbyScreenLoading: Dispatch<SetStateAction<boolean>>;
  battleScreenLoading: boolean;
  setBattleScreenLoading: Dispatch<SetStateAction<boolean>>;
}

export const PreloadContext = React.createContext<PreloadContextValue>({
  splashScreenLoading: true,
  setSplashScreenLoading: () => { },
  lobbyScreenLoading: true,
  setLobbyScreenLoading: () => { },
  battleScreenLoading: true,
  setBattleScreenLoading: () => { },
});

export function PreloadContextProvider(props: { children: React.ReactNode }) {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);
  const [lobbyScreenLoading, setLobbyScreenLoading] = useState(true);
  const [battleScreenLoading, setBattleScreenLoading] = useState(true);
  return (
    <PreloadContext.Provider
      value={{
        splashScreenLoading, setSplashScreenLoading,
        lobbyScreenLoading, setLobbyScreenLoading,
        battleScreenLoading, setBattleScreenLoading,
      }}
      {...props}
    />
  );
}

const images = [
  // Tier 0: load this at splash screen
  [
    // initial backgrounds
    require('./images/background/title.jpg'),
    require('./images/background/title-blur.jpg'),
    require('./images/background/lobby.jpg'),

    // UI
    require('./images/ui/banner_base.png'),
    require('./images/ui/logo.png'),
    require('./images/ui/setting.png'),
    require('./images/ui/text_field_bg.png'),
    require('./images/ui/button_base.png'),
    require('./images/ui/lose.png'),
    require('./images/ui/sound.png'),
    require('./images/ui/welcome.png'),
    require('./images/ui/close_button.png'),
    require('./images/ui/modal_bg.png'),
    require('./images/ui/sound_off.png'),
    require('./images/ui/win.png'),
  ],

  // Tier 1.: load this after tier 0
  [
    // battle backgrounds
    require('./images/background/arena.png'),
    require('./images/background/cerulean-gym.png'),
    require('./images/background/pewter-gym.png'),
  ],

  // Tier 2: load this after tier 1
  [
    // animated sprites
    ...kantoDex.map((name) => getPokemonModel(name, 'idle')),
    ...kantoDex.map((name) => getPokemonModel(name, 'back')),

    // pokemon preview
    ...new Array(151).fill(null).map(
      (_, index) => require(`./images/pokemonPreview/${index + 1}.png`)
    ),

    // trainers
    require('./images/trainer/agatha.png'),
    require('./images/trainer/brendan.png'),
    require('./images/trainer/erika.png'),
    require('./images/trainer/lance.png'),
    require('./images/trainer/may.png'),
    require('./images/trainer/sabrina.png'),
    require('./images/trainer/blaine.png'),
    require('./images/trainer/brock.png'),
    require('./images/trainer/giovanni.png'),
    require('./images/trainer/leaf.png'),
    require('./images/trainer/misty.png'),
    require('./images/trainer/surge.png'),
    require('./images/trainer/blue.png'),
    require('./images/trainer/bruno.png'),
    require('./images/trainer/koga.png'),
    require('./images/trainer/lorelei.png'),
    require('./images/trainer/red.png'),
  ],
];

const audios = [
  // Tier 0: load this at splash screen
  [
    // initial sfx
    require('./audio/sfx/plink.mp3'),

    // initial bgm
    require('./audio/bgm/03_Title_Screen.mp3'),
  ],

  // Tier 1.: load this after tier 0
  [
    // lobby bgm
    require('./audio/bgm/25_Pokemon_Gym.mp3'),
    require('./audio/bgm/2-41_Battle_Tower.mp3'),

    // battle bgm
    require('./audio/bgm/11_Battle_(Trainer_Battle).mp3'),
    require('./audio/bgm/27_Battle_(Gym_Leader_Battle).mp3'),
  ],

  // Tier 2: load this after tier 1
  [
    // moves sfx
    require('./audio/sfx/moves/Absorb.mp3'),
    require('./audio/sfx/moves/Acid Armor.mp3'),
    require('./audio/sfx/moves/Acid.mp3'),
    require('./audio/sfx/moves/Aerial Ace.mp3'),
    require('./audio/sfx/moves/Aeroblast.mp3'),
    require('./audio/sfx/moves/Agility.mp3'),
    require('./audio/sfx/moves/Air Cutter.mp3'),
    require('./audio/sfx/moves/Amnesia.mp3'),
    require('./audio/sfx/moves/Ancient Power.mp3'),
    require('./audio/sfx/moves/Arm Thrust.mp3'),
    require('./audio/sfx/moves/Aromatherapy.mp3'),
    require('./audio/sfx/moves/Assist.mp3'),
    require('./audio/sfx/moves/Astonish.mp3'),
    require('./audio/sfx/moves/Attract.mp3'),
    require('./audio/sfx/moves/Aurora Beam.mp3'),
    require('./audio/sfx/moves/Barrage.mp3'),
    require('./audio/sfx/moves/Barrier.mp3'),
    require('./audio/sfx/moves/Baton Pass.mp3'),
    require('./audio/sfx/moves/Beat Up.mp3'),
    require('./audio/sfx/moves/Belly Drum.mp3'),
    require('./audio/sfx/moves/Bide.mp3'),
    require('./audio/sfx/moves/Bind.mp3'),
    require('./audio/sfx/moves/Bite.mp3'),
    require('./audio/sfx/moves/Blast Burn.mp3'),
    require('./audio/sfx/moves/Blaze Kick.mp3'),
    require('./audio/sfx/moves/Blizzard.mp3'),
    require('./audio/sfx/moves/Block.mp3'),
    require('./audio/sfx/moves/Body Slam.mp3'),
    require('./audio/sfx/moves/Bone Club.mp3'),
    require('./audio/sfx/moves/Bone Rush.mp3'),
    require('./audio/sfx/moves/Bonemerang.mp3'),
    require('./audio/sfx/moves/Bounce.mp3'),
    require('./audio/sfx/moves/Brick Break.mp3'),
    require('./audio/sfx/moves/Bubble Beam.mp3'),
    require('./audio/sfx/moves/Bubble.mp3'),
    require('./audio/sfx/moves/Bulk Up.mp3'),
    require('./audio/sfx/moves/Bullet Seed.mp3'),
    require('./audio/sfx/moves/Calm Mind.mp3'),
    require('./audio/sfx/moves/Camouflage.mp3'),
    require('./audio/sfx/moves/Charge.mp3'),
    require('./audio/sfx/moves/Charm.mp3'),
    require('./audio/sfx/moves/Clamp.mp3'),
    require('./audio/sfx/moves/Comet Punch.mp3'),
    require('./audio/sfx/moves/Confuse Ray.mp3'),
    require('./audio/sfx/moves/Confusion.mp3'),
    require('./audio/sfx/moves/Constrict.mp3'),
    require('./audio/sfx/moves/Conversion 2.mp3'),
    require('./audio/sfx/moves/Conversion.mp3'),
    require('./audio/sfx/moves/Cosmic Power.mp3'),
    require('./audio/sfx/moves/Cotton Spore.mp3'),
    require('./audio/sfx/moves/Counter.mp3'),
    require('./audio/sfx/moves/Covet.mp3'),
    require('./audio/sfx/moves/Crabhammer.mp3'),
    require('./audio/sfx/moves/Cross Chop.mp3'),
    require('./audio/sfx/moves/Crunch.mp3'),
    require('./audio/sfx/moves/Crush Claw.mp3'),
    require('./audio/sfx/moves/Curse.mp3'),
    require('./audio/sfx/moves/Cut.mp3'),
    require('./audio/sfx/moves/Defense Curl.mp3'),
    require('./audio/sfx/moves/Destiny Bond.mp3'),
    require('./audio/sfx/moves/Detect.mp3'),
    require('./audio/sfx/moves/Dig.mp3'),
    require('./audio/sfx/moves/Disable.mp3'),
    require('./audio/sfx/moves/Dive.mp3'),
    require('./audio/sfx/moves/Dizzy Punch.mp3'),
    require('./audio/sfx/moves/Doom Desire.mp3'),
    require('./audio/sfx/moves/Double Kick.mp3'),
    require('./audio/sfx/moves/Double Slap.mp3'),
    require('./audio/sfx/moves/Double Team.mp3'),
    require('./audio/sfx/moves/Double-Edge.mp3'),
    require('./audio/sfx/moves/Dragon Breath.mp3'),
    require('./audio/sfx/moves/Dragon Claw.mp3'),
    require('./audio/sfx/moves/Dragon Dance.mp3'),
    require('./audio/sfx/moves/Dragon Rage.mp3'),
    require('./audio/sfx/moves/Dream Eater.mp3'),
    require('./audio/sfx/moves/Drill Peck.mp3'),
    require('./audio/sfx/moves/Dynamic Punch.mp3'),
    require('./audio/sfx/moves/Scratch.mp3'),
  ],
];

let tierIndex = 0;
export async function preloadAssets(...callbacks: (() => void)[]) {
  const imagePromises = images[tierIndex].map(src => new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = (...e) => { console.error(src, ...e); reject() };
  }));

  const audioPromises = audios[tierIndex].map(src => new Promise<void>((resolve, reject) => {
    const audio = new Audio(src);
    audio.oncanplaythrough = () => resolve();
    audio.onerror = (...e) => { console.error(src, ...e); reject() };
  }));

  await Promise.all([
    ...imagePromises,
    ...audioPromises,
  ]);

  callbacks[tierIndex] && callbacks[tierIndex]();
  tierIndex++;

  if (tierIndex < images.length) {
    preloadAssets(...callbacks);
  }
}
