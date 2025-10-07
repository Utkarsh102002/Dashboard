"use strict";

const OPEN_IN_NEW_TAB = true;
const PROJECTS = [
  {
    title: "LAZAREV. - Animated Website",
    description:
      "Advanced Animations and Effects: Replicated the interactive animations and effects of the original Lazarev Website",
    url: "https://lavarev.vercel.app/",
    thumbnail: "./Assets/download.png",
    tags: ["HTML", "CSS", "JS", "LOCOMOTIVE JS", "GSAP"],
  },
  {
    title: "Weather App (React + Vite)",
    description: "OpenWeatherMap API based weather.",
    url: "https://weather-app-rust-six-50.vercel.app/",
    thumbnail: "./Assets/download.jpg",
    tags: ["React", "Vite", "API", "FETCH"],
  },
  {
    title: "Quiz Game App",
    description: "Quiz Game App",
    url: "PROJECTS/QuizGameApp/1.html",
    tags: ["HTML", "CSS"],
  },
  {
    title: "TO DO LIST",
    description: "",
    url: "projects/TODOLIST/1.html",
    thumbnail: "assets/expense-thumb.png",
    tags: ["JS", "LocalStorage"],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  renderProjects(PROJECTS, grid);
});

function renderProjects(list, grid) {
  grid.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Koi project nahi mila.";
    grid.appendChild(empty);
    return;
  }

  list.forEach((p) => {
    const a = document.createElement("a");
    a.className = "project-card";
    a.href = p.url;
    if (OPEN_IN_NEW_TAB) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    a.setAttribute("role", "listitem");
    a.setAttribute("aria-label", p.title || "Project");

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = `${p.title || "Project"} thumbnail`;
    const src = p.thumbnail ? p.thumbnail : generatePlaceholder(p.title);
    img.src = src;
    img.onerror = () => {
      img.src = generatePlaceholder(p.title);
    };
    thumb.appendChild(img);

    const content = document.createElement("div");
    content.className = "content";
    const h3 = document.createElement("h3");
    h3.textContent = p.title || "Untitled";
    const desc = document.createElement("p");
    desc.textContent = p.description || "";
    content.appendChild(h3);
    content.appendChild(desc);

    if (Array.isArray(p.tags) && p.tags.length) {
      const ul = document.createElement("ul");
      ul.className = "tags";
      p.tags.slice(0, 6).forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
      content.appendChild(ul);
    }

    a.appendChild(thumb);
    a.appendChild(content);
    grid.appendChild(a);
  });
}

function generatePlaceholder(title = "?") {
  const initial = String(title).trim().charAt(0).toUpperCase() || "?";
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='%23d9e4ff'/>
          <stop offset='100%' stop-color='%238fb3ff'/>
        </linearGradient>
      </defs>
      <rect width='800' height='450' fill='url(%23g)'/>
      <text x='50%' y='50%' dy='.35em' text-anchor='middle'
            font-family='Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            font-size='200' fill='%233a3f45'>${initial}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
