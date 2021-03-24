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

    const data = Object.assign({ moves: 0, currentLevel: 1 }, d)

  // create(data: { moves: number } = { moves: 0 }) {
    const width = this.scale.width
    const height = this.scale.height

    this.add.text(width * 0.5, height * 0.4, 'Level Complete!', {
      fontFamily: 'Staatliches',
      color: '#d4fa00',
      fontSize: 48
    })
      .setOrigin(0.5)

    this.add.text(width * 0.5, height * 0.5, `Moves: ${data.moves}`, {
      fontFamily: 'Staatliches',
      fontSize: 30
    })
      .setOrigin(0.5)

    this.add.image(470, 400, 'next-level-button')
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      console.log("pressed Wooo")
  })

  this.add.image(170, 400, 'retry-button')
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.scene.start('game', { level: 1 })
    })
  }
}