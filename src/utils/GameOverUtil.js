const getFinalVid = () => {
  let vid = document.getElementById("myVideo")
  let topDS = document.getElementById("dsTop")
  let btDS = document.getElementById("dsBtm")
  if(vid.style.display === "") {
    vid.style.display = 'block'
    topDS.style.opacity = '0'
    btDS.style.opacity = '0'
  }
}

const getFinalVidHide = () => {  
  let vid = document.getElementById("myVideo")
  let topDS = document.getElementById("dsTop")
  let btDS = document.getElementById("dsBtm")
  if(vid.style.display === 'block') {
    vid.style.display = 'none'
    topDS.style.opacity = '1'
    btDS.style.opacity = '1'
  }
}

const showDS = () => {
  let vid = document.getElementById("myVideo")
  let topDS = document.getElementById("dsTop")
  let btDS = document.getElementById("dsBtm")
  if(vid.style.display === 'block') {
    topDS.style.opacity = '.2'
    btDS.style.opacity= '.2'
  }
}

 export {
  getFinalVid,
  getFinalVidHide,
  showDS
 }