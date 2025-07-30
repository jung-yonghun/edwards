<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="java.util.*"%>
<%
	String hsSgn = request.getParameter("hsSgn");
	//XML 데이터를 호출할 URL
	String url = "https://unipass.customs.go.kr:38010/ext/rest/hsSgnQry/searchHsSgn?crkyCn=w290l106p032e053j040a090q0&hsSgn="+hsSgn+"&koenTp=1";

	//서버에서리턴될 XML데이터의 엘리먼트 이름 배열
	String[] fieldList ={"hsSgn", "txtpSgn", "txrt", "wghtUt", "qtyUt", "korePrnm", "englPrnm"};

	//각 게시물하나에 해당하는 XML 노드를 담을 리스트
	ArrayList<Map> pubList = new ArrayList<Map>();

	try {
		//XML파싱 준비
		DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
		DocumentBuilder b = f.newDocumentBuilder();
		//위에서 구성한 URL을 통해 XMl 파싱 시작
		Document doc = b.parse(url);
		doc.getDocumentElement().normalize();

		String aaa = "";

		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList itemsList = doc.getElementsByTagName("hsSgnSrchRsltVo");

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
	<link rel="shortcut icon" href="/images/common/cpsicon.ico"/>
	<title>세번부호조회</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
  </head>
  <body>
	<div id="page-wrapper">
	  <div class="row">
       	<div class="col-lg-12">
          <h3 class="page-header">세번부호조회</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-striped table-bordered">
			  <tr class="info text-center" height="25">
				<td width=35>번호</td>
				<td width=120>세번부호</td>
				<td width=40>세종</td>
				<td width=35>세율</td>
				<td width=35>중량</td>
				<td width=35>수량</td>
			    <td width=210>품명(한글)</td>
			    <td width=220>품명(영문)</td>
			  </tr>
		<%
			//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
			int bb = 0;
			for(Map pub1 : pubList){
		%>
			  <TR class="text-center" height="25">
			    <td><%=pubList.size() - bb%></td>
				<td><%=pub1.get("hsSgn").toString().substring(0,4) %>.<%=pub1.get("hsSgn").toString().substring(4,6) %>-<%=pub1.get("hsSgn").toString().substring(6,10) %></td>
				<td><%=pub1.get("txtpSgn") %></td>
				<td><%=pub1.get("txrt") %></td>
				<td><%=pub1.get("wghtUt") %></td>
				<td><%=pub1.get("qtyUt") %></td>
				<td class="text-left"><%=pub1.get("korePrnm") %></td>
				<td class="text-left"><%=pub1.get("englPrnm") %></td>
			  </TR>
		<%
				bb++;
			}
		%>
			</table>
		</div>
	  </div>
	  <div class="well well-sm text-center">
        <button type="button" class="btn btn-default btn-xs" onclick="javascirpt:history.go(-1)">뒤로</button>
	  </div>
	</div>
  </body>
</html>