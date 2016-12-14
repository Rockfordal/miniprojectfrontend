angular.module("app", [])
    .controller("testcontroller", function ($http, $scope) {
        var getStrings = function () {
            $http.get("http://10.23.192.246:60000/api/test")
                .then(function (response) {
                    console.log(response.data);
                }
                ,function(response){
                    console.log("ErroR");
                    console.log(response)});
        }();
        $scope.title = "HEJ";
       
    })