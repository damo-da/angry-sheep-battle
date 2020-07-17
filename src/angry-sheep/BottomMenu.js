import C from './constants';
import {getGame} from './game'

export default class BottomMenu {
  constructor(player) {
    this._player = player;
    this.side = this._player.side;

    this._sprites = [];
    this._selectedSheepSprite = null;
  }

  init() {
    this.render();

  }

  render() {
    const game = getGame();

    if (!this._sprites.length) {
      const iconMarginY = (C.BOTTOM_MENU.HEIGHT - C.BOTTOM_MENU.ITEM_SIZE)/2.0;

      const y = C.GAME_Y + C.TOP_MENU.HEIGHT + iconMarginY;
      const x = this.side === 'left' ? 40 : C.SIDE_MENU.WIDTH + C.GAME_X - C.BOTTOM_MENU.WIDTH;

      Object.keys(C.SHEEPS).forEach(index => {

        const sprite = game.add.sprite(x + index * C.BOTTOM_MENU.ITEM_SIZE, y, `sheep_${index}`);

        sprite.width = C.BOTTOM_MENU.ITEM_SIZE;
        sprite.height = C.BOTTOM_MENU.ITEM_SIZE;
        this._sprites.push(sprite);


        sprite.inputEnabled = true;
        sprite.addListener(Phaser.Input.Events.START, () => {
          this._player.selectedSheepIndex = index;
        }, this);
      });

      const activeIndex = this._player.selectedSheepIndex;

      this._selectedSheepSprite = game.add.sprite(x + activeIndex * C.BOTTOM_MENU.ITEM_SIZE, y, 'selected-sheep')
      this._selectedSheepSprite.width = C.BOTTOM_MENU.ITEM_SIZE;
      this._selectedSheepSprite.height = C.BOTTOM_MENU.ITEM_SIZE;

    }
  }


  update() {
    if (this._sprites) {
      const iconMarginY = (C.BOTTOM_MENU.HEIGHT - C.BOTTOM_MENU.ITEM_SIZE)/2.0;

      const activeIndex = this._player.selectedSheepIndex;
      const x = this.side == 'left' ? 40 : C.SIDE_MENU.WIDTH + C.GAME_X - C.BOTTOM_MENU.WIDTH;
      const y = C.GAME_Y + C.TOP_MENU.HEIGHT + iconMarginY;

      this._selectedSheepSprite.x = x + activeIndex * C.BOTTOM_MENU.ITEM_SIZE;
      this._selectedSheepSprite.y = y;
    }
  }
}



