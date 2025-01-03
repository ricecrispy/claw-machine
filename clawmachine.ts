// Select the claw machine container and balls container
const ballsContainer = document.getElementById('balls') as HTMLElement;
const clawMachine = document.querySelector('.claw-machine') as HTMLElement;  // Ensure it's an HTMLElement

// Function to generate random colors
function getRandomColor(): string {
  const colors: string[] = ['#f00', '#00f', '#0f0', '#ff0', '#f0f', '#ff6347', '#8a2be2', '#ffa500', '#90ee90', '#ff1493'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create and position static balls with overlap at the bottom of the container
function createStaticBalls(): void {
  const totalBalls: number = 120; // Number of static balls
  const ballsPerRow: number = 20; // Number of balls per row
  const overlapFactor: number = 10; // Amount of horizontal and vertical overlap
  
  for (let i = 0; i < totalBalls; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.backgroundColor = getRandomColor();

    // Position balls with slight overlap
    const xPosition: number = (i % ballsPerRow) * (30 - overlapFactor); // Reduce the horizontal space for overlap
    const yPosition: number = Math.floor(i / ballsPerRow) * (30 - overlapFactor); // Reduce the vertical space for overlap

    ball.style.left = `${xPosition}px`;
    ball.style.bottom = `${yPosition}px`;

    // Static balls should be in front, set a higher z-index
    ball.style.zIndex = '1'; 

    ballsContainer.appendChild(ball);
  }
}

// Function to create a new ball positioned at the center of the claw machine container
function createNewBall(): void {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.backgroundColor = getRandomColor();
  
  // Position the new ball in the center of the claw machine container
  ball.style.position = 'absolute'; // Make it absolute to control its position freely
  
  // Position ball at the center of the 'claw-machine' container
  ball.style.left = '45%';  // Center horizontally
  ball.style.transform = 'translateX(-50%)'; // Adjust for actual centering
  
  // Position the ball at the bottom of the claw machine
  ball.style.bottom = '0px';  // Position it at the bottom
  
  // Add z-index to place it behind static balls (lower z-index than static balls)
  ball.style.zIndex = '0';  // Behind static balls
  
  // Append the new ball to the container
  clawMachine.appendChild(ball);
  
  // Start the ball's animation (simulating it being grabbed and moved up)
  ball.style.animation = 'ballAnimation 3s ease-in-out forwards';
  
  // After the ball reaches the top, remove it from the DOM
  setTimeout(() => {
    clawMachine.removeChild(ball);
  }, 3000); // Remove ball after 3 seconds
}

// Call the function to create and animate a new ball when the claw reaches the bottom
let clawReachBottom: boolean = false;

const clawBody = document.getElementById('claw-body') as HTMLElement;
const clawGrabber = document.getElementById('claw-grabber') as HTMLElement;

// Create static balls when the page loads
createStaticBalls();

// Watch for the claw body reaching the bottom (50% of the animation duration)
clawBody.addEventListener('animationiteration', () => {
  if (!clawReachBottom) {
    // Create a new ball when the claw reaches the bottom
    createNewBall();
    clawReachBottom = true;
  } else {
    clawReachBottom = false;
  }
});
