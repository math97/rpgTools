import { barbarianClass, CharacterClass } from '@/models/CharacterClass';
import { buildEmbedClass } from '@/utils/buildClassEmbed';

import { role } from '@/data/roles';
import {
    CommandInteraction,
    EmbedBuilder,
    InteractionResponse,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder
} from 'discord.js';
import { commandClass } from '../command.class';
import { Command } from '@/models/Command'
import { Race } from '@/data/races/races.interface';
import options from '@/data/races/index'
export class raceCommand extends commandClass<string> {
    private data: Race;
    private name: string = "Race";
    constructor(info: string) {
        super(info);
        this.data = {} as Race;
    }

    public buildEmbed(): EmbedBuilder[] {
        const raceEmbed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(this.name)
            .setDescription(`Characteristics of race ${this.data.name}`)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'abilityScore', value: this.data.abilityScore, inline: true },
                { name: 'traits', value: this.data.traits.join('\n'), inline: true },
                { name: 'languages', value: this.data.languages.join(', '), inline: true },
                {
                    name: 'proficiencies',
                    value: this.data.proficiencies.toString(),
                    inline: true,
                },
            )

        return [raceEmbed]
    }


    public buildCommand(): Command {
        return {
            name: this.name.toLowerCase(),
            data: this.command(),
            execute: async (
                interaction: CommandInteraction,
            ): Promise<InteractionResponse | void> => {
                
                console.log(1222111, interaction);

                const raceOption = interaction.options.get('filter')?.value

                this.data = options.races.find((race) => race.name.toLowerCase() === raceOption) ?? {} as Race;

                if (!this.data) return interaction.reply(`Race not found`)

                return interaction.reply({ embeds: this.buildEmbed() })
            }
        };
    }

    private command(): SlashCommandOptionsOnlyBuilder {
        return new SlashCommandBuilder()
            .setName('race')
            .setDescription('Replies with races from D&D 5e!')
            .addStringOption((option) =>
                option
                    .setName('filter')
                    .setDescription('Filter races by name')
                    .setRequired(true)
                    .addChoices(options.racesOption),
            );
    }
}
