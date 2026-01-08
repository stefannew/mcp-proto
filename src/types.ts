import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { AnySchema, ZodRawShapeCompat } from '@modelcontextprotocol/sdk/server/zod-compat.js';
import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';

export type Tool<InputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined, OutputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined> = {
    name: string;
    definition: {
        title: string;
        description: string;
        inputSchema?: InputArgs;
        outputSchema?: OutputArgs;
    }
    callback: (args: ToolCallback<InputArgs>) => Promise<CallToolResult>
}
