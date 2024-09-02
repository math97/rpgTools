import { beforeEach, describe, expect, it } from 'vitest'
import { RacesCommand } from './races'
import { SlashCommandBuilder } from 'discord.js'

describe('races', () => {
  describe('RacesCommand', () => {
    let racesCommand: RacesCommand

    beforeEach(() => {
      racesCommand = new RacesCommand('races')
    })
    it('buildCommand should return a command', () => {
      const command = racesCommand.buildCommand()

      expect(command.data).toBeInstanceOf(SlashCommandBuilder)
    })
  })
})
