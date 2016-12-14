angular.module("app", [])
    .controller("testcontroller", function ($http, $scope) {
        $scope.IPpath = "http://10.23.192.46:60000/api/test";
        $scope.wordImageTest = {
            title: "Bild - Ord",
            description: "Skriv vad bilden föreställer",
            showPart:1
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
            $http.get($scope.IPpath)
                .then(function (response) {
                    console.log(response.data);
                }
                ,function(response){
                    console.log("ErroR");
                    console.log(response)});
        }();
        $scope.title = "HEJ";
       
    })