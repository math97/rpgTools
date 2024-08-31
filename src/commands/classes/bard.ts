import { bardClass } from '@/models/CharacterClass'
import { Command } from '@/models/Command'
import { buildEmbedClass } from '@/utils/buildClassEmbed'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js'

const bard: bardClass = {
  className: 'Bard',
  image:
    'https://cdn.discordapp.com/attachments/1279212787372916817/1279239529626337352/27812518-2e6a-45e2-920a-5481cf61ec8e.png?ex=66d3b826&is=66d266a6&hm=2e99960ce6e98a236934724f3c376e1e476613ae4d03cda4a786adf3133bc38d&',
  baseStats: {
    lifeDice: '1d8',
    proficiencies: [
      'Light Armor',
      'Simple Weapons',
      'Hand Crossbows',
      'Longswords',
      'Rapiers',
      'Shortswords',
    ],
    modify: 'Charisma',
    expertise: ['All Skills'],
    expertiseChoices: 3,
    savingThrows: ['Dexterity', 'Charisma'],
    armor: 'Light Armor',
  },
  levels: [
    {
      level: 1,
      features: ['Spellcasting', 'Bardic Inspiration (d6)'],
      spellSlots: { 1: 2 },
    },
    {
      level: 2,
      features: ['Versatility', 'Song of Rest (d6)'],
      spellSlots: { 1: 3 },
    },
    {
      level: 3,
      features: ['Bard College', 'Expertise'],
      spellSlots: { 1: 4, 2: 2 },
    },
    {
      level: 4,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3 },
    },
    {
      level: 5,
      features: ['Font of Inspiration', 'Bardic Inspiration (d8)'],
      spellSlots: { 1: 4, 2: 3, 3: 2 },
    },
    {
      level: 6,
      features: ['Countercharm', 'Bard College Feature'],
      spellSlots: { 1: 4, 2: 3, 3: 3 },
    },
    { level: 7, features: ['\u200b'], spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 } },
    {
      level: 8,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 },
    },
    {
      level: 9,
      features: ['Song of Rest (d8)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    },
    {
      level: 10,
      features: ['Bardic Inspiration (d10)', 'Expertise', 'Magical Secrets'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    },
    {
      level: 11,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    },
    {
      level: 12,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    },
    {
      level: 13,
      features: ['Song of Rest (d10)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    },
    {
      level: 14,
      features: ['Magical Secrets'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    },
    {
      level: 15,
      features: ['Bardic Inspiration (d12)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    },
    {
      level: 16,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    },
    {
      level: 17,
      features: ['Song of Rest (d12)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 18,
      features: ['Magical Secrets'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 19,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 20,
      features: ['Superior Inspiration'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
    },
  ],
}

const buildEmbed = (): EmbedBuilder[] => {
  const classEmbed = buildEmbedClass(bard)

  const levelEmbed = new EmbedBuilder()
    .setColor('Orange')
    .setTitle('Bard Levels')
    .setDescription('Level features of the Bard class')
    .addFields(
      ...bard.levels.map((level) => ({
        name: `Level ${level.level}`,
        value: level.features.join(', '),
        inline: true,
      })),
    )

  return [classEmbed, levelEmbed]
}

export default {
  data: new SlashCommandBuilder()
    .setName('bard')
    .setDescription('Replies with data from bard class from D&D 5e!'),
  execute: async (
    interaction: CommandInteraction,
  ): Promise<InteractionResponse | void> => {
    const embeds = buildEmbed()
    return interaction.reply({ embeds })
  },
} as Command
