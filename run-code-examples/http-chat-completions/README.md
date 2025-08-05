# HTTP Chat Completions Parser

This example demonstrates how to parse responses from LLM (Large Language Model) chat completion APIs in Shopify Flow using the Run Code action. It handles responses from OpenAI, Anthropic Claude, and Google Gemini APIs.

## Overview

When using Shopify Flow's "Send HTTP Request" action to call an LLM API, the response comes back as a JSON string in the `body` field. This code action parses that response and extracts the relevant information in a structured format.

## Supported Providers

### OpenAI
- **Documentation**: [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/chat/create)
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Models**: GPT-4, GPT-3.5-turbo, etc.

### Anthropic Claude
- **Documentation**: [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)
- **Endpoint**: `https://api.anthropic.com/v1/messages`
- **Models**: Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku

### Google Gemini (OpenAI-compatible)
- **Documentation**: [Gemini OpenAI Compatibility](https://ai.google.dev/gemini-api/docs/openai)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`
- **Models**: Gemini 2.0 Flash, Gemini 1.5 Pro, etc.

## How to Use

### Step 1: Configure Send HTTP Request

In your Shopify Flow workflow:

1. Add a "Send HTTP Request" action before the "Run Code" action
2. Configure it with one of the example cURL requests below
3. Store your API key in Flow's secret storage for security

### Step 2: Add Run Code Action

1. Add a "Run Code" action after the Send HTTP Request
2. Copy the code from `index.js` into the action
3. Configure the input query to receive the HTTP response
4. Configure the output schema to match `output.graphql`

## Example cURL Requests

Copy and adapt these examples for the Send HTTP Request action:

### OpenAI Example

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant for an e-commerce store."
      },
      {
        "role": "user",
        "content": "Write a product description for: {{product.title}}"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

> [!NOTE]
> Replace `YOUR_OPENAI_API_KEY` with your actual OpenAI API key stored in Flow's secret storage. You can also use `gpt-3.5-turbo` or other models as needed.

### Anthropic Claude Example

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: YOUR_ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 500,
    "temperature": 0.7,
    "system": "You are a helpful assistant for an e-commerce store.",
    "messages": [
      {
        "role": "user",
        "content": "Write a product description for: {{product.title}}"
      }
    ]
  }'
```

> [!NOTE]
> Replace `YOUR_ANTHROPIC_API_KEY` with your actual Anthropic API key stored in Flow's secret storage. You can also use other Claude models like `claude-3-opus` or `claude-3-haiku`.

### Google Gemini Example (OpenAI-compatible)

```bash
curl https://generativelanguage.googleapis.com/v1beta/openai/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_GEMINI_API_KEY" \
  -d '{
    "model": "gemini-2.0-flash",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant for an e-commerce store."
      },
      {
        "role": "user",
        "content": "Write a product description for: {{product.title}}"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

> [!NOTE]
> Replace `YOUR_GEMINI_API_KEY` with your actual Google Gemini API key stored in Flow's secret storage. You can also use other Gemini models like `gemini-1.5-pro`.

## Flow Variables

In the cURL examples above, you can use Flow variables like:
- `{{product.title}}` - Product title
- `{{customer.email}}` - Customer email
- `{{order.name}}` - Order number
- Any other data available in your workflow trigger or from upstream actions

## Output Structure

The code returns a structured object with:

```javascript
{
  success: Boolean,        // Whether parsing was successful
  error: String,          // Error message if any
  content: String,        // The AI's response text
  model: String,          // Model used (e.g., "gpt-4", "claude-3-sonnet")
  usage: {                // Token usage statistics
    promptTokens: Number,
    completionTokens: Number,
    totalTokens: Number
  },
  finishReason: String,   // Why the response ended (e.g., "stop", "length")
  provider: String        // "openai-compatible" or "anthropic"
}
```

## Error Handling

The parser handles various error scenarios:
- Invalid JSON responses
- Missing required fields
- API error responses
- Network failures
- Unknown response formats

## Security Best Practices

1. **Never hardcode API keys** - Use Flow's secret storage
2. **Set appropriate rate limits** - Prevent excessive API calls
3. **Validate responses** - Check the `success` field before using `content`
4. **Monitor usage** - Track token consumption via the `usage` field
5. **Use appropriate models** - Balance cost vs. quality for your use case

## Common Use Cases

- **Product Description Generation**: Generate SEO-friendly product descriptions
- **Customer Support Responses**: Draft personalized email responses
- **Content Translation**: Translate product information or customer messages
- **Order Summary Generation**: Create natural language order summaries
- **Review Response Drafting**: Generate responses to customer reviews
- **FAQ Generation**: Create frequently asked questions from product data

## Troubleshooting

### Issue: "Failed to parse response"
- Check that the Send HTTP Request is returning valid JSON
- Verify the API endpoint is correct
- Ensure your API key has proper permissions

### Issue: "Unknown response format"
- The API response structure may have changed
- Check the provider's documentation for updates
- Review the raw response in `content` when error occurs

### Issue: No response content
- Verify the API key is valid and active
- Check API rate limits and quotas
- Ensure the request body is properly formatted

## Testing

Run the included tests to verify the parser works correctly:

```bash
npm test -- run-code-examples/http-chat-completions/tests/example.test.js
```

## Support

For issues or questions about:
- **This example**: Open an issue in this repository
- **Shopify Flow**: Visit [Shopify Help Center](https://help.shopify.com/en/manual/shopify-flow)
- **API Providers**: Consult their respective documentation linked above
