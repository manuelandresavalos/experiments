class Mover {
	constructor() {
		this.location = createVector(width / 2, height / 2);
		this.velocity = createVector();
		this.acceleration = createVector();

		this.triangleColor = '#FF0000';
		this.triangleSize = 10;

		this.rectColor = '#FFFFFF';

		this.engines = [
			{ on: false },
			{ on: false },
			{ on: false },
			{ on: false }
		];
	}

	keyboard() {
		if (keyIsDown(LEFT_ARROW)) {
			this.acceleration.add(0.05, 0);
			this.engines[2].on = true;
		}

		if (keyIsDown(RIGHT_ARROW)) {
			this.acceleration.add(-0.05, 0);
			this.engines[0].on = true;
		}

		if (keyIsDown(UP_ARROW)) {
			this.acceleration.add(0, 0.05);
			this.engines[3].on = true;
		}

		if (keyIsDown(DOWN_ARROW)) {
			this.acceleration.add(0, -0.05);
			this.engines[1].on = true;
		}
	}

	edgesInfinite() {
		if (this.location.x >= width) {
			this.location.x = 0;
		}
		if (this.location.x < 0) {
			this.location.x = width;
		}
		if (this.location.y >= height) {
			this.location.y = 0;
		}
		if (this.location.y < 0) {
			this.location.y = height;
		}
	}

	applyForce(force) {
		this.acceleration.add(force);
		this.velocity.limit(5);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		this.velocity.limit(10);
	}

	show() {
		push();
		translate(this.location.x, this.location.y);

		//NAVE
		fill(this.rectColor);
		rectMode(CENTER);
		rect(0, 0, 50, 50);

		//Engines
		this.showAndHideEngines();
		pop();
	}

	showAndHideEngines() {
		fill(this.triangleColor);
		var angle = 0;
		var newX = 30;
		for (var i = 0; i < 4; i++) {
			push();
			rotate(angle);
			if (this.engines[i].on) {
				triangle(
					-this.triangleSize / 2 + newX,
					this.triangleSize / 2,
					-this.triangleSize / 2 + newX,
					-this.triangleSize / 2,
					this.triangleSize + newX,
					0
				);
			}
			this.engines[i].on = false;
			angle += 90;
			pop();
		}
	}
}
