
function readSrc(url) {


    s5.Request.setHeader('api/', 'Authorization', window.parent.getToken);
    s5.Request('GET', url, {
        Ok: function (data) {
            return data;
        },
        Unauthorize: function () {

        }
    });
}