var newScript = document.createElement("script");
var target = document.getElementById("quicksight");
newScript.src = "https://unpkg.com/amazon-quicksight-embedding-sdk@1.0.3/dist/quicksight-embedding-js-sdk.min.js";
target.appendChild(newScript);

var dashboard
var url
function loadDashboard() {

    callApi('https://xzjsawhllk.execute-api.us-east-1.amazonaws.com/test/dashboard', formatRequestBody(getParameters()))
      .then(data => {
        console.log(JSON.stringify(data));
        url = getUrl(JSON.stringify(data));
        //document.getElementById("apiResponse").innerHTML = url;
        embedDashboard(url);
        //getQR(url);
      })
      .catch(error => console.error(error));

}


function callApi(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

function getUrl(myResponseBody) {
    var start = myResponseBody.search("https");
    var end = myResponseBody.lastIndexOf(",");
    return myResponseBody.substring(start, end - 1);
}

function embedDashboard(urlQuicksight) {
    var containerDiv = document.getElementById("dashboardContainer");
        var options = {
        url: urlQuicksight,
        container: containerDiv,
        parameters: {
            country: "United States"
        },
        scrolling: "no",
        height: "700px",
        width: "1000px"
    };
    dashboard = QuickSightEmbedding.embedDashboard(options);
    dashboard.on("error", onError);
    dashboard.on("load", onDashboardLoad);
}

function onDashboardLoad(payload) {
    console.log("Do something when the dashboard is fully loaded.");
}

function onError(payload) {
    console.log("Do something when the dashboard fails loading");
}

function getParameters() {
// www.mysite.com/my_app.html?visualizationId=Machine1015?dashboardGroupId=MaintenanceDashboards?proximity=5
    var GET = {};
    var query = window.location.search.substring(1).split("?");
    for (var i = 0, max = query.length; i < max; i++)
    {
        if (query[i] === "") // check for trailing & with no param
            continue;

        var param = query[i].split("=");
        GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    }
    console.log(GET);
    return GET;
}

function formatRequestBody(parameters = {}) {
    return {
                "visualizationId": parameters["visualizationId"],
                "dashboardGroupId": parameters["dashboardGroupId"],
                "requestDistance": {
                "proximity": parseInt(parameters["proximity"], 10)
                }
           }
}

 function getQR (url) {
    var newScript = document.createElement("script");
    var inlineScript = document.createTextNode('new QRCode("qrcode", "\''+url+'\'");');
    newScript.appendChild(inlineScript);
    var target = document.getElementById('qrcode');
    target.appendChild(newScript);
    }


//curl -i -X OPTIONS -H "Origin: https://sapp.amazon.com/DashboardEmbedding/" \
//    -H 'Access-Control-Request-Method: POST' \
//    -H 'Access-Control-Request-Headers: Content-Type : application/json, X-Api-Key: JslUpKkTuZ6w95ceN0XNw50PjIm5RZh57XnG9cLB' \
//    "https://btvqh7qcec.execute-api.us-east-1.amazonaws.com/TEST/dashboard"


//    try {
//        var apiKey = "JslUpKkTuZ6w95ceN0XNw50PjIm5RZh57XnG9cLB";
//        var request = {visualizationId: "Machine1015", dashboardGroupId: "MaintenanceDashboards", requestDistance: {proximity: 5.0}};
//        const response1 = fetch('https://3i78jyqovb.execute-api.us-east-1.amazonaws.com/test/dashboard', {
//                                    method: 'POST',
//                                    mode: 'cors',
//                                    headers: new Headers({
//                                                     'Content-Type': 'application/json',
//                                                     'X-Api-Key': 'JslUpKkTuZ6w95ceN0XNw50PjIm5RZh57XnG9cLB'
//                                                 }),
//                                    body: JSON.stringify(request)
//                                });
//         var delayInMilliseconds = 30000; //30 second
//
//         setTimeout(function() {
//           console.log("Is this doing anything? fetch: ", response1);
//         }, delayInMilliseconds);
//        //console.log("Is this doing anything? fetch: ", response1);
//    } catch (error) {
//        console.error("This is definitely an error errorFetch: ", error);
//    }



//{
//                                                                                          "visualizationId": "Machine1015",
//                                                                                          "dashboardGroupId": "MaintenanceDashboards",
//                                                                                          "requestDistance": {
//                                                                                              "proximity": 5.0
//                                                                                          }
//                                                                                      }