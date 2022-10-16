// // VARIABLES DECLARATION
const landingBox = document.querySelector(".landing-box");
const appBox = document.querySelectorAll(".container");
const inputPart = document.querySelector(".input-part");
const infoText = inputPart.querySelector(".info-text");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");
const back = document.querySelector(".back");
const apikey = "43c71dea2bf985e1be48c8fa86a47910";



// // MANUAL INPUT METHODS
// // GETTING WEATHER BY CITY NAME
const weatherApi = async(city)=>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
    // console.log(response);
    const data = await response.json();
    if(response.status !== 200){
        // console.log("Unable to fetch data");
        infoText.classList.add("error"); 
        infoText.classList.replace("pending", "error");
        infoText.innerHTML = inputField.value + " is not a valid City";
    }
    else if(response.status === 200){
        infoText.innerHTML = "Getting weather details...";
        infoText.classList.add("pending"); 
        
        var timeout = setTimeout(()=>{
            // wrapper.classList.add("active");
            landingBox.style.display= "none";
            appBox[1].style.display = "flex";
        }, 2000)
   
        weatherInfo(data);
    }   
}

// // VERIFING THE INPUT
inputField.addEventListener("keyup", (event)=>{
    if(event.key == "Enter" && inputField.value != ""){
        weatherApi(inputField.value);     
    }
});


// INFORMATION NEEDED FROM THE WEATHER API DATA
function weatherInfo(info){
    console.log(info);
    //Getting Required Resources
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;
    const wind = info.wind.speed;

  

    //Assign The Acquired Resources Elements
    document.getElementById("name").innerHTML = city + " " + country;
    document.querySelector(".button-dial-label span").innerHTML = temp +  "&deg;" + "C";
    document.querySelector(".wind span").innerHTML = wind;
    document.querySelector(".humidity span").innerHTML = humidity + "%";

}


// AUTOMATIC METHODS 
function geolocation(){
    if(navigator.geolocation){
        console.log("found");
        navigator.geolocation.getCurrentPosition( async(position)=>{
             const lat = position.coords.latitude;
             const lon = position.coords.longitude;
             const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);
             const data = await response.json();
            //  console.log(lat, lon);
            //  console.log(position);
            //  console.log(data);
             
             if(response.status !== 200){
                // console.log("Unable to fetch data");
                infoText.classList.add("error"); 
                infoText.classList.replace("pending", "error");
                infoText.innerHTML = "Error Occur";
            }
            else if(response.status === 200){
                infoText.innerHTML = "Getting weather details...";
                infoText.classList.add("pending"); 
                var timeout = setTimeout(()=>{
                    // wrapper.classList.add("active");
                    landingBox.style.display= "none";
                    appBox[1].style.display = "flex";
                }, 2000)
           
                weatherInfo(data);
            }

        }, (error)=>{
            infoText.classList.add("error"); 
            infoText.classList.replace("pending", "error");
            infoText.innerHTML = error.message;
        });

    }
    else{
        console.log("not found");
    }
}
// CALL THE GEOLOCATION FUNCTION WHEN USER CLICK
locationBtn.addEventListener("click", geolocation);

//BACK TO HOMEPAGE
back.addEventListener("click", ()=>{
    // wrapper.classList.remove("active");
    // infoText.classList.remove("pending"); 
    landingBox.style.display= "flex";
    appBox[1].style.display = "none";
    infoText.classList.remove("error"); 
    infoText.classList.remove("pending"); 

})




//CHANING DATA-THEME FROM LIGHT TO DARK
const btn = document.getElementById("toggler");
const btnIcon = document.getElementById("toggler-icon");
const container = document.getElementById("contain");

btn.onclick = function(){
    if(container.getAttribute("data-theme")!= "dark"){
        container.setAttribute("data-theme", "dark");
        btnIcon.setAttribute("class", "fa fa-solid fa-sun-o");
    }
    else{
        container.setAttribute("data-theme", "");
        btnIcon.setAttribute("class", "fa fa-solid fa-moon-o");
    }
}