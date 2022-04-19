function setup() { 
	
	pixelDensity(2);
	createCanvas(1000, 400); 
	img = createGraphics(width,height);

	m = [];
	b = 0.01;
	
	c = [];
	
	c[1] = random(255);
	c[2] = random(255);
	c[3] = (c[2]-random([32,128]))%255;
		
		if(random()>0.3) {
			b = random([0.01,0]);
			path = symbol(200,200,100,10,4);			m[1] = new Brush(path,20,[c[1],010,010],6,b,1);
																						m[2] = new Brush(path,10,[c[2],200,128],6,b,1);
			path = symbol(200,200,100,10,4);			m[3] = new Brush(path,05,[c[3],100,255],8,b,1);
		} else {
			path = symbol(200,200,050,03,7);			m[1] = new Brush(path,40,[c[1],010,010],5,0.01,1);
			path = symbol(200,200,050,03,7);			m[2] = new Brush(path,05,[c[2],200,128],9,0.00,1);
			path = symbol(300,200,150,10,2);			m[3] = new Brush(path,05,[c[3],100,255],7,0.01,1);
		}

	
}

function draw() {
	background(255);
	textFont('monospace').textAlign(CENTER,CENTER).fill(200).noStroke().textSize(15).text('Press \'S\' to save image, press \'space\' to generate new one.',500,360);
	for(let frame=0; frame<12; frame++) {
		m[1].paint(img);
		if (m[1].step>m[2].step) m[2].paint(img);
		if (m[1].step>m[3].step) m[3].paint(img);
	}
	image(img,0,0);
	
}

function keyTyped() {
  if (key === 's' || key === 'S') {
    save(img,'myCanvas', 'png');
  } else if (key === ' ') {
		setup();
	}
}