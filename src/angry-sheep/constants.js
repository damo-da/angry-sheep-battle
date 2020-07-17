const defaults = {
  ASSETS_ROOT: '/src/assets/',

  GAME_X: 900,
  GAME_Y: 500,

  DEFAULT_MANA: 80,
  SHEEP_ADD_INTERVAL: 500,

  TOP_MENU: {
    MANA_WIDTH: 300,
    HEIGHT: 70,
    WIDTH: 500
  },
  BOTTOM_MENU: {
    HEIGHT: 100,
    WIDTH: 400,
    ITEM_SIZE: 60
  },

  ROWS: 5,
  MARGIN: 10,

  SHEEPS: {
    0: {STRENGTH: 0.4, WIDTH: 0.05, MANA: 10, SPEED: 1.0},
    1: {STRENGTH: 0.6, WIDTH: 0.07, MANA: 20, SPEED: 0.8},
    2: {STRENGTH: 0.9, WIDTH: 0.08, MANA: 30, SPEED: 0.7},
    3: {STRENGTH: 1.0, WIDTH: 0.09, MANA: 40, SPEED: 0.5},
    4: {STRENGTH: 1.3, WIDTH: 0.10, MANA: 50, SPEED: 0.4},
    5: {STRENGTH: 1.8, WIDTH: 0.12, MANA: 60, SPEED: 0.3},
  },

  SIDE_MENU: {
    WIDTH: 100,
    ITEM_WIDTH: 40

  },

  POINTS: {
    WIDTH: 100,
    FONT_SIZE: 20
  },

  SHEEP_MOVE_CONST: 0.005,

  AUDIO:{
    VOLUME: 0.05,
    BG_VOLUME: 0.2,
    MUTE: false
  },

  MAIN_MENU: {
    BG_COLOR: 0x000000,
    BORDER_COLOR: 0x333333
  }

};


const runUpdates = () => { //store 'cache'
  defaults.SPRITE_HEIGHT = (defaults.GAME_Y /defaults.ROWS)-defaults.MARGIN;
};

export const updateWindowInfo = () => { //ran on the start of the game to initialize game information
  if(!window){
    console.log('No window element found. Using default configuration.');
  }else {
    const scWidth = window.innerWidth;
    const scHeight = window.innerHeight;

    defaults.MARGIN = 0.01 * scHeight;

    if (scHeight < 600){
      defaults.TOP_MENU.HEIGHT = 50;
      defaults.BOTTOM_MENU.HEIGHT = 50;
      defaults.BOTTOM_MENU.ITEM_SIZE = 40;

    }

    defaults.GAME_Y = scHeight - defaults.TOP_MENU.HEIGHT - defaults.BOTTOM_MENU.HEIGHT;

    if (scWidth > 1024){
      defaults.SIDE_MENU.WIDTH = 0.08 * scWidth;
      const expectedHeight = (defaults.GAME_Y / defaults.ROWS) - defaults.MARGIN
      defaults.SIDE_MENU.ITEM_WIDTH = expectedHeight < defaults.SIDE_MENU.WIDTH?expectedHeight: defaults.SIDE_MENU.WIDTH;
    }

    defaults.GAME_X = scWidth - defaults.SIDE_MENU.WIDTH * 2;

  }

  runUpdates();

};

export default defaults;
