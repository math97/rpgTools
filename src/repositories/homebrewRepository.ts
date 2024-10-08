import { HomeBrew, Prisma } from '@prisma/client'

export interface HomebrewRepository {
  create(data: Prisma.HomeBrewCreateInput): Promise<HomeBrew>
  findByGuildId(guildId: string): Promise<HomeBrew | null>
}
