angular.module('SocialUI', [])
  .controller('SocialController', ['$http', function($http) {

    var self = this;
    self.activities;

    self.getActivities = function() {
      $http.get('https://nuvi-challenge.herokuapp.com/activities')
      .then(function(res) {
        self.activities = res.data;
        self.sortDate();
        console.dir(self.activities);
      },
      function(err){
        console.log("An error has occured when retriveing activity: " + err)
      })
    };

    self.sortDate = function() {

      self.activities.map(function(obj) {
        var rawDate = parseInt(obj.activity_date.split("-").join(""));
        var formattedDate = obj.activity_date.split("-");
        formattedDate.push(formattedDate.shift());
        formattedDate = formattedDate.join("/");

        obj.activity_date_raw = rawDate;
        obj.activity_date_formatted = formattedDate;
        return obj;
      });

      self.activities.sort(function(a, b) {
        return a.activity_date_raw - b.activity_date_raw;
      });

    };

    self.getActivities();
  }]);
