import level1 from './level1'
import level2 from './level2'
import level3 from './level3'

class LevelService {
  private levels = [
    level1,
    level2,
    level3
  ]

  getLevel(level: number) {
    return this.levels[level - 1]
  }
}

const sharedInstance = new LevelService()

export {
  sharedInstance
}