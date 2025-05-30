const translations = {
    en: { ask: "Ask something...", send: "Send", title: "Nutrition Assistant" },
    he: { ask: "שאל משהו...", send: "שלח", title: "עוזר תזונה" }
};

function updateLanguage(lang) {
    document.getElementById("title-text").textContent = translations[lang].title;
    document.getElementById("askInput").placeholder = translations[lang].ask;
    document.getElementById("sendBtn").textContent = translations[lang].send;
}

document.getElementById("langSelect").addEventListener("change", (e) => {
    updateLanguage(e.target.value);
});

document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
};

document.getElementById("sendBtn").addEventListener("click", async () => {
    const message = document.getElementById("askInput").value;
    const responseArea = document.getElementById("responseArea");
    responseArea.textContent = "Loading...";
    const res = await fetch("https://38c8692d-9be2-48d1-90b6-c8875b02809b-00-1kcq6533a9p7p.pike.replit.dev/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });
    const data = await res.json();
    responseArea.textContent = data.reply;
    saveTip(data.reply);
});

function saveTip(message) {
    let tips = JSON.parse(localStorage.getItem("nutrition_tips")) || [];
    tips.push({ message, time: new Date().toISOString() });
    localStorage.setItem("nutrition_tips", JSON.stringify(tips));
    renderTips();
}

function renderTips() {
    let tips = JSON.parse(localStorage.getItem("nutrition_tips")) || [];
    const list = document.getElementById("tipList");
    list.innerHTML = "";
    tips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = `${new Date(tip.time).toLocaleString()}: ${tip.message}`;
        list.appendChild(li);
    });
}

window.onload = () => {
    renderTips();
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }
};
