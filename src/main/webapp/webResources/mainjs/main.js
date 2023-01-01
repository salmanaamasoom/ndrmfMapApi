'use strict'
// let ip = 'localhost';
let ip = '192.168.100.248';
// let ip = '58.65.167.246';
let mapView;
let initExtent;
let barChart;
let chartLabels = [];
let chartData = [];
let schemesArray = [];
let pieChart = [];
let doughnutChart = [];
let pathname = window.location.pathname;
let card2;
let card3;
let card4;
function onLoadMap() {
    require([
        "esri/config",
        "esri/Map",
        "esri/geometry/Extent",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/rest/identify",
        "esri/rest/support/IdentifyParameters",
        "esri/widgets/LayerList",
        "esri/widgets/Expand",
        "esri/widgets/BasemapGallery",
        "esri/widgets/BasemapGallery/support/LocalBasemapsSource",
        "esri/Basemap",
        "esri/symbols/Symbol",
        "esri/Color",
        "esri/Graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/rest/query",
        "esri/rest/support/Query",
    ], function (esriConfig, Map, Extent, MapView, FeatureLayer, MapImageLayer, identify, IdentifyParameters,
                 LayerList, Expand, BasemapGallery, LocalBasemapsSource, Basemap, Symbol, Color,
                 Graphic, SimpleLineSymbol, SimpleFillSymbol, query, Query) {

        let params;
        esriConfig.apiKey = "AAPKb297a31fd881403f93f0ec28a209878a6EXqptAnrhOiqrDJTqFGEMXl7QdTL44suJ33ndVYWpAFCBoOtWREWkCw6fbgy_iw";


        let mapImageLayer = new MapImageLayer({
            url: "https://"+ip+":6443/arcgis/rest/services//NDRMF_Projects/MapServer",
        });

        // URL to the map service where the identify will be performed
        let identifyURL = "https://"+ip+":6443/arcgis/rest/services//NDRMF_Projects/MapServer";

        // use identify to query the service to add interactivity to the app
        let identifyLayer = new MapImageLayer({
            url: identifyURL,
            opacity: 0.5
        });

        initExtent = new Extent({
            "xmin": 60.891856 + 5,
            "ymin": 37.097590,
            "xmax": 79.305738 + 5,
            "ymax": 23.703069,
            "spatialReference": {
                "wkid": 4326
            }
        });

        const map = new Map({
            basemap: "satellite" // Basemap layer service
        });

        mapView = new MapView({
            map: map,
            extent: initExtent,
            // center: [73.100000, 30.375321], // Longitude, latitude
            // zoom: 5, // Zoom level
            container: "mapDiv" // Div element
        });

        map.add(mapImageLayer);
        // map.add(identifyLayer);

        /*
        *  --------------------Identify Task Popup ----------------------
        */

        mapView.when(function () {
            // executeIdentify() is called each time the view is clicked
            mapView.on("click", executeIdentify);

            // Set the parameters for the identify
            params = new IdentifyParameters();
            params.tolerance = 3;
            params.layerIds = mapImageLayer.visibleLayers;
            // params.layerIds = [0, 1, 2, 3, 4];
            params.layerOption = "top";
            params.width = mapView.width;
            params.height = mapView.height;
        });

        // Executes each time the view is clicked
        function executeIdentify(event) {
            // Set the geometry to the location of the view click
            params.geometry = event.mapPoint;
            params.mapExtent = mapView.extent;
            document.getElementById("mapDiv").style.cursor = "wait";

            // This function returns a promise that resolves to an array of features
            // A custom popupTemplate is set for each feature based on the layer it
            // originates from
            identify.identify(identifyURL, params).then(function (response) {
                var results = response.results;

                return results.map(function (result) {
                    var feature = result.feature;
                    var layerName = result.layerName;

                    feature.attributes.layerName = layerName;
                    if (layerName === "Schemes") {
                        feature.popupTemplate = {
                            // autocasts as new PopupTemplate()
                            title: layerName,
                            content:
                                [
                                    {
                                        type: "fields",
                                        fieldInfos: [
                                            {
                                                fieldName: "SCHEME_ID",
                                                label: "Scheme ID"
                                            }, {
                                                fieldName: "SCHEME_COD",
                                                label: "Scheme Code"
                                            }, {
                                                fieldName: "SCHEME_NAM",
                                                label: "Scheme Name"
                                            }, {
                                                fieldName: "FIP",
                                                label: "FIP"
                                            }, {
                                                fieldName: "DIRECT_BEN",
                                                label: "Direct Beneficiaries"
                                            }, {
                                                fieldName: "INDIRECT_B",
                                                label: "Indirect Beneficiaries"
                                            }, {
                                                fieldName: "AGRICULTUR",
                                                label: "Agriculture"
                                            }, {
                                                fieldName: "NON_AGRICU",
                                                label: "Agriculture"
                                            }, {
                                                fieldName: "MITIGATION",
                                                label: "Mitigation"
                                            }, {
                                                fieldName: "SCHEME_STA",
                                                label: "Status"
                                            }, {
                                                fieldName: "COST_CONTR",
                                                label: "Contract Cost"
                                            }
                                        ]
                                    }
                                ]
                                // "<br><b>NON AGRI (Hec) :</b> {NON_AGRICU}" +
                                // "<br><b>MITIGATION:</b> {MITIGATION}" +
                                // "<br><b>SCHEME_STA:</b> {SCHEME_STA}" +
                                // "<br><b>COST:</b> {COST_CONTR}</table>"
                        };
                    } else if (layerName === "Union Council Boundary") {
                        feature.popupTemplate = {
                            // autocasts as new PopupTemplate()
                            title: "{LABEL_LOCAL}",
                            content: "<b>UC:</b> {UNION_COUN}"
                        };
                    } else if (layerName === "Tehsil Boundary") {
                        feature.popupTemplate = {
                            // autocasts as new PopupTemplate()
                            title: layerName,
                            content: "<b>TEHSIL:</b> {TEHSIL_NAM}"
                        };
                    } else if (layerName === "District Boundary") {
                        feature.popupTemplate = {
                            // autocasts as new PopupTemplate()
                            title: layerName,
                            content: "<b>DISTRICT:</b> {DISTRICT_N}"
                        };
                    } else if (layerName === "Province Boundary") {
                        feature.popupTemplate = {
                            // autocasts as new PopupTemplate()
                            title: layerName,
                            content: "<b>PROVINCE:</b> {PROVINCE_N}"
                        };
                    }
                    return feature;
                });
            })
                .then(showPopup); // Send the array of features to showPopup()

            // Shows the results of the identify in a popup once the promise is resolved
            function showPopup(response) {
                if (response.length > 0) {
                    mapView.popup.open({
                        features: response,
                        location: event.mapPoint
                    });
                }
                document.getElementById("mapDiv").style.cursor = "auto";
            }
        }

        /*
        *  --------------------BaseLayer with Expand ----------------------
       */

        let basemaps = [
            Basemap.fromId('streets'),
            Basemap.fromId('hybrid'),
            Basemap.fromId('satellite'),
            Basemap.fromId('gray')
        ];
        let source = new LocalBasemapsSource({
            basemaps: basemaps
        });
        const basemapGallery = new BasemapGallery({
            view: mapView,
            // container: "tocDiv"
            source: source
        });
        const bgExpand = new Expand({
            view: mapView,
            content: basemapGallery,
            container: "tocDiv"
        });
        // Add the expand instance to the ui
        // mapView.ui.add(bgExpand, "top-right");

        /*
         *  --------------------Legend with Layer List ----------------------
        */

        // Add a legend instance to the panel of a ListItem in a LayerList instance
        const layerList = new LayerList({
            view: mapView,
            // container: "tocDiv",
            listItemCreatedFunction: (event) => {
                const item = event.item;
                if (item.layer.type != "group") {
                    // don't show legend twice
                    item.panel = {
                        content: "legend",
                        open: true
                    };
                    item.watch("visible", function (event) {
                        console.info(event);

                    });
                }
            }
        });
        mapView.ui.add(layerList, "bottom-right");


        /*
        *start -- this function for zooming from table id of line feature
        */
        function search_for_highlight(featureId, layerId, attributeName) {
            var queryURL = "https://"+ip+":6443/arcgis/rest/services//NDRMF_Projects/MapServer/" + layerId + "";
            // create the Query object
            let queryObject = new Query();
            // queryObject.where = "PROVINCE_I = 6";
            queryObject.where = "" + attributeName + " = " + featureId + "";
            // console.log(queryObject.where);
            queryObject.outSpatialReference = {wkid: 4326};
            queryObject.returnGeometry = true;
            queryObject.outFields = ["*"];

            query.executeQueryJSON(queryURL, queryObject).then(function (results) {
                // results.graphics contains the graphics returned from query
                results_search_for_highlight(results)
            });

        }

        function results_search_for_highlight(featureSet) {

            /* this line of code is for zoom to extent of a feature */
            var resultSet = featureSet.features;
            var geom = resultSet[0].geometry;

            /* this line of code is for syling of feature */
            // var symbol = new SimpleFillSymbol("solid",
            //      new SimpleLineSymbol("solid", new Color([0, 255, 255]), 4), new Color([255, 255, 0, 0]));
            let pointSymbol = {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                style: "circle",
                // color: "none",
                size: "22px",  // pixels
                outline: {  // autocasts as new SimpleLineSymbol()
                    color: [0, 255, 255, 0.9],
                    width: 3  // points
                }
            };

            var symbol = new SimpleFillSymbol({
                style: "none",
                outline: {  // autocasts as esri/symbols/SimpleLineSymbol
                    color: [0, 255, 255, 0.9],
                    width: 2
                }
            }, new SimpleLineSymbol("solid", new Color([0, 255, 255]), 4), new Color([255, 255, 0, 0]));

            let graphic;
            if (geom.type == "point") {
                graphic = new Graphic(geom, pointSymbol);
                // mapView.goTo(geom);
                mapView.goTo({
                    target: geom,
                    zoom: 18
                });
            } else {
                graphic = new Graphic(geom, symbol);
                mapView.goTo(geom);
            }

            mapView.graphics.removeAll(); // make sure to remmove previous highlighted feature
            mapView.graphics.add(graphic);

            // for (var i=0, il=featureSet.features.length; i<il; i++) {
            //     var graphic = featureSet.features[i];
            //     graphic.setSymbol(symbol);
            //     map.graphics.add(graphic);
            // }
        }

        function search_for_onload_zoom(featureId, layer_id, attributeName) {
            var query_task = new esri.tasks.QueryTask("https://"+ip+":6443/arcgis/rest/services//NDRMF_Projects/MapServer/" + layer_id + "");
            var query = new esri.tasks.Query();
            query.where = "" + attributeName + " = " + featureId + "";
            query.returnGeometry = true;
            query.outFields = ["*"];
            query_task.execute(query, results_search_for_zoom);
        }

        function results_search_for_zoom(featureSet) {
            /* this line of code is for zoom to extent of a feature */
            var resultSet = featureSet.features;
            var geom = resultSet[0].geometry;
            var extent = geom.getExtent();
            map.setExtent(extent);
            // initExtent = extent;
        }

        /*
         *end -- this function for zooming from table id of line feature
         */
        dojo.setObject('search_for_highlight', search_for_highlight);
        dojo.setObject('results_search_for_highlight', results_search_for_highlight);

        getProvinceList();
        getAllSchemeData();
        getFipList();
        getThematicList();
        onloadPieChart();
        onloadDoughnutChart();
    });
}

