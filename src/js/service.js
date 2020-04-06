

$(document).ready(function () {

    let url = './../assets/services.JSON';
    $(window).on("load", function () {
        $.getJSON(url, function (data){
            console.log("Service Data" + JSON.stringify(data));
            $.each(data.Services, function (key, value) {
                var ele = $(".json1 div.json2:first").clone();
                ele.find("img").attr({
                    src: value.serviceImage,
                    alt: value.serviceImageAltText
                });
                ele.find("h5").text(value.serviceName);
                ele.find("p").text(value.serviceDescription);
                $(".json1").append(ele);
            })
            $(".json1 div.json2:first").remove();
        })
    });

});