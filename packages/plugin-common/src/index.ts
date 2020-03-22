import { Context } from 'koishi-core'
import admin from './admin'
import broadcast, { BroadcastOptions } from './broadcast'
import contextify from './contextify'
import echo from './echo'
import info from './info'
import repeater, { RepeaterOptions } from './repeater'
import requestHandler, { HandlerOptions } from './request-handler'
import respondent, { Respondent } from './respondent'
import welcome, { WelcomeMessage } from './welcome'

export * from './admin'
export * from './info'
export * from './repeater'

export {
  admin,
  broadcast,
  contextify,
  echo,
  info,
  repeater,
  requestHandler,
  respondent,
  welcome,
  BroadcastOptions,
  HandlerOptions,
  RepeaterOptions,
  Respondent,
  WelcomeMessage,
}

export interface Config extends BroadcastOptions, HandlerOptions {
  admin?: boolean
  broadcast?: boolean
  contextify?: boolean
  echo?: boolean
  exec?: boolean
  exit?: boolean
  help?: boolean
  info?: boolean
  repeater?: RepeaterOptions
  respondent?: Respondent[]
  welcomeMessage?: WelcomeMessage
}

export const name = 'common'

export function apply (ctx: Context, options: Config = {}) {
  ctx.plugin(requestHandler, options)
  ctx.plugin(repeater, options.repeater)
  ctx.plugin(respondent, options.respondent)
  ctx.plugin(welcome, options.welcomeMessage)

  if (options.echo !== false) ctx.plugin(echo)

  if (ctx.database) {
    if (options.admin !== false) ctx.plugin(admin)
    if (options.contextify !== false) ctx.plugin(contextify)
    if (options.broadcast !== false) ctx.plugin(broadcast, options)
    if (options.info !== false) ctx.plugin(info, options)
  }
}
