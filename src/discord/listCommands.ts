import { roleCommand } from "./commands/role";
import { raceCommand } from "./commands/race";

const commands = [
    new roleCommand("barbarian").buildCommand(),
    new raceCommand("race").buildCommand(),
];

export default commands;
