;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};




	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	var parallax = function() {

		if ( !isMobile.any() ) {
			$(window).stellar({
				horizontalScrolling: false,
				hideDistantElements: false, 
				responsive: true

			});
		}
	};

	function toogleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else{
			e.dataSeries.visible = true;
		}
		e.chart.render();
	}
	
	function addData1(data) {
		var fig1_points = [];
		$.each( data[0].quantity, function( key, val ) {
			fig1_points.push({
				label: key,
				y: val
			});
		});
		return fig1_points;
	}
	function addData9(data) {
		var fig9_points = [];
		var reviewtime=[]
		var overall=[]
		$.each( data[0].ReviewTime, function( key, val ) {
			reviewtime.push(new Date(val));
		});
		$.each( data[0].overall, function( key, val ) {
			overall.push(val);
		});
		for (var i = 0; i < reviewtime.length; i++) {
			fig9_points.push({
				x: reviewtime[i],
				y: overall[i]
			});
		
		};
		return fig9_points;
	}
	function addData_x_13(x_data){
		var data_x=[]
		$.each( x_data[0].ReviewTime, function( key, val ) {
			data_x.push(new Date(val));
		});
		return data_x;
	}
	function addData13(data,data_x) {
		var fig13_points=[];
		var data_y=[]
		$.each( data[0], function( key, val ) {
			data_y.push(val);
		});
		for (var i = 0; i < data_x.length; i++) {
			fig13_points.push({
				x: data_x[i],
				y: data_y[i]
			});
		};
		return fig13_points;
	}
	function addData14(data) {
		var fig14_points=[];
		$.each( data[0].review_quantity, function( key, val ) {
			fig14_points.push({
				x: parseInt(key),
				y: val
			});
		});
		return fig14_points;
	}
	function addData15(data) {
		var fig15_points=[];
		$.each( data[0].overall, function( key, val ) {
			fig15_points.push({
				x: parseInt(key),
				y: val
			});
		});
		return fig15_points;
	}
	
	$(function(){
		contentWayPoint();
		
		goToTop();
		loaderPage();
		parallax();
		// draw figure1
		var fig1_points = addData1(rating_quantity)
		var options_fig1 =  {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Rating Quantity"
			},
			axisX: {
				title:"rating"
			},
			axisY: {
				title: "counts",
				titleFontSize: 12,
				includeZero: true
			},
			data: [{
				type: "column", 
				dataPoints: fig1_points
			}]
		};
		$("#Figure1").CanvasJSChart(options_fig1);
		// draw figure9
		var fig9_points = addData9(rating_quantity_month)
		var options_fig9 =  {
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "review_quantity_through_months"
			},
			axisX: {
				title:"rating"
			},
			axisY: {
				title: "counts",
				titleFontSize: 12,
				includeZero: false
			},
			data: [{
				type: "spline", 
				xValueType: "dateTime",
				dataPoints: fig9_points
			}]
		};
		$("#Figure9").CanvasJSChart(options_fig9);

		// draw graph 13
		var data_x_13 = addData_x_13(seasonal_x)
		var fig13_points_1 = addData13(observed_13,data_x_13)
		var fig13_points_2 = addData13(seasonal_13,data_x_13)
		var fig13_points_3 = addData13(trend_13,data_x_13)
		var fig13_points_4 = addData13(residual_13,data_x_13)

		
		var chart13_1 = new CanvasJS.Chart("Figure13_1", {
			height:150,
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Seasonal Decomposition -Original Time Series Figure"
			},
			axisX: {
				title:"Year"
			},
			axisY: {
				title: "Original",
				titleFontSize: 12,
				includeZero: false,
				maximum:6000,
				interval:2000
			},
			data: [{
				type: "spline", 
				xValueType: "dateTime",
				dataPoints: fig13_points_1
			}]
		  });
	  
		  chart13_1.render();

		
		var chart13_2 = new CanvasJS.Chart("Figure13_2", {
			height:150,
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Seasonal Decomposition -Trend Component Figure"
			},
			axisX: {
				title:"Year"
			},
			axisY: {
				title: "Trend",
				titleFontSize: 12,
				includeZero: true,
				// maximum:400
				
			},
			data: [{
				type: "spline", 
				xValueType: "dateTime",
				dataPoints: fig13_points_2
			}]
		  });
	  
		  chart13_2.render();

		
		var chart13_3 = new CanvasJS.Chart("Figure13_3", {
			height:150,
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Seasonal Decomposition -Seasonal Component Figure"
			},
			axisX: {
				title:"Year"
			},
			axisY: {
				title: "Seasonal",
				titleFontSize: 12,
				includeZero: true,
				maximum:3000,
				interval:1000
				
			},
			data: [{
				type: "spline", 
				xValueType: "dateTime",
				dataPoints: fig13_points_3
			}]
		  });
	  
		  chart13_3.render();

		
		var chart13_4 = new CanvasJS.Chart("Figure13_4", {
			height:150,
			animationEnabled: true,
			theme: "light2",
			title: {
				text: "Seasonal Decomposition -Seasonal Component Figure"
			},
			axisX: {
				title:"Year"
			},
			axisY: {
				title: "Residual",
				titleFontSize: 12,
				includeZero: true,
				maximum:2000,
				interval:1000
				
			},
			data: [{
				type: "spline", 
				xValueType: "dateTime",
				dataPoints: fig13_points_4
			}]
		  });
	  
		  chart13_4.render();

		//draw figure14
		var fig14_points_1 = addData14(christ_quantity_14)
		var fig14_points_2 = addData14(christ_quantity_avg_year_14)
		
		var options_fig14 = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Christmas quantity average"
			},
			axisX:{
				title:"year",
				valueFormatString:"####"
			},
			axisY: {
				title: "quantity",
				titleFontSize: 12,
				includeZero: true
			},
			toolTip:{
				shared:true
			},  
			legend:{
				cursor:"pointer",
				verticalAlign: "top",
				horizontalAlign: "left",
				dockInsidePlotArea: true,
				itemclick: toogleDataSeries
			},
			data: [{
				type: "line",
				showInLegend: true,
				name: "Christmas reviews quantity",
				markerType: "square",
				color: "#F08080",
				dataPoints: fig14_points_1
			},
			{
				type: "line",
				showInLegend: true,
				name: "Year average quantity",
				lineDashType: "dash",
				dataPoints: fig14_points_2
			}]
		};
		
		$("#Figure14").CanvasJSChart(options_fig14);

		// draw graph 15
		var fig15_points_1 = addData15(christ_rating_15)
		var fig15_points_2 = addData15(christ_rating_year_15)
		
		var options_fig15 = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Christmas rating average"
			},
			axisX:{
				title:"year",
				valueFormatString:"####"
			},
			axisY: {
				title: "rating",
				titleFontSize: 12,
				includeZero: false
			},
			toolTip:{
				shared:true
			},  
			legend:{
				cursor:"pointer",
				verticalAlign: "bottom",
				horizontalAlign: "left",
				dockInsidePlotArea: true,
				itemclick: toogleDataSeries
			},
			data: [{
				type: "line",
				showInLegend: true,
				name: "Christmas reviews rating",
				markerType: "square",
				color: "#F08080",
				dataPoints: fig15_points_1
			},
			{
				type: "line",
				showInLegend: true,
				name: "Year average rating",
				lineDashType: "dash",
				dataPoints: fig15_points_2
			}]
		};
		
		$("#Figure15").CanvasJSChart(options_fig15);

		

	});

}());