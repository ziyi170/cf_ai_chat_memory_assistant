# cf_ai_chat_memory_assistant
A chat-based AI assistant running on Cloudflare Workers AI (Llama 3.3), with persistent conversation memory powered by Durable Objects.

## Features
- LLM powered by Cloudflare Workers AI (Llama 3.3)
- Persistent chat memory using Durable Objects
- Simple chat interface using Cloudflare Pages
- Fully serverless architecture on Cloudflare

## Tech Stack
- Cloudflare Workers
- Workers AI
- Durable Objects
- Cloudflare Pages
- TypeScript / JavaScript

## Running Locally

```bash
npm install
cd worker
wrangler dev
