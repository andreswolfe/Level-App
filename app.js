// app code goes here
// matrix.init()....
//
// have fun
var options = {
  refresh: 10,
  timeout: 15000
};
var isLevel = true;
//function to change position depending on tilt
function lightPos(pitch, roll) {
  var pitchLightOne = (90 + pitch)
  var pitchLightTwo = (270 - pitch)
  var rollLightOne = (0 + roll)
  var rollLightTwo = (180 - roll)
  matrix.led([
    {
      color: 'yellow',
      angle: pitchLightOne,
      blend: true
    },
    {
      color: 'yellow',
      angle: pitchLightTwo,
      blend: true
    },
    {
      color: 'blue',
      angle: rollLightOne,
      blend: true
    },
    {
      color: 'blue',
      angle: rollLightTwo,
      blend: true
    }
  ]).render();
}
matrix.sensor('gyroscope', options).then(function(data){
console.log('gyroscope: >>>>>>', data) 
//makes referring to each less annoying
var pitch = data.pitch
var roll = data.roll
//if it isn't 90° or level, then it uses the functions above
if ((pitch <= 2 && pitch >= -2) && (roll <= 2 && roll >= -2)) {
  if(!isLevel) {
    matrix.led('green').render();
    isLevel = true;
  }
  
  
} else {
  isLevel = false;
  pitchlightPos(pitch, roll);
}
  matrix.type('monitor').send({pitchVal: pitch, rollVal: roll, isLevel: isLevel});
});