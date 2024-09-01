import { SlashCommandBuilder } from 'discord.js'

import { expect, it, describe, beforeEach } from 'vitest'
import { RaceCommand } from './race'

describe('RaceCommand', () => {
  let raceCommand: RaceCommand

  beforeEach(() => {
    raceCommand = new RaceCommand('human')
  })

  describe('buildCommand', () => {
    it('should have the correct name', () => {
      const command = raceCommand.buildCommand()
      expect(command.name).toBe('human')
    })

    it('should return data as instace of slashCommand', () => {
      const command = raceCommand.buildCommand()

      expect(command.data).toBeInstanceOf(SlashCommandBuilder)
    })
  })
})
