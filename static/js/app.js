'use strict';


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


angular.module('GatheringsApp', [
  'ngRoute',
  'controllers'
])

.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'homepageController',
        templateUrl: 'homepage.html'
      })
      .when('/planes-chase', {
        controller: 'planesChaseController',
        templateUrl: 'planeschase.html'
      })
      .when('/arch-enemy', {
        controller: 'archEnemyController',
        templateUrl: 'archenemy.html'
      });
    $routeProvider.otherwise({redirectTo: '/'});
  }
]);


angular.module('controllers', [])

.controller('homepageController', ['$location', '$scope', '$http', function($location, $scope, $http) {
  $scope.schemeDeck = [];
  $scope.planeDeck = [];
  $scope.schemeDrawn = [];
  $scope.planeDrawn = [];
  $scope.drawn = [];

  $http.get("scheme-cards.json").then(function(schemeData) {
    $scope.schemeDeck = schemeData.data;
  });
  $http.get("plane-cards.json").then(function(planeData) {
    $scope.planeDeck = planeData.data;
  });
  $scope.schemeDraw = function() {
    var drawnCard = $scope.schemeDeck.pop();
    if (!!drawnCard) {
      console.log(drawnCard);
      $scope.schemeDrawn.push(drawnCard);
      $scope.drawn.push(drawnCard);
    }
  };
  $scope.planeDraw = function() {
    var drawnCard = $scope.planeDeck.pop();
    if (!!drawnCard) {
      console.log(drawnCard);
      $scope.planeDrawn.push(drawnCard);
      $scope.drawn.push(drawnCard);
    }
  };

  $scope.replace = function() {
    var lastCard = $scope.drawn.pop();
    if (!!lastCard) {
      $scope.deck.push(lastCard);
    }
  };

  $scope.shuffle = function() {
    $scope.planeDeck = shuffleArray($scope.planeDeck);
    $scope.schemeDeck = shuffleArray($scope.schemeDeck);
  };

  $scope.reset = function() {
    $scope.planeDeck = $scope.planeDeck.concat($scope.planeDrawn);
    $scope.schemeDeck = $scope.schemeDeck.concat($scope.schemeDrawn);
    $scope.drawn = [];
    $scope.planeDrawn = [];
    $scope.schemeDrawn = [];
    $scope.shuffle();
  };
}])

.controller('planesChaseController', ['$scope', function($scope) {
}])

.controller('archEnemyController', ['$scope', '$http', function($scope, $http) {
  $scope.schemeDeck = [];
  $scope.planeDeck = [];
  $scope.drawn = [];
  $http.get("scheme-cards.json").then(function(data) {
    $scope.schemeDeck = data.data;
  });
  $http.get("plane-cards.json").then(function(data) {
    $scope.planeDeck = data.data;
  });

  $scope.draw = function() {
    var drawnCard = $scope.deck.pop();
    if (!!drawnCard) {
      console.log(drawnCard);
      $scope.drawn.push(drawnCard);
    }
  };

  $scope.replace = function() {
    var lastCard = $scope.drawn.pop();
    if (!!lastCard) {
      $scope.deck.push(lastCard);
    }
  };

  $scope.shuffle = function() {
    $scope.deck = shuffleArray($scope.deck);
  };

  $scope.reset = function() {
    $scope.deck = $scope.deck.concat($scope.drawn);
    $scope.drawn = [];
    $scope.shuffle();
  };

  $scope.search = {
    oracle_text: "ongoing"
  };

}])

.directive('schemeCardView', function() {
  return {
    templateUrl: 'schemecard.html',
    scope: {
      card: '=',
      size: '@'
    },
    link: function(element, scope, attrs) {
      // use the directive scope here!
      console.log(scope.card);
    }
  };
})

.directive('planeCardView', function() {
  return {
    templateUrl: 'planecard.html',
    scope: {
      card: '=',
      size: '@'
    },
    link: function(element, scope, attrs) {
      // use the directive scope here!
      console.log(scope.card);
    }
  };
});