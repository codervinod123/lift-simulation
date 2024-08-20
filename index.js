function submitUserData() {
  let NO_OF_FLOOR = document.querySelector("#floor").value;
  let NO_OF_LIFT = document.querySelector("#lift").value;

  for (let i=0; i<NO_OF_FLOOR; i++) {
    
    const newFlat = document.createElement("div");
    newFlat.setAttribute('id',`floor${i}`);
    if (i == 0) {
      newFlat.innerHTML = `<button><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-down.png" alt="circled-chevron-down"/></button>`;
    } else if (i == NO_OF_FLOOR - 1) {
      newFlat.innerHTML = `<button><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/></button>`;
    } else {
      newFlat.innerHTML =
        `<button><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-down.png" alt="circled-chevron-down"/></button><button><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-chevron-up.png" alt="circled-chevron-up"/></button>`;
    }
    const building = document.getElementById("newBuilding");
    building.appendChild(newFlat);
  }

  const groundFLoor=document.querySelector(`#floor${NO_OF_FLOOR-1}`);

  for(let i=0; i<NO_OF_LIFT; i++){
        const newLift=document.createElement('div');
        newLift.setAttribute('class','floor_lift')
        newLift.setAttribute('id',`lift${i}`);
        groundFLoor.appendChild(newLift);
  }

}
