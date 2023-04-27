"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Tutorial Case

   Author: 
   Date:   

   Global Variables
   ================
   
   puzzleCells
      References the TD cells within the Hanjie table grid.
   
   cellBackground
      Stores the current background color of the puzzle
      cells during the mouseover event.
      
      
   Function List
   =============

   init()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   swapPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e)
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e)
      Extends the background color of the original puzzle cell during
      the mouseenter event.
      
   endBackground()
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

// Run the init() function when page finishes loading

window.onload = init;

// these are global variables

let puzzleCells;
let cellBackground;

// Definition of the init() function which sets up the rest of the script
function init() {
   document.getElementById("puzzleTitle"). innerHTML = "Puzzle 1";

   // Insert the HTML code for the first puzzle table
   document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   // Add event handlers for the puzzle buttons
   let puzzleButtons = document.getElementsByClassName("puzzles");

   // Loop through all the elements with the class name "puzzles"
   for (let i=0; i<puzzleButtons.length; i++) {
         puzzleButtons[i].onclick = swapPuzzle;

   } // end of for loop

   // call the setupPuzzle() function here
   setupPuzzle();

   // add an event listener for the mouseup event
   document.addEventListener("mouseup", endBackground);

   // add an event listener to the Show Solution button
   document.getElementById("solve").addEventListener("click", function() {

      for(let i=0; i<puzzleCells.length; i++) {
            puzzleCells[i].style.backgroundColor = "";
      } // end of for loop

   });

} // end of init() function

function swapPuzzle(e) {

    if (confirm("You will lose ALL of your work on the puzzle! Continue?")) {
   // store a reference to which button was actually clicked
   let puzzleID = e.target.id;
   // store a reference to that button's text value
   let puzzleTitle = e.target.value;
   document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

   switch(puzzleID) {
      case "puzzle1": 
         console.log("PUZZLE 1");
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
         break;
      case "puzzle2":
         console.log("PUZZLE 2");
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
         break;
      case "puzzle3":
         console.log("PUZZLE 3");
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
         break;
   }

   setupPuzzle();
   } // end of if statement
   
} // end of swapPuzzle()

// Definition of the setupPuzzle() function which turns all cells gold and gets them ready for various events

function setupPuzzle() {
   // Reference all of the data cells in the puzzle table
   puzzleCells = document.querySelectorAll("table#hanjieGrid td");
   // loop through the puzzleCells array setting the color to gold
   for (let i=0; i < puzzleCells.length; i++) {
         puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
         // set up each cell with a mousedown event handler
         puzzleCells[i].onmousedown = setBackground;
         puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
         // use a pencil image as the cursor
   } // end of for loop

   // Create object collections (arrays) of just the filled cells and just the empty cells
   let filled = document.querySelectorAll("table#hanjieGrid td.filled");
   let empty = document.querySelectorAll("table#hanjieGrid td.empty");

   // Create an event listener to highlight incorrect cells
   document.getElementById("peek").addEventListener("click", function() {
         // Display incorrect white cells in pink
         for (let i=0; i<filled.length; i++) {
               if (filled[i].style.backgroundColor==="rgb(255, 255, 255)") {
                     filled[i].style.backgroundColor = "rgb(255, 211, 211)";
               } // end of if statement
         } // end of for loop

         // Display incorrect gray cells in red
         for (let i=0; i<empty.length; i++) {
               if (empty[i].style.backgroundColor==="rgb(101, 101, 101)") {
                     empty[i].style.backgroundColor = "rgb(255, 101, 101)";
               } // end of if statement
         } // end of for loop

         setTimeout(function() {
            for (let i=0; i<puzzleCells.length; i++) {
               if (puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)") {
                     puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
               } 

                if (puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)") {
                     puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
               } 


            }
         }, 1500);

      });

   // Check the puzzle solution
   document.getElementById("hanjieGrid").addEventListener("mouseup", function() {
         let solved = true; 
           for(let i = 0; i < puzzleCells.length; i++) {
            if((puzzleCells[i].className === "filled" && puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)") || (puzzleCells[i].className === "empty" && puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)")) {
               solved = false;
               break;
            } // end of if statement
         } // end of for loop        
          if(solved) {
            alert("YOU SOLVED THE PUZZLE!");
         }
   });

  


} // end of setupPuzzle


// Definition of the setBackground() function to change the cell beackground when the user interacts with the puzzle


function setBackground(e) {
   let cursorType;

   // set the background based on the keyboard key used
   if (e.shiftKey) {
         cellBackground = "rgb(233, 207, 29)";
         cursorType = "url(jpf_eraser.png), cell";
   } else if (e.altKey) {
      cellBackground = "rgb(255, 255, 255)";
      cursorType = "url(jpf_cross.png), crosshair";
   } else {
      cellBackground = "rgb(101,101,101)";
      cursorType = "url(jpf_pencil.png), pointer";
   }



   e.target.style.backgroundColor = cellBackground;

   // Loop through the puzzleCells array and create an event listener for all of them
   for (let i=0; i<puzzleCells.length; i++) {
         puzzleCells[i].addEventListener("mouseenter", extendBackground);
         puzzleCells[i].style.cursor = cursorType;
   } // end of for loop

   // Prevent the default action of highlighting table text
   e.preventDefault();

} // end of setBackground()

// Definition of extendBackground() function which keeps the background color going

function extendBackground(e) {
   e.target.style.backgroundColor = cellBackground;

}

// Definition of the endBackground() function which removes all current puzzleCell events
function endBackground() {
   // remove the event listener for evey puzzleCell
   for (let i=0; i<puzzleCells.length; i++) {

      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
   } // end of for loop
}


         
/* ================================================================= */

function drawPuzzle(hint, rating, puzzle) {
   
   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}