
//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
  fruits: [
     "Apple", "Banana", "Mango", "Orange", "Pineapple", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Grape",
    "Watermelon", "Cantaloupe", "Papaya", "Guava", "Lychee", "Kiwi", "Dragon fruit", "Jackfruit", "Peach", "Pear",
    "Cherry", "Plum", "Apricot", "Pomegranate", "Coconut", "Lemon", "Lime", "Grapefruit", "Fig", "Passion fruit",
    "Starfruit", "Durian", "Mulberry", "Cranberry", "Tangerine", "Mandarin", "Custard apple", "Sapodilla", "Mangosteen",
    "Longan", "Rambutan", "Jujube", "Date", "Quince", "Persimmon", "Loquat", "Gooseberry", "Boysenberry",
    "Elderberry", "Huckleberry", "Blackcurrant", "Redcurrant", "White currant", "Cloudberry", "Soursop", "Ackee",
    "Breadfruit", "Horned melon", "Salak", "Medlar", "Feijoa", "Bilberry", "Miracle fruit", "Cupuacu", "Marang",
    "Santol", "Velvet apple", "Bael", "Rose apple", "Sugar apple", "Buddha’s hand", "Yumberry", "Pomelo", "Nance",
    "Barbados cherry", "Indian gooseberry", "Ackee apple", "Mountain papaya", "Imbu", "Genip", "Hog plum", "Lucuma",
    "Mammee apple", "Monstera deliciosa", "Oil palm fruit", "Pequi", "Rollinia", "Safou", "Soncoya", "Surinam cherry",
    "Tamarillo", "Ugli fruit", "White sapote", "Xigua", "Yangmei", "Ziziphus fruit", "Langsat", "Medjool date", "Prickly pear" 
  ],
  animals: [    "Dog", "Cat", "Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Kangaroo", "Koala", "Panda",
    "Bear", "Wolf", "Fox", "Rabbit", "Deer", "Monkey", "Gorilla", "Dolphin", "Whale", "Shark",
    "Eagle", "Owl", "Parrot", "Penguin", "Crocodile", "Snake", "Turtle", "Horse", "Camel", "Sheep",
    "Goat", "Cow", "Pig", "Chicken", "Duck", "Turkey", "Frog", "Toad", "Lizard", "Chameleon",
    "Leopard", "Cheetah", "Hyena", "Rhinoceros", "Hippopotamus", "Moose", "Squirrel", "Bat", "Peacock", "Swan",
    "Flamingo", "Pelican", "Seagull", "Pigeon", "Dove", "Falcon", "Hawk", "Vulture", "Stork", "Heron",
    "Crane", "Macaw", "Toucan", "Quail", "Crow", "Raven", "Magpie", "Woodpecker", "Kingfisher", "Robin",
    "Antelope", "Bison", "Buffalo", "Yak", "Donkey", "Mule", "Armadillo", "Porcupine", "Hedgehog", "Otter",
    "Seal", "Sea lion", "Walrus", "Manatee", "Narwhal", "Orca", "Swordfish", "Marlin", "Stingray", "Manta ray",
    "Octopus", "Squid", "Lobster", "Crab", "Shrimp", "Jellyfish", "Starfish", "Clam", "Oyster", "Snail"],
  countries: [
   "Philippines", "Japan", "China", "South Korea", "Thailand", "Vietnam", "Malaysia", "Indonesia", "India", "Pakistan",
    "Australia", "New Zealand", "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Peru", "Spain",
    "France", "Germany", "Italy", "United Kingdom", "Russia", "Turkey", "Saudi Arabia", "Egypt", "South Africa", "Nigeria",
    "Kenya", "Ethiopia", "Morocco", "Algeria", "Iraq", "Iran", "Afghanistan", "Nepal", "Bangladesh", "Sri Lanka",
    "Norway", "Sweden", "Denmark", "Finland", "Poland", "Ukraine", "Greece", "Portugal", "Belgium", "Netherlands",
    "Switzerland", "Austria", "Czech Republic", "Slovakia", "Hungary", "Romania", "Bulgaria", "Serbia", "Croatia", "Slovenia",
    "Bosnia and Herzegovina", "Montenegro", "Albania", "Kosovo", "Macedonia", "Georgia", "Armenia", "Azerbaijan", "Kazakhstan", "Uzbekistan",
    "Turkmenistan", "Kyrgyzstan", "Tajikistan", "Mongolia", "Laos", "Cambodia", "Myanmar", "Brunei", "Singapore", "Maldives",
    "Bhutan", "Lebanon", "Jordan", "Syria", "Yemen", "Oman", "Qatar", "United Arab Emirates", "Bahrain", "Kuwait",
    "Sudan", "South Sudan", "Somalia", "Uganda", "Tanzania", "Rwanda", "Burundi", "Zambia", "Zimbabwe", "Botswana"
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.trim().toUpperCase();

  //Display each character as span; reveal spaces immediately and don't count them toward winCount
  let displayItem = "";
  for (let ch of chosenWord) {
    if (ch === " ") {
      displayItem += '<span class="dashes" aria-hidden="true"> </span>';
    } else {
      displayItem += '<span class="dashes">_</span>';
    }
  }

  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letter buttons and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
