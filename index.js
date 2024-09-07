// stores all the availabe lifts
let lifts = [];
// stores all the pending request
let requestQueue = [];
// stores the sattus of floors
let floor=[];

function createLift(id) {
  const lift = {

    id: id,
    // idle moving_up moving_down
    status: 'idle',  
    currentFloor: 0,
    targetFloor: null,
    direction: null,
    element: null,

    // creation of lift
    createLiftElement: function () {
      const leftDoor = document.createElement('div');
      leftDoor.setAttribute('class', 'LeftDoor');

      const rightDoor = document.createElement('div');
      rightDoor.setAttribute('class', 'RightDoor');

      const liftElement = document.createElement('div');

      liftElement.appendChild(leftDoor);
      liftElement.appendChild(rightDoor);

      liftElement.classList.add('liftsss');
      this.element = liftElement;
    },

    

    // after reaching need to change the current position of lift
    updateFloorNo: function (floor) {
      this.currentFloor = floor;
    },

    updateTargetFloor: function (floor) {
      this.targetFloor = floor;
    },

    // need to change accordingly idle moving_up moving_down
    setNewStatus: function (status) {
      this.status = status;
    },

    setDirection : function (){
        this.direction = direction;
    }


  };

  lift.createLiftElement();
  return lift;
}


const numberInput1 = document.getElementById('floor')

 numberInput1.addEventListener('input', function () {
   this.value = this.value.replace(/[eE+-]/g, '');
 });

 const numberInput2 = document.getElementById('lift')

 numberInput2.addEventListener('input', function () {
   this.value = this.value.replace(/[eE+-]/g, '');
 });


function submitUserData() {


  // resetting the previous states
  let building = document.getElementById("newBuilding");
  building.innerHTML = "";
  lifts = [];
  requestQueue = [];




  // no of Floor in a building by a user
  let NO_OF_FLOOR = document.querySelector('#floor').value;
  // at least building should have 2 floors
  if (NO_OF_FLOOR < 1) {
    alert('No of Floor should be at least 1');
    return;
  }

  // no of lift in a building by a user
  let NO_OF_LIFT = document.querySelector('#lift').value;
  // at least 1 lift is mandatory
  if (NO_OF_LIFT < 1) {
    alert('No of Lift should be at least 1');
    return;
  }

  // based upon user input building and lift will be created
  createBuildingAndLift(NO_OF_FLOOR, NO_OF_LIFT);
}

function createBuildingAndLift(NO_OF_FLOOR, NO_OF_LIFT) {
  // creating the floor in a building
  for (let i = 0; i < NO_OF_FLOOR; i++) {
    const floor = document.createElement('div');
    floor.setAttribute('id', `floor${i}`);
    floor.setAttribute('class', 'floor');
    floor.dataset.floor = i;
    if (NO_OF_FLOOR == 1) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `downButton${i}`);
      floorButton.innerHTML = `<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/>`;
      floorButton.setAttribute('onclick', `MoveLifts(${i},'up')`);


      const groundFloor=document.createElement('div');
      groundFloor.setAttribute('class','grounf_button')
      groundFloor.innerHTML=`G Floor`
      groundFloor.appendChild(floorButton);
      floor.appendChild(groundFloor);

    }
    if (i != 0) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `upButton${i}`);
      floorButton.innerHTML = `<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-down.png" alt="circled-chevron-down"/>`;
      floorButton.setAttribute('onclick', `MoveLifts(${i},'down')`);

      const floorNo=document.createElement('div');
      floor.innerHTML=`Floor${i}`
       
      
      floor.appendChild(floorButton);
      floor.appendChild(floorNo);
    }
    if (i != NO_OF_FLOOR - 1) {
      const floorButton = document.createElement('button');
      floorButton.setAttribute('id', `downButton${i}`);
      floorButton.innerHTML = `<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/>`;
      floorButton.setAttribute('onclick', `MoveLifts(${i},'up')`);

      floor.appendChild(floorButton);
      if(i===0){
         const groundFloor=document.createElement('div');
         groundFloor.setAttribute('class','grounf_button')
         groundFloor.innerHTML=`G Floor`
         groundFloor.appendChild(floorButton);
         floor.appendChild(groundFloor);
      }

    }
    const building = document.getElementById('newBuilding');
    building.appendChild(floor);
  }

  // ground floor will be the place where all the lifts will stay by default
  const groundFLoor = document.querySelector(`#floor0`);

  // creating the lift as per requirement with the help of createLift function
  for (let i = 0; i < NO_OF_LIFT; i++) {
    const lift = createLift(i);
    lifts.push(lift);
    groundFLoor.appendChild(lift.element);
  }
}



