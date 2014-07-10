var app = angular.module("resourcesApp", []);

app.controller('RootController', function($scope, $location){

    $scope.items = [];

    $(document).ready(function () {

        $(window).on("scroll", function () {
            var scrollTop = $(this).scrollTop(),
                distance = 5000,
                i;

            $(".menu-item").each(function () {
                $(this).removeClass("active");
            });

            $(".feature-title").each(function (index) {
                var d = Math.abs($(this).offset().top - scrollTop);
                if (d < distance) {
                    distance = d;
                    i = index;
                }
            })

            $(".menu-item").eq(i).addClass("active");

        });

        $scope.$apply(function () {
            $(".feature-title").each(function () {
                $scope.items.push($(this).text());
            })
        });

    });


    $scope.scrollTo = function (index) {
        var scrollTop = $(".feature-title").eq(index).offset().top;
        $.scrollTo(scrollTop - 40, 650, {easing:'swing', axis:'y'});
        // $(window).css("scrollTop", scrollTop - 40);
    };

	$scope.navClass = function (page) {
    	var currentRoute = $location.path().substring(1) || 'home';
	    return page === currentRoute;
	};
});

