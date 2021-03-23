
import Phaser from 'phaser'

// import { primaryButton, defaultButton } from '../ui/Button'

export default class LevelFinishedScene extends Phaser.Scene {
  constructor() {
    super('level-finished')
  }

  create(data: { moves: number } = { moves: 0 }) {
    const width = this.scale.width
    const height = this.scale.height

    this.add.text(width * 0.5, height * 0.4, 'Level Complete!', {
      fontFamily: 'Montserrat',
      color: '#d4fa00',
      fontSize: 48
    })
      .setOrigin(0.5)

    this.add.text(width * 0.5, height * 0.5, `Moves: ${data.moves}`, {
      fontFamily: 'Montserrat'
    })
      .setOrigin(0.5)

  }
}