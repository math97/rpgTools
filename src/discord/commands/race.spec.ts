import { RaceCommand } from '@/discord/commands/race'
import { SlashCommandBuilder } from 'discord.js'

import { expect, it, describe, beforeEach } from 'vitest'

describe('RaceCommand', () => {
  let raceCommand: RaceCommand

  beforeEach(() => {
    raceCommand = new RaceCommand('human')
  })

  describe('buildCommand', () => {
    it('should have the correct name', () => {
      console.log('raceCommand', raceCommand)

      const command = raceCommand.buildCommand()
      console.log('command', command)

      expect(command.name).toBe('human')
    })

    it('should return data as instace of slashCommand', () => {
      const command = raceCommand.buildCommand()

      expect(command.data).toBeInstanceOf(SlashCommandBuilder)
    })
  })
})
