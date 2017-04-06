
var app = angular.module('App', ['angular-loading-bar' , 'ngAnimate']);

app.controller('bodyController', ['$scope', '$http', 'cfpLoadingBar' , '$interval', function ($scope, $http, cfpLoadingBar , $interval) {


    /*We First pretend there is no error, so we define our both var to nothing*/
    $scope.noti_class= "";
    $scope.error= false;
    $scope.q  = '';



    $scope.search = function(){

        if($scope.q.length == 0){

            //updating error box
            $scope.errFun("set", "danger", "Please Enter a Proper Location..");
            return;
        }

        //resetting error box
        $scope.errFun("reset", "", "");


        //starting a loading bar
        cfpLoadingBar.start();

        //initialize timeout, so that loading bar will display
        
        var req = {
            url: 'http://maps.google.com/maps/api/geocode/json?address='+$scope.q+'&sensor=false',
            cache: true,
            headers: {
            }
        };
        $http(req).then(function(response){
            var data = response.data;
            if(data.status === "OK"){
                $scope.address = data.results[0].formatted_address;
                $scope.lat = data.results[0].geometry.location.lat;
                $scope.lng = data.results[0].geometry.location.lng;

            }
            else{
                //in case any error occured from maps.google.com/apis/geocode/json
                $scope.errFun("set", "danger", "Some Issue while fetching data from maps"); // you can modifiy it acc to the json response
                return;
            }

        });

    }


    $scope.errFun = function(type, err_class, msg){
        if(type === "reset"){
            $scope.noti_class= "";
            $scope.error= false;
        }
        else{
            $scope.noti_class= err_class;
            $scope.error= msg;
        }
    }

}]);


        /*
        $(window).load(function(){
                cfpLoadingBar.start();
            });
            $(document).ready(function(){
                cfpLoadingBar.complete();
            });
            */