<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="lnb">
	<div class="lnb_con">
		<div class="lnb_Top">
			<img src="../images/logo/${sessionScope.USERLOGO}" onclick="returnMain()" style="cursor:pointer"/>
		</div>
		<div class="lnb_user">
			<a href="javascript:;" onclick="addTab('Setting','./setting.cps')" class="user">${sessionScope.USERNAME}님</a><!-- img src="../images/cps/lnb_user_arrow.png"></a>
			<a href="javascript:;" class="notice"><img src="../images/cps/lnb_notice.png"></a-->
			<a href="javascript:Logout();" class="share"><img src="../images/cps/lnb_share.png"></a>
		</div>
		<div class="lnb_dep"></div>
	</div>
</div>

<div id="lnb_m">
	<div class="lnb_con">
		<div class="lnb_Top">
			<img src="../images/logo/${sessionScope.USERLOGO}" onclick="returnMain()" style="cursor:pointer"/>
		</div>
		<div class="lnb_user">
			<a href="javascript:;" onclick="addTab('Setting','./setting.cps')" class="user">${sessionScope.USERNAME}님 </a><!-- img src="../images/cps/lnb_user_arrow.png"></a>
			<a href="javascript:;" class="notice"><img src="../images/cps/lnb_notice.png"></a-->
			<a href="javascript:Logout();" class="share"><img src="../images/cps/lnb_share.png"></a>
		</div>
		<div class="lnb_dep"></div>
	</div>
</div>