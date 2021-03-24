import Phaser from 'phaser'

import React from "react";
import ReactDOM from "react-dom"
import App from "./components/App"

import Preloader from "./scenes/Preloader"
import Game from './scenes/Game'
import LevelFinishedScene from './scenes/LevelFinishedScene'

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-parent',
	parent: 'phaser',
	width: 640,
	height: 512,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [Preloader, Game, LevelFinishedScene]
}

const game = new Phaser.Game(config);

ReactDOM.render(
  <App/>,
  document.getElementById("root") || document.createElement("div")
);
