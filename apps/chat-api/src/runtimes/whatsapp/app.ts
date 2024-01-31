import { Elysia, t } from 'elysia'
import { receiveMessage } from './receiveMessage'
import { receiveMessagePreview } from './receiveMessagePreview'

export const whatsAppRuntime = new Elysia()
  .post(
    '/api/v1/workspaces/:workspaceId/whatsapp/:credentialsId/webhook',
    ({ params, body }) => {
      receiveMessage({ ...params, ...body })
    },
    {
      params: t.Object({
        workspaceId: t.String(),
        credentialsId: t.String(),
      }),
      body: t.Object({
        object: t.String(),
        entry: t.Any(),
      }),
    }
  )
  .post(
    '/api/v1/whatsapp/preview/webhook',
    ({ body }) => {
      receiveMessagePreview(body)
    },
    {
      body: t.Object({
        object: t.String(),
        entry: t.Any(),
      }),
    }
  )