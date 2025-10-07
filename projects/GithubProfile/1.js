let divEle = document.querySelector("#main");
let input = document.querySelector("#input");
let btn = document.querySelector("#button");

function getUser(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("❌ " + response.status + " - User not found");
    }
    return response.json();
  });
}

function getDetails(username) {
  username = username.trim().toLowerCase();
  getUser(`https://api.github.com/users/${username}`)
    .then((data) => {
      displayUser(data);
    })
    .catch((err) => {
      divEle.innerHTML = `<p style="color:red; font-weight:bold;">${err.message}</p>`;
    });
}

function displayUser(data) {
  let card = document.createElement("div");
  card.classList.add("user-card");
  card.innerHTML = `
    <img src="${data.avatar_url}" alt="Profile Image" />
    <h3>${data.name || data.login}</h3>
    <p class="email">${data.email || "No email public"}</p>
    <a href="${data.html_url}" target="_blank">
      <button class="btn">View Profile</button>
    </a>
  `;
  divEle.innerHTML = ""; //
  divEle.appendChild(card);
}

function takeInput() {
  btn.addEventListener("click", function () {
    let value = input.value.trim();
    if (value) {
      getDetails(value);
    }
  });

  // Enter key support
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      btn.click();
    }
  });
}

takeInput();
