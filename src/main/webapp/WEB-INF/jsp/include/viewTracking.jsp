<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="java.util.*"%>
<%
	String cargMtNo = request.getParameter("cargMtNo");
	String mblNo 	= request.getParameter("mblNo");
	String hblNo 	= request.getParameter("hblNo");
	String blYy 	= request.getParameter("blYy");
	//XML 데이터를 호출할 URL
	String url = "https://unipass.customs.go.kr:38010/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?crkyCn=e290r186y052l083o010d080l1&cargMtNo="+cargMtNo+"&mblNo="+mblNo+"&hblNo="+hblNo+"&blYy="+blYy+"";

	//서버에서리턴될 XML데이터의 엘리먼트 이름 배열
	String[] fieldNames ={"cargMtNo", "prgsStts", "shipNatNm", "mblNo", "hblNo", "agnc", "shcoFlco", "cargTp", "ldprNm", "lodCntyCd", "shipNm", "pckGcnt", "pckUt", "blPt", "dsprNm", "etprCstm", "etprDt", "msrm", "ttwg", "wghtUt", "prnm", "cntrGcnt", "cntrNo", "csclPrgsStts", "prcsDttm", "mtTrgtCargYnNm", "vydf", "spcnCargCd"};
	String[] fieldList ={"cargTrcnRelaBsopTpcd", "shedSgn", "pckGcnt", "pckUt", "rlbrDttm", "dclrNo", "prcsDttm", "shedNm", "wght", "wghtUt", "rlbrCn", "rlbrBssNo", "bfhnGdncCn"};
	String[] List ={"cargMtNo", "hblNo", "mblNo", "etprDt", "dsprNm", "shcoFlco"};

	//각 게시물하나에 해당하는 XML 노드를 담을 리스트
	ArrayList<Map> pubDoc = new ArrayList<Map>();
	ArrayList<Map> pubList = new ArrayList<Map>();
	ArrayList<Map> pList = new ArrayList<Map>();

	String aa = "";

	try {
		//XML파싱 준비
		DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
		DocumentBuilder b = f.newDocumentBuilder();
		//위에서 구성한 URL을 통해 XMl 파싱 시작
		Document doc = b.parse(url);
		doc.getDocumentElement().normalize();

		Element ntceInfo = (Element) doc.getElementsByTagName("ntceInfo").item(0);
		Node ntc = ntceInfo.getChildNodes().item(0);

		if(ntc == null){
			aa = "";
		} else {
			aa = ntc.getNodeValue();
		}

		if(aa != ""){
			//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
			NodeList itemsList = doc.getElementsByTagName("cargCsclPrgsInfoQryVo");

			String aaa = "";
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
				for(String name : List){
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
				pList.add(pub1);
			}
		}else{

			//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
			NodeList items = doc.getElementsByTagName("cargCsclPrgsInfoQryVo");

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

					// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
					if(titleNode == null){
						aaa = "";
					} else {
						aaa = titleNode.getNodeValue();
					}
					pub.put(name, aaa);
				}
				//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
				pubDoc.add(pub);
			}

			//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
			NodeList itemsList = doc.getElementsByTagName("cargCsclPrgsInfoDtlQryVo");

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
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
  </head>
  <body>
	<div id="income">
	  <div class="income_cont">
       	<div  class="income_tit">
          <p>수입화물진행정보<%=aa %></p>
        </div>
	<%
	if(aa == ""){
	%>
		<div class="income_tbl">
		<table>
		  <colgroup>
			<col width="11.71%" />
			<col width="*" />
			<col width="11.11%" />
			<col width="9.51%" />
			<col width="13.11%" />
			<col width="11.11%" />
			<col width="11.11%" />
			<col width="11.11%" />
			<col width="10.11%" />
		  </colgroup>
		  <tbody>

	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		for(Map pub : pubDoc){
	%>
		  <tr>
		    <td class="left">화물관리번호</td>
		    <td><%=pub.get("cargMtNo") %></td>
		    <td class="left">B/L타입</td>
		    <td><%=pub.get("blPt") %></td>
		    <td class="left">구분</td>
		    <td colspan="2"><%=pub.get("cargTp") %></td>
		    <td class="left">특수화물코드</td>
		    <td><%=pub.get("spcnCargCd") %>	</td>
		  </tr>
		  <tr>
		    <td class="left">M B/L - H B/L</td>
		    <td colspan="3"><%=pub.get("mblNo") %> - <%=pub.get("hblNo") %></td>
		    <td class="left">관리대상지정여부</td>
		    <td colspan="4" class="yellow"><b><%=pub.get("mtTrgtCargYnNm") %></b></td>
		  </tr>
		  <tr>
		    <td class="left">상태</td>
		    <td colspan="3" class="yellow"><%=pub.get("prgsStts") %></td>
		    <td class="left">통관진행상태</td>
		    <td colspan="4" class="yellow"><%=pub.get("csclPrgsStts") %></td>
		  </tr>
		  <tr>
		    <td class="left">처리일시</td>
	<%
		if(pub.get("prcsDttm")==null||pub.get("prcsDttm")==""){
	%>
		    <td colspan="3" class="yellow"></td>
	<%
		}else{
	%>
			<td colspan="3" class="yellow"><%=pub.get("prcsDttm").toString().substring(0,4) %>-<%=pub.get("prcsDttm").toString().substring(4,6) %>-<%=pub.get("prcsDttm").toString().substring(6,8) %> <%=pub.get("prcsDttm").toString().substring(8,10) %>:<%=pub.get("prcsDttm").toString().substring(10,12) %>:<%=pub.get("prcsDttm").toString().substring(12,14) %></td>
	<%
		}
	%>
		    <td class="left">대리점</td>
		    <td colspan="4"><%=pub.get("agnc") %></td>
		  </tr>
		  <tr height="25">
		    <td class="left">선(항공) 사</td>
		    <td><%=pub.get("shcoFlco") %></td>
		    <td class="left">선(편) 명</td>
		    <td colspan="2"><%=pub.get("shipNm") %></td>
		    <td class="left">항차</td>
		    <td><%=pub.get("vydf") %></td>
		    <td class="left">선박국적</td>
		    <td><%=pub.get("shipNatNm") %></td>
		  </tr>
		  <tr>
		    <td class="left">적재항</td>
		    <td><%=pub.get("ldprNm") %>,<%=pub.get("lodCntyCd") %></td>
		    <td class="left">양륙항</td>
		    <td colspan="2"><%=pub.get("dsprNm") %></td>
		    <td class="left">입항세관</td>
		    <td><%=pub.get("etprCstm") %></td>
		    <td class="left">입항일시</td>
	<%
		if(pub.get("etprDt")==null||pub.get("etprDt")==""){
	%>
		    <td></td>
	<%
		}else{
	%>
			<td><%=pub.get("etprDt").toString().substring(0,4) %>-<%=pub.get("etprDt").toString().substring(4,6) %>-<%=pub.get("etprDt").toString().substring(6,8) %></td>
	<%
		}	%>
		  </tr>
		  <tr>
		    <td class="left">포장갯수</td>
		    <td class="yellow"><%=pub.get("pckGcnt") %><%=pub.get("pckUt") %></td>
		    <td class="left">용적</td>
		    <td colspan="6"><%=pub.get("msrm") %></td>
		  </tr>
		  <tr>
		    <td class="left">총중량</td>
		    <td class="yellow"><%=pub.get("ttwg") %><%=pub.get("wghtUt") %></td>
		    <td class="left">CNTR 갯수</td>
		    <td colspan="2"><%=pub.get("cntrGcnt") %></td>
		    <td class="left">번호</td>
		    <td colspan="3"><%=pub.get("cntrNo") %></td>
		  </tr>
		  <tr>
		    <td class="left">품명</td>
		    <td colspan="8"><%=pub.get("prnm") %></td>
		  </tr>
		  <tr>
		    <td class="left">신고지연가산세</td>
		    <td colspan="3"></td>
		    <td class="left">반출의무과태료</td>
		    <td colspan="4"></td>
		  </tr>
	<%
		}
	%>
		</table>
	  </div>
	  <div class="income_tbl02">
		<table>
			<colgroup>
				<col width="5%" />
				<col width="19%" />
				<col width="19%" />
				<col width="19%" />
				<col width="19%" />
				<col width="19%" />
			</colgroup>
			<tbody>
		  <TR>
          	<TD class="blue verticalT" rowspan=2>번호</TD>
          	<TD class="blue">처리단계</TD>
          	<TD class="blue">장치장/장치위치</TD>
          	<TD class="blue">포장갯수</TD>
          	<TD class="blue">반출입(처리)일시</TD>
          	<TD class="blue">신고번호</TD>
          </TR>
          <TR>
          	<TD class="blue">처리일시</TD>
          	<TD class="blue">장치장명</TD>
          	<TD class="blue">중&nbsp;&nbsp;량</TD>
          	<TD class="blue">반출입(처리)내용</TD>
          	<TD class="blue">반출입근거번호</TD>
          </TR>
	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		int bb = 0;
		for(Map pub1 : pubList){
	%>
		  <TR>
          	<TD class="verticalT" rowspan="3"><%=pubList.size() - bb%></TD>
          	<TD><%=pub1.get("cargTrcnRelaBsopTpcd") %></TD>
          	<TD><%=pub1.get("shedSgn") %></TD>
          	<TD><%=pub1.get("pckGcnt") %><%=pub1.get("pckUt") %></TD>
          	<TD><%=pub1.get("rlbrDttm") %></TD>
			<TD><%=pub1.get("dclrNo") %></TD>
		  </TR>
		  <TR>
	<%
		if(pub1.get("prcsDttm")==null||pub1.get("prcsDttm")==""){
	%>
		    <td></td>
	<%
		}else{
	%>
			<TD><%=pub1.get("prcsDttm").toString().substring(0,4) %>-<%=pub1.get("prcsDttm").toString().substring(4,6) %>-<%=pub1.get("prcsDttm").toString().substring(6,8) %> <%=pub1.get("prcsDttm").toString().substring(8,10) %>:<%=pub1.get("prcsDttm").toString().substring(10,12) %>:<%=pub1.get("prcsDttm").toString().substring(12,14) %></TD>
	<%
		}
	%>
			<TD><%=pub1.get("shedNm") %></TD>
		    <TD><%=pub1.get("wght") %><%=pub1.get("wghtUt") %></TD>
		    <TD><%=pub1.get("rlbrCn") %></TD>
		    <TD><%=pub1.get("rlbrBssNo") %></TD>
		  </TR>
		  <TR>
		    <TD colspan="5"><%=pub1.get("bfhnGdncCn") %></TD>
		  </TR>
	<%
			bb++;
		}
	%>
		</tbody>
		</table>
		</div>
	<%
	}else{
	%>
	<div class="income_tbl02">
		<table>
		  <colgroup>
			<col width="5%" />
			<col width="19%" />
			<col width="28%" />
			<col width="10%" />
			<col width="19%" />
			<col width="19%" />
		  </colgroup>
		  <tbody>
		  <TR>
          	<TD class="blue">번호</TD>
          	<TD class="blue">화물관리번호</TD>
          	<TD class="blue">B/L번호</TD>
          	<TD class="blue">입항일자</TD>
          	<TD class="blue">양륙항</TD>
          	<TD class="blue">운송사명</TD>
          </TR>
	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		int bb = 0;
		for(Map pub1 : pList){
	%>
		  <TR>
          	<TD align="center"><%=pList.size() - bb%></TD>
          	<TD><a href="./viewTracking.cps?cargMtNo=<%=pub1.get("cargMtNo") %>&mblNo=&hblNo=&blYy="><%=pub1.get("cargMtNo") %></a></TD>
    <%
		if(pub1.get("hblNo")==null||pub1.get("hblNo")==""){
	%>
		    <td><%=pub1.get("mblNo") %></td>
	<%
		}else{
	%>
			<TD><%=pub1.get("mblNo") %> - <%=pub1.get("hblNo") %></TD>
	<%
		}
	%>
          	<TD align="center"><%=pub1.get("etprDt").toString().substring(0,4) %>-<%=pub1.get("etprDt").toString().substring(4,6) %>-<%=pub1.get("etprDt").toString().substring(6,8) %></TD>
          	<TD><%=pub1.get("dsprNm") %></TD>
			<TD><%=pub1.get("shcoFlco") %></TD>
		  </TR>
	<%
			bb++;
		}
	%>
		</tbody>
		</table>
		</div>
	<%
	}
	%>
	</div>
	</div>
  </body>
</html>