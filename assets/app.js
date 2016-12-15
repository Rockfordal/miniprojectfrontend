angular.module("app", [])
    .controller("testcontroller", function ($http, $scope) {
        $scope.IPpath = "http://10.23.192.56:60000";
       
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
                console.log("Posting replies");
                console.log($scope.wordImageTest.replies);
                $http.post($scope.IPpath + $scope.wordImageTest.path, $scope.wordImageTest.replies)
                .then(function(response){
                    console.log(response.data);
                    $scope.wordImageTest.response = response.data;
                }, function(respone){
                    console.log(response.data);
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
            alternatives: [{hex:"#00ffff"}, {hex:"#ff0000"}, {hex:"#00ff00"}],
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
            console.log("Du tryckte på " +$scope.colorTest.replies[$scope.currentColot.index]);
        }
    })