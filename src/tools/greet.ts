import z, { ZodString } from 'zod';

import { Tool } from '../types.js';

export const Greet: Tool<InputSchema> = {
    name: 'greet',
    definition: {
        title: 'Greeting Tool',
        description: 'A simple greeting tool',
        inputSchema: {
            name: z.string().describe('Name to greet'),
        }
    },
    callback: async ({ name }) => {
        return {
            content: [{
                type: 'text',
                text: `Hello ${name}`
            }]
        }
    }
}

type InputSchema = {
    name: ZodString;
}