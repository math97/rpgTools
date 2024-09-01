import { barbarian } from './barbarian'
import { bard } from './bard'
import { clerig } from './clerig'
import { monk } from './monk'

export class role {
  public static getRoles() {
    return ['barbarian', 'bard', 'clerig', 'monk']
  }

  public static rolesOption = [
    { name: 'Barbarian', value: 'barbarian' },
    { name: 'Bard', value: 'bard' },
    { name: 'Clerig', value: 'clerig' },
    { name: 'Monk', value: 'monk' },
  ]

  public static getRole(role: string) {
    switch (role) {
      case 'Barbarian':
      case 'barbarian':
        return barbarian
      case 'Bard':
      case 'bard':
        return bard
      case 'Clerig':
      case 'clerig':
        return clerig
      case 'Monk':
      case 'monk':
        return monk
      default:
        return null
    }
  }
}
