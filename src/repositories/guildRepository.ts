import { Guild, Prisma } from '@prisma/client'

export interface GuildRepository {
  create(guild: Prisma.GuildUncheckedCreateInput): Promise<Guild>
  findByGuildId(guildId: string): Promise<Guild | null>
}
