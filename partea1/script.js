const API_URL = "http://localhost:3000/quotes";
const quotesList = document.getElementById("quotes-list");
const form = document.getElementById("quote-form");
const textarea = form.querySelector("textarea");
const input = form.querySelector("input");

function createQuoteCard({ id, quote, author }) {
  const div = document.createElement("div");
  div.className = "quote-card";
  div.innerHTML = `
    <p>"${quote}"</p>
    <small>- ${author}</small>
    <button class="delete-btn" data-id="${id}">🗑️ Șterge</button>
  `;
  return div;
}

async function getQuotes() {
  const res = await fetch(API_URL);
  const quotes = await res.json();
  quotesList.innerHTML = "";
  quotes.forEach(quoteObj => {
    const card = createQuoteCard(quoteObj);
    quotesList.appendChild(card);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newQuote = {
    quote: textarea.value.trim(),
    author: input.value.trim()
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newQuote)
  });

  textarea.value = "";
  input.value = "";
  getQuotes();
});

quotesList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getQuotes();
  }
});

document.addEventListener("DOMContentLoaded", getQuotes);
