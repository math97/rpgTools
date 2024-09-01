import { RaceCommand } from './commands/race'
import { RacesCommand } from './commands/races'
import { RoleCommand } from './commands/role'

const enum ICommands {
  Role = 'Role',
  Race = 'Race',
  Races = 'Races',
}

export class Commands {
  public static list = [
    new RoleCommand(ICommands.Role).buildCommand(),
    new RaceCommand(ICommands.Race).buildCommand(),
    new RacesCommand(ICommands.Races).buildCommand(),
  ]
}
