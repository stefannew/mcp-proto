import { createApp } from './app/index.js';
import { createServer } from './server.js';

const MCP_PORT = process.env.MCP_PORT;

const server = createServer();
const app = createApp(server);

app.listen(MCP_PORT, (err: unknown) => {
   if (err) {
       console.error({ err }, 'failed');
       process.exit(1);
   }

   console.log('MCP server listening on port', MCP_PORT);
});

