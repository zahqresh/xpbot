console.log("loaded...");
function saveID(id) {
  localStorage.setItem("ID", id);
  console.log("DONE!");
}

function getID() {
  let id = localStorage.getItem("ID");
  return id;
}

function createdFor(id) {
  localStorage.setItem("created_for", id);
  console.log("DONE!");
}

function getCreatedFor() {
  let id = localStorage.getItem("created_for");
  return id;
}

function redirect() {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  let code = params.get("code");
  localStorage.setItem("code", code);
  console.log("Redirecting to get...");
  window.location.replace(
    `https://www.cryptolegions.link//users/add-user?code=${localStorage.getItem(
      "code"
    )}&id=${localStorage.getItem("ID")}&createdfor=${localStorage.getItem(
      "created_for"
    )}`
  );
}
