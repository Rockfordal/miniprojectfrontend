// document.ready(function () {
"use strict";

function ResultToArray(row) {
    var arr = [];
    angular.forEach(row, function(value, key) {
        arr.push(value.Result == '1')
    });
    return arr;
}

angular.module("app", [])
    .controller("testcontroller", function ($http, $scope) {
        $scope.IPpath = "http://10.23.192.71:60000";

        $scope.wordImageTest = {
            path: "/api/wordimagetest",
            title: "Bild - Ord",
            description: "Skriv vad bilden föreställer",
            showPart: 1,
            replies: [{ Id: 0, Word: "" }, { Id: 0, Word: "" }, { Id: 0, Word: "" }, { Id: 0, Word: "" }, { Id: 0, Word: "" }],
            response: [false, true, false, false, false]
        }

        $scope.runWordImageTest = function () {
            $scope.showGame = 1;
            getWordImageTest();
        }

        $scope.runColorTest = function () {
            $scope.showGame = 3;
            getColorTest();
        }

        $scope.runSeparatorTest = function () {
            $scope.showGame = 2;
            // getSeparatorTest();
        }
        $scope.runSentenceTest = function () {
            $scope.showGame = 4;
            // getSentenceTest();
        }

        $scope.currentImage = {
            Image: "",
            index: 0,
        }

        $scope.setNextImage = function () {
            if ($scope.currentImage.index < 4) {
                $scope.currentImage.index++;
                $scope.currentImage.Image = $scope.Images[$scope.currentImage.index].Image;
            }
            else {
                var apiurl = $scope.IPpath + $scope.wordImageTest.path;
                var data = $scope.wordImageTest.replies;
                // var rawdata = [{Id:1,"Word":"fågel"},{Id:2, Word: "bil"},{Id:3,"Word":"katt"},{Id:4,"Word":"hund"},{Id:5,"Word":"sdfsdf"}];

                $http.post(apiurl, data)
                .then(function(response){
                    $scope.wordImageTest.response = ResultToArray(response.data);
                }, function(error){
                    console.log('error:', error);
                })

                $scope.wordImageTest.showPart = 3;
                $scope.currentImage.index = 0;
            }
        }

        $scope.separatorTest = {
            title: "Skiljetecken",
            description: "Skriv av texten med rätt skiljetecken",
            showPart: 1
        }

        $scope.colorTest = {
            title: "Färger",
            description: "Klicka på den färg som står",
            path: "/api/colortest",
            showPart: 1,
            replies: [{ Id: 0, hex: "#225566" }, { Id: 0, hex: "#225566" }, { Id: 0, hex: "#225566" }, { Id: 0, hex: "#225566" }, { Id: 0, hex: "#225566" }],
            alternatives: [{ Id: 3, hex: "#00ffff" }, { Id: 86, hex: "#ff0000" }, { Id: 36, hex: "#00ff00" }, { Id: 17, hex: "#ff0000" }, { Id: 16, hex: "#00ff00" }, { Id: 23, hex: "#ff0000" }, { Id: 24, hex: "#00ff00" }],
            response: [true, false, false, true, true]
        }

        $scope.currentColor = {
            index: 0,
            text: "BRUN",
        }

        $scope.Colors = [{ Id: 5, text: "Brun" }, { Id: 2, text: "Grön" }, { Id: 2, text: "Blå" }, { Id: 2, text: "Röd" }, { Id: 2, text: "Saffran" }];
        $scope.sentenceTest = {
            title: "Bilda meningar",
            description: "Skriv en mening med orden som visas",
            showPart: 1
        }

        $scope.showGame = 0;

        var getWordImageTest = function () {
            console.log("Getting Word Image test");
            $http.get($scope.IPpath + $scope.wordImageTest.path)
                .then(function (response) {
                    $scope.Images = response.data;
                    $scope.currentImage.Image = $scope.Images[0].Image;
                    for (var i = 0; i <= 4; i += 1) {
                        $scope.wordImageTest.replies[i].Id = $scope.Images[i].Id;
                    }
                    console.log('got wordimage data: ', response.data);
                },
                function (response) {
                    console.log(response);
                });
        }

        var getColorTest = function () {
            $http.get($scope.IPpath + $scope.colorTest.path)
                .then(function (response) {
                    console.log('got color data: ', response.data);
                    $scope.colorTest.alternatives = reponse.data.Colors;
                    $scope.currentColor.index = response.data.Id;
                    $scope.currentColor.text = response.data.Name;
                },
                function (response) {
                    console.log('error getting colortest: ', response);
                });
        }
        $scope.title = "HEJ";

        $scope.reply = {
            data: ["", "", "", "", ""]
        };

        $scope.response = {
            data: [true, false, true, true, true]
        };

        $scope.selectSwatch = function (index) {
            $scope.colorTest.replies[$scope.currentColor.index].Id = $scope.colorTest.alternatives[index].Id;
            $scope.colorTest.replies[$scope.currentColor.index].hex = $scope.colorTest.alternatives[index].hex;
            console.log("Du tryckte på " + $scope.colorTest.replies[$scope.currentColor.index].hex);
            $(".swatch").css("border", "none");
            $("#swatch" + index).css("border", "5px solid black");
            console.log($("#swatch" + index).css("border"));
        }

        $scope.setNextColor = function () {
            if ($scope.currentColor.index < 4) {
                $scope.currentColor.index += 1;
                $scope.currentColor.text = $scope.Colors[$scope.currentColor.index].text;
            }
            else {
                console.log("replies: ", $scope.colorTest.replies);
                var apiurl = $scope.IPpath + $scope.colorTest.path;
                $http.post(apiurl, $scope.colorTest.replies)
                    .then(function (response) {
                        console.log("data: ", response.data);
                        // $scope.colorTest.response = response.data;
                        $scope.colorTest.response = ResultToArray(response.data)
                        $scope.colorTest.showPart = 3;
                    }, function (response) {
                        console.log(response);
                        $scope.colorTest.showPart = 3;
                    });
            }
        }
})