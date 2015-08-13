'use strict';

/**
 * Post Controller
 */

angular.module('RDash')
.controller('PostCtrl', function PostCtrl($scope, $stateParams, $location, Posts, Comments) {
  $scope.data = {};

  $scope.fetch = function(){
    Posts.getPost($stateParams.postID, function (resp) {
      $scope.data.post = resp._source;
    });
    Comments.getComments(function (resp) {
      $scope.data.comments = resp;
    });
  };

  $scope.fetch();

  $scope.createComment = function() {
    $scope.comment = {
      content: marked($scope.simplemde.value())
    }; //keys: content
    // console.log("$scope.comment",$scope.comment);
    Comments.addComment($scope.comment)
    .then(function(resp) {
      window.location.reload();// $location.path('/post/'+resp._id); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.$on('$viewContentLoaded', function(){
    $scope.simplemde = new SimpleMDE({
      tabSize: 2
    });
    $scope.simplemde.render();
  });

});
