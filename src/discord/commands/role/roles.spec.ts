import { RolesCommand } from '@/discord/commands/role/roles'
import { SlashCommandBuilder } from 'discord.js'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Roles', () => {
  describe('RolesCommand', () => {
    let rolesCommand: RolesCommand

    beforeEach(() => {
      rolesCommand = new RolesCommand('roles')
    })

    it('should build the command correctly', () => {
      const command = rolesCommand.buildCommand()

      expect(command.data).toBeInstanceOf(SlashCommandBuilder)
      expect(command.name).toBe('roles')
      expect(command.data.description).toBe(
        'Replies with roles/classes from D&D 5e!',
      )
    })
  })
})
