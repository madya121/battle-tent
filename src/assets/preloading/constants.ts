import { kantoDex } from '../../constants/pokemonList';
import { getPokemonModel } from '../animatedPokemon';

export const initialImages = [
  /**
    * Tier 0: Title Screen assets
    * load this at splash screen
    */
  [
    // initial backgrounds
    require('../images/background/title.jpg'),
    require('../images/background/title-blur.jpg'),
    require('../images/background/lobby.jpg'),

    // UI
    require('../images/ui/banner_base.png'),
    require('../images/ui/logo.png'),
    require('../images/ui/setting.png'),
    require('../images/ui/text_field_bg.png'),
    require('../images/ui/button_base.png'),
    require('../images/ui/lose.png'),
    require('../images/ui/sound.png'),
    require('../images/ui/welcome.png'),
    require('../images/ui/close_button.png'),
    require('../images/ui/modal_bg.png'),
    require('../images/ui/sound_off.png'),
    require('../images/ui/win.png'),
  ],

  /**
    * Tier 1: Lobby Screen initial background
    */
  [
    // battle backgrounds
    require('../images/background/arena.png'),
  ],

  /**
    * Tier 2: Lobby Screen remaining backgrounds
    */
  [
    // battle backgrounds
    require('../images/background/cerulean-gym.png'),
    require('../images/background/pewter-gym.png'),
  ],

  /**
    * Tier 3: Room Screen assets
    */
  [
    // animated sprites
    ...kantoDex.map((name) => getPokemonModel(name, 'idle')),

    // trainers
    require('../images/trainer/agatha.png'),
    require('../images/trainer/brendan.png'),
    require('../images/trainer/erika.png'),
    require('../images/trainer/lance.png'),
    require('../images/trainer/may.png'),
    require('../images/trainer/sabrina.png'),
    require('../images/trainer/blaine.png'),
    require('../images/trainer/brock.png'),
    require('../images/trainer/giovanni.png'),
    require('../images/trainer/leaf.png'),
    require('../images/trainer/misty.png'),
    require('../images/trainer/surge.png'),
    require('../images/trainer/blue.png'),
    require('../images/trainer/bruno.png'),
    require('../images/trainer/koga.png'),
    require('../images/trainer/lorelei.png'),
    require('../images/trainer/red.png'),
  ],
];

