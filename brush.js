class Brush {
	
	constructor(path,r,c,i,b,t){
		
		this.r = r;			// радиус кисти
		this.c = c;			// цвет краски
		this.i = i;     // инертность движения [1..9]
		this.b = b;			// вероятность включения и отключения кисти
		this.t = t;
		
		this.dist = 0;	// длина пути, пройденного кистью
		this.size = 0;	// размер мазка
		this.angle = 0; // угол поворота кисти

		this.ax = path[0];	// массив координат по X
		this.ay = path[1];  // массив координат по Y
		this.step = 0;      // текущая координата в массиве
		
		this.vel = createVector(0,0);		// скорость кисти
		this.acc = createVector(0,0);		// ускорение кисти
		
		this.pressed = true;	// включение кисти
		this.mode = "r";			// режим квадратной или круглой кисти

		this.loc = createVector(this.ax[0],this.ay[0]);		// текущие координаты кисти
		this.aim = createVector(this.ax[0],this.ay[0]);		// координаты цели, к которой стремится кисть
		this.dir = createVector(0,0);											// вектор направления от кисти к цлеи
		
	}
	
	paint(layer) {
		
		layer.push();	// сохраняем предыдущие настройки слоя
		
		let k;
		if (this.t == 0) k = [1.0, 0.90+this.i*0.01 , 1.0, 1.0]; // classic
		if (this.t == 1) k = [0.1, 0.90+this.i*0.01 , 3.0, 1.1]; // neo
		
		// рассчитываем вектора направления
		this.dir.x = this.aim.x-this.loc.x;
		this.dir.y = this.aim.y-this.loc.y;
		
		// если до цели еще далеко:
		if (this.dir.mag()>this.i*3.0) {
			

			this.dist+=0.01;									// увеличиваем путь
			this.acc = this.dir.normalize();	// задаем ускорение как единичный вектор в направлении к цели
			this.acc.mult(k[0]);
			this.vel.add(this.acc);						// увеличиваем скорость на ускорение
			this.loc.add(this.vel);						// увеличиваем координату на скорость
			this.vel.mult(k[1]);	            // снижаем скорость «сопротивлением»
			this.vel.limit(this.i);						// ограничиваем максимальную скорость
			
			// если кисть включена:
			if (this.pressed) {
				
				let gap = this.vel.mag();												// запоминаем зазор между текущим и следующим положением кисти
				layer.translate(this.loc.x,this.loc.y);					// перемещаем холст в координату положения кисти
				this.angle = this.vel.heading();								// угол поворота равен направлению движения кисти
				layer.rotate(this.angle);												// вращаем холст на угол поворота
				let fc = [   																		// задаем цвет кисти:
					(this.c[0]+noise(1000+this.dist)*100)%255,		// • оттенок
					 this.c[1],																		// • насыщенность
					 this.c[2]+noise(2000+this.dist)*100+gap*5];	// • яркость
				
				// если угол между движением и направлением к цели не слишком велик:
				if ( abs(degrees(this.vel.angleBetween(this.dir))) < 90*k[3] ) { 
					// для каждого пикселя между текущим и следующим положением кисти делаем шаги:
					for (let i=0; i<gap; i+=1) {
						// размер мазка стремится к сумме радиуса кисти и скорости
						this.size += (this.r-this.size)/2.0 + this.vel.x*k[2];
						// накладываем мазок в координате текущего шага кистью текущего размера
						form(layer,this.mode,i*cos(radians(this.angle)),i*sin(radians(this.angle)), this.size, fc);
					}
				}	
				// если кисть движется с отклонением от цели:
				else {
					this.vel.setHeading(this.dir.heading()+random(-0.3,0.3)); 	// резко перенаправляем движение к цели
					this.vel.mult(0.5);																					// резко снимжаем скорость 
					this.mode = "r";																						// меняем кисть на квадратную
				}
			}
			// случайным образом включаем и отключаем кисть
			if(random()<this.b) this.pressed=!this.pressed;
		}  
			
		// если кисть приблизилась к цели:
		else if (this.step<this.ax.length) { 
			this.step++;												// переходим к номеру следующей цели
			this.aim.x = this.ax[this.step]; 		// получаем коордианты новой цели
			this.aim.y = this.ay[this.step];
			this.mode = "c";										// меняем режим кисти на круг
		}
		
		layer.pop(); // возвращаем предыдущие настройки слоя
		
	}
	
}