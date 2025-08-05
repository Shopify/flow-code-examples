/**
 * Parse the response from a Send HTTP Request step that calls an LLM chat completions API.
 * This example handles responses from OpenAI, Anthropic Claude, and Google Gemini APIs.
 *
 * The Send HTTP Request step should be configured to call one of these endpoints:
 * - OpenAI: https://api.openai.com/v1/chat/completions
 * - Anthropic: https://api.anthropic.com/v1/messages
 * - Google Gemini: https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
 */
export default function main({sendHTTPRequest}) {
  if (!sendHTTPRequest || !sendHTTPRequest.body) {
    return {
      success: false,
      error: "No HTTP request response found",
      content: null,
      model: null,
      usage: null
    };
  }

  try {
    const response = JSON.parse(sendHTTPRequest.body);

    // Detect and parse OpenAI-style response (used by OpenAI and Gemini)
    if (response.choices && Array.isArray(response.choices)) {
      const firstChoice = response.choices[0];
      return {
        success: true,
        error: null,
        content: firstChoice.message?.content || firstChoice.text || "",
        model: response.model || null,
        usage: response.usage ? {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens
        } : null,
        finishReason: firstChoice.finish_reason || null,
        provider: "openai-compatible"
      };
    }

    // Detect and parse Anthropic Claude response
    if (response.content && Array.isArray(response.content)) {
      const textContent = response.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("\n");

      return {
        success: true,
        error: null,
        content: textContent,
        model: response.model || null,
        usage: response.usage ? {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: (response.usage.input_tokens || 0) + (response.usage.output_tokens || 0)
        } : null,
        finishReason: response.stop_reason || null,
        provider: "anthropic"
      };
    }

    // Handle error responses
    if (response.error) {
      return {
        success: false,
        error: response.error.message || response.error.type || "Unknown error",
        content: null,
        model: null,
        usage: null
      };
    }

    // Unknown response format
    return {
      success: false,
      error: "Unknown response format",
      content: JSON.stringify(response),
      model: null,
      usage: null
    };

  } catch (parseError) {
    return {
      success: false,
      error: `Failed to parse response: ${parseError.message}`,
      content: sendHTTPRequest.body,
      model: null,
      usage: null
    };
  }
}
