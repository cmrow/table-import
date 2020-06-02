function readSrc(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            debugger

            // let result = xhr.response;
            callback(xhr.response);
        }
        console.log(xhr.status);
    };
    xhr.send();

}