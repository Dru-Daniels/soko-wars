import level1 from './level1'
import level2 from './level2'
import level3 from './level3'
import level4 from './level4'
import level5 from './level5'

class LevelService {
  private levels = [
    level1,
    level2,
    level3,
    level4,
    level5
  ]

  getLevel(level: number) {
    return this.levels[level - 1]
  }

  get levelsCount() {
    return this.levels.length
  }
}

const sharedInstance = new LevelService()

export {
  sharedInstance
}