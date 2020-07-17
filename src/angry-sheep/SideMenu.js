import Phaser from 'phaser';
import C from './constants'
import {getGame} from './game';
import _ from 'lodash';
import Sheep from './Sheep'

export default class SideMenu {
  constructor(player) {
    this._player = player;
    this.side = player.side;

    this._rowSprites = [];

  }

  init() {
    this.render();

  }

  render() {
    const game = getGame();

    if (!this._rowSprites.length) {
      const height_incr = C.MARGIN + C.SPRITE_HEIGHT;
      const itemMarginX =  (C.SIDE_MENU.WIDTH - C.SIDE_MENU.ITEM_WIDTH)/2.0;

      const x = this.side == 'left'?itemMarginX:C.GAME_X+C.SIDE_MENU.WIDTH + itemMarginX;

      _.range(C.ROWS).forEach(rowIndex => {
        const sprite = game.add.sprite(x, C.TOP_MENU.HEIGHT + height_incr * rowIndex , 'arrow-right');
        sprite.width = C.SIDE_MENU.ITEM_WIDTH;
        sprite.height = height_incr-C.MARGIN;

        if(this.side != 'left'){
          // sprite.anchor.setTo(1,1);
          sprite.angle = 180;
        }

        sprite.inputEnabled = true;
        sprite.addListener(Phaser.Input.Events.START, () => {
          this._player.validateAndAddSheep(new Sheep(this._player.selectedSheepIndex, rowIndex));
        }, this);

        this._rowSprites.push(sprite);

      });

    }

  }

}
