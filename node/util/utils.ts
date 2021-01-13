import { Apps } from '@vtex/api'

export const getSettings = async (ctx: any) => {
    const apps = new Apps(ctx.vtex);
    return await apps.getAppSettings(ctx.vtex.userAgent)
}