const gifs = [
    'gifs/77300-562009792_medium.gif',
    'gifs/111516-691223009_medium.gif',
    'gifs/119302-717336883_medium.gif',
    'gifs/203923-922675870.gif',
];

let lastIndex = parseInt(localStorage.getItem('bgIndex'), 10);
if (isNaN(lastIndex)) lastIndex = -1;

const nextIndex = (lastIndex + 1) % gifs.length;
localStorage.setItem('bgIndex', nextIndex);

document.body.style.backgroundImage = `url('${gifs[nextIndex]}')`;

const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    statusMessage.textContent = "Thank You! Your message has been sent!";
    statusMessage.style.color = "green";

    contactForm.reset();
});