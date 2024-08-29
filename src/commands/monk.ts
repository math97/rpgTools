import { Command } from "@/models/Command"
import { CommandInteraction, EmbedBuilder, InteractionResponse, SlashCommandBuilder } from "discord.js"

const monk = {
    className: "Monk",
    baseStats: {
        lifeDice: "1d8",
        proficiencies: ["Simple Weapons", "Shortswords"],
        modify: "Constitution",
        expertise: [
            "Acrobatics",
            "Athletics",
            "History",
            "Insight",
            "Religion",
            "Stealth"
        ],
        expertiseChoices: 2,
        savingThrows: ["Strength", "Dexterity"],
        armor: undefined,
    },
    levels: [
        { level: 1, features: ["Unarmored Defense", "Martial Arts"], martialArtsDice: "1d4", chiPoints: 0 },
        { level: 2, features: ["Ki", "Unarmored Movement"], martialArtsDice: "1d4", chiPoints: 2 },
        { level: 3, features: ["Monastic Tradition",'deflect projects'], martialArtsDice: "1d4", chiPoints: 3 },
        { level: 4, features: ["Ability Score Improvement",'slow fall'], martialArtsDice: "1d4", chiPoints: 4 },
        { level: 5, features: ["Extra Attack", "Stunning Strike"], martialArtsDice: "1d6", chiPoints: 5 },
        { level: 6, features: ["Ki-Empowered Strikes", "Monastic Tradition"], martialArtsDice: "1d6", chiPoints: 6 },
        { level: 7, features: ["Stillness of Mind","Evasion"], martialArtsDice: "1d6", chiPoints: 7 },
        { level: 8, features: ["Ability Score Improvement"], martialArtsDice: "1d6", chiPoints: 8 },
        { level: 9, features: ["Unarmored Movement Improvement"], martialArtsDice: "1d6", chiPoints: 9 },
        { level: 10, features: ["Purity of Body"], martialArtsDice: "1d6", chiPoints: 10 },
        { level: 11, features: ["Monastic Tradition","Mystic Strike"], martialArtsDice: "1d8", chiPoints: 11 },
        { level: 12, features: ["Ability Score Improvement"], martialArtsDice: "1d8", chiPoints: 12 },
        { level: 13, features: ["Tongue of the Sun and Moon"], martialArtsDice: "1d8", chiPoints: 13 },
        { level: 14, features: ["Diamond Soul"], martialArtsDice: "1d8", chiPoints: 14 },
        { level: 15, features: ["Timeless Body"], martialArtsDice: "1d8", chiPoints: 15 },
        { level: 16, features: ["Ability Score Improvement"], martialArtsDice: "1d8", chiPoints: 16 },
        { level: 17, features: ["Monastic Tradition"], martialArtsDice: "1d10", chiPoints: 17 },
        { level: 18, features: ["Empty Body Improvement"], martialArtsDice: "1d10", chiPoints: 18 },
        { level: 19, features: ["Ability Score Improvement"], martialArtsDice: "1d10", chiPoints: 19 },
        { level: 20, features: ["Perfect Self"], martialArtsDice: "1d10", chiPoints: 20 }
    ],
}



const buildEmbed = ():EmbedBuilder=>{
    const raceEmbed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle(monk.className)
        .setDescription(`Characteristics of class ${monk.className}`)
        .addFields(
            { name: 'Life Dice', value: monk.baseStats.lifeDice, inline: true },
            { name: 'Proficiencies', value: monk.baseStats.proficiencies.join('\n'), inline: true },
            { name: 'Modify', value: monk.baseStats.modify, inline: true },
            { name: 'Expertise', value: monk.baseStats.expertise.join('\n'), inline: true },
            { name: 'Expertise Choices', value: monk.baseStats.expertiseChoices.toString(), inline: true },
            { name: 'Saving Throws', value: monk.baseStats.savingThrows.join(', '), inline: true },
            { name: 'Armor', value: monk.baseStats.armor || 'None', inline: true }
        )

    return raceEmbed
}

export default {
    data: new SlashCommandBuilder()
        .setName("monk")
        .setDescription("Replies with data from monk class from D&D 5e!"),
    execute: async (interaction: CommandInteraction): Promise<InteractionResponse | void> => {
        const embedMonk = buildEmbed()
        return interaction.reply({embeds:[embedMonk]});
    }
} as Command