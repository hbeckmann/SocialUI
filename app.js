angular.module('SocialUI', [])
  .controller('SocialController', ['$http', function($http) {

    var self = this;
    var currentfilter = 'newest';
    self.viewingLimit = {
      limit: 10,
      add: function() {
        this.limit += 10
      }
    };
    self.activities_filtered;
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
      self.activities_filtered = self.activities;
    };

    self.filterActivity = function(params) {
      switch(params) {
        case 'oldest':
          if(currentfilter !== 'oldest') {
            self.activities_filtered.reverse();
            currentfilter = 'oldest';
          };
          break;

        case 'newest':
          if(currentfilter !== 'newest') {
            self.activities_filtered.reverse();
            currentfilter = 'newest';
          };
          break;

        default:
            self.activities_filtered = self.activities;
            if(params !== "all") {
            self.activities_filtered = self.activities_filtered.filter(function(obj) {
              if(obj.provider === params) {
                return true;
              }
            });
            };
          break;

      }
    };

    self.getActivities();
  }]);
