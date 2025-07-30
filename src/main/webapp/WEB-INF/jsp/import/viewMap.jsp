<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>배송위치</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
  </head>
  <body>
    <input type="hidden" id="deliveryRequestKey" name="deliveryRequestKey" 	value="${param.deliveryRequestKey}"/>
    <div id="map" style="width:750px;height:400px;"></div>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0134a3a38d8a9a303c5f25d38667d675&libraries=services"></script>
    <script>
	    var mapContainer  = document.getElementById('map');
		var mapOption  = {
			center: new daum.maps.LatLng(37.463579, 126.468609),
			level: 3
		};

		var map = new daum.maps.Map(mapContainer, mapOption);

		var mapTypeControl = new daum.maps.MapTypeControl();
		map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
		var zoomControl = new daum.maps.ZoomControl();
		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

	    var url 	= "../apis/customs/selectImportDeliveryRequestList",
			params 	= {
				"deliveryRequestKey" 	: $('#deliveryRequestKey').val(),
				"_pageRow"				: 1000,
				"_pageNumber"			: 0,
				"size"					: 1000,
				"page"					: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.content[0].deliveryStatus=='20' || d.content[0].deliveryStatus=='30' || d.content[0].deliveryStatus=='40'){
				var url 	= "../apis/customs/selectJangchList",
					params 	= {
						"Jangchi_code" 	: d.content[0].impoJangchBuho
					},
					type 	= "POST";

				sendAjax(url, params, type, function(dd){
					if(dd[0].Jangchi_juso==''){
						if(d.content[0].assignMan=="안근용"){
							var geocoder = new daum.maps.services.Geocoder();
							geocoder.addressSearch("부산광역시 강서구 신항북로 70", function(result, status){
								 if (status === daum.maps.services.Status.OK) {
									var coords = new daum.maps.LatLng(result[0].y, result[0].x);

									var marker = new daum.maps.Marker({
										map: map,
										position: coords
									});

									var infowindow = new daum.maps.InfoWindow({
										content: '<div style="width:150px;text-align:center;padding:6px 0;">'+d.content[0].impoJangchName+'</div>'
									});
									infowindow.open(map, marker);

									map.setCenter(coords);
								}
							});
						}else{
							var geocoder = new daum.maps.services.Geocoder();
							geocoder.addressSearch("인천광역시 중구 공항동로295번길 77-45", function(result, status){
								 if (status === daum.maps.services.Status.OK) {
									var coords = new daum.maps.LatLng(result[0].y, result[0].x);

									var marker = new daum.maps.Marker({
										map: map,
										position: coords
									});

									var infowindow = new daum.maps.InfoWindow({
										content: '<div style="width:150px;text-align:center;padding:6px 0;">'+d.content[0].impoJangchName+'</div>'
									});
									infowindow.open(map, marker);

									map.setCenter(coords);
								}
							});
						}
					}else{
						var geocoder = new daum.maps.services.Geocoder();
						geocoder.addressSearch(dd[0].Jangchi_juso, function(result, status){
							 if (status === daum.maps.services.Status.OK) {
								var coords = new daum.maps.LatLng(result[0].y, result[0].x);

								var marker = new daum.maps.Marker({
									map: map,
									position: coords
								});

								var infowindow = new daum.maps.InfoWindow({
									content: '<div style="width:150px;text-align:center;padding:6px 0;">'+d.content[0].impoJangchName+'</div>'
								});
								infowindow.open(map, marker);

								map.setCenter(coords);
							}
						});
					}
				});
				$('#images').html("<img src='../images/cps/delivery1.gif'>");
			}else if(d.content[0].deliveryStatus=='50'){
				console.log(d.content[0].impoJangchBuho.substr(0,3));
				if(d.content[0].impoJangchBuho.substr(0,3)=='020'){
					var geocoder = new daum.maps.services.Geocoder();
					geocoder.addressSearch('인천 남구 학익동 201-7', function(result, status){
						 if (status === daum.maps.services.Status.OK) {
							var coords = new daum.maps.LatLng(result[0].y, result[0].x);

							var marker = new daum.maps.Marker({
								map: map,
								position: coords
							});

							map.setCenter(coords);
						}
					});
				}else if(d.content[0].impoJangchBuho.substr(0,3)=='040'){
					var geocoder = new daum.maps.services.Geocoder();
					geocoder.addressSearch('인천 서구 검암동 438-52', function(result, status){
						 if (status === daum.maps.services.Status.OK) {
							var coords = new daum.maps.LatLng(result[0].y, result[0].x);

							var marker = new daum.maps.Marker({
								map: map,
								position: coords
							});

							map.setCenter(coords);
						}
					});
				}else if(d.content[0].impoJangchBuho.substr(0,2)=='01'){
					var geocoder = new daum.maps.services.Geocoder();
					geocoder.addressSearch('경기 화성시 오산동 산 88-22', function(result, status){
						 if (status === daum.maps.services.Status.OK) {
							var coords = new daum.maps.LatLng(result[0].y, result[0].x);

							var marker = new daum.maps.Marker({
								map: map,
								position: coords
							});

							map.setCenter(coords);
						}
					});
				}else if(d.content[0].impoJangchBuho.substr(0,2)=='03'){
					var geocoder = new daum.maps.services.Geocoder();
					geocoder.addressSearch('경남 양산시 하북면 백록리 778-4', function(result, status){
						 if (status === daum.maps.services.Status.OK) {
							var coords = new daum.maps.LatLng(result[0].y, result[0].x);

							var marker = new daum.maps.Marker({
								map: map,
								position: coords
							});

							map.setCenter(coords);
						}
					});
				}else if(d.content[0].impoJangchBuho.substr(0,2)=='14'){
					var geocoder = new daum.maps.services.Geocoder();
					geocoder.addressSearch('부산 강서구 범방동 1580', function(result, status){
						 if (status === daum.maps.services.Status.OK) {
							var coords = new daum.maps.LatLng(result[0].y, result[0].x);

							var marker = new daum.maps.Marker({
								map: map,
								position: coords
							});

							map.setCenter(coords);
						}
					});
				}else{
					var geocoder = new daum.maps.services.Geocoder();
					geocoder.addressSearch('서울 송파구 잠실동 8', function(result, status){
						 if (status === daum.maps.services.Status.OK) {
							var coords = new daum.maps.LatLng(result[0].y, result[0].x);

							var marker = new daum.maps.Marker({
								map: map,
								position: coords
							});

							map.setCenter(coords);
						}
					});
				}
				$('#images').html("<img src='../images/cps/delivery2.gif'>");
			}else if(d.content[0].deliveryStatus=='60'){
				var geocoder = new daum.maps.services.Geocoder();
				geocoder.addressSearch(d.content[0].deliveryCarryingInAddr, function(result, status) {
					 if (status === daum.maps.services.Status.OK) {
						var coords = new daum.maps.LatLng(result[0].y, result[0].x);

						var marker = new daum.maps.Marker({
							map: map,
							position: coords
						});

						var infowindow = new daum.maps.InfoWindow({
							content: '<div style="width:150px;text-align:center;padding:6px 0;">'+d.content[0].deliveryCarryingInName+'</div>'
						});
						infowindow.open(map, marker);

						map.setCenter(coords);
					}
				});
				$('#images').html("<img src='../images/cps/delivery3.gif'>");
			}
		});
	</script>
	<br><br>
	<div id="images" name="images"></div>
  </body>
</html>