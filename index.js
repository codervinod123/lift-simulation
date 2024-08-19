function submitUserData() {
  let NO_OF_FLOOR = document.querySelector("#floor").value;
  let NO_OF_LIFT = document.querySelector("#lift").value;

  for (let i = 0; i < NO_OF_FLOOR; i++) {
    const newFlat = document.createElement("div");
    if (i == 0) {
      newFlat.innerHTML = `<div id='floor${i}'><button>DOWN</button> </div>`;
    } else if (i == NO_OF_FLOOR - 1) {
      newFlat.innerHTML = `<div id='floor${i}'> <button>UP</button> </div>`;
    } else {
      newFlat.innerHTML =
        `<div id='floor${i}'> <button>UP</button><button>DOWN</button> </div>`;
    }
    const building = document.getElementById("newBuilding");
    building.appendChild(newFlat);
  }

  const groundFLoor=document.querySelector(`#floor${NO_OF_FLOOR-1}`);

  for(let i=0; i<NO_OF_LIFT; i++){
        const newLift=document.createElement('div');
        newLift.innerHTML=`<div class='floor_lift'></div>`;
        groundFLoor.appendChild(newLift);
  }

}
