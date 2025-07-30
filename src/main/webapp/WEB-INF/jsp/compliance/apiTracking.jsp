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
	String[] fieldNames ={"cargMtNo", "prgsStts", "shipNatNm", "mblNo", "hblNo", "agnc", "shcoFlco", "cargTp", "ldprNm", "lodCntyCd", "shipNm", "pckGcnt", "pckUt", "blPt", "dsprNm", "etprCstm", "etprDt", "msrm", "ttwg", "wghtUt", "prnm", "cntrGcnt", "cntrNo", "csclPrgsStts", "prcsDttm", "mtTrgtCargYnNm", "vydf", "spcnCargCd", "dsprCd", "shipNat"};
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
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/apiTracking.js'/>"></script>
  </head>
  <body>
<%
	if(aa == ""){
		for(Map pub : pubDoc){
%>
  	<input type="hidden" id="cargMtNo" 	name="cargMtNo" value="<%=pub.get("cargMtNo") %>">
  	<input type="hidden" id="etprDt" 	name="etprDt" 	value="<%=pub.get("etprDt") %>">
<%
		}
		for(Map pub1 : pubList){
			if(pub1.get("cargTrcnRelaBsopTpcd").toString().equals("반입신고")){
%>
	<input type="hidden" id="prcsDttm" 	name="prcsDttm" 	value="<%=pub1.get("prcsDttm") %>">
<%

			}
		}
		for(Map pub1 : pubList){
%>
	<input type="hidden" id="shedSgn" 	name="shedSgn" 	value="<%=pub1.get("shedSgn") %>">
	<input type="hidden" id="shedNm" 	name="shedNm" 	value="<%=pub1.get("shedNm") %>">
<%
			break;
		}
%>
	<input type="hidden" id="aa" name="aa" value="<%=aa%>">
<%
	}else{
%>
	<input type="hidden" id="aa" name="aa" value="<%=aa%>">
<%
	}
%>
  </body>
</html>