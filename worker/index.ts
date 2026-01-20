import { ChatMemory } from "./chatMemory";

// 直接导出，Wrangler 才能识别
export { ChatMemory };

export interface Env {
  CHAT_MEMORY: DurableObjectNamespace;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    // 只允许 POST
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Only POST allowed" }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 解析请求 body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { message } = body;
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // 获取 Durable Object stub
      const id = env.CHAT_MEMORY.idFromName("chat-memory");
      const stub = env.CHAT_MEMORY.get(id);

      // 调用 DO 方法
      const resp = await stub.fetch("https://dummy", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await resp.json();

      return new Response(JSON.stringify({ reply: data.reply }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || err }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};


