var config = {
	gravity: 0.019
};
var myMover;

function setup() {
	createCanvas(600, 400);
	angleMode(DEGREES);

	myMover = new Mover();
}

function draw() {
	background(51);

	myMover.keyboard();
	myMover.applyForce(createVector(0, config.gravity));
	myMover.edgesInfinite();
	myMover.update();
	myMover.show();
}
