import Phaser from 'phaser'

import { sharedInstance as levels } from '../levels/levelService'
import { getFinalVid, getFinalVidHide } from "../utils/GameOverUtil"


import retryButton from '../../public/assets/retry.png'
import nextLevelButton from '../../public/assets/next-level.png'
import playAgainButton from '../../public/assets/play-again.png'


export default class LevelFinishedScene extends Phaser.Scene {
  constructor() {
    super('level-finished')
  }

  preload() {
    this.load.image('next-level-button', nextLevelButton)
    this.load.image('retry-button', retryButton)
    this.load.image('play-again-button', playAgainButton)
  }

  create(d: { moves: number, currentLevel: number }) {
    this.sound.play('boop', {
      volume: 0.05
    })

    const data = Object.assign({ moves: 0, currentLevel: 1 }, d)

    let levelFinishedText = `Level ${data.currentLevel} Complete!`
    if (data.currentLevel + 1 > levels.levelsCount) {
      getFinalVid()
      levelFinishedText = `Death Star Destroyed!  
You Win!`
      this.add.image(320, 400, 'play-again-button')
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
          this.sound.play('click')
          this.scene.start('game', { level: 1 })
          getFinalVidHide()
        })
    }
    this.add.text(320, 150, levelFinishedText, {
      fontFamily: 'Staatliches',
      color: '#d4fa00',
      fontSize: 48,
      align: 'center'
    })
      .setOrigin(0.5)

    this.add.text(320, 250, `Moves: ${data.moves}`, {
      fontFamily: 'Staatliches',
      fontSize: 30
    })
      .setOrigin(0.5)

    if (data.currentLevel + 1 > levels.levelsCount) {
      return
    }
    this.add.image(150, 400, 'retry-button')
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.sound.play('click')
        this.scene.start('game', { level: data.currentLevel })
      })
    this.add.image(490, 400, 'next-level-button')
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.sound.play('click')
        this.scene.start('game', { level: data.currentLevel + 1 })
      })
  }
}
