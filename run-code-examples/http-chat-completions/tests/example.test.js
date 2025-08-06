import main from '../index.js';

describe('HTTP Chat Completions Parser', () => {
  describe('OpenAI-style responses', () => {
    test('should parse OpenAI chat completion response', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            model: "gpt-4",
            choices: [{
              index: 0,
              message: {
                role: "assistant",
                content: "Hello! How can I help you today?"
              },
              finish_reason: "stop"
            }],
            usage: {
              prompt_tokens: 9,
              completion_tokens: 12,
              total_tokens: 21
            }
          }),
          status: 200
        }
      };

      const result = main(input);
      
      expect(result.success).toBe(true);
      expect(result.error).toBe(null);
      expect(result.content).toBe("Hello! How can I help you today?");
      expect(result.model).toBe("gpt-4");
      expect(result.usage).toEqual({
        promptTokens: 9,
        completionTokens: 12,
        totalTokens: 21
      });
      expect(result.finishReason).toBe("stop");
      expect(result.provider).toBe("openai-compatible");
    });

    test('should parse Gemini OpenAI-compatible response', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            id: "gemini-123",
            model: "gemini-2.0-flash",
            choices: [{
              index: 0,
              message: {
                role: "assistant",
                content: "I'm Gemini, how can I assist?"
              },
              finish_reason: "stop"
            }],
            usage: {
              prompt_tokens: 10,
              completion_tokens: 8,
              total_tokens: 18
            }
          }),
          status: 200
        }
      };

      const result = main(input);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe("I'm Gemini, how can I assist?");
      expect(result.model).toBe("gemini-2.0-flash");
      expect(result.provider).toBe("openai-compatible");
    });
  });

  describe('Anthropic Claude responses', () => {
    test('should parse Anthropic Claude response', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            id: "msg_123",
            type: "message",
            role: "assistant",
            model: "claude-sonnet-4-20250514",
            content: [{
              type: "text",
              text: "Hello! I'm Claude. How can I help you?"
            }],
            stop_reason: "end_turn",
            stop_sequence: null,
            usage: {
              input_tokens: 10,
              output_tokens: 15
            }
          }),
          status: 200
        }
      };

      const result = main(input);
      
      expect(result.success).toBe(true);
      expect(result.error).toBe(null);
      expect(result.content).toBe("Hello! I'm Claude. How can I help you?");
      expect(result.model).toBe("claude-sonnet-4-20250514");
      expect(result.usage).toEqual({
        promptTokens: 10,
        completionTokens: 15,
        totalTokens: 25
      });
      expect(result.finishReason).toBe("end_turn");
      expect(result.provider).toBe("anthropic");
    });

    test('should handle multiple text blocks in Anthropic response', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            id: "msg_456",
            type: "message",
            role: "assistant",
            model: "claude-3-opus",
            content: [
              { type: "text", text: "First paragraph." },
              { type: "text", text: "Second paragraph." }
            ],
            stop_reason: "stop_sequence",
            usage: {
              input_tokens: 20,
              output_tokens: 30
            }
          }),
          status: 200
        }
      };

      const result = main(input);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe("First paragraph.\nSecond paragraph.");
      expect(result.provider).toBe("anthropic");
    });
  });

  describe('Error handling', () => {
    test('should handle missing sendHTTPRequest', () => {
      const result = main({});
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("No HTTP request response found");
      expect(result.content).toBe(null);
    });

    test('should handle missing body', () => {
      const input = {
        sendHTTPRequest: {
          status: 200
        }
      };
      
      const result = main(input);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("No HTTP request response found");
    });

    test('should handle invalid JSON', () => {
      const input = {
        sendHTTPRequest: {
          body: "Invalid JSON {",
          status: 200
        }
      };
      
      const result = main(input);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain("Failed to parse response");
      expect(result.content).toBe("Invalid JSON {");
    });

    test('should handle API error response', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            error: {
              message: "Invalid API key",
              type: "authentication_error",
              code: "invalid_api_key"
            }
          }),
          status: 401
        }
      };
      
      const result = main(input);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid API key");
      expect(result.content).toBe(null);
    });

    test('should handle unknown response format', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            unknownField: "value",
            anotherField: 123
          }),
          status: 200
        }
      };
      
      const result = main(input);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe("Unknown response format");
      expect(result.content).toContain("unknownField");
    });
  });

  describe('Edge cases', () => {
    test('should handle response without usage data', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            choices: [{
              message: {
                content: "Response without usage"
              }
            }]
          }),
          status: 200
        }
      };
      
      const result = main(input);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe("Response without usage");
      expect(result.usage).toBe(null);
    });

    test('should handle response without model information', () => {
      const input = {
        sendHTTPRequest: {
          body: JSON.stringify({
            choices: [{
              message: {
                content: "Response without model"
              }
            }]
          }),
          status: 200
        }
      };
      
      const result = main(input);
      
      expect(result.success).toBe(true);
      expect(result.content).toBe("Response without model");
      expect(result.model).toBe(null);
    });
  });
});