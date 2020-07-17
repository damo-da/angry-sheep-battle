import C from './constants';
import {getGame} from './game';
import moment from 'moment';

export default class Player {
  constructor(side, game) {
    this.side = side;
    this.name += this.side;
    this.sheep = [];
    this.mana = C.DEFAULT_MANA;
    this.manaGrowthRate = 0.05; // per frame
    this.score = 0;
    this.powers = [];
    this._game = game;

    this.selectedSheepIndex = 0;

    this.sheepLastAddedAt = moment().subtract(C.SHEEP_ADD_INTERVAL, 'milliseconds');

  }

  moveAllSheep() {
    this.sheep.forEach((s) => {
      s.move();
    });

  }

  init() {
    this.sheep.forEach(s => s.init());

    this.render();

  }

  render() {

  }

  addSheep(s) {
    this.sheep.push(s);

    if (this.side == 'right') {
      s.col = 1 - s.col;
      s.speed = -s.speed;
      s.col += s.width;
    } else {
      s.col -= s.width;
    }

    s.init();

    return s;
  }

  validateAndAddSheep(s) {
    const now = moment();
    if (now.diff(this.sheepLastAddedAt) < C.SHEEP_ADD_INTERVAL){
      return;
    }

    this.sheepLastAddedAt = moment();

    const manas = C.SHEEPS[s.index].MANA;
    if (this.mana > manas) {
      this.mana -= manas;
      this.addSheep(s);
    }
  }

  update() {
  const game = getGame();

    this.sheep = this.sheep.filter((s) => {
      if (s.col <= 0 && this.side == 'right') { //right sheep finished coming to left side
        this.score += 1;

        game.add.audio('sheep_completed_journey', C.AUDIO.VOLUME).play();
        s.kill();

        return false;
      } else if (s.col >= 1 + s.width && this.side == 'left') { //left sheep finished going to right side
        this.score += 1;

        game.add.audio('sheep_completed_journey', C.AUDIO.VOLUME).play();
        s.kill();

        return false;
      } else if (s.col < -s.width && this.side == 'left' && s.speed < 0) { // left sheep was pushed back by right side sheep
        s.kill();

        return false;
      } else if (s.col > 1 + s.width && this.side == 'right' && s.speed > 0) {// right sheep was pushed back by left side sheep
        s.kill();

        return false;
      }

      return true;

    });
    this.sheep.forEach(s => s.move());

    this.mana += this.manaGrowthRate;

  }

}
