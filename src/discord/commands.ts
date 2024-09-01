import { RaceCommand } from './commands/race/race'
import { RacesCommand } from './commands/race/races'
import { RoleCommand } from './commands/role/role'
import { RolesCommand } from './commands/role/roles'

const enum ICommands {
  Role = 'Role',
  Roles = 'Roles',
  Race = 'Race',
  Races = 'Races',
}

export class Commands {
  public static list = [
    new RoleCommand(ICommands.Role).buildCommand(),
    new RolesCommand(ICommands.Role).buildCommand(),
    new RaceCommand(ICommands.Race).buildCommand(),
    new RacesCommand(ICommands.Races).buildCommand(),
  ]
}
