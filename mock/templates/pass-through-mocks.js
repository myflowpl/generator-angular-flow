angular.module('inhubDev')
    .run(function ($httpBackend) {

        // przepuszczamy cała resztę
        $httpBackend.whenGET(/$/).passThrough();
        $httpBackend.whenPOST(/$/).passThrough();
        $httpBackend.whenPUT(/$/).passThrough();
        $httpBackend.whenDELETE(/$/).passThrough();

    });