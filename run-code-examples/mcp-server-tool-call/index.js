/**
 * Call an MCP server tool and parse the response
 * This example demonstrates how to call any MCP (Model Context Protocol) server tool
 * using the HTTP Request action in Shopify Flow
 */

export default function main({ sendHttpRequest }) {
  // The MCP server returns data in Server-Sent Events (SSE) format
  // We need to parse the SSE response to extract the actual data

  const lines = sendHttpRequest.body.split('\n');
  let result = null;
  let error = null;

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try {
        // Extract JSON from the SSE data line
        const jsonStr = line.substring(6); // Remove 'data: ' prefix
        const data = JSON.parse(jsonStr);

        // Check if this is the result message
        if (data.result && data.result.content) {
          // MCP servers can return different content types
          // Most commonly: text, resource, or image
          const content = data.result.content[0];

          if (content.type === 'text') {
            result = content.text;
          }
          // other possible content types (will require a different Output variable type)
          // else if (content.type === 'resource') {
          //   // Resources have uri and mimeType
          //   result = {
          //     uri: content.resource.uri,
          //     mimeType: content.resource.mimeType,
          //     text: content.resource.text
          //   };
          // } else if (content.type === 'image') {
          //   // Images have data and mimeType
          //   result = {
          //     data: content.image.data,
          //     mimeType: content.image.mimeType
          //   };
          // } else {
          //   // Handle other content types generically
          //   result = content;
          // }
        }

        // Check for errors
        if (data.error) {
          error = {
            code: data.error.code,
            message: data.error.message
          };
        }
      } catch (e) {
        // Skip lines that aren't valid JSON
        continue;
      }
    }
  }

  return {
    success: error === null && result !== null,
    result: result,
    error: error,
    // Return the raw response for debugging if needed
    rawResponse: sendHttpRequest.body
  };
}
