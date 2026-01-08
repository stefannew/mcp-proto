import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerMcpPostHandler } from '../handlers/post.js';

export function createApp(server: McpServer) {
    const app = createMcpExpressApp();

    const handlers = [
        {
            method: 'post',
            handler: registerMcpPostHandler(server)
        }
    ]

    handlers.forEach(definition => {
        // @ts-ignore
        app[definition.method]('/mcp', definition.handler);
    });

    return app;
}