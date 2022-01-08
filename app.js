document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] //so the div in our grid being 2(or the HEAD), and 0 being the end (TAIL) and all 1's being body parts
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    
  
  
    //to start, and restart the game
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()// function to generate apple
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 1000
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    //function that deals with ALL the outcomes of the Snake
    function moveOutcomes() {
  
      //deals with snake hitting border and snake hitting self , remember currentSanke[0] is position of the square in which it is
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom squares in the bottom start from 90
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall remainder is always 9
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall remainder is always 0
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top 0-9 sqaures on the top 
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        //console.log(currentSnake[0] + direction) is the best to understand
        alert('Game Over!! \n Score: '+score)
        return clearInterval(interval) //this will clear the interval if any of the above happen
      }
  
      const tail = currentSnake.pop() //removes or chooses last item of the array and shows it
      //console.log(tail)
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //adds elements in the front of the array so, currentSnake[0] will be in the front along with direction, so its moving
      //console.log(currentSnake)
      //deals with snake getting apple
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed // reduces the intervalTime but increases the speed 
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')// as the snake moves so should the colour of the square be changed with the help of classes
    }
  
  
    //generate new apple once apple is eaten
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
        
      } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
      squares[appleIndex].classList.add('apple')
    }
  
  
    //assign functions to keycodes
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 37) {
        direction = -1 // if we press left, the snake will go left one div
      } else if (e.keyCode === 40) {
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })