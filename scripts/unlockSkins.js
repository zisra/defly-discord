const skins = document.querySelectorAll(".card");
for (let item of skins) {
  item.className = "card";
}
const buttons = document.querySelectorAll(
  ".buy, .disabled, .discord, .twitter, .youtube, .facebook"
);
for (let item of buttons) {
  console.log(item);
  item.remove();
}
