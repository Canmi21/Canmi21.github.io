document.addEventListener("DOMContentLoaded", function() {
    var images = [
        '/img/default-background.png',
        '/img/default-bridge.png',
        '/img/default-mountain.png',
        '/img/default-sky.png',
        '/img/default-star.png',
        '/img/default-volcano.png'
    ];

    var randomIndex = Math.floor(Math.random() * images.length);
    var selectedImage = images[randomIndex];

    document.body.style.backgroundImage = 'url(' + selectedImage + ')';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
});
