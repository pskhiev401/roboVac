# roboVac

## Introduction
A Roomba inspired web application with a simple UI. User will key in room dimensions, locations of patches of dirt, and cardinal directions which the robot process. When the user submits the inputs, an output field below will populate with the end coordinates and how my piles of dirt the robot cleaned. 

## Tech Stack
This React project was bootstrapped by using create-react-app. Those familiar with JavaScript and HTML will pick up the JSX syntax quickly as its a blend of both. I used SASS because I wanted reuse CSS styling via nesting. In hindsight, I guess I could have avoided installing the node-sass from NPM by writing another couple of lines of css -- Ha! Fight me!

## Setup Instructions: 
Below you will find instructions of code to type into the command prompt/terminal. There will be times when downloading files will take a few minutes, please wait until the downloads are complete before entering more commands into the prompt/terminal. If you already have experience with git/GitHub go ahead and skip to step 5.
 
1)  Clone the repo by clicking the green **CLONE OR DOWNLOAD** button
![Github Clone/Download Button](https://traypk.s3-us-west-1.amazonaws.com/clone.png)
2) Copy the repo URL
![Repo URL](https://traypk.s3-us-west-1.amazonaws.com/cloneURL.png)
3) Open your command prompt/terminal 
4) Navigate your command prompt terminal to the desktop
5) In the terminal type:  `git clone https://github.com/pskhiev401/roboVac.git` 
6) Navigate into project folder, type:  `cd robovac` 
7) Open this project in your IDE, type:  `code .` 
8) Install dependencies, type:  `npm i` 
9) Start your development server, in the terminal type  `npm start` 
10) Your browser should open and the url should be 'Localhost:3000'

## Using The Web App
- The web app has no backend, and cannot save your results/inputs.
 - The room dimensions are limited to 9x9.
 -  Fill out each section of the "Input" section before hitting 'submit'. 
 - Enter X & Y coordinates with a single digit
 - Enter your starting location as a pair
	 - i.e. 12 means  [1, 2] 
 -  You may input multiple dirt locations coordinates, but no duplicates.  Use a comma to separate each pair of coordinates.
	 - i.e. 30, 25, 44  means [ [3, 0], [2,5], [4,4] ]  
 -  Refresh the browser each time you enter a new set of inputs.
 - If the robot hits a boundary or wall, it will skip the prompt and move on to the next one.
 - Use capital letters when entering cardinal directions without spaces 
	 - i.e. NNSWESWE
 - The output will display the its coordinates after processing the commands, and the number of dirt locations cleaned
![App Demo](https://traypk.s3-us-west-1.amazonaws.com/robovacDemo.gif)

## Programming Logic
#### Processing Cardinal Coordinates
The crux of the logic relies on a simple for-loop where the robot evaluates each cardinal direction input. This was achieved by incrementing or decrementing the robots position, where North & South would affect the Y coordinate value, and East & West would affect the X coordinate value. To account for user prompting the robot to go 'off-grid' or run into a boundary wall, I utilized an extra condition where the current X or Y value cannot be less than highest possible X or Y value, which was derived from the room dimensions. 
![Robot Logic](https://traypk.s3-us-west-1.amazonaws.com/logic.png)

#### Clean-As-You-Go
Since the robot is always on and cleaning, if the robot hovered over a dirty location it will make it clean. We solved this challenge with a simple If-statement to see if our current X & Y location matches an entry in our dirty locations array. If a match was found, we incremented our cleanedPiles counter and updated our array with all numbers that did NOT match our current X & Y coordinates. This was done with the .filter( ) method, which returns a shallow copy of the array that passes the conditional statement. 

![Updating Dirty Location](https://traypk.s3-us-west-1.amazonaws.com/dirtlocations.png)

Thanks for spending the time reviewing this repo, maybe v2 of this readme will have some loading animations of Bender from Futurama!