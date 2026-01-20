export class ChatMemory {
  messages: string[];

  constructor(state: DurableObjectState, env: any) {
    this.messages = [];
    // 这里 state 可以用来持久化，如果需要可以使用 state.storage
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Only POST allowed in DO" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

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

    // 保存最近 20 条消息
    this.messages.push(message);
    if (this.messages.length > 20) this.messages.shift();

    const context = this.messages.slice(-3).join(" | ");
    const reply = `我记住了: "${message}". 最近消息: ${context}`;

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

