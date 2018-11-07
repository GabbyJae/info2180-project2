// Serobos unload

(function (){  

	let MYPUZZLESIZE = 15;

	let TILESIZE = 96;

	let ROWS_COLS = 4;

	let findX = 0;

	let findY = 0;

	let solution = true;
	
	let button = document.getElementById("shufflebutton");

	window.onload = loading;


	

	function loading(){

		createTiles();

		mybackGroundImage();

		shuffleButton();

	}

	//function used to create the tiles

	function createTiles(){

		let x = 0;

		let y = 0;

		let count = 0;

		let puzzle = document.getElementById("puzzlearea"); 

		for (let i = 0; i < MYPUZZLESIZE; i++){

			let value = i + 1;

			//4 tiles per row

			if (count == ROWS_COLS){

				x = 0;

				y += TILESIZE;

				count = 0;

			}

			let puzzlepiece = document.createElement("div");

			puzzlepiece.className = "puzzlepiece"; 

			puzzlepiece.innerHTML = value;

			puzzlepiece.value = false;

			puzzlepiece.style.left = x + "px";

			puzzlepiece.style.top = y + "px";

			puzzlepiece.style.backgroundPosition = -x + "px " + -y +"px";

			puzzlepiece.onmouseover = currentTile;

			puzzlepiece.onmouseup = moveMeTo;

			puzzlepiece.onmouseout = restoreMeTo;

			puzzle.appendChild(puzzlepiece);

			count++;

			x += TILESIZE;

		}

		// blank tile values to findX and findY

		findX = x;

		findY = y;

	}

	//function used to shuffle 

	function myShuffle(thisPiece){

		if (thisPiece.value === true){ 

			let tempX = parseInt(thisPiece.style.left);

			let tempY = parseInt(thisPiece.style.top);

			thisPiece.style.left = findX + "px";

			thisPiece.style.top = findY + "px";

			thisPiece.value = false;

			findX = tempX;

			findY = tempY;

			if (solution === true){

				solutionSolved();

			}

		}

	}

	//function used to tests current tile

	function currentTile(){

		if (testX(this) || testY(this)){

			//change colour

			changeTile(this);

		}

	}

	//function used to listen call 

	function moveMeTo(){

		myShuffle(this);

	}

	//function used restore element

	function restoreMeTo(){

		this.style.textDecoration = "none";

		this.style.border = "2px solid black";

		this.style.color = "black";

		this.style.cursor = "default";

		this.value = false;

	}

	//function used for background choices

	function mybackGroundImage(){

		let select = document.getElementById("overall");

		select.onchange = myTileBackG;

	}

	//function used to revisited background

	function myTileBackG(){

		let background = document.getElementById("overall").value;

		let pieces = document.querySelectorAll(".puzzlepiece");

		for (let i = 0; i < pieces.length; i++){

			pieces[i].style.backgroundImage = 'url(' + background + ')';

		}

		localStorage["overall"] = background;

	}

	//function used to changes border and text coloration

	function changeTile(thisPiece){

		thisPiece.style.textDecoration = "underline";

		thisPiece.style.border = "3px solid red";

		thisPiece.style.color = "#006600";

		thisPiece.style.cursor = "pointer";

		thisPiece.value = true;

	}

		button.onclick = getShuffle;
		shuffle.addEventListener("click", getShuffle);

	}

	//function used to shuffle the puzzle pieces

	function getShuffle(){

		let pieces = document.getElementsByClassName("puzzlepiece");

		//searches for movable tiles and move a tile into an empty space

		for(let i = 0; i < 1000; i++){

			let getMyemptyTile = [];

			for (let j = 0; j < pieces.length; j++){

				if ( testX(pieces[j]) || testY(pieces[j])){

					getMyemptyTile.push(pieces[j]);

				}

			}

			let newTile = Math.floor(Math.random() * getMyemptyTile.length);

			getMyemptyTile[newTile].value = true;

			myShuffle(getMyemptyTile[newTile]);

			getMyemptyTile[newTile].value = false;

		}



	}

	//function used to determine if puzzle is complete

	function solutionSolved(){

		let solveX = 0;

		let solveY = 0;

		let count = 0;

		let complete = 0;

		let pieces = document.getElementsByClassName("puzzlepiece");

		for (let i = 0; i < pieces.length; i++){

			if (count == ROWS_COLS){

				solveX = 0;

				solveY += TILESIZE;

				count = 0;

			}

			if (parseInt(pieces[i].style.left) == solveX && parseInt(pieces[i].style.top) == solveY){

				complete++;

			} else {

				complete = 0;

			}

			count++;

			solveX += TILESIZE;

		}

		

	}

	//function used to check if X is above, below or in a empty tile 

	function testX(thisPiece){

		if( parseInt(thisPiece.style.left) == findX){

			if(parseInt(thisPiece.style.top) == (findY - TILESIZE) || parseInt(thisPiece.style.top) == (findY + TILESIZE)){

				return true;

			}

		}

	}

	//function used to check if Y is left, right or in a empty tile

	function testY(thisPiece){

		if ( parseInt(thisPiece.style.top) == findY){

			if (parseInt(thisPiece.style.left) == (findX - TILESIZE) || parseInt(thisPiece.style.left) == (findX + TILESIZE)){

				return true;

			}

		}

	}

	

})();