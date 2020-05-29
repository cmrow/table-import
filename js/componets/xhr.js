function readSrc(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function(e){
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = xhr.response;
            return result;     
        }
    };
    xhr.send();
    xhr.onerror = function (e) {
        console.log(`error ${xhr.status} event : ${e}`)
    }
}