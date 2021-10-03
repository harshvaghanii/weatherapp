const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

(function() {
    document.getElementById("day").innerHTML = days[new Date().getDay()];
    document.getElementById("today_date").innerHTML = `${months[new Date().getMonth()]} ${new Date().getDate()}`;
})();


let btn = document.getElementById("submitBtn");
let city = document.getElementById('cityName');
let tempValue = document.getElementById('temp_real_val');
let cityValue = document.getElementById('city_name');
let display_container = document.getElementById("data-container");
let tempIcon = document.getElementById('temp_status');


let getInfo = async(e) => {
    e.preventDefault();
    if (city.value == '') {
        cityValue.innerHTML = 'City cannot be blank!!';
        display_container.classList.add("data_hide");
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=210bce695705cb1ec353898d78916f80`;

            let response = await fetch(url);
            let data = await response.json();
            display_container.classList.remove("data_hide");
            cityValue.innerHTML = `${data.name}, ${data.sys.country}`;
            let tempStatus = data.weather[0].main;
            tempValue.innerHTML = data.main.temp;
            if (tempStatus == "Clear") {
                tempIcon.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempStatus == "Clouds") {
                tempIcon.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus == "Rain") {
                tempIcon.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                tempIcon.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }

            city.value = '';

        } catch {
            cityValue.innerHTML = 'Invalid City Name!!!';
            display_container.classList.add("data_hide");
            city.value = '';
        }
    }
}


btn.addEventListener("click", getInfo)