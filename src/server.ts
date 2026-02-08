/** @format */

import app from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

const port = env.PORT;
const baseUrl = env.BASE_URL;
let server: ReturnType<typeof app.listen> | undefined;

/*

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"], // Allow your own domain
      'connect-src': ["'self'", 'http://localhost:3000', 'ws://localhost:*'], // Explicitly allow connections
      'script-src': ["'self'", "'unsafe-inline'"], // Allow scripts
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:'],
    },
  }),
);

*/

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(port, () => {
      console.log(`✅ Server running on ${baseUrl}:${port}`); // eslint-disable-line no-console
    });

    server.on('error', async (err) => {
      console.error('❌ Server error:', err); // eslint-disable-line no-console
      await disconnectDB();
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Startup failed. Exiting...', error); // eslint-disable-line no-console
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Shutting down...`); // eslint-disable-line no-console

  if (server) {
    server.close(() => {
      console.log('🛑 HTTP server closed'); // eslint-disable-line no-console
    });
  }

  await disconnectDB();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', async (reason) => {
  console.error('❌ Unhandled rejection:', reason); // eslint-disable-line no-console
  await disconnectDB();
  process.exit(1);
});

process.on('uncaughtException', async (err) => {
  console.error('❌ Uncaught exception:', err); // eslint-disable-line no-console
  await disconnectDB();
  process.exit(1);
});

startServer();
