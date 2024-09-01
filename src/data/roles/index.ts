import { barbarian } from './barbarian'
import { bard } from './bard'
import { clerig } from './clerig'
import { druid } from './druid'
import { monk } from './monk'

export class role {
  public static getRoles() {
    return ['barbarian', 'bard', 'clerig', 'monk', 'druid']
  }

  public static rolesOption = [
    { name: 'Barbarian', value: 'barbarian' },
    { name: 'Bard', value: 'bard' },
    { name: 'Clerig', value: 'clerig' },
    { name: 'Druid', value: 'druid' },
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
      case 'Druid':
      case 'druid':
        return druid
      default:
        return null
    }
  }
}
