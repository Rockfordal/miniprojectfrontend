angular.module("app", [])
    .controller("testcontroller", function ($http, $scope) {
        $scope.IPpath = "http://10.23.192.46:60000";
        $scope.APIpath = "/api/test";
        $scope.wordImageTest = {
            title: "Bild - Ord",
            description: "Skriv vad bilden föreställer",
            showPart:1,
            showSubPart: 1,
            
            
        }
        $scope.currentImage = {
            Image: "",
            index: 0,
        }
        $scope.setNextImage = function(){
            $scope.currentImage.index++;
            $scope.currentImage.Image = $scope.Images[$scope.currentImage.index].Image;
        }
        $scope.separatorTest = {
            title: "Skiljetecken",
            description: "Skriv av texten med rätt skiljetecken",
            showPart:1
        }
        $scope.colorTest = {
            title: "Färger",
            description: "Klicka på den färg som står",
            showPart:1
        }
        $scope.textTest = {
            title: "Bilda meningar",
            description: "Skriv en mening med orden som visas",
            showPart:1
        }
        $scope.showGame = 1;
        var getStrings = function () {
            $http.get($scope.IPpath + $scope.APIpath)
                .then(function (response) {
                    console.log(response.data);
                }
                ,function(response){
                    console.log("ErroR");
                    console.log(response)});
        }();
        var getWordImageTest = function () {
            $http.get($scope.IPpath + "/api/wordimagetest")
            .then(function (response){
                $scope.Images=response.data;
                $scope.currentImage.Image = $scope.Images[0].Image;
                console.log(response.data);
            },
                function(response){
                console.log(response);
            })
        }
        $scope.Run = function() {
            getWordImageTest();
        }
        $scope.title = "HEJ";
        $scope.reply = {
            data: ["", "", "", "", ""]
        };
        $scope.response = {
            data: [true, false, true, true, true]
        };
      
    })