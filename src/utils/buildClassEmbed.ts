import { EmbedBuilder } from "discord.js";

export const buildEmbedClass = <T extends CharacterClass>(characterClass: T): EmbedBuilder => {
    const classEmbed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle(characterClass.className)
    .setDescription(`Characteristics of class ${characterClass.className}`)
    .setThumbnail(characterClass.image)
    .addFields(
        { name: 'Life Dice', value: characterClass.baseStats.lifeDice, inline: true },
        { name: 'Proficiencies', value: characterClass.baseStats.proficiencies.join('\n'), inline: true },
        { name: 'Modify', value: characterClass.baseStats.modify, inline: true },
        { name: 'Expertise', value: characterClass.baseStats.expertise.join('\n'), inline: true },
        { name: 'Expertise Choices', value: characterClass.baseStats.expertiseChoices.toString(), inline: true },
        { name: 'Saving Throws', value: characterClass.baseStats.savingThrows.join(', '), inline: true },
        { name: 'Armor', value: characterClass.baseStats.armor || 'None', inline: true }
    )

const levelEmbed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle(`${characterClass.className} Levels`)
    .setDescription(`Level features of the ${characterClass.className} class`)
    .addFields(
        ...characterClass.levels.map(level => ({
            name: `Level ${level.level}`,
            value: level.features.join(", "),
            inline: true
        }))
    );

return classEmbed;

  }
