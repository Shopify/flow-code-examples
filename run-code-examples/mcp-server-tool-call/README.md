# MCP Server Tool Call Example

This example demonstrates how to call an MCP (Model Context Protocol) server tool from Shopify Flow using the HTTP Request and Run Code actions.

## Overview

MCP servers provide tools that can be called via HTTP using the JSON-RPC protocol. This example shows how to:
1. Make the HTTP request to an MCP server (using Flow's HTTP Request action)
2. Parse the Server-Sent Events (SSE) response format
3. Extract the actual result data from the response

## How to Use in Shopify Flow

### Step 1: HTTP Request Action

Configure an HTTP Request action with:
- **Method**: POST
- **URL**: Your MCP server endpoint
- **Headers**:
  - `Content-Type: application/json`
  - `Accept: text/event-stream, application/json`
  - Any authentication headers required by your server
- **Body**:
```json
{
  "jsonrpc": "2.0",
  "id": "unique-session-id",
  "method": "tools/call",
  "params": {
    "name": "your-tool-name",
    "arguments": {
      "arg1": "value1",
      "arg2": "value2"
    }
  }
}
```

### Step 2: Run Code Action

Use this example code to parse the SSE response from the MCP server. The code handles:
- Text responses
- Resource responses (with URI and MIME type)
- Image responses (base64 encoded)
- Error responses
- Malformed responses

### Step 3: Use the Output

The code returns:
- `success`: Boolean indicating if the call was successful
- `result`: The parsed data from the MCP server
- `error`: Error information if the call failed
- `rawResponse`: The original SSE response for debugging

## Example MCP Servers

Some examples of MCP servers you might call:
- Document retrieval servers
- AI/LLM tool servers
- Data transformation services
- Custom business logic servers

## Response Format

MCP servers return responses in Server-Sent Events (SSE) format:
```
data: {"jsonrpc":"2.0","id":"session_id","result":{"content":[{"type":"text","text":"Your result here"}]}}
event: done
data: [DONE]
```

This code parses that format and extracts the useful data.

## Testing

Run the tests with:
```bash
npm test -- run-code-examples/mcp-server-tool-call/tests/example.test.js
```

## References

- [MCP Specification](https://modelcontextprotocol.io/)
- [Original Gist with cURL examples](https://gist.github.com/joshbeckman/3628c311e9c86ef39e72d8336c129276)