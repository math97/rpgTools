import { describe, it, expect } from 'vitest'
import { CreateCustomRaceUseCase } from './createCustomRaceUseCase'
import { InMemoryCustomRaceRepository } from '@/repositories/inMemory/inMemoryCustomRaceRepository'
import { angelRaceInputMock } from '@/mock/RaceMock'

describe('CreateCustomRaceUseCase', () => {
  it('should create a custom race successfully', async () => {
    const mockCustomRace = angelRaceInputMock
    const customRaceRepository = new InMemoryCustomRaceRepository()

    const createCustomRaceUseCase = new CreateCustomRaceUseCase(
      customRaceRepository,
    )
    const result = await createCustomRaceUseCase.execute(mockCustomRace, '1')

    expect(result.name).toEqual(mockCustomRace.nameInput)
  })
})
