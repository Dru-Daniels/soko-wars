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

export {
  boxColorToTargetColor
}