function checkIfLiftMovingToTargetFloor(targetFloor, direction) {
    const lift = lifts.find(lift => lift.targetFloor === targetFloor && lift.direction === direction)
    console.log(lift)
    return lift ? true : false
}



// logic to move the lift from one place to another place
function MoveLifts(targetFloor, direction) {

  if (checkIfLiftMovingToTargetFloor(targetFloor, direction)) return

  let closest = null;
  let minDistance = Infinity;

  // Getting the nearest idle lift
  for (const lift of lifts) {
    if (lift.status === 'idle') {
      const currentF = lift.currentFloor;
      const distance = Math.abs(currentF - targetFloor);
      if (distance < minDistance) {
         minDistance = distance;
        closest = lift;
      }
    }
  }

  if (closest) {
    // Move the nearest lift to the requested floor and set the status accordingly
    const currentStatus = targetFloor > closest.currentFloor ? 'moving_up' : 'moving_down';
    closest.status=currentStatus;
    closest.targetFloor=targetFloor;
    closest.direction=direction;

    const timeToReach = Math.abs(targetFloor - closest.currentFloor) * 2000;
    updateLiftPositions(closest, targetFloor, timeToReach);

    setTimeout(() => {
      closest.updateFloorNo(targetFloor);
      const currentLift = closest.element;

      const leftDoor = currentLift.getElementsByTagName('div')[0];
      const rightDoor = currentLift.getElementsByTagName('div')[1];

      leftDoor.style.transitionDuration = '2.5s';
      leftDoor.style.transform = `translateX(-30px)`;

      rightDoor.style.transitionDuration = '2.5s';
      rightDoor.style.transform = `translateX(30px)`;

      setTimeout(() => {
        leftDoor.style.transitionDuration = '2.5s';
        leftDoor.style.transform = `translateX(0px)`;

        rightDoor.style.transitionDuration = '2.5s';
        rightDoor.style.transform = `translateX(0px)`;

        setTimeout(() => {
          closest.setNewStatus('idle');
          processQueue();
        }, 2500);
      }, 2500);
    }, timeToReach);

  } else {
    // Checking if the request is already in the queue
    const alreadyInQueue = requestQueue.some(
      (request) =>
        request.targetFloor === targetFloor && request.direction === direction
    );
    // If it is not available in the queue, push it as a new entry; otherwise, it will be executed when the lift gets an idle status
    if (!alreadyInQueue) {
      requestQueue.push({ targetFloor, direction });
      console.log(requestQueue);
    }
  }
}




function updateLiftPositions(lift, targetFloor, timeToReach) {
  lift.element.style.transitionDuration = `${timeToReach}ms`;
  lift.element.style.transform = `translateY(-${targetFloor * 120}px)`;
}

// checking any pending request
function processQueue() {
  if (requestQueue.length > 0) {
    // Removing entry from queue and destructuring target and direction
    const { targetFloor, direction } = requestQueue.shift();
    console.log(
      'INSIDE QUEUE DATA======>',
      'targetFloor=>',
      targetFloor,
      'direction=>',
      direction
    );
    // again calling the MoveLifts function according to queue entry
    MoveLifts(targetFloor, direction);
  }
}


