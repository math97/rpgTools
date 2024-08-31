import { RaceCommand } from './commands/race'
import { RoleCommand } from './commands/role'

const enum ICommands {
  Role = 'Role',
  Race = 'Race',
}

export class Commands {
  public static list = [
    new RoleCommand(ICommands.Role).buildCommand(),
    new RaceCommand(ICommands.Race).buildCommand(),
  ]
}
