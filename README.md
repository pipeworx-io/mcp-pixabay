# @pipeworx/pixabay

[Pixabay](https://pixabay.com/api/docs/) MCP — image + video search. Free key 100 req/min, 5k/hr.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Pixabay data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
