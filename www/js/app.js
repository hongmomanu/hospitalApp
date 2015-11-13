// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp=angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});
ionicApp.controller("mainController", function($scope,$ionicPopup) {

  /**
  $scope.images = [
    {id: 1, src: "http://placehold.it/50x50",name:'e医通'},
    {id: 2, src: "http://placehold.it/50x50",name:'e医通'},
    {id: 3, src: "http://placehold.it/50x50" ,name:'e医通'},
    {id: 4, src: "http://placehold.it/50x50",name:'e医通'},
    {id: 5, src: "http://placehold.it/50x50",name:'e医通'},
    {id: 6, src: "http://placehold.it/50x50",name:'e医通'}

  ];**/


   $scope.items = [
     {name:'e医通',src:'img/eapp.jpg',appid:'com.ionicframework.eapp315343',appurl:"http://111.1.76.108:3000/files/e.apk"},
     {name:'预约挂号',src:'img/date.jpg',appid:'com.mycompany.AffiliatedHospital',appurl:"http://111.1.76.108:3000/files/hospital.apk"},
      {name:'移动急救',src:'img/care.jpg',appid:'com.ionicframework.mobilecare848832',appurl:"http://111.1.76.108:3005/app/app.apk"},
      {name:'办公OA',src:'img/oa.jpg',appid:'com.ionicframework.hospitaloaapp370962',appurl:"http://111.1.76.108:3007/app/oa.apk"},
     {name:'移动点餐',src:'img/lunch.jpg',appid:'com.test.test370962',appurl:"http://111.1.76.108:3007/app/lunch.apk"},
      {name:'移动查房',src:'img/check.jpg',appid:'com.test.test470962',appurl:"http://111.1.76.108:3007/app/check.apk"}

  ];


  $scope.showapp=function(item){
    console.log(item);
    navigator.startApp.check(item.appid, function(message) { /* success */

      navigator.startApp.start(item.appid, function(message) {  /* success */

      },
      function(error) { /* error */
          $ionicPopup.alert({
           title: '提示',
           template: ' 打开应用错误'
         });
      });


    },
    function(error) { /* error */
       $ionicPopup.alert({
           title: '提示',
           template: '应用未安装'
         });

    });


  };





});
