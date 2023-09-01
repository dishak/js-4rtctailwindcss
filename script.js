const hourselector = document.getElementById("hour")
const minselector = document.getElementById("minute")
const secselector = document.getElementById("sec")
const dateselector = document.getElementById("date")

let dateNtime,country, date,time, hour, min, sec, hourdegree, mindegree, secdegree, currentday, cDay, cMonth, cYear
let response, getresponse,url


// seconds tick sound
const tick = new Audio('ticking-clock_1-27477.mp3')
function tickplay() {
  tick.play()
}

// Fetch API from abstract website for date and time
//Compete  actual URL                             :<-----------------query parameters-------------->
//https://timezone.abstractapi.com/v1/current_time/?api_key=1673042e42ac4d49b73a94e6f9e29db7&location=NY,%20US

let parameters =
{
  api_key: "1673042e42ac4d49b73a94e6f9e29db7",
  location: "IN"
}
// By default displays US time
url = new URL("https://timezone.abstractapi.com/v1/current_time/?api_key=1673042e42ac4d49b73a94e6f9e29db7&location=NY,%20US") 

// Access the other html document insterted using iframe
let iframe= document.getElementById("countryinput")
console.log(`The iframe is: ${iframe}`)
let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
console.log(`The iframedocument is: ${iframeDocument}`)

// If any country selected from dropdown addeventlistner is fired
iframeDocument.addEventListener("change",(event)=>{
  // Update location/country selected value
  parameters.location=event.target.value
    url = new URL("https://timezone.abstractapi.com/v1/current_time/")
    for (k in parameters) {
    url.searchParams.append(k, parameters[k])}
})

// %%%%%%%%%%%%try catch method for fetching date and time%%%%%%%%%%%%%%%%%
//    fetch(url)
// .then(response => response.json()
// ).then(response=>{
//   // datetime key from received JSON object
//   dateNtime=response.datetime
//   // gets time only from string
//   time=  dateNtime.substring(11,19) 
//   hour=time.substring(0,2)
//   min=time.substring(3,5)
//   sec=time.substring(6,8)
//   // console.log(`The time is: ${hour}:${min}:${sec}`)

// }).catch(err=>{console.log(err)})


//************** */ async await method to fetch date and time*******************
async function awaitfetch() 
{
  getresponse = await fetch(url)
  response = await getresponse.json()
  return response   // sending datetime json response to timedegree function
}
function timedegree() 
{
  dateNtime =  response.datetime
  date = dateNtime.substring(0,11)
  time =  dateNtime.substring(11, 19)
  hour =  time.substring(0, 2)
  min =  time.substring(3, 5)
  sec =  time.substring(6, 8)
  console.log(`The date from api is: ${date}`)
  console.log(`The time from api is: ${hour}:${min}:${sec}`)
  // console.log("hi from timedegree")
  hourdegree = String((hour - 12) * 30 + min * 0.5) + "deg"
  mindegree = String(min * 6) + "deg"
  secdegree = String(sec * 6) + "deg"
  hourselector.style.transform = ` rotate(${hourdegree}) `
  minselector.style.transform = ` rotate(${mindegree}) `
  secselector.style.transform = ` rotate(${secdegree}) `
  dateselector.innerHTML=dateNtime

}
let settimer=0

// fetch api function call
function callclock()
{
  awaitfetch().then((resp) =>timedegree(resp))
.catch(err=>{console.log("error in awaitfetch")})
}

callclock()

// updating seconds, as continuous fetching time api is not possible due to restrictions for free users 
// hence every 10seconds once timeapi is called
// rest times manually seconds is updated
setInterval(() => {
  settimer++
  if(settimer==10)
  {
    console.log(`The time from manual function is: ${hour}:${min}:${sec}`)
    callclock()
    settimer=0
  }
  else
  {
    ++sec
    if(sec>=61)
    {
      sec=sec-60
    }
    secdegree = String(sec * 6) + "deg"
    secselector.style.transform = ` rotate(${secdegree}) `
  }
  
}, 999);


// To get Date using date API in JS
// currentday = new Date()
// cDay= currentday.getDate()
// cMonth= currentday.getMonth()+1
// cYear = currentday.getFullYear()

// Function to get current location time only
// setInterval( ()=>
// {
//      currentday = new Date()
//      hour=currentday.getHours()
//      min=currentday.getMinutes()
//      sec=currentday.getSeconds()
//      console.log(`Today is : ${cDay}: ${cMonth}: ${cYear}`)
//      console.log(`Time is : ${hour}: ${min}: ${sec}`)
//     timedegree()
//     tickplay()

// },950)



