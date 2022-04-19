function symbol(cx,cy,r,l,n) {
	let ax = [];
	let ay = [];
	for (let s=0;s<n;s++) {
		for (let i=0;i<l;i++) {
			x = cx + random(-r,r);	ax.push(x);
			y = cy + random(-r,r);	ay.push(y);
		}
		cx+=r*2;
	}
	return[ax,ay];
}