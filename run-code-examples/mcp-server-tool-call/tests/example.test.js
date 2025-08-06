import main from "../index";

describe("MCP Server Tool Call Parser", () => {
  describe("successful text response", () => {
    it("should parse a simple text response from MCP server", () => {
      const input = {
          sendHttpRequest: {
              body: `data: {"jsonrpc":"2.0","id":"session_123","result":{"content":[{"type":"text","text":"A stitch in time saves nine."}]}}
event: done
data: [DONE]`
          }
      };

      const expectedOutput = {
        success: true,
        result: "A stitch in time saves nine.",
        error: null,
        rawResponse: input.sendHttpRequest.body
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("error response", () => {
    it("should handle error responses from MCP server", () => {
      const input = {
          sendHttpRequest: {
              body: `data: {"jsonrpc":"2.0","id":"session_error","error":{"code":-32601,"message":"Method not found"}}
event: done
data: [DONE]`
          }
      };

      const expectedOutput = {
        success: false,
        result: null,
        error: {
          code: -32601,
          message: "Method not found"
        },
        rawResponse: input.sendHttpRequest.body
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("malformed response", () => {
    it("should handle malformed SSE responses gracefully", () => {
      const input = {
         sendHttpRequest: {
             body: `Some random text
not properly formatted
data: {invalid json}
more random text`
         }
      };

      const expectedOutput = {
        success: false,
        result: null,
        error: null,
        rawResponse: input.sendHttpRequest.body
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("empty response", () => {
    it("should handle empty responses", () => {
      const input = {
          sendHttpRequest: {
              body: ``
          }
      };

      const expectedOutput = {
        success: false,
        result: null,
        error: null,
        rawResponse: ""
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("multiline SSE with progress events", () => {
    it("should extract the final result from a multi-event SSE stream", () => {
      const input = {
          sendHttpRequest: {
              body: `event: progress
data: {"message":"Processing request..."}

event: progress
data: {"message":"Fetching data..."}

data: {"jsonrpc":"2.0","id":"session_multi","result":{"content":[{"type":"text","text":"Final result after processing"}]}}

event: done
data: [DONE]`
          }
      };

      const expectedOutput = {
        success: true,
        result: "Final result after processing",
        error: null,
        rawResponse: input.sendHttpRequest.body
      };

      const result = main(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
