import { Race } from '@/models/Races'
import { EmbedBuilder } from 'discord.js'

export const buildEmbedRace = (race: Race): EmbedBuilder => {
  const raceEmbed = new EmbedBuilder()
    .setColor('Orange')
    .setTitle(race.name)
    .setDescription(`Characteristics of race ${race.name}`)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: 'abilityScore', value: race.abilityScore, inline: true },
      { name: 'traits', value: race.traits.join('\n'), inline: true },
      {
        name: 'languages',
        value: race.languages.join(', '),
        inline: true,
      },
      {
        name: 'proficiencies',
        value: race.proficiencies.toString(),
        inline: true,
      },
    )

  return raceEmbed
}
