import { NextFunction, Request, Response } from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

export function registerMcpGetHandler(_server: McpServer, transports: Map<string, StreamableHTTPServerTransport>) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const sessionId = request.headers['mcp-session-id'] as string | undefined;

        if (!sessionId || !transports.has(sessionId)) {
            response.status(400).send('Invalid or missing session id');
            return next();
        }

        const lastEventId = request.headers['last-event-id'] as string | undefined;

        if (lastEventId) {
            // handle reconnects?
        }

        const transport = transports.get(sessionId);

        if (!transport) {
            response.status(400).send('Invalid or missing transport');
            return next();
        }

        await transport.handleRequest(request, response);
    }
}