const chat = document.getElementById("chat");
const input = document.getElementById("input");

// Worker URL
const WORKER_URL = "https://cf-ai-chat-memory-assistant.ziyiy5661.workers.dev/";

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = role;
  div.innerText = `${role}: ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const message = input.value;
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    addMessage("ai", data.reply);
  } catch (err) {
    addMessage("ai", "⚠️ 无法连接到 Worker，请稍后重试");
  }
}

// 回车键发送
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

// 点击按钮发送（如果你有按钮）
const sendBtn = document.getElementById("send-btn");
if (sendBtn) sendBtn.addEventListener("click", send);
