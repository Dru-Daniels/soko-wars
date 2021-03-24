import Phaser from 'phaser'
// import { primaryButton } from '../ui/Button'
// import { primaryButton, defaultButton } from '../ui/Button'

import { sharedInstance as levels } from '../levels/levelService'

export default class LevelFinishedScene extends Phaser.Scene {
  constructor() {
    super('level-finished')
  }

  create(d: { moves: number, currentLevel: number }) {

    const data = Object.assign({ moves: 0, currentLevel: 1 }, d)
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

    //retry button functionality here 
    // this.addListener('click').once('click', () => {
    //   this.scene.start('game', { level: data.currentLevel })
    // })

    //level count logic - we want this here so the next level button doesn't render on the last level
    // if (data.currentLevel + 1 > levels.levelsCount) {
    //   return
    // }

    //next level button functionality here
    // this.addListener('click').once('click', () => {
    //   this.scene.start('game', { level: data.currentLevel + 1 })
    // })

    
    
  }
}