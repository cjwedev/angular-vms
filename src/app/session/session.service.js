(function() {
  'use strict';

  angular
    .module('stargaze')
    .factory('sessionService', sessionService);

  sessionService.$inject = ['$rootScope', 'localStorageService', 'rippleRestangular'];

  function sessionService($rootScope, localStorageService, rippleRestangular) {
    var service = {
      // Methods
      setToken: setToken,
      login: login,
      register: register,
      resetRequest: resetRequest,
      resetPassword: resetPassword,
      getUserInfo: getUserInfo,
      getProfile: getProfile,
      updateProfile: updateProfile,
      updateUserInfo: updateUserInfo,
      updatePassword: updatePassword,
      activate: activate,
      logout: logout,
      addSSH: addSSH,
      deleteSSH: deleteSSH,
      updateSSH: updateSSH
    };

    var auth = rippleRestangular.all('auth');

    return service;
    ////////////////////////////////////////////

    /**
    * Store access token into local storage.
    */
    function setToken(token) {
      if (token == null) {
        service.token = null;
        localStorageService.clearAll();
      } else {
        service.token = token;
        localStorageService.set('token', token);
      }
    }

    /**
    * Register user
    */
    function register(userInfo) {
      return auth.all('register').post($.param(userInfo), {}, {'Content-Type': 'application/x-www-form-urlencoded'});
    }

    /*
    * Login
    */
    function login(userInfo) {
      return auth.all('login').post($.param(userInfo), {}, {'Content-Type': 'application/x-www-form-urlencoded'});
    }

    /*
    * Reset password request
    */
    function resetRequest(userInfo) {
      return auth.all('password').all('reset').post(
        $.param(userInfo),
        {},
        {'Content-Type': 'application/x-www-form-urlencoded'}
      );
    }

    /*
    * Reset password
    */
    function resetPassword(userInfo) {
      return auth.all('password/reset/confirm').post(
        $.param(userInfo),
        {},
        {'Content-Type': 'application/x-www-form-urlencoded'}
      );
    }

    /**
    * Get user's brief information
    */
    function getUserInfo() {
      return auth.one('me').get(
        {},
        {'Authorization': 'Token ' + localStorageService.get('token'), 'Content-Type': 'application/x-www-form-urlencoded'}
      );
    }

    /*
    * Update user profile
    */
    function updateUserInfo(userInfo) {
      return auth.all('me').patch(
        $.param(userInfo),
        {},
        {
          'Authorization': 'Token ' + localStorageService.get('token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      );
    }

    /*
    * Update user profile
    */
    function updatePassword(passwordObj) {
      return auth.all('password').post(
        $.param(passwordObj),
        {},
        {
          'Authorization': 'Token ' + localStorageService.get('token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      );
    }

    /*
    * Ger user's profile
    */
    function getProfile() {
      return auth.one('profile').get({}, {'Authorization': 'Token ' + localStorageService.get('token')});
    }

    /*
    * Update user's profile
    */
    function updateProfile(profile, profilePicture) {
      var formData = new FormData();
      angular.forEach(profile, function (value, key) {
        if (key != 'picture') formData.append(key, value);
      });

      if (profilePicture != null) {
        if (formData.get('picture') == null) {
          formData.append('picture', profilePicture);
        } else {
          formData.set('picture', profilePicture);
        }
      }

      if (profile.id == null) {
        return auth.all('profile')
                  .withHttpConfig({transformRequest: angular.identity})
                  .customPOST(formData, undefined, undefined, {'Authorization': 'Token ' + localStorageService.get('token'), 'Content-Type': undefined});
      } else {
        return auth.all('profile_update/' + profile.id)
                  .withHttpConfig({transformRequest: angular.identity})
                  .customPUT(formData, undefined, undefined, {'Authorization': 'Token ' + localStorageService.get('token'), 'Content-Type': undefined});
      }
    }

    /*
    * Activate account
    */
    function activate(tokenInfo) {
      return auth.all('activate').post($.param(tokenInfo), {}, {'Content-Type': 'application/x-www-form-urlencoded'});
    }

    /*
    * Logout
    */
    function logout() {
      return auth.all('logout').post({}, {}, {'Authorization': 'Token ' + localStorageService.get('token')});
    }

    /*
    * Add SSH key
    */
    function addSSH(ssh) {
      return auth.all('sshkey').post(
        $.param(ssh),
        {},
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Token ' + localStorageService.get('token')
        }
      );
    }

    /*
    * Delete SSH key
    */
    function deleteSSH(id) {
      return auth.all('sskey_update/' + id).remove(
        {pk: id},
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Token ' + localStorageService.get('token')
        }
      );
    }

    /*
    * Update SSH key
    */
    function updateSSH(ssh) {
      return auth.all('sskey_update/' + ssh.id).patch(
        $.param(ssh),
        {},
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Token ' + localStorageService.get('token')
        }
      );
    }
  }
})();
