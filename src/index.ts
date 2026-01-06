import z from 'zod';

import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import { registerMcpPostHandler } from './post-handler.js';

const MCP_PORT = process.env.MCP_PORT;
const AUTH_PORT = process.env.AUTH_PORT;

const server = new McpServer({
    name: 'bluej-mcp-server',
    version: '1.0.0'
});

server.registerTool(
    'greet',
    {
        title: 'Greeting Tool',
        description: 'A simple greeting tool',
        inputSchema: {
            name: z.string().describe('Name to greet')
        }
    },
    async ({ name }): Promise<CallToolResult> => {
        return {
            content: [{
                type: 'text',
                text: `Hello ${name}`
            }]
        }
    }
)

const mcpPostHandler = registerMcpPostHandler(server);

const app = createMcpExpressApp();

const MCP_SERVER_URL = new URL(`http://localhost:${MCP_PORT}/mcp`);
// const AUTH_SERVER_URL = new URL(`http://localhost:${AUTH_PORT}`);

app.post('/mcp', mcpPostHandler);

app.listen(MCP_PORT, (err: unknown) => {
   if (err) {
       console.error({ err }, 'failed');
       process.exit(1);
   }

   console.log('MCP server listening on port', MCP_PORT);
});

