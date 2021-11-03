function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;

  this.move = function (xDir, yDir) {
    this.fitBounds();
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display();
  };

  this.display = function () {
    this.fitBounds();
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "block";
  };

  this.fitBounds = function () {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;

    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;

    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };
}

// Starts the game
function start() {
  //Creates bear
  bear = new Bear();

  //Add an event listener to the keypress event
  document.addEventListener("keydown", moveBear, false);
  document.getElementById("speedBear").addEventListener("change", setSpeed);

  bees = new Array(); //Creates a new array for bees
  initBees(); //Creates the bees
  updateBees();
}


function moveBear(e) {
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;

  if (e.keyCode == KEYRIGHT) {
    bear.move(1, 0); // right key
  }

  if (e.keyCode == KEYLEFT) {
    bear.move(-1, 0); // left key
  }
  
  if (e.keyCode == KEYUP) {
    bear.move(0, -1); // up key
  }

  if (e.keyCode == KEYDOWN) {
    bear.move(0, 1); // down key
  }
}

function setSpeed() {
  // Updates the bear's speed to the value in the input fields
  bear.dBear = parseInt(document.getElementById("speedBear").value);
}


class Bee {
  constructor(beeNumber) {
    //this HTML element corresponding to the IMG of the bee
    this.htmlElement = createBeeImg(beeNumber);

    //stores its HTML ID
    this.id = this.htmlElement.id;

    //the left position (x)
    this.x = this.htmlElement.offsetLeft;

    //the top position (y)
    this.y = this.htmlElement.offsetTop;

    //Function to move the bees
    this.move = function (dx, dy) {
      //move the bees by dx, dy
      this.x += dx;
      this.y += dy;

      this.display();
    };

    this.display = function () {
      // Adjust the position of the bee and display it

      this.fitBounds(); //we add this instruction to keep bear within board

      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    };

    this.fitBounds = function () {
      //Checks to make sure if the bees stay in the board space
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;

      if (this.x < 0) {
        this.x = 0; 
      }

      // Conditional Statement to prevent the bear from going below the maximum value
      if (this.x > w - iw) {
        this.x = w - iw;
      }

      // Conditional Statement to prevent the bee from going below the minimum value of 'y'
      if (this.y < 0) {
        this.y = 0;
      }
      // Conditional Statement to prevent the bee from going below the minimum value of 'y'
      if (this.y > h - ih) {
        this.y = h - ih;
      }
    };
  }
}

function createBeeImg(wNum) {
  //get dimension and position of board div
  let boardDiv = document.getElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;

  //create the IMG element
  let img = document.createElement("img");
  img.setAttribute("src", "images/bee.gif"); //Sets the source of the <img> tag
  img.setAttribute("width", "100"); //Sets the width of the <img> tag
  img.setAttribute("alt", "A bee!"); //Adds the alt text for the <img> tag
  img.setAttribute("id", "bee" + wNum); // Adds an 'id' to the attribute
  img.setAttribute("class", "bee"); //set class of html tag <img>

  //Adds the <img> element to the DOM as a child of the 'board' <div>
  img.style.position = "absolute";
  boardDiv.appendChild(img);

  //Sets the initial position
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = boardDivX + x + "px";
  img.style.top = y + "px";

  //Returns back the img object
  return img;
}

/* Function to generate and return a random integer between 0 and max */
function getRandomInt(max) {
  // Returns a random value between 0 (inclusive) and the 'max' variable (inclusive)
  return Math.floor(Math.random() * (max - 0 + 1) + 0);
}

function initBees() {
  //Get the number of bees specified by the user
  let nbBees = document.getElementById("nbBees").value;
  nbBees = Number(nbBees); // Convert the input to a numeric value

  if (isNaN(nbBees)) {
    window.alert("The number of bees supplied is invalid.");
    return;
  }

  // Create the Bees
  let i = 1;
  while (i <= nbBees) {
    var num = i;
    var bee = new Bee(num); //Creates the object and its IMG element

    bee.display(); //Displays the bees
    bees.push(bee); //Add the Bee object to the Bees Array
    i++;
  }
}

function addBee() {
  // Gets the number of bees as mentioned in the user input
  let nbBees = document.getElementById("nbBees").value;

  // Converts the value within the variable to a Number
  nbBees = Number(nbBees);
  nbBees++;

  var bee = new Bee(nbBees); // Creates a bee
  bee.display(); // Displays the bee on screen
  bees.push(bee); // Adds the bee to the bees array

  document.getElementById("nbBees").value = nbBees;
}

function moveBees() {
  //Get speed input field value
  let speed = document.getElementById("speedBees").value;

  //Move each bee to a random location
  for (let i = 0; i < bees.length; i++) {
    // Moves the bees randomly in the x and y axis
    let dx = getRandomInt(2 * speed) - speed;
    let dy = getRandomInt(2 * speed) - speed;

    bees[i].move(dx, dy);
    isHit(bees[i], bear);
  }
}

//Updates the loop for the game
function updateBees() {
  //Move the bees randomly
  moveBees();

  //Uses a fixed update period
  let period = document.getElementById("periodTimer").value;

  let score = hits.innerHTML;

  if (Number(score) < 1000) {
    // Updates the movement of the bee after the interval specified
    updateTimer = setTimeout("updateBees()", period);
  } 
  else {
    alert("Game is over. You had " + score + " stings");
    score = "Game Over";
    hits.innerHTML = score;
    updateTimer = clearTimeout();
  }
}

/* Methods to count the stings */

function isHit(defender, offender) {
  // Checks if the bear and bee images (bear = defender, bee = offender) overlap
  if (overlap(defender, offender)) {
    let score = hits.innerHTML;
    score = Number(score) + 1; // Adds one to the score each time the bear is hit by a bee
    hits.innerHTML = score; // Displays the new score

    //Calculates the longest duration
    let newStingTime = new Date();
    let thisDuration = newStingTime - lastStingTime;
    lastStingTime = newStingTime;
    let longestDuration = Number(duration.innerHTML);

    // Check if the longestDuration variable is 0 or non-numeric.
    if (longestDuration === 0 || isNaN(longestDuration)) {
      longestDuration = thisDuration;
    } 
    else {
      if (longestDuration < thisDuration) longestDuration = thisDuration;
    }

    //Updates the longest duration displayed on the site
    document.getElementById("duration").innerHTML = longestDuration;
  }
}

function overlap(element1, element2) {
  // Consider the two rectangles wrapping the two elements

  // Rectangle of the first element
  left1 = element1.htmlElement.offsetLeft;
  top1 = element1.htmlElement.offsetTop;
  right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
  bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;

  // Rectangle of the second element
  left2 = element2.htmlElement.offsetLeft; // e2x
  top2 = element2.htmlElement.offsetTop; //e2y
  right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
  bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;

  // Calculating the intersection of the two rectangles
  x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
  y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
  intersectArea = x_intersect * y_intersect;

  // If intersection is nil (i.e. no hit)
  if (intersectArea == 0 || isNaN(intersectArea)) {
    return false;
  }

  return true;
}
