import Fastify from 'fastify';
import websocket from '@fastify/websocket';

import { config, assertReady } from './config.js';
import { handleTwilioMediaStream } from './twilioMediaStream.js';

async function main(): Promise<void> {
  const app = Fastify({
    logger: { level: process.env.LOG_LEVEL ?? 'info' },
  });

  // Must be registered before routes so it can intercept WS upgrades.
  await app.register(websocket, {
    options: { maxPayload: 1_048_576 },
  });

  // Health check (used by Railway/Render/your load balancer).
  app.get('/health', async () => ({
    ok: true,
    service: 'hitchcode-voice-server',
    time: new Date().toISOString(),
  }));

  // Twilio <Connect><Stream> bidirectional media endpoint.
  app.get('/twilio-media', { websocket: true }, (socket, req) => {
    handleTwilioMediaStream(socket, req);
  });

  assertReady((msg) => app.log.warn(msg));

  await app.listen({ host: '0.0.0.0', port: config.port });
  app.log.info(`voice-server listening on :${config.port}`);
}

main().catch((err) => {
  console.error('Fatal: voice-server failed to start', err);
  process.exit(1);
});
