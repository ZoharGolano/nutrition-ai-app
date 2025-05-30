async function askAI() {
  const message = document.getElementById("userInput").value;
  const responseDiv = document.getElementById("responseText");
  responseDiv.innerText = "⏳ Thinking...";

  try {
    const res = await fetch("https://38c8692d-9be2-48d1-90b6-c8875b02809b-00-1kcq6533a9p7p.pike.replit.dev/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    responseDiv.innerText = data.reply;
  } catch (err) {
    responseDiv.innerText = "❌ Error contacting AI backend.";
    console.error(err);
  }
}
