angular.module('services', [])

.factory('PhotoService', ['$http', '$q', '$localStorage', function($http, $q, $localStorage) {
  // global varible
  var photoList = [];

  var result = {};

  // UserContacts factory
  var photoFunctions = {
      find: find,
      findOne: findOne,
      addPhoto: addPhoto,
      deletePhoto: deletePhoto,
      updateList: updateList
   };
   return photoFunctions;

  //  local factory fuctions
   function find () {
     var deferred = $q.defer();
     deferred.resolve(photoList);
     return deferred.promise;
   }

   function findOne (id) {
     var deferred = $q.defer();
     for(var i = 0; i< photoList.length; i++){
       if(id == photoList[i]._id){
         deferred.resolve(photoList[i]);
       }
     }
     return deferred.promise;
   }

   function addPhoto (photo) {
     var deferred = $q.defer();
     var id = photoList.length + 1;
     photo._id = id;
     photoList.push(photo);
     result.message = "Successfully added a photo";
     deferred.resolve(photoList);
     return deferred.promise;
   }

   function deletePhoto (id) {
     var deferred = $q.defer();
     for(var i = 0; i< photoList.length; i++){
       if(id == photoList[i]._id){
         photoList.splice(i, 1);
         result.message = "successfully deleted your photo";
         deferred.resolve(result);
       }
     }
     return deferred.promise;
   }

   function updateList () {
     var deferred = $q.defer();
     photoList = $localStorage.photoList;
     deferred.resolve(photoList);
     return deferred.promise;
   }


}]);
