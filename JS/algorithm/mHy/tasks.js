(() => {
    setTimeout(() => {
        console.log("1-1");
        Promise.resolve().then(() => {
            console.log("1-2");
        });
    });
    console.log("2-1");
    Promise.resolve().then(() => {
        console.log("3-1");
        setTimeout(() => {
            console.log("3-2");
        });
    });
    new Promise(function (reslove) {
        console.log('4-1');
        reslove();
    }).then(function () {
        console.log('4-2');
    })
})()

// all correct