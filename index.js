let lifts=[];
let floors=[];
let requestQueue=[];


class Lift {
  constructor(id) {
      this.id = id;
      this.currentFloor = 0;
      this.status = 'idle'; //idle, moving_up, moving_down
      this.element = this.createLiftElement();
  }

  createLiftElement() {
      const liftElement = document.createElement('div');
      liftElement.classList.add('liftsss');

      const doorLeft = document.createElement('div');
      doorLeft.classList.add('door', 'left-door');

      const doorRight = document.createElement('div');
      doorRight.classList.add('door', 'right-door');

      liftElement.appendChild(doorLeft);
      liftElement.appendChild(doorRight);

      return liftElement;
  }

  updateFloor(floor) {
      this.currentFloor = floor;
  }

  setStatus(status) {
      this.status = status;
  }
}

function submitUserData() {
  
  let floorcount = document.querySelector("#floor").value;
  if(floorcount<2){
    alert("No of Floor should be atleast 2");
    return;
  }

  let liftcount = document.querySelector("#lift").value;
  if(liftcount<1){
    alert("No of Lift should be atleast 1");
    return;
  }
  
  createBuildingAndLift(floorcount,liftcount);
}

function createBuildingAndLift(floorcount,liftcount){
 
  
  for (let i = 0; i < floorcount; i++) {

    // createing the floor in a building
    const floor = document.createElement("div");
    floor.setAttribute('id', `floor${i}`);
    floor.setAttribute('class', 'floor');
    floor.dataset.floor=i;

    if (i != 0) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `upButton${i}`)
      floorButton.innerHTML =`<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-down.png" alt="circled-chevron-down"/>`;
      floorButton.setAttribute('onclick', `callLift(${i},'movingDown')`);
      floor.appendChild(floorButton);
    }
    if (i != floorcount - 1) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `downButton${i}`)
      floorButton.innerHTML =`<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/>`; 
      floorButton.setAttribute('onclick', `callLift(${i},'movingUp')`);
      floor.appendChild(floorButton);
    }
    const building = document.getElementById("newBuilding");
    building.appendChild(floor);
    floors.push(floor);
  }

  // floor where all the lifts will stays by default
  const groundFLoor = document.querySelector(`#floor0`);
  
  // creating the lift as per requirement
  for (let i = 0; i < liftcount; i++) {
   
    const lift = new Lift(i);
    lifts.push(lift);
    lift.element.style.left = i * 100 + 'px';
    const building = document.getElementById("newBuilding");
    groundFLoor.appendChild(lift.element);
   
    // const newLift = document.createElement('div');
    // newLift.setAttribute('class', 'floor_lift')
    // newLift.setAttribute('id', `lift${i}`);
    // groundFLoor.appendChild(newLift);
    // lifts.push(newLift);
  }
}



function callLift(targetFloor,direction) {
  console.log(targetFloor,direction);
  const availableLift=findNearestAvailableLift(targetFloor,direction);
  if (availableLift) {
    moveLift(availableLift, targetFloor);
} else {
    const alreadyInQueue = requestQueue.some(
        request => request.targetFloor === targetFloor && request.direction === direction
    );

    if (!alreadyInQueue) {
        requestQueue.push({ targetFloor, direction });
    }
}
}


function findNearestAvailableLift(targetFloor, direction){
  let closestLift = null;
  let minDistance = Infinity;

  for (const lift of lifts) {
      if (lift.status === "idle") {
          const distance = Math.abs(lift.currentFloor - targetFloor);
          if (distance < minDistance) {
              minDistance = distance;
              closestLift = lift;
          }
      }
  }
  return closestLift;
}


function  moveLift(lift, targetFloor) {
  const status = targetFloor > lift.currentFloor ? "moving_up" : "moving_down";
  lift.setStatus(status);
  const timeToReach = Math.abs(targetFloor - lift.currentFloor) * 2000;
  updateLiftPositions(lift, targetFloor, timeToReach);
  setTimeout(() => {
      lift.updateFloor(targetFloor);
      openAndCloseDoors(lift);
  }, timeToReach);
}


function updateLiftPositions(lift, targetFloor, timeToReach) {
  lift.element.style.transitionDuration = `${timeToReach}ms`;
  lift.element.style.transitionTimingFunction = "linear";
  lift.element.style.transform = `translateY(-${targetFloor * 150}px)`;
}


function openAndCloseDoors(lift) {
  const liftElement = lift.element;
  liftElement.classList.add('door-open');
  setTimeout(() => {
      liftElement.classList.remove('door-open');
      liftElement.classList.add('door-close');
      setTimeout(() => {
          liftElement.classList.remove('door-close');
          lift.setStatus("idle");
          processQueue(); // Check and process the queue when a lift becomes idle
      }, 2500); // 2.5 seconds for the doors to fully close
  }, 2500); // 2.5 seconds for the doors to stay open
}


function processQueue() {
  if (requestQueue.length > 0) {
      const { targetFloor, direction } = requestQueue.shift(); // Get the next request from the queue
      callLift(targetFloor, direction);
  }
}














































// liftTosendup.style.animation = `moveUp ${index*3}s ease forwards`;

//   const clickedFloor = document.getElementById(`downButton${index}`);
  
//   const style = document.createElement('style');
//   style.type = 'text/css';
//   const css = `
//  @keyframes moveUp {
//     0% {
//         top: 0;
//     }
//     100% {
//         top: ${-81 * index}px;
//     }
// }

// #lift${index} {
//     border: 2px solid rgb(80, 12, 236);
//     animation: moveUp ${index * 3}s ease forwards;
// }
// `;

//   style.appendChild(document.createTextNode(css));
//   document.head.appendChild(style);
//   window.removeEventListener();

