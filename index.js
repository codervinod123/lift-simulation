function submitUserData() {
  let NO_OF_FLOOR = document.querySelector("#floor").value;
  let NO_OF_LIFT = document.querySelector("#lift").value;

  for (let i=0; i<NO_OF_FLOOR; i++) {
    
    // createing the floor in a building
    const floor = document.createElement("div");
    floor.setAttribute('id',`floor${i}`);
    
    if(i!=0){
       const floorButton=document.createElement('button');
       floorButton.setAttribute('id',`upButton${i}`)
       floorButton.innerHTML = `<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/>`;
       floorButton.setAttribute('onclick',`handleClickUp(${i})`);
       floor.appendChild(floorButton);
    }
    if(i!=NO_OF_FLOOR-1){
       const floorButton=document.createElement('button');
       floorButton.setAttribute('id',`downButton${i}`)
       floorButton.innerHTML = `<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-down.png" alt="circled-chevron-down" alt="circled-chevron-up"/>`;
       floorButton.setAttribute('onclick',`handleClickDown(${i})`);
       floor.appendChild(floorButton);
     }
    const building = document.getElementById("newBuilding");
    building.appendChild(floor);
  }

  // floor where all the lifts will stays by default
  const groundFLoor=document.querySelector(`#floor${NO_OF_FLOOR-1}`);

  // creating the lift as per requirement
  for(let i=0; i<NO_OF_LIFT; i++){
        const newLift=document.createElement('div');
        newLift.setAttribute('class','floor_lift')
        newLift.setAttribute('id',`lift${i}`);
        groundFLoor.appendChild(newLift);
  }

}


function handleClickDown(index){
   const clickedFloor=document.getElementById(`downButton${index}`);
   console.log(clickedFloor);
}

function handleClickUp(index){
  const clickedFloor=document.getElementById(`upButton${index}`);
  const liftTosendup=document.getElementById(`lift${index}`);
  console.log(index,liftTosendup);
  console.log(index);
  liftTosendup.style.animation = `moveUp ${index*3}s ease forwards`;
}



