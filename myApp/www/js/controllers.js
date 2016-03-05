'use strict';
  
angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.objLoginUserDetails={};
 
    $scope.login = function() {
      $scope.objLoginUserDetails.action="login";
      $scope.objLoginUserDetails.cueid=$scope.data.username;
      $scope.objLoginUserDetails.password=$scope.data.password;

      console.log($scope.objLoginUserDetails);
        LoginService.loginUser($scope.objLoginUserDetails).then(function(data) {
          console.log(data)
            if(data.success == 1){
              $state.go('tab.dash');
            }else{
              var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
            }
        }).catch(function(fallback) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
