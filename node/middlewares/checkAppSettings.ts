import { has } from 'lodash'

import { getSettings } from '../util/utils'
import { APP_SETTINGS_PROPERTIES } from '../util/constants'

export async function checkAppSettings(ctx: Context, next: () => Promise<any>) {
  try {
    const settings = await getSettings(ctx)
    const missingProperty = APP_SETTINGS_PROPERTIES.find(
      (item) => !has(settings, item)
    )
    if (missingProperty) {
      throw new Error(`Missing property setting ${missingProperty}`)
    }
    
    ctx.response.body = settings
    ctx.response.status = 200

  } catch (exception) {
    ctx.response.status = 500
    console.error(exception.message)
    throw exception
  }

  await next()
}
