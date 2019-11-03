class Mover {
	constructor() {
		this.location = createVector(width / 2, height / 2);
		this.velocity = createVector();
		this.acceleration = createVector();

		this.triangleColor = '#FF0000';
		this.triangleSize = 10;
		this.width = 25;
		this.height = 25;

		this.rectColor = '#FFFFFF';

		this.engines = {
			top: {
				on: false,
				x: 0,
				y: -(this.height / 2) - this.triangleSize / 2
			},
			down: {
				on: false,
				x: 0,
				y: this.height / 2 + this.triangleSize / 2
			},
			left: {
				on: false,
				x: -(this.width / 2) - this.triangleSize / 2,
				y: 0
			},
			right: {
				on: false,
				x: this.width / 2 + this.triangleSize / 2,
				y: 0
			}
		};
	}

	keyboard() {
		if (keyIsDown(LEFT_ARROW)) {
			this.engines.left.on = true;
		}

		if (keyIsDown(RIGHT_ARROW)) {
			this.engines.right.on = true;
		}

		if (keyIsDown(UP_ARROW)) {
			this.engines.top.on = true;
		}

		if (keyIsDown(DOWN_ARROW)) {
			this.engines.down.on = true;
		}
	}

	showAndHideEngines() {
		fill(this.triangleColor);

		if (this.engines.top.on) {
			this.drawEngine('top');
		}

		if (this.engines.down.on) {
			this.drawEngine('down');
		}

		if (this.engines.left.on) {
			this.drawEngine('left');
		}

		if (this.engines.right.on) {
			this.drawEngine('right');
		}
	}

	drawEngine(orientation) {
		var orientationArr = [];
		orientationArr['top'] = -90;
		orientationArr['down'] = -270;
		orientationArr['left'] = -180;
		orientationArr['right'] = 0;

		push();

		translate(this.engines[orientation].x, this.engines[orientation].y);
		rotate(orientationArr[orientation]);

		if (this.engines[orientation].on) {
			triangle(
				-this.triangleSize / 2,
				this.triangleSize / 2,
				-this.triangleSize / 2,
				-this.triangleSize / 2,
				this.triangleSize,
				0
			);
		}

		this.engines['top'].on = false;
		this.engines['down'].on = false;
		this.engines['left'].on = false;
		this.engines['right'].on = false;

		pop();
	}

	applyForce(force) {
		/*
		this.acceleration.add(force);
		this.velocity.limit(5);
		*/
	}

	update() {
		/*this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		this.velocity.limit(10);
		*/
	}

	show() {
		push();
		translate(this.location.x, this.location.y);

		//NAVE
		fill(this.rectColor);
		rectMode(CENTER);

		rect(0, 0, this.width, this.height);

		//Engines
		this.showAndHideEngines();
		pop();
	}
}
