<%
    String strReferer = request.getHeader("referer");

    if (strReferer == null) {
%>
<script language="javascript">
    alert("Permission denied!!");
    document.location.href = "../";
</script>
<%
        return;
    }
%>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="shortcut icon" href="<c:url value='/images/common/cpsicon.ico'/>"/>