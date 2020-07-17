import C from './constants';
import {getGame} from './game'

export default class TopMenu{
  constructor(player){
    this._sprite = null;
    this._player = player;
    this.side = this._player.side;

    this._scoreSprite = null;
  }

  init(){
    this.render();

  }

  render(){
    const game = getGame();

    if (!this._sprite) {
      const style = {font: '30px Arial', fill: '#ff0044', align: 'center'};
      const styleScore = {font: '30px Arial', fill: '#00ff44', align: 'center'};

      const y = 20;
      const x = this.side == 'left' ? 0: C.SIDE_MENU.WIDTH+ C.GAME_X - 100;

      this._sprite = game.add.text(x + 20, y, 'Mana: '+this._player.mana, style);

      this._scoreSprite = game.add.text(C.SIDE_MENU.WIDTH + C.GAME_X/2 + (this.side == 'left'?-100:100), y,
        this._player.score, styleScore);

    }

  }


  update(){
    if(this._sprite){
      this._sprite.text = 'Mana: '+parseInt(this._player.mana);

      this._scoreSprite.text = parseInt(this._player.score);
    }
  }
}



