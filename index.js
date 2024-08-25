// stores all the availabe lifts
let lifts=[];
// stores all the pending request
let requestQueue=[];


function createLift(id){
  const lift={
      id:id,
      //idle moving_up moving_down
      status:'idle',
      currentFloor:0,
      element:null,
      // creation of lift
      createLiftElement:function(){ 

         const leftDoor=document.createElement('div');
         leftDoor.setAttribute('class','LeftDoor')
         const RightDoor=document.createElement('div');
         RightDoor.setAttribute('class','RightDoor')

         const liftElement = document.createElement('div');

         liftElement.appendChild(leftDoor);
         liftElement.appendChild(RightDoor);

         liftElement.classList.add('liftsss');
         this.element = liftElement;  
      },
      // after reaching need to change the current position of lift
      updateFloorNo:function(floor) {
        this.currentFloor = floor;
      },
      // need ro chane accordingly idle moving_up moving_down
      setNewStatus: function(status) {
        this.status = status;
      }
  }
  
   lift.createLiftElement();
   return lift;
}


function submitUserData() {
  
  // no of Floor in a building by a user
  let NO_OF_FLOOR = document.querySelector("#floor").value;
  // atleast building should have 2 floors
  if(NO_OF_FLOOR<2){
    alert("No of Floor should be atleast 2");
    return;
  }

  // no of lift in a building by a user
  let NO_OF_LIFT = document.querySelector("#lift").value;
  // atleast 1 lift is mandatory
  if(NO_OF_LIFT<1){
    alert("No of Lift should be atleast 1");
    return;
  }
  
  // based upon user input building and lift will be created
  const building = document.getElementById("newBuilding");
  building.innerHTML="";
  createBuildingAndLift(NO_OF_FLOOR,NO_OF_LIFT);
}

function createBuildingAndLift(NO_OF_FLOOR,NO_OF_LIFT){
  
  // creating the floor in a building
  for (let i = 0; i < NO_OF_FLOOR; i++) {
    const floor = document.createElement("div");
    floor.setAttribute('id', `floor${i}`);
    floor.setAttribute('class', 'floor');
    floor.dataset.floor=i;
    if (i != 0) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `upButton${i}`)
      floorButton.innerHTML =`<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-down.png" alt="circled-chevron-down"/>`;
      floorButton.setAttribute('onclick', `MoveLifts(${i},'movingDown')`);
      floor.appendChild(floorButton);
    }
    if (i != NO_OF_FLOOR - 1) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `downButton${i}`)
      floorButton.innerHTML =`<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/>`; 
      floorButton.setAttribute('onclick', `MoveLifts(${i},'movingUp')`);
      floor.appendChild(floorButton);
    }
    const building = document.getElementById("newBuilding");
    building.appendChild(floor);
  }

  // grounf floor will be the place where all the lifts will stays by default
  const groundFLoor = document.querySelector(`#floor0`);
  
  // creating the lift as per requirement with the help of createLift function
  for (let i = 0; i < NO_OF_LIFT; i++) {   
    const lift = createLift(i);
    lifts.push(lift);
    groundFLoor.appendChild(lift.element);
  }

}
 

// logic to move the lift from one place to another place
function MoveLifts(targetFloor,direction) {
  let closest = null;
  let minDistance = Infinity;

  // getting the nearest idle lift
  for (const lift of lifts) {
      if (lift.status === "idle") {
          const currentF= lift.currentFloor ;
          const distance = Math.abs(currentF - targetFloor);
          if (distance < minDistance) {
              minDistance = distance;
              closest = lift;
          }
      }
  }

  if (closest) {
    //move the nearest lift to the requested floor ans set the status accordingly
    const currentStatus = targetFloor > closest.currentFloor ? "moving_up" : "moving_down";
    closest.setNewStatus(currentStatus);
    const timeToReach = Math.abs(targetFloor - closest.currentFloor) * 2000;
    updateLiftPositions(closest, targetFloor, timeToReach);
    setTimeout(() => {
        closest.updateFloorNo(targetFloor);
      
        const currentLift=closest.element;
        currentLift.classList.add('opening-door');
        setTimeout(() => {
           currentLift.classList.remove('opening-door');
           currentLift.classList.add('closing-door');
           setTimeout(()=>{
              currentLift.classList.remove('closing-door');
              closest.setNewStatus("idle");
           },1200)
        }, 1200);

    }, timeToReach);
} else {
    // checking is it in queue or not
    const alreadyInQueue = requestQueue.some(
        request => request.targetFloor === targetFloor && request.direction === direction
    );
    // if it is not availabe in queue then it will be pushed to queue as a new entry otherwise it will be executed as soon as the lift get idle ststus
    if (!alreadyInQueue) {
        requestQueue.push({ targetFloor, direction });
    }
}
}


function updateLiftPositions(lift, targetFloor, timeToReach) {
  lift.element.style.transitionDuration = `${timeToReach}ms`;
  lift.element.style.transform = `translateY(-${targetFloor * 80}px)`;
}



// checking any pending request
function processQueue() {
  if (requestQueue.length > 0) {
      // Removing entry from queue and destructring taeget and direction
      const { targetFloor, direction } = requestQueue.shift();
      //again calling the Movelifts dunction according to queue entry
      MoveLifts(targetFloor, direction);
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

