📘 Cloudflare AI Chat Memory Assistant

A serverless AI chat assistant built on Cloudflare Workers, Durable Objects, and Cloudflare Pages, designed to persist conversational memory across user interactions.

This project demonstrates how to build stateful AI applications on Cloudflare’s edge infrastructure with global low latency.

✨ Features

🧠 Persistent Chat Memory
Stores and retrieves conversation history using Cloudflare Durable Objects

⚡ Serverless & Edge-Native
Runs entirely on Cloudflare Workers — no traditional backend servers

🌍 Globally Distributed
Deployed on Cloudflare’s global edge network

🖥 Lightweight Frontend
Pure HTML + JavaScript frontend hosted on Cloudflare Pages

🔌 Clean API Design
Frontend communicates with Worker via JSON-based HTTP endpoints

🏗 Architecture Overview
┌─────────────────────┐
│   User Browser      │
│ (HTML / JS Frontend)│
└─────────┬───────────┘
          │  HTTP Requests
          ▼
┌─────────────────────┐
│ Cloudflare Pages    │
│  Static Frontend    │
└─────────┬───────────┘
          │  API Calls
          ▼
┌─────────────────────────────┐
│ Cloudflare Worker           │
│  - Request Routing          │
│  - Prompt Handling          │
│  - Memory Coordination      │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│ Durable Object              │
│  - Chat History Storage     │
│  - Session-level State      │
└─────────────────────────────┘

🧩 Tech Stack
Layer	Technology
Frontend	HTML, JavaScript
Backend	Cloudflare Workers
State	Cloudflare Durable Objects
Hosting	Cloudflare Pages
Tooling	Wrangler, Git, GitHub
📁 Project Structure
cf_ai_chat_memory_assistant/
├── pages/                 # Frontend (Cloudflare Pages)
│   ├── index.html
│   └── app.js
├── worker/                # Cloudflare Worker backend
│   ├── index.ts
│   ├── chatMemory.ts      # Durable Object logic
│   └── wrangler.toml
├── PROMPTS.md             # Prompt design notes
├── package.json
└── README.md

🚀 How It Works

The user sends a message from the frontend UI.

The request is routed to a Cloudflare Worker endpoint.

The Worker forwards the message to a Durable Object instance.

The Durable Object:

Retrieves previous conversation history

Appends the new message

Returns the updated context

The Worker sends the response back to the frontend.

This design enables stateful AI behavior while remaining fully serverless.

🧪 Local Development
# Install dependencies
npm install

# Run worker locally
wrangler dev


Frontend files can be served directly from the pages/ directory or deployed via Cloudflare Pages.

🌐 Deployment

Frontend: Deployed with Cloudflare Pages

Backend: Deployed using Wrangler to Cloudflare Workers

State: Managed via Durable Objects

All components are deployed on Cloudflare’s edge network for low latency worldwide.

🎯 Why This Project

This project was built to explore:

Stateful applications on the edge

Durable Objects as a memory layer for AI systems

Clean separation of frontend and serverless backend

Real-world Cloudflare-native architecture

📌 Future Improvements

🔐 User-based session authentication

🧠 Vector-based long-term memory

🤖 LLM integration with Cloudflare AI

🎨 Improved UI/UX

👤 Author

Ziyi
BSc Computer Science
Interested in distributed systems, serverless architecture, and edge computing.