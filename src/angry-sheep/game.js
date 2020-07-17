import Phaser from 'phaser';
import C from './constants';
import _ from 'lodash';

let _game = null;

function preload(game) {
  _game = game;

  _.range(6)
    .forEach((i) => {
      game.load.image(`sheep_${i}`, `${C.ASSETS_ROOT}images/sheep_${i}.png`);
      game.load.audio(`sheep_${i}`, `${C.ASSETS_ROOT}audio/sheep${i}.mp3`);
    });

  [
    ['bg_music', `background.wav`],
    ['sheep_completed_journey', 'sheep-completed-journey.wav']
  ].forEach(i => game.load.audio(i[0], `${C.ASSETS_ROOT}audio/${i[1]}`));

  [
    ['arrow-right', 'arrow-right.png'],
    ['row-bg', 'road.jpg'],
    ['game_start_btn', 'start_game.png'],
    ['selected-sheep', 'selected-sheep.gif']
  ].forEach(x => game.load.image(x[0], `${C.ASSETS_ROOT}images/${x[1]}`));

}

function create(game) {
  _game = game;

  _.range(C.ROWS).forEach(index => {
    const sprite = game.add.sprite(0, 0, 'row-bg');
    sprite.width = C.GAME_X;
    sprite.height = C.SPRITE_HEIGHT;

    sprite.x = C.SIDE_MENU.WIDTH;
    sprite.y = C.TOP_MENU.HEIGHT + C.SPRITE_HEIGHT * index + C.MARGIN * index;

  });

  game.sound.mute = C.AUDIO.MUTE;

  const music = game.sound.add('bg_music', C.AUDIO.BG_VOLUME, true);
  music.play();
}

function update (game) {


}

const preloadCreator = (preloadHook) => {
  return function () {
    preload(this);
    if (preloadHook) preloadHook(this);
  }
}

const createCreator = (createHook) => {
  return function() {
    create(this);
    if (createHook) createHook();
  }
}

const updateCreator = (updateHook) => {
  return function() {
    update(this);
    if (updateHook) updateHook();
  }
}

export const createGame = (preloadHook, createHook, updateHook) => {
  const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: C.GAME_X + C.SIDE_MENU.WIDTH * 2,
  height: C.GAME_Y + C.TOP_MENU.HEIGHT + C.BOTTOM_MENU.HEIGHT,
  scene: {
    preload: preloadCreator(preloadHook),
    create: createCreator(createHook),
    update: updateCreator(updateHook),
  }
};
  new Phaser.Game(config);
};

export const getGame = () => {
  return _game;
}