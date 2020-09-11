if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("./services.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    });
  }

  function formatDate(t){
    let a = t * 1000;
    
    let date = new Date(a);
    let year = date.getFullYear();
    let month = date.getMonth();
    let d = date.getDate() + 1;
    let dayNum = date.getDay();
    let monthString ="";
    let dayString ="";

    //convert month to string
    switch(month){
      case 0:
        monthString = "Jan";
        break;
      case 1:
        monthString = "Feb";
        break;
      case 2:
        monthString = "Mar";
        break;
      case 3:
        monthString = "Apr";
        break;
      case 4:
        monthString = "May";
        break;
      case 5:
        monthString = "Jun";
        break;
      case 6:
        monthString = "Jul";
        break;
      case 7:
        monthString = "Aug";
        break;
      case 8:
        monthString = "Sep";
        break;
      case 9:
        monthString = "Oct";
        break;
      case 10:
        monthString = "Nov";
        break;
      default:
        monthString = "Dec";
    }

    //convert day from int to days of the week
    switch(dayNum){
      case 0:
        dayString = "Mon";
        break;
      case 1: 
        dayString = "Tue";
        break;
      case 2:
        dayString = "Wed";
        break;
      case 3:
        dayString = "Thur";
        break;
      case 4:
        dayString = "Fri";
        break;
      case 5:
        dayString = "Sat";
        break;
      default:
        dayString = "Sun";
    }

    return `${dayString} ${monthString} ${("0"+d).slice(-2)}, ${year}`;
  }

  function formatTime(t){
    let tx = t * 1000;
    let d = new Date(tx);

    let hour = ("0" + d.getHours()).slice(-2);
    let min =("0" + d.getMinutes()).slice(-2);
    let s = `${hour}:${min}`;

    return s;
  }

  const btn = document.querySelector("#submit");
  
  btn.addEventListener("click", e =>{
    e.preventDefault();
    const inp = document.querySelector("#city");
    const  inpVal = inp.value.trim();
    const info =document.querySelector("#msg");
    const apiKey = "8cbcc52a489899b5cfbd8ee99c682403";

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inpVal}&appid=${apiKey}&units=metric`;
    let error;

    let perCont = document.createElement("div");
    
    
    
    fetch(currentUrl)
    .then(response => response.json())
    .then(data => {
      const {main, weather, wind, dt, sys, name} = data;
      // const wrapper = document.querySelector(".stats-wrapper");
      const icon = `https://openweathermap.org/img/wn/${weather[0]['icon']}.png`;

      let wrapString = `<div class="stats-wrapper">
      
        <div class="heading">
            <h2>${name}, ${sys.country}</h2>
                <span>${formatDate(dt)}</span>
        </div>
        <div class="cards-wrapper">
          <div class="cards">
             Temp ${Math.round(main.temp)}<sup>0</sup>C
          </div>
          <div class="cards">
              Min ${Math.round(main.temp_min)}<sup>0</sup>C
          </div>
          <div class="cards">
              Max ${Math.round(main.temp_max)}<sup>0</sup>C
          </div>
          <div class="cards">
             <img src="${icon}" alt="${weather[0].description}"/> ${weather[0].description}
          </div>
          <div class="cards">
              Wind ${wind.speed} km/hr
          </div>
          
          <div class="cards">
              Sunset ${formatTime(sys.sunset)} hrs
          </div>
          </div>
      `;   

      perCont.innerHTML = wrapString;
    
      // wrapper.innerHTML = wrapString;
      })
      .catch(() =>{
        error += "Could not fetch data";
      });
      let wrapper = document.querySelector("#root");
      wrapper.appendChild(perCont);

      if(error){
        info.textContent = error;
      }
     
    });