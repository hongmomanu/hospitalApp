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
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
                url: '/index',
                templateUrl:'templates/index.html',
                //templateUrl: localStorage.serverurl+'hospital/'+'templates/index.html?t='+(new Date().getTime()),
                controller: 'mainController'
            })
    $urlRouterProvider.otherwise('/index');
});
ionicApp.controller("mainController", function($scope,$ionicPopup,$ionicModal,$ionicLoading) {

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
     {name:'e医通',src:(localStorage.serverurl+'hospital/img/eapp.jpg'),appid:'com.ionicframework.eapp315343',appurl:"http://111.1.76.108:3000/files/e.apk"},
     {name:'预约挂号',src:(localStorage.serverurl+'hospital/img/date.jpg'),appid:'com.mycompany.AffiliatedHospital',appurl:"http://111.1.76.108:3000/files/hospital.apk"},
      {name:'移动急救',src:(localStorage.serverurl+'hospital/img/care.jpg'),appid:'com.ionicframework.mobilecare848832',appurl:"http://111.1.76.108:3005/app/app.apk"},
      {name:'办公OA',src:(localStorage.serverurl+'hospital/img/oa.jpg'),appid:'com.ionicframework.hospitaloaapp370962',appurl:"http://git.oschina.net/hongmomanu/iosfile/raw/master/oa.apk"},
     {name:'移动点餐',src:(localStorage.serverurl+'hospital/img/lunch.jpg'),appid:'com.test.test370962',appurl:"http://111.1.76.108:3007/app/lunch.apk"},
      {name:'医生查房',src:(localStorage.serverurl+'hospital/img/check.jpg'),appid:'com.hc.mhy.view',appurl:"http://git.oschina.net/hongmomanu/iosfile/raw/master/fsmhy.apk"},
     {name:'软件分享',src:(localStorage.serverurl+'hospital/img/barcode.jpg'),type:'barcode'}

  ];

  $scope.closebarcodemodal=function(){
     $scope.barcodemodal.remove();
  };

  $scope.progress=0;



  $scope.downloadstart=function (url) {
    try {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile("app.apk", {
                create: true,
                exclusive: false
            }, function(entry) {
                var storepath = entry.toInternalURL();
                //alert(storepath);
                $scope.downloadFile(storepath, url);//開始下載文件
            }, function() {
                console.log('创建文件夹失败');
            });
        }, function() {
            console.log('创建文件夹失败');
        });
    } catch (e) {
        alert(e.name + ":" + e.message);
    }
}
/**
 * 下載文件，
 *
 * @param  {[string]} storefilepath   [下載的文件存儲的路徑]
 * @param  {[string]} downloadfileurl [需要下載文件的URL 或者名稱]
 * @return {[type]}                 [description]
 */
$scope.downloadFile=function (storefilepath, downloadfileurl) {
    try {
        var ft = new FileTransfer();
        ft.onprogress = function(progressEvent) {
               //alert(11);
              if (progressEvent.lengthComputable) {

                $scope.progress= (progressEvent.loaded / progressEvent.total*100).toFixed(1);
                 $ionicLoading.show({
                    template: '下载中...'+$scope.progress +'%'
                });

              } else {
                alert("can not progress")
              }
          };
        var uri = encodeURI(downloadfileurl);
        var fileURL = storefilepath;
        ft.download(
            uri,
            fileURL,
            function(entry) {
                
                //alert("download complete: " + entry.toInternalURL());



               /**
                var open = cordova.plugins.disusered.open;

                      function success() {

                        $ionicLoading.hide();

                      }

                      function error(code) {
                        $ionicLoading.hide();
                        if (code === 1) {
                           $ionicPopup.alert({
                             title: '错误!',
                             template: '未找到文件'
                           });
                        } else {
                           $ionicPopup.alert({
                             title: '错误!',
                             template: '安装失败'
                           });
                        }
                      }

                 open(entry.toInternalURL(), success, error);**/


               $ionicLoading.hide();

              cordova.plugins.fileOpener2.open(
                            entry.toInternalURL(),
                            'application/vnd.android.package-archive',
                            {
                              error : function(e) {
                                  alert('Error status:');
                              },
                              success : function () {
                                  //alert('file opened successfully');
                              }
                          }
                );

            },
            function(error) {
                alert("download error source " + error.source);
               
            },
            false, {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );


    } catch (e) {
        alert(e.name + ":" + e.message);
    }
};

  $scope.tempdownload=function(downloadfileurl){
    $scope.downloadurl=downloadfileurl;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 50 * 1024 * 1024 , $scope.gotFS, function(){alert("error")});


  };
  $scope.downloadurl="";
  $scope.gotFS=function (fileSystem) {
                   resolveLocalFileSystemURL(cordova.file.externalDataDirectory,  $scope.gotDir);
            };

 $scope.gotDir=function (dirEntry) {
                dirEntry.getFile("app.apk", {create: true, exclusive: false}, $scope.gotFile);
  };

  $scope.gotFile=function (fileEntry) {
                var localPath = fileEntry.fullPath;
                var localUrl = fileEntry.toURL();

                $scope.downloadFile(localUrl,$scope.downloadurl);

  }


  $scope.showapp=function(item){
    console.log(item);

    if(item.type=='barcode'){

      $ionicModal.fromTemplateUrl(localStorage.serverurl+'hospital/templates/barcodemodal.html' , {
          scope: $scope
      }).then(function(modal) {
              $scope.barcodemodal = modal;
              $scope.barcodemodal.show();
              $("#scanbarcode").qrcode({text:localStorage.serverurl+'hospital/app.apk',width:200,height:200});
      });


    }else{
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





      var confirmPopup = $ionicPopup.confirm({
       title: '提示',
       template: '应用未安装,确定安装么?'
      });
   confirmPopup.then(function(res) {
     if(res) {

        //alert(cordova.file.dataDirectory);

        /**$ionicLoading.show({
            template: '下载中...'+$scope.progress
        });


       var open = cordova.plugins.disusered.open;

                      function success() {

                        $ionicLoading.hide();

                      }

                      function error(code) {
                        $ionicLoading.hide();
                        if (code === 1) {
                           $ionicPopup.alert({
                             title: '错误!',
                             template: '未找到文件'
                           });
                        } else {
                           $ionicPopup.alert({
                             title: '错误!',
                             template: '安装失败'
                           });
                        }
                      }

      open(item.appurl, success, error);**/

        //$scope.downloadstart(item.appurl);

       $scope.tempdownload(item.appurl);











     } else {

     }
   });



    });

    }



  };





});
