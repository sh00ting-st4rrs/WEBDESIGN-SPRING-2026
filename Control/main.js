const flowers = [
  { img: "common dandelion.png", name: "Common Dandelion", native: true },
  { img: "dames rocket.png", name: "Dame's Rocket", native: false },
  { img: "grey field speedwell.png", name: "Grey Field Speedwell", native: true },
  { img: "italian arum.png", name: "Italian Arum", native: false },
  { img: "spring star.png", name: "Spring Star", native: true },
  { img: "lesser celandine.png", name: "Lesser Celandine", native: false }
];

let currentFlower;
let score = 0;
let index = 0;

const flowerEl = document.getElementById("flower");
const basket = document.getElementById("basket");
const trash = document.getElementById("trash");
const slots = document.getElementById("slots");

const nameEL = document.getElementById("flowerName");

function loadFlower() {
    if (index >= flowers.length) {
        endGame();
        return;
    }

    currentFlower = flowers[index];
    flowerEl.src = currentFlower.img;
    nameEL.innerText = currentFlower.name
}

/* drag and drop function*/

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

flowerEl.addEventListener("pointerdown", (e) => {
    isDragging = true;

    const rect = flowerEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    flowerEl.style.position = "fixed";

    flowerEl.setPointerCapture(e.pointerId);
});

document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    flowerEl.style.left = (e.clientX - offsetX) + "px";
    flowerEl.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("pointerup", (e) => {
    if (!isDragging) return;

    isDragging = false;

    const x = e.clientX;
    const y = e.clientY;

    const basketRect = basket.getBoundingClientRect();
    const trashRect = trash.getBoundingClientRect();

    const droppedInBasket =
        x > basketRect.left &&
        x < basketRect.right &&
        y > basketRect.top &&
        y < basketRect.bottom;

    const droppedInTrash =
        x > trashRect.left &&
        x < trashRect.right &&
        y > trashRect.top &&
        y < trashRect.bottom;

    if (droppedInBasket) {
        handleDrop(true);
    } else if (droppedInTrash) {
        handleDrop(false);
    }

    // reset position
    flowerEl.style.position = "static";
    flowerEl.style.left = "";
    flowerEl.style.top = "";
});

function handleDrop(isBasket) {
    const correct = currentFlower.native === isBasket;

    if (correct) score++;

    addToSlot(currentFlower.img);
    index++
    loadFlower();
}

function addToSlot(img) {
    const slot = document.createElement("img");
    slot.src = img;
    slot.classList.add("slot");
    slots.appendChild(slot);
}

function endGame() {
    document.getElementById("endScreen").classList.remove("hidden");
    document.getElementById("scoreText").innerText =
        `Score: ${score} / ${flowers.length}`;
    flowerEl.style.display = "block";
}

function restartGame() {
    console.log("restartGame");
    
    score = 0;
    index = 0;
    
    slots.innerHTML = "";
    document.getElementById("endScreen").classList.add("hidden");

    const flowerEl = document.getElementById("flower");

    shuffleFlowers();
    loadFlower();
}
shuffleFlowers();
loadFlower();

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartGame);

function shuffleFlowers() {
    for (let i = flowers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flowers[i], flowers[j]] = [flowers[j], flowers[i]];
    }
}

document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "../index.html";
});
