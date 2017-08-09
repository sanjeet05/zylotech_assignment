angular.module('controllers', [])
// MenuCtrl
.controller("MenuCtrl", function($scope, $rootScope, $stateParams, $state, $localStorage, $uibModal, PhotoService, $location) {

  $scope.addPhoto = function () {

    // open a modeal starts
      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'templates/add-photo-modal.html',
          controller: 'AddPhotoModalController',
          size: 'lg'
      });
      modalInstance.result.then(function() {
          $state.reload();
        },
         function() {

        }
      );
    // open a modeal ends
  };


})

// homeCtrl
.controller("homeCtrl", function($scope, $rootScope, $stateParams, $state, $localStorage, PhotoService) {

  $scope.homeInit=function () {
    if ($localStorage.photoList) {
       PhotoService.updateList()
        .then(function (response) {
          $scope.photoList = response;
        },function () {

        });
     }else {
       $scope.photoList = [];
     }
  };

  $scope.deletePhoto = function (id) {
    if (confirm("Are you sure you want to delete this photo?")) {
      PhotoService.deletePhoto(id)
       .then(function (response) {
         console.log(response);
       },function () {

       });
    }

  };

})
.controller('AddPhotoModalController', function($scope, $uibModalInstance, $uibModal, lodash, $localStorage, PhotoService) {

    $scope.photoURL = "";
    $scope.photoText = "";
    $scope.error = false;
    $scope.addPhoto = function (isValid) {
      $scope.error = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'photoForm');
        return false;
      }
      $scope.error = false;
      var photo = {
        photoURL: $scope.photoURL,
        photoText: $scope.photoText
      };
     //  console.log(photo);
     $localStorage.$reset();
     PhotoService.addPhoto(photo)
      .then(function (response) {
        $localStorage.photoList = response;
        $uibModalInstance.close();
      },function () {

      });

      // $uibModalInstance.close($scope.photoURL, $scope.photoText);
    };

    // cancel model.
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

});
