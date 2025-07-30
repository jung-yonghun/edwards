<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<title>시스템 공지</title>
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&amp;subset=korean">
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/basic.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/layout.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/content.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/notosanskr.css'/>"/>
    <script language="JavaScript">
      function setCookie1( name, value, expiredays ){
	    var todayDate = new Date();
	    todayDate.setHours(0,0,0,0);  // 하루를 기준
	    todayDate.setDate( todayDate.getDate() + expiredays );
	    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
      }

      function closeWin() {
        if (document.forms[0].popup_chk.checked) {
          setCookie1( "noticePopUp", "done" , 1);
        }
        self.close();
      }
    </script>
  </head>
  <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
    <table width="300" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" align="center" class="font_style">
      <tr>
        <td align="center"><br><font size="5" color="black"><b>시스템 공지</b></font><br><br><br>
		<font color="black"><b>세인관세법인 이전으로 인해<br>서비스이용이 중단됩니다.</b><br><br>
		<b>이용에 불편을 드려 죄송합니다.</b><br><br></font>
		<font color="black">* 중단기간</font><br><br>
		<font color="blue"><b>2022년 2월 19일 07:00 ~ 17:00</b><br><br></td>
      </tr>
      <form name="form1">
      <tr>
        <td width="300" height="30" align=right bgcolor="#efefef">
	      <input type="checkbox" name="popup_chk" value="1" onClick="javascript:closeWin();">&nbsp;<font color="black">하루동안 창닫기</font>&nbsp;</td>
	    </td>
      </tr>
      </form>
    </table>
  </body>
</html>