var world = {};
var myMover;
var myAsteroidsArr = [];

function setup() {
	world = {
		screenRatio: '16:9',
		canvasWidth: 800,
		gravity: 0.0,
		wind: 0.0,
		angleMode: DEGREES,
		asteroidsCant: 120,
		asteroidsRadiusMin: 20,
		asteroidsRadiusMax: 80,
		ratioFromWidth: function() {
			var ratioArr = this.screenRatio.split(':');
			var width = this.canvasWidth;
			var height = ratioArr[1] * width / ratioArr[0];
			world.width = width;
			world.height = height;
			world.edges = {
				top: -height,
				bottom: height * 2,
				left: -width,
				right: width * 2
			};
		}
	};
	world.ratioFromWidth();

	// Create Canvas
	createCanvas(world.width, world.height);

	// Set angle mode
	angleMode(world.angleMode);

	// Create Mover (Nave)
	myMover = new Mover();

	// Generate Asteroids
	myAsteroidsArr = generateAsteroids([]);
}

function draw() {
	// Clean all the canvas
	background(51);

	// Draw asteroids from array of asteroids
	drawAsteroids(myAsteroidsArr);

	// Draw Mover (nave)
	drawMover(myMover);

	// Check Collitions
	collitions(myMover, myAsteroidsArr);
}

function drawMover() {
	myMover.keyboard();
	//myMover.applyForce(createVector(world.wind, world.gravity));
	//myMover.update();
	myMover.show();
}

function drawAsteroids(myAsteroidsArr) {
	for (let i = 0; i < myAsteroidsArr.length; i++) {
		myAsteroidsArr[i].keyboard();
		myAsteroidsArr[i].applyForce(createVector(world.wind, world.gravity));
		myAsteroidsArr[i].edgesInfinite();
		myAsteroidsArr[i].update();
		myAsteroidsArr[i].show();
	}
}

function generateAsteroids(arrAsteroids) {
	if (arrAsteroids.length < world.asteroidsCant) {
		//Create the asteroids without check if overlap one each other.
		let x = random(world.edges.left, world.edges.right);
		let y = random(world.edges.top, world.edges.bottom);
		let r = random(world.asteroidsRadiusMin, world.asteroidsRadiusMax);
		arrAsteroids.push(new Asteroid({ x: x, y: y, r: r }));

		// Recorro y comparo contra todos los vecinos
		for (let index = 1; index < arrAsteroids.length; index++) {
			// Tomo un vecino en orden, y yo me excluyo de la busqueda
			let neighbor = arrAsteroids[index - 1];

			// Calculo la suma de los dos radios, para saber luego si se están tocando
			let sumedRadius = r + neighbor.r;

			// Calculo la distancia entre los dos asteroides desde sus centros
			let distanceBetweenAsteroids = int(dist(x, y, neighbor.x, neighbor.y));

			// Chequeo que la distancia entre este asteroide y un vecino
			// sea mayor a la suma de sus radios.
			// Si esto no sucede, es que se están tocando.
			let touching = distanceBetweenAsteroids < sumedRadius;
			if (touching) {
				// nos tocamos y tengo que eliminarme
				arrAsteroids.pop();
			}
		}

		generateAsteroids(arrAsteroids);
	}

	return arrAsteroids;
}

function collitions(nave, asteroidsArr) {
	asteroidsArr.forEach((asteroid) => {
		asteroid.circleColor = '#0000FF';
	});
}
