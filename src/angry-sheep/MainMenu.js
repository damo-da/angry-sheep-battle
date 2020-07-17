import {getGame} from './game'
import C from './constants'

const text = {
  title: 'Angry Sheep Fight',
  instructions: `Try to advance your sheeps more than your opponent.
Select your sheep on the bottom. 
And click on the arrow on your side to deploy the sheep.
But the better the sheep gets, the more Mana it costs. 
Fight with sheep from other lane.
Good luck!`
};
export default class MainMenu {
  constructor(){
    this._spriteGroup = null;
    this._isShowing = false;
    this._eventCb = null;

  }

  isShowing() {
    return this._isShowing;
  }

  show(eventsCb){
    this.init();

    this._isShowing = true;
    this._eventCb = eventsCb;
  }

  hide(){
    this._isShowing = false;
    this._spriteGroup.removeAll();

  }

  init(){
    this.render();
  }

  render(){
    const game = getGame();

    console.log(game);

    if(!this._spriteGroup){
      const margin = 0.01;
      const width = (C.GAME_X + C.SIDE_MENU.WIDTH * 2);
      const height = (C.GAME_Y + C.TOP_MENU.HEIGHT + C.BOTTOM_MENU.HEIGHT);

      this._spriteGroup = game.add.group();

      // the background rectangle
      const rectangle = game.add.graphics(width * margin, height * margin);
      // rectangle.beginFill(C.MAIN_MENU.BG_COLOR, 0.85);
      // rectangle.lineStyle(2, C.MAIN_MENU.BORDER_COLOR, 1);
      // rectangle.drawRect(0, 0, width * (1- 2 * margin), height * (1- 2 * margin));
      // rectangle.endFill();
      this._spriteGroup.add(rectangle);

      const titleSprite = game.add.text(game.scale.width/2, game.scale.height/2-0.2*height, text.title, style.title);
      // titleSprite.anchor.set(0.5);
      this._spriteGroup.add(titleSprite);

      const instructionSprite = game.add.text(game.scale.width/2, game.scale.height/2, text.instructions, style.instructions);
      // instructionSprite.anchor.set(0.5);
      this._spriteGroup.add(instructionSprite);


      const startBtnSprite = this.sprite = game.add.sprite(game.scale.width/2, game.scale.height/2 + 0.3 * height, `game_start_btn`);
      // startBtnSprite.anchor.set(0.5);
      startBtnSprite.inputEnabled = true;
      startBtnSprite.addListener(Phaser.Input.Events.START, () => {
        this._eventCb && this._eventCb({
          'type': 'START'
        })
      });

      this._spriteGroup.add(startBtnSprite);


    }

  }


}


const style = {
  title: { font: '65px Arial', fill: '#ffccff', align: 'center' },
  instructions: { font: '30px Arial', fill: '#44bbbb', align: 'center' },
};