export const initialAudios = [
  /**
    * Tier 0: Title Screen assets
    * load this at splash screen
    */
  [
    // initial sfx
    require('../audio/sfx/plink.mp3'),

    // initial bgm
    require('../audio/bgm/03_Title_Screen.mp3'),
  ],

  /**
    * Tier 1: Lobby Screen initial bgm
    */
  [
    require('../audio/bgm/25_Pokemon_Gym.mp3'),
    require('../audio/bgm/2-41_Battle_Tower.mp3'),
  ],

  /**
    * Tier 2: Lobby Screen remaining bgm
    */
  [
    // battle bgm
    require('../audio/bgm/11_Battle_(Trainer_Battle).mp3'),
    require('../audio/bgm/27_Battle_(Gym_Leader_Battle).mp3'),
  ],


  /**
    * Tier 3: Room Screen initial bgm
    */
  [
    // moves sfx
    require('../audio/sfx/moves/Absorb.mp3'),
    require('../audio/sfx/moves/Acid Armor.mp3'),
    require('../audio/sfx/moves/Acid.mp3'),
    require('../audio/sfx/moves/Aerial Ace.mp3'),
    require('../audio/sfx/moves/Aeroblast.mp3'),
    require('../audio/sfx/moves/Agility.mp3'),
    require('../audio/sfx/moves/Air Cutter.mp3'),
    require('../audio/sfx/moves/Amnesia.mp3'),
    require('../audio/sfx/moves/Ancient Power.mp3'),
    require('../audio/sfx/moves/Arm Thrust.mp3'),
    require('../audio/sfx/moves/Aromatherapy.mp3'),
    require('../audio/sfx/moves/Assist.mp3'),
    require('../audio/sfx/moves/Astonish.mp3'),
    require('../audio/sfx/moves/Attract.mp3'),
    require('../audio/sfx/moves/Aurora Beam.mp3'),
    require('../audio/sfx/moves/Barrage.mp3'),
    require('../audio/sfx/moves/Barrier.mp3'),
    require('../audio/sfx/moves/Baton Pass.mp3'),
    require('../audio/sfx/moves/Beat Up.mp3'),
    require('../audio/sfx/moves/Belly Drum.mp3'),
    require('../audio/sfx/moves/Bide.mp3'),
    require('../audio/sfx/moves/Bind.mp3'),
    require('../audio/sfx/moves/Bite.mp3'),
    require('../audio/sfx/moves/Blast Burn.mp3'),
    require('../audio/sfx/moves/Blaze Kick.mp3'),
    require('../audio/sfx/moves/Blizzard.mp3'),
    require('../audio/sfx/moves/Block.mp3'),
    require('../audio/sfx/moves/Body Slam.mp3'),
    require('../audio/sfx/moves/Bone Club.mp3'),
    require('../audio/sfx/moves/Bone Rush.mp3'),
    require('../audio/sfx/moves/Bonemerang.mp3'),
    require('../audio/sfx/moves/Bounce.mp3'),
    require('../audio/sfx/moves/Brick Break.mp3'),
    require('../audio/sfx/moves/Bubble Beam.mp3'),
    require('../audio/sfx/moves/Bubble.mp3'),
    require('../audio/sfx/moves/Bulk Up.mp3'),
    require('../audio/sfx/moves/Bullet Seed.mp3'),
    require('../audio/sfx/moves/Calm Mind.mp3'),
    require('../audio/sfx/moves/Camouflage.mp3'),
    require('../audio/sfx/moves/Charge.mp3'),
    require('../audio/sfx/moves/Charm.mp3'),
    require('../audio/sfx/moves/Clamp.mp3'),
    require('../audio/sfx/moves/Comet Punch.mp3'),
    require('../audio/sfx/moves/Confuse Ray.mp3'),
    require('../audio/sfx/moves/Confusion.mp3'),
    require('../audio/sfx/moves/Constrict.mp3'),
    require('../audio/sfx/moves/Conversion 2.mp3'),
    require('../audio/sfx/moves/Conversion.mp3'),
    require('../audio/sfx/moves/Cosmic Power.mp3'),
    require('../audio/sfx/moves/Cotton Spore.mp3'),
    require('../audio/sfx/moves/Counter.mp3'),
    require('../audio/sfx/moves/Covet.mp3'),
    require('../audio/sfx/moves/Crabhammer.mp3'),
    require('../audio/sfx/moves/Cross Chop.mp3'),
    require('../audio/sfx/moves/Crunch.mp3'),
    require('../audio/sfx/moves/Crush Claw.mp3'),
    require('../audio/sfx/moves/Curse.mp3'),
    require('../audio/sfx/moves/Cut.mp3'),
    require('../audio/sfx/moves/Defense Curl.mp3'),
    require('../audio/sfx/moves/Destiny Bond.mp3'),
    require('../audio/sfx/moves/Detect.mp3'),
    require('../audio/sfx/moves/Dig.mp3'),
    require('../audio/sfx/moves/Disable.mp3'),
    require('../audio/sfx/moves/Dive.mp3'),
    require('../audio/sfx/moves/Dizzy Punch.mp3'),
    require('../audio/sfx/moves/Doom Desire.mp3'),
    require('../audio/sfx/moves/Double Kick.mp3'),
    require('../audio/sfx/moves/Double Slap.mp3'),
    require('../audio/sfx/moves/Double Team.mp3'),
    require('../audio/sfx/moves/Double-Edge.mp3'),
    require('../audio/sfx/moves/Dragon Breath.mp3'),
    require('../audio/sfx/moves/Dragon Claw.mp3'),
    require('../audio/sfx/moves/Dragon Dance.mp3'),
    require('../audio/sfx/moves/Dragon Rage.mp3'),
    require('../audio/sfx/moves/Dream Eater.mp3'),
    require('../audio/sfx/moves/Drill Peck.mp3'),
    require('../audio/sfx/moves/Dynamic Punch.mp3'),
    require('../audio/sfx/moves/Scratch.mp3'),
  ],
];
