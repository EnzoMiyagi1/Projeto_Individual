const slides = document.querySelector(".slides");
const imagens = document.querySelectorAll(".slides img");

let index = 0;

document.querySelector(".next").addEventListener("click", () => {
  index++;
  if (index >= imagens.length) index = 0;
  atualizarCarrossel();
});

document.querySelector(".prev").addEventListener("click", () => {
  index--;
  if (index < 0) index = imagens.length - 1;
  atualizarCarrossel();
});

function atualizarCarrossel() {
  slides.style.transform = `translateX(${-index * 100}%)`;
}

// Avanço automático a cada 3 segundos
setInterval(() => {
  index++;
  if (index >= imagens.length) index = 0;
  atualizarCarrossel();
}, 7000);