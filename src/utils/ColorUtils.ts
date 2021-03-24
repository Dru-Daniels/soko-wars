import * as Color from '../consts/Color'

const boxColorToTargetColor = (boxColor: number) => {
  switch (boxColor) {
    default:
    case Color.boxOrange:
      return Color.targetOrange

    case Color.boxRed:
      return Color.targetRed

    case Color.boxBlue:
      return Color.targetBlue

    case Color.boxGreen:
      return Color.targetGreen

    case Color.boxGrey:
      return Color.targetGrey
  }
}

const targetColorToBoxColor = (targetColor: number) => {
  switch (targetColor) {
    default:
    case Color.targetOrange:
      return Color.boxOrange

    case Color.targetRed:
      return Color.boxRed

    case Color.targetBlue:
      return Color.boxBlue

    case Color.targetGreen:
      return Color.boxGreen

    case Color.targetGrey:
      return Color.boxGrey
  }
}

export {
  boxColorToTargetColor,
  targetColorToBoxColor
}