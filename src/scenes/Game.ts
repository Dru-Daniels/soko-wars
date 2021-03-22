import Phaser from 'phaser'

import * as Colors from '../consts/Color'

import { boxColorToTargetColor } from '../utils/ColorUtils'
// import { offsetForDirection } from '../../utils/TileUtils'
// import { baseTweenForDirection } from '../../utils/TweenUtils'

// import { Direction } from '../../consts/Direction'
// import { boxColorToTargeColor } from '../../utils/ColorUtils'
// import astromechdroid from "../../public/assets/astromechdroid.png"

export default class Game extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private player?: Phaser.GameObjects.Sprite
    private layer?: Phaser.Tilemaps.StaticTilemapLayer
    private targetsCoveredByColor: { [key: number]: number } = {}
    private boxesByColor: { [key: number]: Phaser.GameObjects.Sprite[] } = {}

    constructor() {
        super('hello-world')
    }

    preload() {
        // this.load.spritesheet('r2', astromechdroid, {
        //     frameWidth: 26,
        //     startFrame: 0
        // })

        this.load.spritesheet('tiles', 'assets/sokoban_tilesheet.png', {
            frameWidth: 64,
            startFrame: 0
        })

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const level = [
            [99,  99,  99,  99,  99,  99,  99,  99,  99,  99],
            [99,   0,   0,   0,   0,   0,   0,   0,   0,  99],
            [99,   6,   7,   8,   9,  10,   0,   0,   0,  99],
            [99,  25,  38,  51,  64,  77,  52,   0,   0,  99],
            [99,   0,   0,   0,   0,   0,   0,   0,   0,  99],
            [99,   0,   0,   0,   0,   0,   0,   0,   0,  99],
            [99,   0,   0,   0,   0,   0,   0,   0,   0,  99],
            [99,  99,  99,  99,  99,  99,  99,  99,  99,  99]

        ]
        const map = this.make.tilemap({
            data: level,
            tileWidth: 64,
            tileHeight: 64
        })

        const tiles = map.addTilesetImage('tiles')
        this.layer = map.createStaticLayer(0, tiles, 0, 0)

        // this.player = this.add.sprite(400, 300, 'r2', 5).setScale(1.5)
        this.createPlayerAnims()
        
        this.player = this.layer.createFromTiles(52, 0, { key: 'tiles', frame: 52 }).pop()
        this.player?.setOrigin(0)

        this.extractBoxes(this.layer)
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
            const nextX = this.player.x - 32
            const nextY = this.player.y + 32
            const hasWall = this.hasWallAt(nextX, nextY)
            
            if (hasWall) {
                return
            }

            const baseTween = {
                x: '-=64',
                duration: 500,
            }
            this.tweenMove(this.player.x - 32, this.player.y + 32, baseTween, () => {
                this.player?.anims.play('left', true)
            })
        } else if (justRight) {
            const nextX = this.player.x + 96
            const nextY = this.player.y + 32
            const hasWall = this.hasWallAt(nextX, nextY)
            
            if (hasWall) {
                return
            }

            const baseTween = {
                x: '+=64',
                duration: 500,
            }
            this.tweenMove(this.player.x + 96, this.player.y + 32, baseTween, () => {
                this.player?.anims.play('right', true)
            })
        } else if (justUp) {
            const nextX = this.player.x + 32
            const nextY = this.player.y - 32
            const hasWall = this.hasWallAt(nextX, nextY)

            if (hasWall) {
                return 
            }
            
            const baseTween = {
                y: '-=64',
                duration: 500,
            }
            this.tweenMove(this.player.x + 32, this.player.y - 32, baseTween, () => {
                this.player?.anims.play('up', true)
            })
        } else if (justDown) {
            
            

            const baseTween = {
                y: '+=64',
                duration: 500,
            }
            this.tweenMove(this.player.x + 32, this.player.y + 96, baseTween, () => {
                this.player?.anims.play('down', true)
            })
        }
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
        })
        console.dir(this.boxesByColor)
    }

    private tweenMove(x: number, y: number, baseTween: any, onStart: () => void) {
        if (this.tweens.isTweening(this.player!)) {
            return 
        }
        
        const hasWall = this.hasWallAt(x, y)
            
        if (hasWall) {
            return
        }

        const boxData = this.getBoxDataAt(x, y)
        if (boxData) {
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

                    console.dir(this.targetsCoveredByColor)
                },
            }
            ))
        }
        {
            this.tweens.add(Object.assign(
                baseTween,
                {
                    targets: this.player,
                    onComplete: this.stopPlayerAnimation,
                    onCompleteScope: this,
                    onStart
                })
            )
        }
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
            frames: [{ key: 'tiles', frame: 81 }],
        })

        this.anims.create({
            key: 'idle-right',
            frames: [{ key: 'tiles', frame: 78 }],
        })

        this.anims.create({
            key: 'idle-up',
            frames: [{ key: 'tiles', frame: 55 }],
        })

        this.anims.create({
            key: 'idle-down',
            frames: [{ key: 'tiles', frame: 52 }],
        })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('tiles', { start: 81, end: 83 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('tiles', { start: 78, end: 80 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('tiles', { start: 55, end: 57 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('tiles', { start: 52, end: 54 }),
            frameRate: 5,
            repeat: -1
        })
    }
}

// this.anims.create({
        //     key: 'idle-left',
        //     frames: [{ key: 'r2', frame: 4 }],
        // })

        // this.anims.create({
        //     key: 'idle-right',
        //     frames: [{ key: 'r2', frame: 8 }],
        // })

        // this.anims.create({
        //     key: 'idle-up',
        //     frames: [{ key: 'r2', frame: 0 }],
        // })

        // this.anims.create({
        //     key: 'idle-down',
        //     frames: [{ key: 'r2', frame: 12 }],
        // })

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNames('r2', { start: 4, end: 7 }),
        //     frameRate: 5,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNames('r2', { start: 8, end: 11 }),
        //     frameRate: 5,
        //     repeat: -1
        // })
        // this.anims.create({
        //     key: 'up',
        //     frames: this.anims.generateFrameNames('r2', { start: 0, end: 3 }),
        //     frameRate: 5,
        //     repeat: -1
        // })
        // this.anims.create({
        //     key: 'down',
        //     frames: this.anims.generateFrameNames('r2', { start: 12, end: 15 }),
        //     frameRate: 5,
        //     repeat: -1
        // })
