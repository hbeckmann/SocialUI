angular.module('SocialUI', [])
  .controller('SocialController', ['$http', function($http){

    var self = this;
    self.test = "Hello World";
    self.activities;
    self.getActivities = function() {
      $http.get('https://nuvi-challenge.herokuapp.com/activities')
      .then(function(res){
        console.dir(res.data);
        self.activities = res.data;
      },
      function(err){
        console.log("An error has occured when retriveing activity: " + err)
      })
    };

    self.getActivities();
  }]);
