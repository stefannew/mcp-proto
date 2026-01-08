import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerMcpPostHandler } from '../handlers/post.js';
import { registerMcpGetHandler } from '../handlers/get.js';

export function createApp(server: McpServer) {
    const app = createMcpExpressApp();
    const transports: Map<string, StreamableHTTPServerTransport> = new Map();

    const handlers = [
        {
            method: 'post',
            handler: registerMcpPostHandler(server, transports)
        },
        {
            method: 'get',
            handler: registerMcpGetHandler(server, transports)
        }
    ]

    handlers.forEach(definition => {
        // @ts-ignore
        app[definition.method]('/mcp', definition.handler);
    });

    return app;
}