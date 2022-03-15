export function get(appid, where) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + where + "&units=metric&appid=" + appid;
}
