(function() {
  'use strict';

  angular
    .module('stargaze')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        data: {
          requireLogin: false
        }
      })
      .state('pricing', {
        url: '/pricing',
        templateUrl: 'app/main/pricing.html',
        data: {
          requireLogin: false
        }
      })
      .state('features', {
        url: '/features',
        templateUrl: 'app/main/features.html',
        data: {
          requireLogin: false
        }
      })
      .state('auth', {
        abstract: true,
        url: '/auth',
        templateUrl: 'app/session/layout.html',
        controller: 'SessionController',
        controllerAs: 'vm',
        data: {
          requireLogin: false
        }
      })
      .state('auth.signin', {
        url: '/signin',
        templateUrl: 'app/session/signin.html'
      })
      .state('auth.signup', {
        url: '/signup/:username/:email',
        templateUrl: 'app/session/signup.html',
        resolve: {
          username: ['$stateParams', function($stateParams) {
            return $stateParams.username;
          }],
          email: ['$stateParams', function($stateParams) {
            return $stateParams.email;
          }]
        }
      })
      .state('auth.reset-request', {
        url: '/reset-request',
        templateUrl: 'app/session/reset_request.html'
      })
      .state('auth.reset', {
        url: '/reset/:uid/:token',
        templateUrl: 'app/session/reset.html',
        resolve: {
          uid: ['$stateParams', function($stateParams) {
            return $stateParams.uid;
          }],
          token: ['$stateParams', function($stateParams) {
            return $stateParams.token;
          }]
        }
      })
      .state('auth.reset-confirm', {
        url: '/reset-confirm',
        templateUrl: 'app/session/reset_confirm.html'
      })
      .state('auth.reset-failed', {
        url: '/reset-failed',
        templateUrl: 'app/session/reset_failed.html'
      })
      .state('auth.activate', {
        url: '/activate/:uid/:token',
        templateUrl: 'app/session/activate.html',
        controller: 'ActivateController',
        controllerAs: 'vm',
        resolve: {
          uid: ['$stateParams', function($stateParams) {
            return $stateParams.uid;
          }],
          token: ['$stateParams', function($stateParams) {
            return $stateParams.token;
          }]
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        data: {
          requireLogin: true
        }
      })
      .state('orbits', {
        abstract: true,
        url: '/orbits',
        template: '<ui-view/>',
        data: {
          requireLogin: true,
          requireCC: true
        }
      })
      .state('orbits.mine', {
        url: '/mine',
        templateUrl: 'app/orbits/mine.html',
        controller: 'OrbitMineController',
        controllerAs: 'vm'
      })
      .state('orbits.create', {
        url: '/create',
        templateUrl: 'app/orbits/create.html',
        controller: 'OrbitCreateController',
        controllerAs: 'vm'
      })
      .state('orbits.ssh', {
        url: '/ssh',
        templateUrl: 'app/orbits/ssh.html',
        controller: 'SshController',
        controllerAs: 'vm'
      })
      .state('account', {
        abstract: true,
        url: '/account',
        template: '<ui-view/>',
        data: {
          requireLogin: true
        }
      })
      .state('account.mine', {
        url: '/mine',
        templateUrl: 'app/account/mine.html',
        controller: 'AccountMineController',
        controllerAs: 'vm'
      })
      .state('account.profile', {
        url: '/profile',
        templateUrl: 'app/account/profile.html',
        controller: 'AccountProfileController',
        controllerAs: 'vm',
        params: {
          activated: false
        }
      })
      .state('account.billing', {
        url: '/billing',
        templateUrl: 'app/account/billing.html',
        controller: 'AccountBillingController',
        controllerAs: 'vm',
        params: {
          redirect: false
        }
      })
      .state('account.billing_history', {
        url: '/billing-history',
        templateUrl: 'app/account/billing_history.html',
        controller: 'BillingHistoryController',
        controllerAs: 'vm',
        params: {
          redirect: false
        }
      })
      .state('account.deactive', {
        url: '/deactive',
        templateUrl: 'app/account/deactive.html',
        controller: 'AccountDeactiveController',
        controllerAs: 'vm'
      })
      .state('support', {
        abstract: true,
        url: '/support',
        template: '<ui-view />',
        data: {
          requireLogin: true
        }
      })
      .state('support.tech', {
        url: '/tech',
        templateUrl: 'app/support/tech.html',
        controller: 'TechSupportController',
        controllerAs: 'vm'
      })
      .state('support.contact', {
        url: '/contact',
        templateUrl: 'app/support/contact.html',
        controller: 'ContactSupportController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
