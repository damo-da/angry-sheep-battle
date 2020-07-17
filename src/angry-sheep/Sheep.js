import C from './constants';
import {getGame} from './game';
let _lastId = 0;

export default class Sheep {
  constructor(index, row) {
    this.id = ++_lastId;

    this.index = index;
    this.row = row;
    this.speed = C.SHEEPS[index].SPEED;
    this.width = C.SHEEPS[index].WIDTH;
    this.strength = C.SHEEPS[index].STRENGTH;
    this.powers = [];
    this.col = 0.0; //should be between 0 to 1

    this.sprite = null;
  }

  move() {
    this.col += (this.speed )* C.SHEEP_MOVE_CONST;

    this.render();

  }


  render() {
    const game = getGame();
    const posX = C.GAME_X * (this.col - this.width / 2.00) + C.SIDE_MENU.WIDTH;

    if (!this.sprite) {
      const posY = C.TOP_MENU.HEIGHT + this.row * C.SPRITE_HEIGHT + this.row * C.MARGIN;
      this.sprite = game.add.sprite(posX, posY, `sheep_${this.index}`);
      this.sprite.width = this.width * C.GAME_X;
      this.sprite.height = C.SPRITE_HEIGHT;
    } else {
      this.sprite.position.x = posX;
    }

  }

  init() {
    const game = getGame();
    game.add.audio(`sheep_${this.index}`,C.AUDIO.VOLUME).play();

    this.render();
  }

  kill(){
    console.log('Killing sheep ', this);
    this.sprite.kill();

  }
};
