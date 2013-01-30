require.config({
    paths: {
        "a": "scripts/a"
    }
});

require(["a"], function (a) {

    console.log(a);

});