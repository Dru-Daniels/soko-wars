import Phaser from 'phaser'

import WebFontFile from '../files/WebFontFiles'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    const fonts = new WebFontFile(this.load, [
      'Abel',
      'Staatliches'
    ])
    this.load.addFile(fonts)
  }

  create() {
    this.scene.start('game', { level: 1 })
  }
}