import { RaceCommand } from './commands/race/race'
import { RacesCommand } from './commands/race/races'
import { RoleCommand } from './commands/role/role'
import { RolesCommand } from './commands/role/roles'
import { AddRaceCommand } from './commands/race/addRace'
import { SaveCustomRace } from './commands/race/saveCustomRace'
import { CreateEventCommand } from './commands/event/createEvent'
import { AddVoteCommand } from './commands/event/addVote'
import { RemoveVoteCommand } from './commands/event/removeVote'
import { ShowVotesCommand } from './commands/event/showVotes'

const enum ICommands {
  Role = 'Role',
  Roles = 'Roles',
  Race = 'Race',
  Races = 'Races',
  AddRaces = 'AddRaces',
  SaveCustomRace = 'SaveCustomRace',
  CreateEvent = 'CreateEvent',
  AddVote = 'AddVote',
  RemoveVote = 'RemoveVote',
  ShowVotes = 'ShowVotes',
}

export class Commands {
  public static list = [
    new RoleCommand(ICommands.Role).buildCommand(),
    new RolesCommand(ICommands.Role).buildCommand(),
    new RaceCommand(ICommands.Race).buildCommand(),
    new RacesCommand(ICommands.Races).buildCommand(),
    new AddRaceCommand(ICommands.AddRaces).buildCommand(),
    new SaveCustomRace(ICommands.SaveCustomRace).buildCommand(),
    new CreateEventCommand(ICommands.CreateEvent).buildCommand(),
    new AddVoteCommand(ICommands.AddVote).buildCommand(),
    new RemoveVoteCommand(ICommands.RemoveVote).buildCommand(),
    new ShowVotesCommand(ICommands.ShowVotes).buildCommand(),
  ]
}
