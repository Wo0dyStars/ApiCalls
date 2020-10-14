$("#btn-postal-codes").click(function() {
    emptyResults();
    ajaxCall({
        postalCode: $("#postalCode").val(),
        maxRows: $("#maxRows").val(),
        API: "postalCodes"
    });
})

$("#btn-weather-observations").click(function() {
    emptyResults();
    ajaxCall({
        north: $("#north").val(),
        south: $("#south").val(),
        east: $("#east").val(),
        west: $("#west").val(),
        API: "weatherObservations"
    });
})

$("#btn-oceans").click(function() {
    emptyResults();
    ajaxCall({
        lat: $("#lat").val(),
        lng: $("#lng").val(),
        API: "ocean"
    });
})

function emptyResults() {
    $("#output-postal-codes").empty();
    $("#output-weather-observations").empty();
    $("#output-oceans").empty();
}

function ajaxCall(params) {
    
    $.ajax({
        url: "php/APIProcessing.php",
        type: "POST",
        dataType: "json",
        data: params,
        success: function(result) {

            if (result.status.name === "OK") {
                processOutput(params.API, result["data"], result.status);
            }

        },
        error: function(error) {
            console.log("The following error occurred: ", error.statusText);
        }
    })

}

function processOutput(APIname, data, status) {
    let jsonResult = `
        <h3>API Details</h3>
        <pre>
                <strong>status:</strong> {
                    name: <span class="jsonColor">${status.name}</span>,
                    code: <span class="jsonColor">${status.code}</span>,
                    description: <span class="jsonColor">${status.description}</span>
                }
        </pre>
        <hr>
    `;

    if (APIname === "postalCodes") {
        for (let i = 0; i < data.length; i++) {
            jsonResult += `
                data: {
                    ${i}: {
                        adminName2: <span class="jsonColor">${data[i]["adminName2"]}</span>,
                        countryCode: <span class="jsonColor">${data[i]["countryCode"]}</span>,
                        lat: <span class="jsonColor">${data[i]["lat"]}</span>,
                        lng: <span class="jsonColor">${data[i]["lng"]}</span>,
                        placeName: <span class="jsonColor">${data[i]["placeName"]}</span>,
                        postalCode: <span class="jsonColor">${data[i]["postalCode"]}</span>
                    }
                }
            `;
        }

        $("#output-postal-codes").html(`<pre>${jsonResult}</pre>`);
    }

    if (APIname === "weatherObservations") {
        for (let i = 0; i < data.length; i++) {
            jsonResult += `
                data: {
                    ${i}: {
                        clouds: <span class="jsonColor">${data[i]["clouds"]}</span>,
                        humidity: <span class="jsonColor">${data[i]["humidity"]}</span>,
                        lat: <span class="jsonColor">${data[i]["lat"]}</span>,
                        lng: <span class="jsonColor">${data[i]["lng"]}</span>,
                        observation: <span class="jsonColor">${data[i]["observation"]}</span>,
                        stationName: <span class="jsonColor">${data[i]["stationName"]}</span>,
                        temperature: <span class="jsonColor">${data[i]["temperature"]}</span>,
                        windSpeed: <span class="jsonColor">${data[i]["windSpeed"]}</span>
                    }
                }
            `;
        }

        $("#output-weather-observations").html(`<pre>${jsonResult}</pre>`);
    }

    if (APIname === "ocean") {
        jsonResult += `
                {
                    distance: <span class="jsonColor">${data["distance"]}</span>,
                    geonameId: <span class="jsonColor">${data["geonameId"]}</span>,
                    name: <span class="jsonColor">${data["name"]}</span>
                }
        `
        $("#output-oceans").html(`<pre>${jsonResult}</pre>`);
    }
}

// Preloader
$(window).on('load', function () {    
    if ($('#preloader').length) {      
        $('#preloader').delay(100).fadeOut('slow', function () {        
            $(this).remove();      
        });    
    }}
);