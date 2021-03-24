import Phaser from 'phaser'
// import { primaryButton } from '../ui/Button'

import { primaryButton, defaultButton } from '../ui/Button'

export default class LevelFinishedScene extends Phaser.Scene {
  constructor() {
    super('level-finished')
  }

  create(data: { moves: number } = { moves: 0 }) {
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
  }
}