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
                  $scope.reservations =  data.data.data;
                  console.log($scope.reservations);

                }).catch(function(fallback) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'No Reservation!',
                        template: 'You have no upcoming reservations'
                    });
                });
            }

    })

.controller('ChatsCtrl', function($scope, ReservationService, $ionicPopup) {

  $scope.objNewReservation = {};
  $scope.objInput = {};
  $scope.availableSlots = {};

  $scope.data ={};
  $scope.data.reservation_date = new Date();
  $scope.minDate = new Date(2016, 1, 1);
  $scope.maxDate = new Date(2020, 12, 31);
   
  $scope.datePickerCallback = function (val) {
    if (!val) { 
      console.log('Date not selected');
    } else {
      console.log('Selected date is : ', val);
    }
  };

  $scope.durations = [20,30,40,60];
  $scope.categories = [
      { "category_id":"1", "category":"Conference Room" },
      { "category_id":"2", "category":"Meeting Room" }
  ];

  $scope.newReservation = function(){
      $scope.objNewReservation.action = "bookApt";
      console.log($scope.reservation_date);
      $scope.objNewReservation.category_id = $scope.data.category_id;
      $scope.objNewReservation.reservation_date = $scope.data.reservation_date;
      $scope.objNewReservation.duration = $scope.data.duration;
      $scope.objNewReservation.time_slot = $scope.data.time_slot;
      $scope.objNewReservation.purpose = $scope.data.purpose;

      ReservationService.newReservation($scope.objNewReservation).then(function(data){
          console.log(data);
      }).catch(function(fallback){
          console.log(fallback);
          var alertPopup = $ionicPopup.alert({
              title: 'New Reservation',
              template: 'Could not reserve selected time slot!'
          });
      });

  }

  $scope.getAvailableSlots = function(){


    $scope.objInput.action = "availableSlots";

    var tDate =  $scope.data.reservation_date;

    var dd = tDate.getDate();
    var mm = tDate.getMonth();
    var yy = tDate.getFullYear();


    $scope.objInput.reservation_date = yy + '-'+ mm + '-'+dd;
    $scope.objInput.duration = $scope.data.duration;
    $scope.objInput.category_id = $scope.data.category_id.category_id;

    ReservationService.getAvailableSlots($scope.objInput).then(function(data){
      console.log(data);
      if(data != undefined || data != null)
      {
        $scope.availableSlots = data.data.data.available;
        console.log($scope.availableSlots);
      }
      
    }).catch(function(fallback){
       console.log(fallback);
          var alertPopup = $ionicPopup.alert({
              title: 'Time Slots',
              template: 'Could not fetch Time Slots!'
          }); 
    });

  }
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $('.modal').appendTo("body");
    // alert(22);

    /*$('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    });*/
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
