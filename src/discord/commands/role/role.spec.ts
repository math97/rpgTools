import { beforeEach, describe, expect, it } from 'vitest'
import { RoleCommand } from './role'
import { SlashCommandBuilder } from 'discord.js'

describe('Role', () => {
  describe('RoleCommand', () => {
    let roleCommand: RoleCommand

    beforeEach(() => {
      roleCommand = new RoleCommand('barbarian')
    })

    it('should have the correct name', () => {
      const command = roleCommand.buildCommand()

      expect(command.name).toBe('barbarian')
    })

    describe('buildCommand', () => {
      it('should return data as instace of slashCommand', () => {
        const command = roleCommand.buildCommand()

        expect(command.data).toBeInstanceOf(SlashCommandBuilder)
      })
    })
  })
})
