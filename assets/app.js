// document.ready(function () {
"use strict";

var serverurl = "http://10.23.192.71:60000";

angular.module("app", ['ngResource'])
       .factory("WordImage", function ($resource, $http) {
           $http.defaults.useXDomain = true;
           return $resource(
               serverurl + "/api/wordimagetest/:Id",
            //    { Id: "@Id" },
               { 
                   update: { method: "PUT" },
                   create: { method: "POST", isArray: true },
                   save: { method:'POST', headers: [{'Content-Type': 'application/json'}] 
            } //NOT WORKING EI
            }
          );
    })
    .config(function ($httpProvider) {
        // $httpProvider.defaults.headers.common = {};
        // $httpProvider.defaults.headers.put = {};
        // $httpProvider.defaults.headers.post = {}; // 415 Unsupported Media Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 200 OK: []
        // $httpProvider.defaults.headers.post['Content-Type'] = 'aplication/json'; // OPTIONS 405 Method not allowed
        // $httpProvider.defaults.headers.post["Content-Type"] = "text/plain";
        $httpProvider.defaults.useXDomain = true;
    })
    .controller("testcontroller", function ($http, $scope, WordImage) {
        $scope.IPpath = serverurl;
       
        $scope.wordImageTest = {
            path: "/api/wordimagetest",
            title: "Bild - Ord",
            description: "Skriv vad bilden föreställer",
            showPart: 1,
            replies: [{Id:0, Word:""}, {Id:0, Word:""}, {Id:0, Word:""}, {Id:0, Word:""}, {Id:0, Word:""}],
            response: [false, true, false, false, false]
        }
        $scope.runWordImageTest = function () {
            $scope.showGame = 1;
            getWordImageTest();

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
                var apiurl = $scope.IPpath + $scope.wordImageTest.path, data;
                // var rawdata = $scope.wordImageTest.replies;
                // var rawdata = [{"Id":1,"Word":"fågel"},{"Id":2,"Word":"bil"},{"Id":3,"Word":"katt"},{"Id":4,"Word":"hund"},{"Id":5,"Word":"sdfsdf"}];
                // var rawdata = { "Id":1, "Word": "fågel" };
                var rawdata = { Id: 1, Word: "hus" };
                var data = rawdata;
                // var data = JSON.stringify(rawdata);

                console.log("Posting replies");
                console.log("url:", apiurl)
                console.log("rawdata: ", data);
                console.log("data:", data);

                // var jsonheaders = {
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // };

                // WordImageService.query();

                // $scope.wordImageTest.response = new WordImage();
                // $scope.wordImageTest.response.$save();

                // WordImage.save(data);

                // $http.post(apiurl, rawdata, jsonheaders)
                // .success(function (data) {
                //     console.log('response data:', data);
                // });

                $http.post(apiurl, rawdata)
                // $http.post(apiurl, rawdata, jsonheaders)
                .then(function(response){
                    console.log('response data:', response.data);
                    $scope.wordImageTest.response = response.data;
                }, function(error){
                    console.log('error:', error);
                });

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
            showPart: 1,
            replies: [{Id:0, hex:"#225566"}],
            alternatives: [{hex:"#00ffff"}, {hex:"#ff0000"}, {hex:"#00ff00"}, {hex:"#ff0000"}, {hex:"#00ff00"}, {hex:"#ff0000"}, {hex:"#00ff00"}],
            response: [{Id:0, hex:""}, {Id:0, hex:""}, {Id:0, hex:""}, {Id:0, hex:""}, {Id:0, hex:""}]
        }
        $scope.currentColor = {
            index: 0,
            text: "BRUN"

        }
        $scope.textTest = {
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
                    for(var i = 0; i <= 4; i+=1)
                    {
                        $scope.wordImageTest.replies[i].Id = $scope.Images[i].Id;
                    }
                    console.log(response.data);
                },
                function (response) {
                    console.log(response);
                });
        }

        $scope.title = "HEJ";
        $scope.reply = {
            data: ["", "", "", "", ""]
        };
        $scope.response = {
            data: [true, false, true, true, true]
        };
        $scope.selectSwatch = function (index){
            $scope.colorTest.replies[$scope.currentColor.index].Id = $scope.colorTest.alternatives[index].Id;
            $scope.colorTest.replies[$scope.currentColor.index].hex = $scope.colorTest.alternatives[index].hex;
            console.log("Du tryckte på " +$scope.colorTest.replies[$scope.currentColor.index].hex);
        }
    })

// })();