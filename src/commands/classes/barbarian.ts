import { barbarianClass } from '@/models/CharacterClass'
import { Command } from '@/models/Command'
import { buildEmbedClass } from '@/utils/buildClassEmbed'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js'

const barbarian: barbarianClass = {
  className: 'Barbarian',
  image:
    'https://cdn.discordapp.com/attachments/1279212787372916817/1279257999784939550/e3a2a854-1848-437c-b640-3296eea15be8.png?ex=66d3c95a&is=66d277da&hm=b07c202abb95bd62c0b545a856e5abd40db7dfe9fe8c9eaecf9642a19d7ff537&',
  baseStats: {
    lifeDice: '1d12',
    proficiencies: [
      'Light Armor',
      'Medium Armor',
      'Shields',
      'Simple Weapons',
      'Martial Weapons',
    ],
    modify: 'Strength',
    expertise: [
      'Animal Handling',
      'Athletics',
      'Intimidation',
      'Nature',
      'Perception',
      'Survival',
    ],
    expertiseChoices: 2,
    savingThrows: ['Strength', 'Constitution'],
    armor: 'Medium Armor',
  },
  levels: [
    {
      level: 1,
      features: ['Rage', 'Unarmored Defense'],
      fury: 2,
      furyDamage: 2,
    },
    {
      level: 2,
      features: ['Reckless Attack', 'Danger Sense'],
      fury: 2,
      furyDamage: 2,
    },
    {
      level: 3,
      features: ['Primal Path'],
      fury: 3,
      furyDamage: 2,
    },
    {
      level: 4,
      features: ['Ability Score Improvement'],
      fury: 3,
      furyDamage: 2,
    },
    {
      level: 5,
      features: ['Extra Attack', 'Fast Movement'],
      fury: 3,
      furyDamage: 2,
    },
    {
      level: 6,
      features: ['Path Feature'],
      fury: 4,
      furyDamage: 2,
    },
    {
      level: 7,
      features: ['Feral Instinct'],
      fury: 4,
      furyDamage: 2,
    },
    {
      level: 8,
      features: ['Ability Score Improvement'],
      fury: 4,
      furyDamage: 2,
    },
    {
      level: 9,
      features: ['Brutal Critical (1 die)'],
      fury: 4,
      furyDamage: 3,
    },
    {
      level: 10,
      features: ['Path Feature'],
      fury: 4,
      furyDamage: 3,
    },
    {
      level: 11,
      features: ['Relentless Rage'],
      fury: 4,
      furyDamage: 3,
    },
    {
      level: 12,
      features: ['Ability Score Improvement'],
      fury: 5,
      furyDamage: 3,
    },
    {
      level: 13,
      features: ['Brutal Critical (2 dice)'],
      fury: 5,
      furyDamage: 3,
    },
    {
      level: 14,
      features: ['Path Feature'],
      fury: 5,
      furyDamage: 3,
    },
    {
      level: 15,
      features: ['Persistent Rage'],
      fury: 5,
      furyDamage: 3,
    },
    {
      level: 16,
      features: ['Ability Score Improvement'],
      fury: 5,
      furyDamage: 4,
    },
    {
      level: 17,
      features: ['Brutal Critical (3 dice)'],
      fury: 6,
      furyDamage: 4,
    },
    {
      level: 18,
      features: ['Indomitable Might'],
      fury: 6,
      furyDamage: 4,
    },
    {
      level: 19,
      features: ['Ability Score Improvement'],
      fury: 6,
      furyDamage: 4,
    },
    {
      level: 20,
      features: ['Primal Champion'],
      fury: undefined,
      furyDamage: 4,
    },
  ],
}

const buildEmbed = (): EmbedBuilder[] => {
  const classEmbed = buildEmbedClass(barbarian)

  const levelEmbed = new EmbedBuilder()
    .setColor('Orange')
    .setTitle(`${barbarian.className}' Levels`)
    .setDescription(`${barbarian.className}'s levels and features`)
    .addFields(
      ...barbarian.levels.map((level) => ({
        name: `Level ${level.level}`,
        value: level.features.join(', '),
        inline: true,
      })),
    )

  return [classEmbed, levelEmbed]
}

export default {
  data: new SlashCommandBuilder()
    .setName('barbarian')
    .setDescription(
      `Replies with data from ${barbarian.className}' class from D&D 5e!`,
    ),
  execute: async (
    interaction: CommandInteraction,
  ): Promise<InteractionResponse | void> => {
    const embeds = buildEmbed()
    return interaction.reply({ embeds })
  },
} as Command
