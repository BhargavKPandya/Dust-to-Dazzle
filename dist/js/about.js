$(document).ready(function () {

    let url = './../assets/about.JSON';
    $(window).on("load", function () {
        $.getJSON(url, function (data){
            console.log("About Data--" + JSON.stringify(data));
            $.each(data.AboutHire, function (key, value) {
                var ele = $(".hire div.json:first").clone();
                ele.find("i").attr({
                    class: value.hireImageClass
                });
                ele.find("h5").text(value.hireTitle);
                ele.find("p").text(value.hireDescription);
                $(".hire").append(ele);
            })
            $(".hire div.json:first").remove();
        })
    });
});