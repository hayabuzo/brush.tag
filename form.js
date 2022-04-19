function form(l,m,x,y,s,fc) {
	l.push();
	//s = max(1,s);
	l.colorMode(HSB,255).noStroke().fill(fc[0],fc[1],fc[2]);
		//if (m=="c") l.ellipseMode(CENTER).ellipse(x,y,s,s).stroke(255,20).strokeWeight(s*0.8).point(x+random(-r,r), y+random(-r,r)).point(x+random(-r,r), y+random(-r,r));
		if (m=="c") {
			//l.ellipseMode(CENTER).fill(255,255,255).ellipse(x,y+s/3,s/2,s/2);
			l.ellipseMode(CENTER).ellipse(x,y,s,s);
			
		}
		else if (m=="r") {
			l.rectMode(CENTER).rect(x,y,s,s);
		}
	l.pop();
}

//r = 1;	x+= random(-r,r);	y+= random(-r,r);