function readSrc(url) {
    var fetchHeaders = new Headers({
        Accept: 'application/json'
    });

    var fetchOptions = {
        cache: 'default',
        headers: fetchHeaders,
        method: 'GET',
        mode: 'cors'
    };
    return fetch(url, fetchOptions)
        .then(
            (resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    return {
                        error: true,
                        status: resp.status
                    }
                }
            }
        ).catch(
            (err) => {
                console.error(err);
            }
        );
}
