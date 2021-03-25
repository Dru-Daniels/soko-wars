import Phaser from 'phaser'

import WebFontFile from '../files/WebFontFile'

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

    this.load.audio('game-music', '../assets/music/StarWarsTheme.mp3')
    this.load.audio('confirmation', '../assets/sfx/confirmation_001.wav')
    this.load.audio('move', '../assets/sfx/maximize_008.wav')
    this.load.audio('error', '../assets/sfx/error_006.wav')
    this.load.audio('click', '../assets/sfx/click_002.wav')
    this.load.audio('boop', '../assets/sfx/r2d2boop.m4a')
  }

  create() {
    this.sound.play('game-music', {
      loop: true,
      volume: 0.03
    })

    this.scene.start('game', { level: 1 })
  }
}