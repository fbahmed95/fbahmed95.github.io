function getRestCall(url) {
    return new Promise(async(resolve, reject) => {
        try {
            $("#loading").show();
            const response = await fetch(url, {
                method: 'GET',
                cache: Request.default,
            });
            resolve(response.json())
        } catch (e) {
            reject(e)
        } finally {
            $("#loading").hide();
        }
    })
}

function postRestCall(url, body) {
    return new Promise(async(resolve, reject) => {
        try {
            $("#loading").show();
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                cache: Request.default,
                body,
            });
            resolve(response.json());
        } catch (e) {
            reject(e);
        } finally {
            $("#loading").hide();
        }
    });
}


function putRestCall(url, body) {
    return new Promise(async(resolve, reject) => {
        try {
            $("#loading").show();
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                cache: Request.default,
                body,
            });
            resolve(response.json());
        } catch (e) {
            reject(e);
        } finally {
            $("#loading").hide();
        }
    });
}