function getAllSchemeData() {
    // DO POST
    $.ajax({
        type : 'get',
        dataType : 'json',
        url : pathname +'adminBoundary/getAllSchemeList',
        contentType : 'application/json',
        cache: false,
        crossDomain: true,
        success : function(result) {
            document.getElementById("totalSchemesCard").innerHTML = result.length;
            cardData(result,true);
            var html = '<div>';
            $(result).each(function () {
                if(this.schemeStatusPercentage >= 80 && this.schemeStatusPercentage <= 100){
                    html += '<tr><td><a value="'+this.schemeId+'-'+this.tehsil.tehsilId+'-'+this.schemeStatusPercentage+'" ' +
                        'onclick="onClickSchemeName(this)">' + this.schemeName + '</a></td><td>' + this.schemeCode + '</td>' +
                        '<td><span class="badge badge-success">' + this.schemeStatus + '</span></td><td>' + this.fip.fipName + '</td></tr>';
                }
                if(this.schemeStatusPercentage >= 60 && this.schemeStatusPercentage < 80){
                    html += '<tr><td><a value="'+this.schemeId+'-'+this.tehsil.tehsilId+'-'+this.schemeStatusPercentage+'" ' +
                        'onclick="onClickSchemeName(this)">' + this.schemeName + '</td><td>' + this.schemeCode + '</td>' +
                        '<td><span class="badge badge-info">' + this.schemeStatus + '</span></td><td>' + this.fip.fipName + '</td></tr>';
                }
                if(this.schemeStatusPercentage >= 40 && this.schemeStatusPercentage < 60){
                    html += '<tr><td><a value="'+this.schemeId+'-'+this.tehsil.tehsilId+'-'+this.schemeStatusPercentage+'" ' +
                        'onclick="onClickSchemeName(this)">' + this.schemeName + '</td><td>' + this.schemeCode + '</td>' +
                        '<td><span class="badge badge-warning">' + this.schemeStatus + '</span></td><td>' + this.fip.fipName + '</td></tr>';
                }
                if(this.schemeStatusPercentage >= 0 && this.schemeStatusPercentage < 40) {
                    html += '<tr><td><a value="'+this.schemeId+'-'+this.tehsil.tehsilId+'-'+this.schemeStatusPercentage+'" ' +
                        'onclick="onClickSchemeName(this)">' + this.schemeName + '</td><td>' + this.schemeCode + '</td>' +
                        '<td><span class="badge badge-danger">' + this.schemeStatus + '</span></td><td>' + this.fip.fipName + '</td></tr>';
                }
            });
            html += '</div>';
            document.getElementById("tbody").innerHTML = html;
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
    setTimeout(function(){
       $("#exampleJ").DataTable({
            "responsive": true, "lengthChange": true, "autoWidth": false,
            // scrollY: "230px"
            lengthMenu: [5, 10, 20, 50, 100, 200, 500],
            "buttons": [ "excel", "pdf" ]
        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        onloadBarChart();
    }, 500);//wait 2 seconds

}
function getProvinceList(){
    // DO POST
    $.ajax({
        type : 'get',
        dataType : 'json',
        url : pathname +'adminBoundary/getProvinceList',
        contentType : 'application/json',
        cache: false,
        crossDomain: true,
        success : function(result) {
            $(result).each(function () {
                $("#provinceSelect").append(new Option(this.provinceName, this.provinceId));
            });
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
function getDistrictList(){
    document.getElementById("districtSelect").length = 1;
    document.getElementById("tehsilSelect").length = 1;
    document.getElementById("ucSelect").length = 1;
    document.getElementById("schemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
    if(document.getElementById("provinceSelect").value == 0){
        document.getElementById("districtSelect").length = 1;
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
        onloadBarChart();
    }else {
        let pId = document.getElementById("provinceSelect").value;
        //Zoom and Selection
        search_for_highlight(pId,3,'PROVINCE_I');
        getSchemeList(false);
        $('#headingBarChartDiv').text("Province Level Schemes Progress");
        // alert(pId);
        // let data = {
        //     'pId': pId
        // }
        let obj = 'pId='+pId;
        $.ajax({
            type : 'GET',
            dataType : 'json',
            data : obj,
            url : pathname +'adminBoundary/getDistrictList',
            contentType : 'application/json',
            cache: false,
            crossDomain: true,
            success : function(result) {
                $(result).each(function () {
                    $("#districtSelect").append(new Option(this.districtName, this.id));
                });
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
}
function getTehsilList(){
    document.getElementById("tehsilSelect").length = 1;
    document.getElementById("ucSelect").length = 1;
    document.getElementById("schemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
    if(document.getElementById("districtSelect").value == 0){
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
        onloadBarChart();
    }else {

        let pId = document.getElementById("provinceSelect").value;
        let dId = document.getElementById("districtSelect").value;
        search_for_highlight(dId,4,'ID');
        getSchemeList(false);
        $('#headingBarChartDiv').text("District Level Schemes Progress");
        let obj = 'pId='+pId+'&dId='+dId;

        $.ajax({
            type : 'GET',
            dataType : 'json',
            data : obj,
            url : pathname +'adminBoundary/getTehsilList',
            contentType : 'application/json',
            cache: false,
            crossDomain: true,
            success : function(result) {
                $(result).each(function () {
                    $("#tehsilSelect").append(new Option(this.tehsilName, this.tehsilId));
                });
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
}
function getUnionCouncilList(){
    document.getElementById("ucSelect").length = 1;
    document.getElementById("schemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
    if(document.getElementById("tehsilSelect").value == 0){
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
        onloadBarChart();
    }else {
        let pId = document.getElementById("provinceSelect").value;
        let dId = document.getElementById("districtSelect").value;
        let tId = document.getElementById("tehsilSelect").value;
        search_for_highlight(tId,2,'TEHSIL_ID');
        getSchemeList(false);
        $('#headingBarChartDiv').text("Tehsil Level Schemes Progress");
        let obj = 'pId='+pId+'&dId='+dId+'&tId='+tId;

        $.ajax({
            type : 'GET',
            dataType : 'json',
            data : obj,
            url : pathname +'adminBoundary/getUnionCouncilList',
            contentType : 'application/json',
            cache: false,
            crossDomain: true,
            success : function(result) {
                    $(result).each(function () {
                        $("#ucSelect").append(new Option(this.unionCouncilName, this.id));
                    });
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
}
function getSchemeList(status){
    document.getElementById("schemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
    if(document.getElementById("ucSelect").value == 0 && status == true){
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
        onloadBarChart();
    }else {

        let pId = document.getElementById("provinceSelect").value;
        let dId = document.getElementById("districtSelect").value;
        let tId = document.getElementById("tehsilSelect").value;
        let uId = document.getElementById("ucSelect").value;
        if(document.getElementById("ucSelect").value != 0){
            search_for_highlight(uId,1,'ID');
            $('#headingBarChartDiv').text("UC Level Schemes Progress");
        }
        let obj = 'pId='+pId+'&dId='+dId+'&tId='+tId+'&uId='+uId;
        $.ajax({
            type : 'GET',
            dataType : 'json',
            data : obj,
            url : pathname +'adminBoundary/getSchemeList',
            contentType : 'application/json',
            cache: false,
            crossDomain: true,
            success : function(result) {
                chartLabels.length = 0;
                chartData.length = 0;
                schemesArray.length = 0;
                document.getElementById("totalSchemesCard").innerHTML = result.length;
                cardData(result,false);
                $(result).each(function () {
                    $("#schemeSelect").append(new Option(this.schemeName, this.schemeId));
                    chartLabels.push(this.schemeCode);
                    chartData.push(this.schemeStatusPercentage);
                    schemesArray.push({
                        schemeName: this.schemeName,
                        schemeStatusPercentage: this.schemeStatusPercentage,
                        directBeneficiaries:this.directBeneficiaries,
                        inDirectBeneficiaries:this.inDirectBeneficiaries,
                        agricultureLand:this.agricultureLand,
                        nonAgricultureLand:this.nonAgricultureLand
                    });
                });
                barChart.update();
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
}
function zoomToScheme(){
    if(document.getElementById("schemeSelect").value == 0){
        mapView.graphics.removeAll();
        onloadBarChart();
    }else {
        $('#headingBarChartDiv').text("Scheme Level Progress");
        let selectIndex = document.getElementById("schemeSelect").selectedIndex;
        let schemeLabel = schemesArray[selectIndex-1].schemeName;
        let schemeData =  schemesArray[selectIndex-1].schemeStatusPercentage;
        chartLabels.length = 0;
        chartData.length = 0;
        chartLabels.push(schemeLabel);
        chartData.push(schemeData);
        barChart.update();

        $('#pieCardDiv').show();
        $('#doughnutCardDiv').show();
        let pieChartLabels = [ 'Direct Beneficiaries', 'In Direct Beneficiaries'];
        let pieChartData = [schemesArray[selectIndex-1].directBeneficiaries , schemesArray[selectIndex-1].inDirectBeneficiaries];
        pieChart.data.labels = pieChartLabels;
        pieChart.data.datasets[0].data = pieChartData;
        pieChart.update();

        let doughnutChartLabels = [ 'Agriculture Land', 'Non Agriculture Land'];
        let doughnutChartData = [schemesArray[selectIndex-1].agricultureLand , schemesArray[selectIndex-1].nonAgricultureLand];
        doughnutChart.data.labels = doughnutChartLabels;
        doughnutChart.data.datasets[0].data = doughnutChartData;
        doughnutChart.update();

        let sId = document.getElementById("schemeSelect").value;
        search_for_highlight(sId,0,'SCHEME_ID');
    }
}

function onClickSchemeName(thisObj) {
    let link = thisObj.getAttribute( "value" );
    //search_for_highlight(link.split('-')[1] ,2,'TEHSIL_ID ');
    search_for_highlight(link.split('-')[0] ,0,'SCHEME_ID');
    // setTimeout(function(){
    // }, 500);//wait 2 seconds
}
function resetMapSetting() {
    mapView.goTo(initExtent);
    mapView.graphics.removeAll();
    chartLabels.length = 0;
    chartData.length = 0;
    var table = $('#exampleJ').DataTable();
    var data = table.rows().data().toArray();
    document.getElementById("totalSchemesCard").innerHTML = data.length;
    document.getElementById("totalHundredPercentCard").innerHTML = card2;
    document.getElementById("totalContractAmountCard").innerHTML = card3;
    document.getElementById("totalBeneficiariesCard").innerHTML = card4;

    $(data).each(function (index) {
        chartLabels.push(data[index][1]);
        chartData.push($(table.cell(index, 0).node()).find('a').attr('value').split('-')[2])

    })
    barChart.update();
    document.getElementById('provinceSelect').selectedIndex = 0;
    document.getElementById('fipSelect').selectedIndex = 0;
    document.getElementById('thematicSelect').selectedIndex = 0;
    document.getElementById("districtSelect").length = 1;
    document.getElementById("tehsilSelect").length = 1;
    document.getElementById("ucSelect").length = 1;
    document.getElementById("schemeSelect").length = 1;
    document.getElementById("fipSchemeSelect").length = 1;
    document.getElementById("thematicSchemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
}

function getFipList(){
    // DO POST
    $.ajax({
        type : 'get',
        dataType : 'json',
        url : pathname +'adminBoundary/getFipList',
        contentType : 'application/json',
        cache: false,
        crossDomain: true,
        success : function(result) {
            $(result).each(function () {
                $("#fipSelect").append(new Option(this.fipName, this.fipId));
            });
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
function getFipSchemeList() {
    document.getElementById("fipSchemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
    if(document.getElementById("fipSelect").value == 0){
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
        onloadBarChart();
    }else {
        let fipId = document.getElementById("fipSelect").value;
        let thematicId = 0;
        let obj = 'fipId='+fipId+'&thematicId='+thematicId;
        $.ajax({
            type : 'GET',
            dataType : 'json',
            data : obj,
            url : pathname +'adminBoundary/getFipThematicSchemeList',
            contentType : 'application/json',
            cache: false,
            crossDomain: true,
            success : function(result) {
                chartLabels.length = 0;
                chartData.length = 0;
                schemesArray.length = 0;
                cardData(result,false);
                document.getElementById("totalSchemesCard").innerHTML = result.length;
                $(result).each(function () {
                    $("#fipSchemeSelect").append(new Option(this.schemeName, this.schemeId));
                    chartLabels.push(this.schemeCode);
                    chartData.push(this.schemeStatusPercentage);
                    schemesArray.push({
                        schemeName: this.schemeName,
                        schemeStatusPercentage: this.schemeStatusPercentage,
                        directBeneficiaries:this.directBeneficiaries,
                        inDirectBeneficiaries:this.inDirectBeneficiaries,
                        agricultureLand:this.agricultureLand,
                        nonAgricultureLand:this.nonAgricultureLand
                    });
                });
                barChart.update();
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
}
function zoomToFipScheme(){
    if(document.getElementById("fipSchemeSelect").value == 0){
        mapView.graphics.removeAll();
    }else {
        $('#headingBarChartDiv').text("Scheme Level Progress");
        let selectIndex = document.getElementById("fipSchemeSelect").selectedIndex;
        let schemeLabel = schemesArray[selectIndex-1].schemeName;
        let schemeData =  schemesArray[selectIndex-1].schemeStatusPercentage;
        chartLabels.length = 0;
        chartData.length = 0;
        chartLabels.push(schemeLabel);
        chartData.push(schemeData);
        barChart.update();

        $('#pieCardDiv').show();
        $('#doughnutCardDiv').show();
        let pieChartLabels = [ 'Direct Beneficiaries', 'In Direct Beneficiaries'];
        let pieChartData = [schemesArray[selectIndex-1].directBeneficiaries , schemesArray[selectIndex-1].inDirectBeneficiaries];
        pieChart.data.labels = pieChartLabels;
        pieChart.data.datasets[0].data = pieChartData;
        pieChart.update();

        let doughnutChartLabels = [ 'Agriculture Land', 'Non Agriculture Land'];
        let doughnutChartData = [schemesArray[selectIndex-1].agricultureLand , schemesArray[selectIndex-1].nonAgricultureLand];
        doughnutChart.data.labels = doughnutChartLabels;
        doughnutChart.data.datasets[0].data = doughnutChartData;
        doughnutChart.update();

        let sId = document.getElementById("fipSchemeSelect").value;
        search_for_highlight(sId,0,'SCHEME_ID');
    }
}
function getThematicList() {
// DO POST
    $.ajax({
        type : 'get',
        dataType : 'json',
        url : pathname +'adminBoundary/getThematicList',
        contentType : 'application/json',
        cache: false,
        crossDomain: true,
        success : function(result) {
            $(result).each(function () {
                $("#thematicSelect").append(new Option(this.thematicName, this.thematicId));
            });
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
function getThematicSchemeList() {
    document.getElementById("thematicSchemeSelect").length = 1;
    $('#pieCardDiv').hide();
    $('#doughnutCardDiv').hide();
    if(document.getElementById("thematicSelect").value == 0){
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
    }else {
        let thematicId = document.getElementById("thematicSelect").value;
        let fipId = 0;
        let obj = 'fipId='+fipId+'&thematicId='+thematicId;
        $.ajax({
            type : 'GET',
            dataType : 'json',
            data : obj,
            url : pathname +'adminBoundary/getFipThematicSchemeList',
            contentType : 'application/json',
            cache: false,
            crossDomain: true,
            success : function(result) {
                chartLabels.length = 0;
                chartData.length = 0;
                schemesArray.length = 0;
                document.getElementById("totalSchemesCard").innerHTML = result.length;
                cardData(result,false);
                $(result).each(function () {
                    $("#thematicSchemeSelect").append(new Option(this.schemeName, this.schemeId));
                    chartLabels.push(this.schemeCode);
                    chartData.push(this.schemeStatusPercentage);
                    schemesArray.push({
                        schemeName: this.schemeName,
                        schemeStatusPercentage: this.schemeStatusPercentage,
                        directBeneficiaries:this.directBeneficiaries,
                        inDirectBeneficiaries:this.inDirectBeneficiaries,
                        agricultureLand:this.agricultureLand,
                        nonAgricultureLand:this.nonAgricultureLand
                    });
                });
                barChart.update();
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
}
function zoomToThematicScheme(){
    if(document.getElementById("thematicSchemeSelect").value == 0){
        mapView.graphics.removeAll();
        mapView.goTo(initExtent);
    }else {

        $('#headingBarChartDiv').text("Scheme Level Progress");
        let selectIndex = document.getElementById("thematicSchemeSelect").selectedIndex;
        let schemeLabel = schemesArray[selectIndex-1].schemeName;
        let schemeData =  schemesArray[selectIndex-1].schemeStatusPercentage;
        chartLabels.length = 0;
        chartData.length = 0;
        chartLabels.push(schemeLabel);
        chartData.push(schemeData);
        barChart.update();

        $('#pieCardDiv').show();
        $('#doughnutCardDiv').show();
        let pieChartLabels = [ 'Direct Beneficiaries', 'In Direct Beneficiaries'];
        let pieChartData = [schemesArray[selectIndex-1].directBeneficiaries , schemesArray[selectIndex-1].inDirectBeneficiaries];
        pieChart.data.labels = pieChartLabels;
        pieChart.data.datasets[0].data = pieChartData;
        pieChart.update();

        let doughnutChartLabels = [ 'Agriculture Land', 'Non Agriculture Land'];
        let doughnutChartData = [schemesArray[selectIndex-1].agricultureLand , schemesArray[selectIndex-1].nonAgricultureLand];
        doughnutChart.data.labels = doughnutChartLabels;
        doughnutChart.data.datasets[0].data = doughnutChartData;
        doughnutChart.update();

        let sId = document.getElementById("thematicSchemeSelect").value;
        search_for_highlight(sId,0,'SCHEME_ID');
    }
}

function onClickMenuButton() {

    if($('#geoToc').hasClass('menu-open') || $('#geoToc').hasClass('menu-is-opening')){
        document.getElementById('geoToc').classList.remove('menu-open');
        document.getElementById('geoToc').classList.remove('menu-is-opening');
    }
    if($('#geoTocList').css("display") == "block"){
        $('#geoTocList').css("display","none");
    }

    if($('#fipToc').hasClass('menu-open') || $('#fipToc').hasClass('menu-is-opening')){
        document.getElementById('fipToc').classList.remove('menu-open');
        document.getElementById('fipToc').classList.remove('menu-is-opening');
    }
    if($('#fipTocList').css("display") == "block"){
        $('#fipTocList').css("display","none");
    }

    if($('#thematicToc').hasClass('menu-open') || $('#thematicToc').hasClass('menu-is-opening')){
        document.getElementById('thematicToc').classList.remove('menu-open');
        document.getElementById('thematicToc').classList.remove('menu-is-opening');
    }
    if($('#thematicTocList').css("display") == "block"){
        $('#thematicTocList').css("display","none");
    }
}
function onClickGeoToc()    {

    document.getElementById('fipTocAnchor').classList.remove('active');
    document.getElementById('thematicTocAnchor').classList.remove('active');
    $('#geoTocAnchor').addClass("active");
    document.getElementById('fipToc').classList.remove('menu-open');
    document.getElementById('fipToc').classList.remove('menu-is-opening');
    document.getElementById('fipTocAnchor').classList.remove('active');

    document.getElementById('thematicToc').classList.remove('menu-open');
    document.getElementById('thematicToc').classList.remove('menu-is-opening');
    document.getElementById('thematicTocAnchor').classList.remove('active');

    if($('#geoToc').hasClass('menu-open') || $('#geoToc').hasClass('menu-is-opening')){
        document.getElementById('geoTocAnchor').classList.remove('active');
    }

    if($('#fipTocList').css("display") == "block" ||$('#thematicTocList').css("display") == "block"){
        $('#fipTocList').css("display","none");
        $('#thematicTocList').css("display","none");
    }
    resetMapSetting();
}
function onClickFipToc() {
    document.getElementById('geoTocAnchor').classList.remove('active');
    document.getElementById('thematicTocAnchor').classList.remove('active');
    $('#fipTocAnchor').addClass("active");
    document.getElementById('geoToc').classList.remove('menu-open');
    document.getElementById('geoToc').classList.remove('menu-is-opening');

    document.getElementById('thematicToc').classList.remove('menu-open');
    document.getElementById('thematicToc').classList.remove('menu-is-opening');

    if($('#fipToc').hasClass('menu-open') || $('#fipToc').hasClass('menu-is-opening')){
        document.getElementById('fipTocAnchor').classList.remove('active');
    }

    if($('#geoTocList').css("display") == "block" ||$('#thematicTocList').css("display") == "block"){
        $('#geoTocList').css("display","none");
        $('#thematicTocList').css("display","none");
    }
    resetMapSetting();
}
function onClickThematicToc() {
    $('#thematicTocAnchor').addClass("active");
    document.getElementById('geoTocAnchor').classList.remove('active');
    document.getElementById('fipTocAnchor').classList.remove('active');
    document.getElementById('geoToc').classList.remove('menu-open');
    document.getElementById('geoToc').classList.remove('menu-is-opening');
    document.getElementById('fipToc').classList.remove('menu-open');
    document.getElementById('fipToc').classList.remove('menu-is-opening');
    if($('#thematicToc').hasClass('menu-open') || $('#thematicToc').hasClass('menu-is-opening')){
        document.getElementById('thematicTocAnchor').classList.remove('active');
    }
    if($('#geoTocList').css("display") == "block" ||$('#fipTocList').css("display") == "block"){
        $('#geoTocList').css("display","none");
        $('#fipTocList').css("display","none");
    }
    resetMapSetting();
}

function onloadBarChart() {
    //-------------
//- BAR CHART -
//-------------
    $('#headingBarChartDiv').text("All Schemes Progress");
    chartLabels = [];
    chartData = [];
    var table = $('#exampleJ').DataTable();
    var data = table.rows().data().toArray();

    $(data).each(function (index) {
        chartLabels.push(data[index][1]);
        chartData.push($(table.cell(index, 0).node()).find('a').attr('value').split('-')[2])

    })

    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    barChart = new Chart(barChartCanvas, {
        type: 'line',
        data: {
            // labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            labels : chartLabels,
            datasets: [
                {
                    label               : 'Scheme Completion Percentage',
                    // backgroundColor     : 'rgb(255,255,255)',
                    // borderColor         : 'rgba(236,9,9,0.8)',
                    // pointRadius          : true,
                    // pointColor          : '#61ba3b',
                    // pointStrokeColor    : 'rgb(12,35,187)',
                    // pointHighlightFill  : '#fff',
                    // pointHighlightStroke: 'rgba(60,141,188,1)',
                    // data                : [28, 48, 40, 19, 86, 27, 90]
                    borderColor: 'rgba(255,18,18,0.79)',
                    backgroundColor: 'rgba(236,9,88,0.15)',
                    pointStyle: 'circle',
                    pointRadius: 3,
                    pointHoverRadius: 7,
                    data                : chartData
                }
            ]
        },
        options: {
            responsive              : true,
            maintainAspectRatio     : false,
            datasetFill             : false
        }
    })
}
function onloadPieChart(){
    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.

    var pieChartLabels =  ['Chrome', 'IE']
    var pieChartData = [333,555]

    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')

    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.

    pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
            labels: pieChartLabels,
            datasets: [
                {
                    data: pieChartData,
                    backgroundColor : ['#f56954', '#00a65a'],
                }
            ]
        },
        options: {
            maintainAspectRatio : false,
            responsive : true,
        }
    })
}
function onloadDoughnutChart(){
    //-------------
    //- Doughnut CHART -
    //-------------
    var doughnutChartLabels =  ['Chrome', 'IE']
    var doughnutChartData = [333,555]

    var doughnutChartCanvas = $('#doughnutChart').get(0).getContext('2d')

    doughnutChart = new Chart(doughnutChartCanvas, {
        type: 'doughnut',
        data: {
            labels: doughnutChartLabels,
            datasets: [
                {
                    data: doughnutChartData,
                    backgroundColor : ['#e8d30e', '#0059a6'],
                }
            ]
        },
        options: {
            maintainAspectRatio : false,
            responsive : true,
        }
    })
}

function cardData(result, val) {
    let hundredPercentageArray = [];
    hundredPercentageArray.length = 0;
    $(result).each(function () {
        if(this.schemeStatusPercentage == 100){
            hundredPercentageArray.push(this);
        }
    })
    document.getElementById("totalHundredPercentCard").innerHTML = hundredPercentageArray.length;
    let totalAmount = 0;
    let totalBeneficiaries = 0;
    $(result).each(function () {
        totalAmount += this.contractAmount;
        totalBeneficiaries += this.directBeneficiaries+this.inDirectBeneficiaries;
    })
    document.getElementById("totalContractAmountCard").innerHTML = (totalAmount/1000000).toFixed(2) +"<small> M</small>";
    document.getElementById("totalBeneficiariesCard").innerHTML = (totalBeneficiaries).toLocaleString();

    if(val){
        card2 = document.getElementById("totalHundredPercentCard").innerHTML;
        card3 = document.getElementById("totalContractAmountCard").innerHTML;
        card4 = document.getElementById("totalBeneficiariesCard").innerHTML;
    }
}
