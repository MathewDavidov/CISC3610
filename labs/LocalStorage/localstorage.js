const saveText = () => {
  const textarea = document.getElementById("textarea").value;
  localStorage.setItem("text", textarea);
};

const clearText = () => {
  console.log("cleared");
  document.getElementById("textarea").value = "";
  localStorage.removeItem("text");
};

window.onload = () => {
  document.getElementById("textarea").innerHTML = localStorage.getItem("text");
};
