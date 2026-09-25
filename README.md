# @pipeworx/pixabay

[Pixabay](https://pixabay.com/api/docs/) MCP — image + video search. Free key 100 req/min, 5k/hr.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1679+ live data sources.

## Auth

- Platform: `PLATFORM_PIXABAY_KEY`. BYO: `?_apiKey=…`.

## Tools

- `search_images(q?, lang?, id?, image_type?, orientation?, category?, min_width?, min_height?, colors?, editors_choice?, safesearch?, order?, page?, per_page?)` — image search
- `search_videos(q?, lang?, id?, video_type?, category?, min_width?, min_height?, editors_choice?, safesearch?, order?, page?, per_page?)` — video search

`image_type`: `all|photo|illustration|vector`. `video_type`: `all|film|animation`. `category`: `backgrounds|fashion|nature|science|education|feelings|health|people|religion|places|animals|industry|computer|food|sports|transportation|travel|buildings|business|music`.

## Data source

`https://pixabay.com/api/` (images), `https://pixabay.com/api/videos/` (videos)

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "pixabay": {
      "url": "https://gateway.pipeworx.io/pixabay/mcp"
    }
  }
}
```

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/pixabay/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1679+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## No MCP client? Call it over HTTP

```bash
curl -X POST https://gateway.pipeworx.io/v1/tools/pixabay_search_images \
  -H 'Content-Type: application/json' \
  -d '{"q":"sunset beach"}'
```

No account needed for the first calls. Inspect any tool: `GET https://gateway.pipeworx.io/v1/tools/pixabay_search_images`. Find one: `POST https://gateway.pipeworx.io/v1/tools/search_packs` with `{"query":"..."}`.

## Standalone (no gateway account)

This package also runs as a local stdio MCP server — no Pipeworx account, no
gateway round-trip:

```json
{
  "mcpServers": {
    "pixabay": {
      "command": "npx",
      "args": ["-y", "@pipeworx/mcp-pixabay"]
    }
  }
}
```

Or run it directly to confirm it starts:

```bash
npx -y @pipeworx/mcp-pixabay
```

It speaks MCP over stdin/stdout and answers `initialize`/`tools/list`/`tools/call`
for **only** this pack's tools — none of the shared meta-tools the gateway
connection above adds. Same source, same tools, no ask_pipeworx routing.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Pixabay data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
