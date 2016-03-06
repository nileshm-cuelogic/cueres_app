angular.module('localStorage.Service', [])
    .service('localStorageServiceWrapper', ['localStorageService', localStorageServiceWrapper]);

function localStorageServiceWrapper(localStorageService) {

    var service = {};

    function set(strName, strSetValue) {
        return localStorageService.set(strName, strSetValue);
    }

    function get(strGetName) {
        return localStorageService.get(strGetName);
    }

    function isSupported() {
        return localStorageService.isSupported;
    }

    function clearAll() {
        return localStorageService.clearAll();
    }

    function remove(removeItem) {
        return localStorageService.remove(removeItem);
    }

    service.set = set;
    service.get = get;
    service.clearAll = clearAll;
    service.remove = remove;
    service.isSupported = isSupported;

    return service;

};