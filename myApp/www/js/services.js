angular.module('starter.services', [])

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.service('LoginService', function($http, $q) {

    var LoginService = {};

    LoginService.loginUser = loginUser;

    return LoginService;

    function loginUser(objLoginUserDetails) {

        return $http({
            method: 'POST',
            url: 'http://localhost/cueres/',
            headers: {
                'Content-Type': undefined
            },
            data: objLoginUserDetails
        });
    }
})
.service('ReservationService', function($http) {

    var ReservationService = {};


    function reservationList(objReservationList) {
        console.log(objReservationList)
        return $http({
            method: 'POST',
            url: 'http://localhost/cueres/',
            headers: {
                'Content-Type': true
            },
            data: objReservationList
        });
    }

    function newReservation(objNewReservation){
        console.log(objNewReservation);
        return $http({
            method: 'POST',
            url: 'http://localhost/cueres/',
            headers: {
                'Content-Type': true
            },
            data: objNewReservation
        });   
    }

    function getAvailableSlots(objInput){
        console.log(objInput);
        return $http({
            method: 'POST',
            url: 'http://localhost/cueres/',
            headers: {
                'Content-Type': true
            },
            data: objInput
        });   
    }

    ReservationService.getAvailableSlots = getAvailableSlots;
    ReservationService.reservationList = reservationList;
    ReservationService.newReservation = newReservation;

    return ReservationService;
});
