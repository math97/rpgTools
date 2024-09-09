import { BaseRaceWithRelations } from '@/repositories/prisma/prismaBaseRaceRepository'
import { AbilityScore } from '@prisma/client'
import { EmbedBuilder } from 'discord.js'

export const buildEmbedRace = (race: BaseRaceWithRelations): EmbedBuilder => {
  const raceEmbed = new EmbedBuilder()
    .setColor('DarkBlue')
    .setTitle(race.name)
    .setThumbnail(getImage(race.name))
    .setDescription(`Characteristics of race ${race.name}`)

  const raceEmbedWithFields = addFields(race, raceEmbed)

  return raceEmbedWithFields
}

const mapAbilityScore = (abilityScore: AbilityScore): string => {
  return `${abilityScore.type} : ${abilityScore.value}`
}

const addFields = (
  race: BaseRaceWithRelations,
  embedBuilder: EmbedBuilder,
): EmbedBuilder => {
  Object.keys(race).forEach((key) => {
    const value = race[key as keyof BaseRaceWithRelations]

    if (value) {
      switch (key) {
        case 'id':
          break
        case 'name':
          break
        case 'size':
          embedBuilder.addFields({
            name: 'Size',
            value: value.toString(),
            inline: true,
          })
          break

        case 'languages':
          embedBuilder.addFields({
            name: 'Languages',
            value: value.toString() ? value.toString() : 'No Languages',
            inline: true,
          })
          break

        case 'movementSpeed':
          embedBuilder.addFields({
            name: 'Speed',
            value: value.toString(),
            inline: true,
          })
          break

        case 'traits':
          embedBuilder.addFields({
            name: 'Traits',
            value: (value as string[]).join('\n')
              ? (value as string[]).join('\n')
              : 'No Traits',
            inline: true,
          })
          break

        case 'proficienciesNumber':
          embedBuilder.addFields({
            name: 'Number of proficiencies you can choose',
            value: value.toString(),
            inline: true,
          })
          break

        case 'proficiencies':
          embedBuilder.addFields({
            name: 'Proficiencies',
            value: (value as string[]).join('\n')
              ? (value as string[]).join('\n')
              : 'No Proficiencies to choose',
            inline: true,
          })
          break

        case 'abilityScore':
          embedBuilder.addFields({
            name: 'Ability Score',
            value: (value as AbilityScore[])
              ? (value as AbilityScore[]).map(mapAbilityScore).join(' | ')
              : 'No Ability Score',
            inline: true,
          })
          break

        case 'subRaces':
          embedBuilder.addFields({
            name: 'Subraces available',
            value: (value as string[]).join('\n')
              ? (value as string[]).join('\n')
              : 'No Subraces',
            inline: true,
          })
          break

        default:
          embedBuilder.addFields({
            name: '\u200B',
            value: '\u200B',
            inline: true,
          })

          break
      }
    }
  })

  return embedBuilder
}

const getImage = (raceName: string) => {
  return 'attachment://' + raceName.toLowerCase() + '.png'
}
