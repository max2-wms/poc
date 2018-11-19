angular.module('myapp', ['angular-beforeunload'])
    .controller('MainCtrl', ['$scope', 'BeforeUnload', function ($scope, BeforeUnload) {
        // Bind a listener on your current $scope and save reference to it.
        var onbeforeunload = $scope.$on(
            '$locationChangeStart',
            BeforeUnload.init(
                "are you sure you want to cancel your application",
                "are you sure you want to cancel your application"
            )
        );
        // In this controller the user will be prompted to
        // confirm their choice before they change their location.
        $scope.leavePage = function() {
            // If you invoking your reference then your listener becomes null.
            onbeforeunload();  
        };

        $scope.linkText = "go to google";
    }]);