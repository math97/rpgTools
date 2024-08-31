import { Command } from '@/models/Command';
import {
    EmbedBuilder,
    SlashCommandBuilder,
    CommandInteraction,
    InteractionResponse
} from 'discord.js';

export abstract class commandClass<T> {
    protected info: T | undefined;

    constructor(info?: T) {
        this.info = info;
    }

    public abstract buildEmbed(): EmbedBuilder[];

    public abstract buildCommand(): Command;

    public execute(interaction: CommandInteraction): Promise<InteractionResponse | void> {
        const embeds = this.buildEmbed();
        return interaction.reply({ embeds });
    }
}
