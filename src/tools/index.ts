import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { Tool } from '../types.js';

export function registerTools(server: McpServer, tools: Tool<any, any>[]) {
    tools.forEach(tool => {
        server.registerTool(tool.name, tool.definition, tool.callback);
    })
}
