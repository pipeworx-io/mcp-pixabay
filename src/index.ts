interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Pixabay MCP.
 */


const UA = 'pipeworx-mcp-pixabay/1.0 (+https://pipeworx.io)';

const passthrough = { type: 'object' as const, properties: {}, additionalProperties: true };

const tools: McpToolExport['tools'] = [
  { name: 'search_images', description: 'Image search.', inputSchema: passthrough },
  { name: 'search_videos', description: 'Video search.', inputSchema: passthrough },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = (args._apiKey as string | undefined)?.trim();
  if (!apiKey) throw new Error('Pixabay requires an API key. Set PLATFORM_PIXABAY_KEY or pass ?_apiKey=… (free at https://pixabay.com/api/docs/).');
  const get = async (url: string, params: Record<string, unknown>) => {
    const p = new URLSearchParams({ key: apiKey });
    for (const [k, v] of Object.entries(params)) if (k !== '_apiKey' && v != null) p.set(k, String(v));
    const res = await fetch(`${url}?${p}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (res.status === 400 || res.status === 401 || res.status === 403) throw new Error(`Pixabay: ${res.status} — check API key and query parameters.`);
    if (res.status === 429) throw new Error('Pixabay: 429 rate limit.');
    if (!res.ok) throw new Error(`Pixabay: ${res.status}`);
    return res.json();
  };
  switch (name) {
    case 'search_images':
      return get('https://pixabay.com/api/', args);
    case 'search_videos':
      return get('https://pixabay.com/api/videos/', args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
