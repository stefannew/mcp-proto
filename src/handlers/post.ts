import { NextFunction, Request, Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerMcpPostHandler(server: McpServer, transports: Map<string, StreamableHTTPServerTransport>) {
    return async (request: Request, response: Response, _next: NextFunction) => {
        const sessionId = request.headers['mcp-session-id'] as string | undefined;

        try {
            let transport: StreamableHTTPServerTransport;

            if (sessionId && transports.has(sessionId)) {
                transport = transports.get(sessionId) as StreamableHTTPServerTransport;
            } else if (!sessionId) {
                transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: () => randomUUID(),
                    onsessioninitialized: (sessionId) => {
                        console.log(`session initialized with id: ${sessionId}`);
                        transports.set(sessionId, transport);
                    }
                })

                transport.onclose = () => {
                    if (transport.sessionId && transports.has(transport.sessionId)) {
                        console.log(`session closed with id: ${transport.sessionId}`);
                        transports.delete(transport.sessionId);
                    }
                }

                await server.connect(transport);
            }

            await transport!.handleRequest(request, response, request.body);
        } catch (err) {
            console.error({ err });
        }

    }
}
