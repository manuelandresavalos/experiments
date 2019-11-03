class Asteroid {
	constructor(config) {
		this.edges = {
			top: -height,
			bottom: height * 2,
			left: -width,
			right: width * 2
		};

		this.x = config.x;
		this.y = config.y;
		this.r = config.r;

		this.location = createVector(this.x, this.y);
		this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
		this.acceleration = createVector();

		this.circleColor = '#FF00FF';
		this.circleStrokeWeight = 2;
		this.circleStrokeColor = '#FF00FF';
	}

	keyboard() {
		if (keyIsDown(LEFT_ARROW)) {
			this.acceleration.add(-0.05, 0);
		}

		if (keyIsDown(RIGHT_ARROW)) {
			this.acceleration.add(0.05, 0);
		}

		if (keyIsDown(UP_ARROW)) {
			this.acceleration.add(0, -0.05);
		}

		if (keyIsDown(DOWN_ARROW)) {
			this.acceleration.add(0, 0.05);
		}
	}

	edgesInfinite() {
		if (this.location.x >= this.edges.right) {
			this.location.x = this.edges.left;
		}
		if (this.location.x < this.edges.left) {
			this.location.x = this.edges.right;
		}

		if (this.location.y >= this.edges.bottom) {
			this.location.y = this.edges.top;
		}
		if (this.location.y < this.edges.top) {
			this.location.y = this.edges.bottom;
		}
	}

	applyForce(force) {
		this.acceleration.add(force);
		this.velocity.limit(10);
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
		//rotate(this.velocity.heading());

		//Asteroid
		fill(this.circleColor);
		stroke(this.circleStrokeColor);
		strokeWeight(this.circleStrokeWeight);
		ellipseMode(CENTER);
		circle(0, 0, this.r);
		//rect(0, 0, this.r, this.r);

		pop();
	}
}
