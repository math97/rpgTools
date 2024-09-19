import { describe, it, expect, beforeEach } from 'vitest'
import { GetHomeBrewByGuildIdUseCase } from './getHomeBrewByGuildIdUseCase'
import { Prisma } from '@prisma/client'
import { InMemoryHomeBrewRepository } from '../../repositories/inMemory/inMemoryHomeBrewRepositoy'
import { HomebrewRepository } from '../../repositories/homebrewRepository'

describe('GetHomeBrewByGuildIdUseCase', () => {
  let homeBrewRepository: HomebrewRepository
  let sut: GetHomeBrewByGuildIdUseCase

  const homeBrewCreateInput: Prisma.HomeBrewCreateInput = {
    guild: {
      connect: {
        id: 'guild1',
      },
    },
    name: 'Test Homebrew',
    description: 'Test Description',
  }

  beforeEach(async () => {
    homeBrewRepository = new InMemoryHomeBrewRepository()
    await homeBrewRepository.create(homeBrewCreateInput)

    sut = new GetHomeBrewByGuildIdUseCase(homeBrewRepository)
  })

  it('should return homebrew if found', async () => {
    const expectedHomeBrew = {
      id: expect.any(String),
      guildId: 'guild1',
      name: 'Test Homebrew',
      description: 'Test Description',
    }
    const result = await sut.execute('guild1')

    expect(result).toEqual(expectedHomeBrew)
  })

  it('should throw an error if homebrew is not found', async () => {
    await expect(sut.execute('guild2')).rejects.toThrow(
      'An error occurred while trying to get the homebrew. Error: Homebrew not found',
    )
  })
})
