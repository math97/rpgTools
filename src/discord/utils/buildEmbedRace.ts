import { Race } from '@prisma/client'
import { EmbedBuilder } from 'discord.js'

export const buildEmbedRace = (
  race: Omit<Race, 'abilityScore' | 'id' | 'homeBrewId'>,
): EmbedBuilder => {
  const raceEmbed = new EmbedBuilder()
    .setColor('Orange')
    .setTitle(race.name)
    .setDescription(`Characteristics of race ${race.name}`)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Speed',
        value: race.movementSpeed.toString(),
        inline: true,
      },
      { name: 'Size', value: race.size, inline: true },
      {
        name: 'traits',
        value: race.traits.length ? race.traits.join('\n') : '\u200b',
        inline: true,
      },
      {
        name: 'armor',
        value: race.armorClass.length ? race.armorClass.join('\n') : '\u200B',
        inline: true,
      },
      {
        name: 'weapons',
        value: race.weaponProficiencies.length
          ? race.weaponProficiencies.join('\n')
          : '\u200B',
        inline: true,
      },
      {
        name: 'languages',
        value: race.languages.length ? race.languages.join('\n') : '\u200B',
      },
      {
        name: 'number of proficiencies',
        value: race.proficienciesNumber.toString(),
        inline: true,
      },

      {
        name: 'proficiencies',
        value: race.proficiencies.length
          ? race.proficiencies.join('\n')
          : '\u200B',
        inline: true,
      },
    )

  return raceEmbed
}
