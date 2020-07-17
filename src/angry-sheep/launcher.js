/**
 * Launcher
 */
import C, {updateWindowInfo} from './constants';
import { createGame } from './game';
import * as elementActions from './elements';
import MainMenu from './MainMenu';

/**
 * Initiate game loop and actions.
 */
export default () => {
    const mainMenu = new MainMenu();


    const preload = () => {
        elementActions.preload();
    };

    const create = () => {
        elementActions.create();

        mainMenu.show((type, data) => {
            // switch (type){}
            console.log('showing main menu');

            mainMenu.hide();
        });
    };

    const update = () => {
        if (mainMenu.isShowing()){
            // pass
        }else{
            // move objects
            elementActions.update();
        }

    };

    updateWindowInfo();
    createGame(preload, create, update);
};
