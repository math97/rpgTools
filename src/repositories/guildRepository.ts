import { CustomEventDiscord, Guild, Prisma } from '@prisma/client'

export interface GuildRepository {
  create(guild: Prisma.GuildUncheckedCreateInput): Promise<Guild>
  findByGuildId(
    guildId: string,
  ): Promise<(Guild & { customEventDiscord: CustomEventDiscord[] }) | null>
}
