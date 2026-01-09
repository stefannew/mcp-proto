import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { Request, Response, NextFunction } from 'express';

export function registerMcpDeleteHandler(_server: McpServer, transports: Map<string, StreamableHTTPServerTransport>) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const sessionId = request.headers['mcp-session-id'] as string | undefined;

        if (!sessionId) {
            response.status(400).send('Missing session id');
            return next();
        }

        console.log(`Received session termination request for session ${sessionId}`);

        try {
            const transport = transports.get(sessionId);

            if (!transport) {
                response.status(400).send('Missing transport');
                return next();
            }

            await transport.handleRequest(request, response);
        } catch (err) {
            console.error({ err });
            return next();
        }
    }
}