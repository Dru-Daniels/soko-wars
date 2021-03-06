import Phaser from 'phaser'

import smallRetryButton from '../../public/assets/retrySmall.png'
import soundOn from '../../public/assets/sound-on.png'
import soundOff from '../../public/assets/sound-off.png'

import { boxColorToTargetColor, targetColorToBoxColor } from '../utils/ColorUtils'
import { offsetForDirection } from '../utils/TileUtil'
import { baseTweenForDirection } from "../utils/TweenUtils"

import * as Colors from '../consts/Color'
import { Direction } from '../consts/Direction'

import { sharedInstance as levels } from '../levels/levelService'

export default class Game extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private player?: Phaser.GameObjects.Sprite
    private layer?: Phaser.Tilemaps.StaticTilemapLayer
    private movesCountLabel?: Phaser.GameObjects.Text
    private targetsCoveredByColor: { [key: number]: number } = {}
    private boxesByColor: { [key: number]: Phaser.GameObjects.Sprite[] } = {}

    private movesCount = 0
    private currentLevel = 1

    constructor() {
        super('game')
    }

    init() {
        this.movesCount = 0
    }

    preload() {
        this.load.spritesheet('tiles', 'assets/sokoban_tilesheet.png', {
            frameWidth: 64,
            startFrame: 0
        })

        this.cursors = this.input.keyboard.createCursorKeys()

        this.load.image('small-retry-button', smallRetryButton)
        this.load.image('sound-on', soundOn)
        this.load.image('sound-off', soundOff)
    }

    create(d: { level: number }) {
        const data = Object.assign({ level: 1 }, d)
        const level = levels.getLevel(data.level)

        this.currentLevel = data.level

        const map = this.make.tilemap({
            data: level,
            tileWidth: 64,
            tileHeight: 64
        })

        const tiles = map.addTilesetImage('tiles')
        this.layer = map.createStaticLayer(0, tiles, 0, 0)

        this.createPlayerAnims()

        this.player = this.layer.createFromTiles(52, 0, { key: 'tiles', frame: 52 }).pop()
        this.player?.setOrigin(0)

        this.extractBoxes(this.layer)

        this.movesCountLabel = this.add.text(520, 30, `Moves: ${this.movesCount}`, {
            fontFamily: 'Abel',
            fontSize: 25
        })

        this.levelCountLabel = this.add.text(520, -2, `Level: ${this.currentLevel}`, {
            fontFamily: 'Abel',
            fontSize: 25
        })

        this.add.image(540, 485, 'small-retry-button')
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.sound.play('click')
                this.scene.start('game', { level: this.currentLevel })
            })

        let mute = true
        let soundIcon = 'sound-on'
        this.add.image(10, 10, soundIcon)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.game.sound.mute = mute
                if (mute === true) {
                    mute = false
                } else {
                    mute = true
                }
            })
    }

    update() {
        if (!this.cursors || !this.player) {
            return
        }

        const justLeft = Phaser.Input.Keyboard.JustDown(this.cursors.left!)
        const justRight = Phaser.Input.Keyboard.JustDown(this.cursors.right!)
        const justUp = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
        const justDown = Phaser.Input.Keyboard.JustDown(this.cursors.down!)

        if (justLeft) {
            this.tweenMove(Direction.Left, () => {
                this.player?.anims.play('left', true)
            })

        } else if (justRight) {
            this.tweenMove(Direction.Right, () => {
                this.player?.anims.play('right', true)
            })

        } else if (justUp) {
            this.tweenMove(Direction.Up, () => {
                this.player?.anims.play('up', true)
            })

        } else if (justDown) {
            this.tweenMove(Direction.Down, () => {
                this.player?.anims.play('down', true)
            })
        }
    }

    private allTargetsCovered() {
        const targetColors = Object.keys(this.targetsCoveredByColor)
        for (let i = 0; i < targetColors.length; i++) {
            const targetColor = parseInt(targetColors[i])
            const boxColor = targetColorToBoxColor(targetColor)
            if (!(boxColor in this.boxesByColor)) {
                continue
            }
            const numBoxes = this.boxesByColor[boxColor].length
            const numCovered = this.targetsCoveredByColor[targetColor]
            if (numCovered < numBoxes) {
                return false
            }
        }
        return true
    }

    private extractBoxes(layer: Phaser.Tilemaps.StaticTilemapLayer) {
        const boxColors = [
            Colors.boxOrange,
            Colors.boxRed,
            Colors.boxBlue,
            Colors.boxGreen,
            Colors.boxGrey
        ]

        boxColors.forEach((color) => {
            this.boxesByColor[color] = layer.createFromTiles(color, 0, { key: 'tiles', frame: color }).map(box => box.setOrigin(0))

            const targetColor = boxColorToTargetColor(color)
            this.targetsCoveredByColor[targetColor] = 0
        })
        console.dir(this.boxesByColor)
    }

    private tweenMove(direction: Direction, onStart: () => void) {
        if (!this.player || this.tweens.isTweening(this.player!)) {
            return
        }

        const x = this.player.x
        const y = this.player.y

        const offset = offsetForDirection(direction)
        const ox = x + offset.x
        const oy = y + offset.y

        const hasWall = this.hasWallAt(ox, oy)

        if (hasWall) {
            this.sound.play('error')
            return
        }

        const baseTween = baseTweenForDirection(direction)


        const boxData = this.getBoxDataAt(ox, oy)
        if (boxData) {
            const nextOffset = offsetForDirection(direction, 2)
            const nx = x + nextOffset.x
            const ny = y + nextOffset.y
            const nextBoxData = this.getBoxDataAt(nx, ny)
            if (nextBoxData) {
                return
            }
            if (this.hasWallAt(nx, ny)) {
                this.sound.play('error')
                return
            }

            const box = boxData.box
            const boxColor = boxData.color
            const targetColor = boxColorToTargetColor(boxColor)

            const coveredTarget = this.hasTargetAt(box.x, box.y, targetColor)
            if (coveredTarget) {
                this.changeTargetCovetedCountForColor(targetColor, -1)
            }

            this.tweens.add(Object.assign(baseTween, {
                targets: box,
                onComplete: () => {
                    const coveredTarget = this.hasTargetAt(box.x, box.y, targetColor)
                    if (coveredTarget) {
                        this.changeTargetCovetedCountForColor(targetColor, 1)
                    }
                },
            }
            ))
        }
        this.sound.play('move')
        {
            this.tweens.add(Object.assign(
                baseTween,
                {
                    targets: this.player,
                    onComplete: this.handlePlayerStopped,
                    onCompleteScope: this,
                    onStart
                })
            )
        }
    }

    private handlePlayerStopped() {
        this.movesCount++
        this.stopPlayerAnimation()

        this.updateMovesCount()
        const levelFinishedScene = this.allTargetsCovered()
        if (levelFinishedScene) {
            this.scene.start('level-finished', {
                moves: this.movesCount,
                currentLevel: this.currentLevel
            })
        }
    }

    private updateMovesCount() {
        if (!this.movesCountLabel) {
            return
        }
        this.movesCountLabel.text = `Moves: ${this.movesCount}`
    }

    private stopPlayerAnimation() {
        if (!this.player) {
            return
        }

        const key = this.player?.anims.currentAnim?.key
        if (!key.startsWith('idle-')) {
            this.player.anims.play(`idle-${key}`, true)
        }
    }

    private changeTargetCovetedCountForColor(color: number, change: number) {
        if (!(color in this.targetsCoveredByColor)) {
            this.targetsCoveredByColor[color] = 0
        }

        this.targetsCoveredByColor[color] = change

        this.targetsCoveredByColor[color] += change
        if (change > 0) {
            this.sound.play('confirmation')
        }
    }

    private getBoxDataAt(x: number, y: number) {
        const keys = Object.keys(this.boxesByColor)
        for (let i = 0; i < keys.length; i++) {
            const color = keys[i]
            const box = this.boxesByColor[color].find((box) => {
                const rect = box.getBounds()
                return rect.contains(x, y)
            })

            if (!box) {
                continue
            }

            return {
                box,
                color: parseInt(color)
            }
        }

        return undefined
    }

    private hasWallAt(x: number, y: number) {
        if (!this.layer) {
            return false
        }

        const tile = this.layer.getTileAtWorldXY(x, y)
        if (!tile) {
            return false
        }

        return tile.index === 99
    }

    private hasTargetAt(x: number, y: number, tileIndex: number) {
        if (!this.layer) {
            return false
        }

        const tile = this.layer.getTileAtWorldXY(x, y)
        if (!tile) {
            return false
        }

        return tile.index === tileIndex
    }

    private createPlayerAnims() {
        this.anims.create({
            key: 'idle-left',
            frames: [{ key: 'tiles', frame: 66 }],
        })

        this.anims.create({
            key: 'idle-right',
            frames: [{ key: 'tiles', frame: 78 }],
        })

        this.anims.create({
            key: 'idle-up',
            frames: [{ key: 'tiles', frame: 53 }],
        })

        this.anims.create({
            key: 'idle-down',
            frames: [{ key: 'tiles', frame: 52 }],
        })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('tiles', { start: 65, end: 68 }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('tiles', { start: 78, end: 81 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('tiles', { start: 91, end: 94 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('tiles', { start: 52, end: 55 }),
            frameRate: 10,
            repeat: -1
        })
    }
}
