import Phaser from 'phaser'

import { sharedInstance as levels } from '../levels/levelService'
import retryButton from '../../public/assets/retry.png'
import nextLevelButton from '../../public/assets/next-level.png'

export default class LevelFinishedScene extends Phaser.Scene {
  constructor() {
    super('level-finished')
  }

  preload() {
    this.load.image('next-level-button', nextLevelButton)
    this.load.image('retry-button', retryButton)
  }

  create(d: { moves: number, currentLevel: number }) {
    this.sound.play('boop', {
      volume: 0.05
    })

    const data = Object.assign({ moves: 0, currentLevel: 1 }, d)

    const width = this.scale.width
    const height = this.scale.height

    let levelFinishedText = 'Level Complete!'
    if (data.currentLevel + 1 > levels.levelsCount) {
      levelFinishedText = `Level 10 Completed.
You Win!`
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

    let retryX = 150
    if (data.currentLevel + 1 > levels.levelsCount) {
      retryX = 320
    }
    this.add.image(retryX, 400, 'retry-button')
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.sound.play('click')
        this.scene.start('game', { level: data.currentLevel })
      })

    if (data.currentLevel + 1 > levels.levelsCount) {
      return
    }
    this.add.image(490, 400, 'next-level-button')
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.sound.play('click')
        this.scene.start('game', { level: data.currentLevel + 1 })
      })
  }
}