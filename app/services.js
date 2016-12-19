    //    .factory("WordImage", function ($resource, $http) {
    //        $http.defaults.useXDomain = true;
    //        return $resource(
    //            serverurl + "/api/wordimagetest/:Id",
    //         //    { Id: "@Id" },
    //            { 
    //                update: { method: "PUT" },
    //                create: { method: "POST", isArray: true },
    //                save: { method:'POST', headers: [{'Content-Type': 'application/json'}] 
    //         }
    //         }
    //       );
    // })
    // .config(function ($httpProvider) {
    //     $httpProvider.defaults.useXDomain = true;
    // })

// $scope.wordImageTest.response = new WordImage();
// $scope.wordImageTest.response.$save();
// WordImage.save(data);