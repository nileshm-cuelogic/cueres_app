'use strict';

angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
        $scope.data = {};
        $scope.objLoginUserDetails = {};

        $scope.login = function() {
                $scope.objLoginUserDetails.action = "login";
                $scope.objLoginUserDetails.cueid = $scope.data.username;
                $scope.objLoginUserDetails.password = $scope.data.password;

                console.log($scope.objLoginUserDetails);
                LoginService.loginUser($scope.objLoginUserDetails).then(function(data) {
                    console.log(data.data)
                    if (data.data.success == 1) {
                        $state.go('tab.dash');

                        if (typeof(Storage) !== "undefined") {
                            // Store
                            localStorage.setItem("uid", data.data.token);
                        } else {
                            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                        }

                    } else {
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
            // Check browser support
    })
    .controller('DashCtrl', function($scope, ReservationService, $ionicPopup) {
        // $scope.data = {};
        $scope.objReservationListDetails = {};
        //$scope.objReservationList = {};
        $scope.reservation = function() {
                $scope.objReservationListDetails.action = "myBookedSlots";
                $scope.objReservationListDetails.uid = localStorage.getItem("uid");
                
                ReservationService.reservationList($scope.objReservationListDetails).then(function(data) {
                  $scope.reservations =  data;

                }).catch(function(fallback) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'No Reservation!',
                        template: 'You have no upcoming reservations'
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
    $('.modal').appendTo("body");
    // alert(22);

    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
