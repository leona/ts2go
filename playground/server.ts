import { Hono } from 'hono'
import { $ } from 'bun';
import fs from 'fs'
const app = new Hono()

app.post('/compile', async (c) => {
  const { code } = await c.req.json()
  fs.writeFileSync("/tmp/playground-result.go", code)
  const response = await $`cd /app/src && go run /tmp/playground-result.go`

  return c.json({
    error: response.stderr.toLocaleString(),
    response: response.stdout.toLocaleString(),
    exitCode: response.exitCode
  })
})

export default {
  fetch: app.fetch,
  port: 80,
}
