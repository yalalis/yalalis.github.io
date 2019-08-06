var newScript = document.createElement("script");
var target = document.getElementById("quicksight");
newScript.src = "https://unpkg.com/amazon-quicksight-embedding-sdk@1.0.3/dist/quicksight-embedding-js-sdk.min.js";
target.appendChild(newScript);

var dashboard
var url
var apiUrl = 'https://xzjsawhllk.execute-api.us-east-1.amazonaws.com/test/dashboard';
function loadDashboard() {

    callApi(apiUrl, formatRequestBody(getParameters()))
      .then(data => {
        console.log(JSON.stringify(data));
        url = getUrl(JSON.stringify(data));
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
}

function getParameters() {
    // www.mysite.com/index.html?visualizationId=Machine1015?dashboardGroupId=MaintenanceDashboards?proximity=5
    var GET = {};
    var query = window.location.search.substring(1).split("?");
    for (var i = 0, max = query.length; i < max; i++)
    {
        if (query[i] === "")
            continue;

        var param = query[i].split("=");
        GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    }
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