
let spacing = 30;

// Remember when each number was activated
let hoverTimes = {};

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5-background");

    textSize(20);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);

    // Find the number closest to the mouse
    let closestX = floor(mouseX / spacing) * spacing + spacing / 2;
    let closestY = floor(mouseY / spacing) * spacing + spacing / 2;

    // Check if the mouse is close enough
    let mouseIsClose =
        mouseX >= 0 && mouseX < width &&
        mouseY >= 0 && mouseY < height &&
        dist(mouseX, mouseY, closestX, closestY) < 20;

    // Activate only when entering a new number
    if (mouseIsClose) {
        let key = closestX + "," + closestY;

        if (key !== lastHovered) {
            hoverTimes[key] = millis();
        }

        lastHovered = key;
    } else {
        lastHovered = null;
    }

    // Draw the binary grid
    for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {

            let key = x + "," + y;

            // Check if fewer than 5 seconds have passed
            let isActive =
                hoverTimes[key] !== undefined &&
                millis() - hoverTimes[key] < 5000;

            if (isActive) {
                fill(180, 235, 255);
                text("0", x, y);
            } else {
                fill(40, 110, 210);
                text("1", x, y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    hoverTimes = {};
    lastHovered = null;
}
