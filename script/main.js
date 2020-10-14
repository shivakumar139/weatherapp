// calls the function when page load to get dynami location
dynamicLocation();
const apiKey = "362d7ef020a4df0f59b3ec2fbec6a06b";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

$(document).ready(function () {
    //when user input the location then this calls
    $("input").keypress((event) => {
        let cityName = $("input").val();
        if (event.keyCode == 13) {
            let mainURL = `${baseURL}q=${cityName}&appid=${apiKey}&units=metric`;
            console.log(mainURL);
            callApi(mainURL);
        }
    });
});


//getting the data from the api and ajax code
function callApi(mainURL) {
    $.ajax({
        asyc: "true",
        url: mainURL,
        beforeSend: () => {
            $(".loader").css("display", "block");
            $(".icon").hide();
        },
        success: (result) => {
            updateData(result);
            setIcons(result.weather[0].icon);
        },
        error: () => {
            alert("Invalid loactation");
            $(".loader").css("display", "none");
            $(".icon").show("fast");
        }
    });
}

//update the data getting from the api
function updateData(result) {
    $(".cityName h1").text(result.name);
    $(".cityName span").text(result.weather[0].main);
    $(".liveTemp h2").text(result.main.temp + " °C");
    $(".liveTemp small").text(result.name);
    $(".liveTemp p").text(result.weather[0].description);
    // $(".weatherIcon img").attr("src", result.current.condition.icon);
    $(".wind p").text(result.wind.deg);
    $(".temprature p").text(result.main.feels_like + " °C");
    $(".loader").css("display", "none");
    $(".icon").css("display", "block");

    let sunrise = new Date(result.sys.sunrise * 1000);
    let hours = sunrise.getHours();
    let minutes = sunrise.getMinutes();
    sunrise = hours + ":" + minutes + " AM";
    $(".sunrise p").text(sunrise);
}


//getting dynamic location and call the api
function dynamicLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            let url = `${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            callApi(url);
        });
    }
}


function setIcons(icon) {
    console.log(icon);
    $(".icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");

}