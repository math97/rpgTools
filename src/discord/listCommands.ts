import { RaceCommand } from './commands/race'
import { RoleCommand } from './commands/role'

const commands = [
  new RoleCommand('Barbarian').buildCommand(),
  new RaceCommand('Race').buildCommand(),
]

export default commands
