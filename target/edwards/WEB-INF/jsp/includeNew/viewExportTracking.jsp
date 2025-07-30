<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="java.util.*"%>
<%
	String expDclrNo = request.getParameter("expDclrNo");

	//XML 데이터를 호출할 URL
	String url = "https://unipass.customs.go.kr:38010/ext/rest/expDclrNoPrExpFfmnBrkdQry/retrieveExpDclrNoPrExpFfmnBrkd?crkyCn=m250e106p072g093e050m090e0&expDclrNo="+expDclrNo+"";

	//서버에서리턴될 XML데이터의 엘리먼트 이름 배열
	String[] fieldNames ={"shpmPckUt", "mnurConm", "shpmCmplYn", "acptDt", "shpmWght", "exppnConm", "loadDtyTmlm", "expDclrNo", "csclWght", "shpmPckGcnt", "csclPckUt", "csclPckGcnt"};
	String[] fieldList ={"shpmPckUt", "tkofDt", "shpmPckGcnt", "blNo"};

	//각 게시물하나에 해당하는 XML 노드를 담을 리스트
	ArrayList<Map> pubDoc = new ArrayList<Map>();
	ArrayList<Map> pubList = new ArrayList<Map>();

	try {
		//XML파싱 준비
		DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
		DocumentBuilder b = f.newDocumentBuilder();
		//위에서 구성한 URL을 통해 XMl 파싱 시작
		Document doc = b.parse(url);
		doc.getDocumentElement().normalize();

		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList items = doc.getElementsByTagName("expDclrNoPrExpFfmnBrkdQryRsltVo");

		String aaa = "";
		//for 루프시작
		for (int i = 0; i < items.getLength(); i++) {
			//i번째 publication 태그를 가져와서
			Node n = items.item(i);
			//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
			if (n.getNodeType() != Node.ELEMENT_NODE)
				continue;

			Element e = (Element) n;
			HashMap pub = new HashMap();
			//for 루프 시작
			for(String name : fieldNames){
				//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
				NodeList titleList = e.getElementsByTagName(name);
				Element titleElem = (Element) titleList.item(0);

				Node titleNode = titleElem.getChildNodes().item(0);
				//System.out.println(name);
				// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
				if(titleNode == null){
					aaa = "";
				} else {
					aaa = titleNode.getNodeValue();
				}
				//System.out.println(aaa);
				pub.put(name, aaa);
			}
			//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
			pubDoc.add(pub);
		}

		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList itemsList = doc.getElementsByTagName("expDclrNoPrExpFfmnBrkdDtlQryRsltVo");

		//for 루프시작
		for (int i = 0; i < itemsList.getLength(); i++) {
			//i번째 publication 태그를 가져와서
			Node n = itemsList.item(i);
			//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
			if (n.getNodeType() != Node.ELEMENT_NODE)
				continue;

			Element e = (Element) n;
			HashMap pub1 = new HashMap();
			//for 루프 시작
			for(String name : fieldList){
				//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
				NodeList titleList = e.getElementsByTagName(name);
				Element titleElem = (Element) titleList.item(0);

				Node titleNode = titleElem.getChildNodes().item(0);

				if(titleNode == null){
					aaa = "";
				} else {
					aaa = titleNode.getNodeValue();
				}
				// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
				pub1.put(name, aaa);
			}
			//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
			pubList.add(pub1);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
<!DOCTYPE HTML>
<html>
  <head>
  	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<title>수출이행내역(건별)</title>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_title.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_css.jsp"></jsp:include>
  </head>
  <body>
    <div id="income">
	  <div class="income_cont">
       	<div  class="income_tit">
          <p>수출이행내역(건별)</p>
        </div>
        <div class="income_tbl">
		<table>
		  <colgroup>
			<col width="20%" />
			<col width="30%" />
			<col width="20%" />
			<col width="30%" />
		  </colgroup>
		  <tbody>
	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		for(Map pub : pubDoc){
	%>
		      <tr>
			    <td class="left">수출신고번호</td>
			    <td><%=pub.get("expDclrNo").toString().substring(0,5) %>-<%=pub.get("expDclrNo").toString().substring(5,7) %>-<%=pub.get("expDclrNo").toString().substring(7,14) %></td>
			    <td class="left">선기적완료여부</td>
			    <td><%=pub.get("shpmCmplYn") %></td>
			  </tr>
			  <tr>
			    <td class="left">수출화주/대행자</td>
			    <td><%=pub.get("exppnConm") %></td>
			    <td class="left">제조자</td>
			    <td><%=pub.get("mnurConm") %></td>
			  </tr>
			  <tr>
			    <td class="left">적재의무기한</td>
	    <%
			if(pub.get("loadDtyTmlm")==null||pub.get("loadDtyTmlm")==""){
		%>
			    <td></td>
		<%
			}else{
		%>
				<td><%=pub.get("loadDtyTmlm").toString().substring(0,4) %>-<%=pub.get("loadDtyTmlm").toString().substring(4,6) %>-<%=pub.get("loadDtyTmlm").toString().substring(6,8) %></td>
		<%
			}
		%>
			    <td class="left">수리일자</td>
		<%
			if(pub.get("acptDt")==null||pub.get("acptDt")==""){
		%>
			    <td></td>
		<%
			}else{
		%>
				<td><%=pub.get("acptDt").toString().substring(0,4) %>-<%=pub.get("acptDt").toString().substring(4,6) %>-<%=pub.get("acptDt").toString().substring(6,8) %></td>
		<%
			}
		%>
			  </tr>
			  <tr>
			    <td class="left">통관포장개수</td>
			    <td><%=pub.get("csclPckGcnt") %> <%=pub.get("csclPckUt") %></td>
			    <td class="left">통관중량(KG)</td>
			    <td><%=pub.get("csclWght") %></td>
			  </tr>
			  <tr>
			    <td class="left">선기적포장개수</td>
			    <td><%=pub.get("shpmPckGcnt") %>
		<%
			if(pub.get("shpmPckUt")==null||pub.get("shpmPckUt")==""){
			}else{
		%>
				<%=pub.get("shpmPckUt") %>
		<%
			}
		%>

			    </td>
			    <td class="left">선기적중량(KG)</td>
			    <td><%=pub.get("shpmWght") %></td>
			  </tr>
		<%
			}
		%>
			</table>
			<br>
			<table>
			  <colgroup>
				<col width="34%" />
				<col width="33%" />
				<col width="33%" />
			  </colgroup>
			  <tbody>
			  <TR height="25">
	          	<TD class="left">B/L 번호</TD>
	          	<TD class="left">출항일자</TD>
	          	<TD class="left">선기적포장개수</TD>
	          </TR>
		<%
			//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
			int bb = 0;
			for(Map pub1 : pubList){
		%>
			  <TR>
	          	<TD><%=pub1.get("blNo") %></TD>
	    <%
			if(pub1.get("tkofDt")==null||pub1.get("tkofDt")==""){
		%>
			    <td></td>
		<%
			}else{
		%>
				<td><%=pub1.get("tkofDt").toString().substring(0,4) %>-<%=pub1.get("tkofDt").toString().substring(4,6) %>-<%=pub1.get("tkofDt").toString().substring(6,8) %></td>
		<%
			}
		%>
	          	<TD><%=pub1.get("shpmPckGcnt") %>
	    <%
			if(pub1.get("shpmPckUt")==null||pub1.get("shpmPckUt")==""){
			}else{
		%>
				<%=pub1.get("shpmPckUt") %>
		<%
			}
		%>
		        </TD>
			  </TR>
		<%
				bb++;
			}
		%>
			</table>
            </div>
          </div>
        </div>
	  </div>
	</div>
  </body>
</html>