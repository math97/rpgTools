import { HomebrewRepository } from '@/repositories/homebrewRepository'
import { HomeBrew } from '@prisma/client'

export class GetHomeBrewByGuildIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private homeBrewRepository: HomebrewRepository) {}

  async execute(guildId: string): Promise<HomeBrew> {
    try {
      const homeBrew = await this.homeBrewRepository.findByGuildId(guildId)

      if (!homeBrew) throw new Error('Homebrew not found')
      return homeBrew
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while trying to get the homebrew')
    }
  }
}
