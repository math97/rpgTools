import { roleCommand } from "./commands/role";

const commands = [
    new roleCommand("barbarian").buildCommand(),
];

export default commands;
