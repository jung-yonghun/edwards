<%
if(session.getAttribute("TAXNO") != null){
    session.invalidate();
    response.sendRedirect("./");
    return;
}else{
	response.sendRedirect("./");
    return;
}
%>