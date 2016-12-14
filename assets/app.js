angular.module("app", [])
    .controller("testcontroller", function ($http, $scope) {
        $scope.IPpath = "http://10.23.192.246:60000/api/test";
        var getStrings = function () {
            $http.get(IPpath)
                .then(function (response) {
                    console.log(response.data);
                }
                ,function(response){
                    console.log("ErroR");
                    console.log(response)});
        }();
        $scope.title = "HEJ";
       
    })