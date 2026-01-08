import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerTools } from './tools/index.js';
import { Greet } from './tools/greet.js';

const TOOLS = [Greet];

export function createServer() {
    const server = new McpServer({
        name: 'bluej-mcp-server',
        version: '1.0.0'
    });

    registerTools(server, TOOLS);

    return server;
}