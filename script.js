async function askAI() {
  const message = document.getElementById("userInput").value;
  const responseDiv = document.getElementById("responseText");
  responseDiv.innerText = "⏳ Thinking...";

  try {
    const res = await fetch("https://nutrition-backend.zohargolan.replit.dev/api/ask", {
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
