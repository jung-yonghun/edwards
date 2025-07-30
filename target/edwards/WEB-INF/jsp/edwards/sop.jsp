<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<style>
	table, th, td {
	  border: 1px solid black;
	  border-collapse: collapse;
	  padding : 2px;
	}
	</style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		          <div title="업무절차 공통" style="padding:10px;">
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="10%" />
					  	<col width="10%" />
					  	<col width="10%" />
					  	<col width="20%" />
					  	<col width="20%" />
					  	<col width="10%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>1</b></td>
						  <td colspan="7"><b>사업자등록정보</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td><b>회사명</b></td>
						  <td colspan="6">에드워드코리아</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td><b>대표자성명</b></td>
						  <td colspan="6">윤재홍</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td><b>사업장주소</b></td>
						  <td colspan="6">충청남도 천안시 서북구3공단1로 96 (차암동)</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td><b>사업자등록번호</b></td>
						  <td colspan="6">312-81-12960</td>
						</tr>
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>2</b></td>
						  <td colspan="7"><b>AEO정보</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td><b>인증여부</b></td>
						  <td colspan="6">Y</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>3</b></td>
						  <td bgcolor="#d7eeff"><b>통관고유부호</b></td>
						  <td colspan="6">에드워드1921011</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>4</b></td>
						  <td bgcolor="#d7eeff"><b>징수형태</b></td>
						  <td colspan="6">43(월별납부) -천안세관 /14(개별납부)- 인천공항</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>5</b></td>
						  <td bgcolor="#d7eeff"><b>담보제공</b></td>
						  <td colspan="6">담보특례자</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>6</b></td>
						  <td bgcolor="#d7eeff"><b>담보특례만료일자</b></td>
						  <td colspan="6">2999.12.31</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>7</b></td>
						  <td bgcolor="#d7eeff"><b>월별납부만료일자</b></td>
						  <td colspan="6"></td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>8</b></td>
						  <td bgcolor="#d7eeff"><b>신고코드</b></td>
						  <td colspan="6">43862 (노동하)</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>9</b></td>
						  <td bgcolor="#d7eeff"><b>업체코드</b></td>
						  <td colspan="6">000R</td>
						</tr>
						<tr>
						  <td style="text-align:center" bgcolor="#d7eeff"><b>10</b></td>
						  <td bgcolor="#d7eeff"><b>업무시작일</b></td>
						  <td colspan="6">2019.11 ~</td>
						</tr>
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>11</b></td>
						  <td colspan="7"><b>기타정보</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td bgcolor="#d7eeff"><b>M/Report</b></td>
						  <td colspan="6">월별로 제공</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td bgcolor="#d7eeff"><b>환급여부</b></td>
						  <td colspan="6">O</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td bgcolor="#d7eeff"><b>세인 담당본부</b></td>
						  <td colspan="6">중부본부</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="10%" />
					  	<col width="10%" />
					  	<col width="10%" />
					  	<col width="20%" />
					  	<col width="20%" />
					  	<col width="10%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>12</b></td>
						  <td colspan="7"><b>업무담당자 정보</b></td>
						</tr>
						<tr>
						  <td style="text-align:center" rowspan="8"><b>①</b></td>
						  <td colspan="7"><b>에드워드 통관관련담당</b></td>
						</tr>
						<tr style="text-align:center"  bgcolor="#d7eeff">
						  <td>담당자 성명</td>
						  <td>직책</td>
						  <td>전화번호</td>
						  <td>팩스번호</td>
						  <td>이메일 주소</td>
						  <td>담당업무</td>
						  <td>비고</td>
						</tr>
						<tr style="text-align:center">
						  <td>전마리</td>
						  <td>팀장</td>
						  <td>010-4144-9167</td>
						  <td></td>
						  <td>MaRi.Jeon@edwardsvacuum.com</td>
						  <td>수출입통관 총괄</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>문수미</td>
						  <td>차장</td>
						  <td>010-2316-4174</td>
						  <td></td>
						  <td>Ailly.Moon@edwardsvacuum.com</td>
						  <td>수입통관</td>
						  <td>intercompany</td>
						</tr>
						<tr style="text-align:center">
						  <td>이언정</td>
						  <td>차장</td>
						  <td>010-7711-2636</td>
						  <td></td>
						  <td>Olivia.Lee@edwardsvacuum.com</td>
						  <td>수출통관</td>
						  <td>CSK 포함</td>
						</tr>
						<tr style="text-align:center">
						  <td>오규은</td>
						  <td>대리</td>
						  <td>010-3047-4655</td>
						  <td></td>
						  <td>amy.oh@edwardsvacuum.com</td>
						  <td>수출통관</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>이송이</td>
						  <td>과장</td>
						  <td>010-6490-8284</td>
						  <td></td>
						  <td>lydia.lee@edwardsvacuum.com</td>
						  <td>수입통관</td>
						  <td>3rd party</td>
						</tr>
						<tr style="text-align:center">
						  <td>김라윤</td>
						  <td>사원</td>
						  <td>010-8762-1996</td>
						  <td></td>
						  <td>rian.kim@edwardsvacuum.com</td>
						  <td>수출입통관</td>
						  <td></td>
						</tr>
						<tr>
						  <td style="text-align:center" rowspan="3"><b>②</b></td>
						  <td colspan="7"><b>에드워드 AEO 관련 담당</b></td>
						</tr>
						<tr style="text-align:center"  bgcolor="#d7eeff">
						  <td>담당자 성명</td>
						  <td>직책</td>
						  <td>전화번호</td>
						  <td>팩스번호</td>
						  <td>이메일 주소</td>
						  <td>담당업무</td>
						  <td>비고</td>
						</tr>
						<tr style="text-align:center">
						  <td>김효준</td>
						  <td>부장</td>
						  <td>070-4353-3450</td>
						  <td></td>
						  <td>hjkim@esein.co.kr</td>
						  <td>AEO 총괄</td>
						  <td></td>
						</tr>
						<tr>
						  <td style="text-align:center" rowspan="9"><b>③</b></td>
						  <td colspan="7"><b>세인관세법인 담당자 정보</b></td>
						</tr>
						<tr style="text-align:center"  bgcolor="#d7eeff">
						  <td>담당자 성명</td>
						  <td>직책</td>
						  <td>전화번호</td>
						  <td>팩스번호</td>
						  <td>이메일 주소</td>
						  <td>담당업무</td>
						  <td>비고</td>
						</tr>
						<tr style="text-align:center">
						  <td>고영환</td>
						  <td>본부장</td>
						  <td>070-4353-0672</td>
						  <td rowspan="7">031-654-8144</td>
						  <td>yhgo@esein.co.kr</td>
						  <td>본부 관리 총괄</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>이수호</td>
						  <td>관세사</td>
						  <td>070-4353-5151</td>
						  <td>shlee@esein.co.kr</td>
						  <td>CS</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>김진태</td>
						  <td>이사</td>
						  <td>070-4353-1536</td>
						  <td>jtkim@esein.co.kr</td>
						  <td>중부팀 관리 총괄</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>김미희</td>
						  <td>부장</td>
						  <td>070-4353-1537</td>
						  <td>ek@esein.co.kr</td>
						  <td>수출통관</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>이희재</td>
						  <td>과장</td>
						  <td>070-4353-1539</td>
						  <td>ek@esein.co.kr</td>
						  <td>수입통관(intercompany)</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>전선옥</td>
						  <td>과장</td>
						  <td>070-4353-0677</td>
						  <td>ek@esein.co.kr</td>
						  <td>수입통관(3rd party)</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>임유나</td>
						  <td>대리</td>
						  <td>070-4353-0673</td>
						  <td>ek@esein.co.kr</td>
						  <td>수출통관</td>
						  <td></td>
						</tr>					  
					    <tr>
						  <td style="text-align:center" rowspan="4"><b>④</b></td>
						  <td colspan="7"><b>포워딩</b></td>
						</tr>
						<tr style="text-align:center"  bgcolor="#d7eeff">
						  <td>업체명</td>
						  <td>담당자 및 직책</td>
						  <td>전화번호</td>
						  <td>팩스번호</td>
						  <td>이메일 주소</td>
						  <td>업무범위</td>
						  <td>비고</td>
						</tr>
						<tr style="text-align:center">
						  <td>한국일본통운</td>
						  <td>김영현 프로</td>
						  <td>02-3775-0571</td>
						  <td></td>
						  <td>younghyun.kim@nipponexpress.com</td>
						  <td>선적서류 전달</td>
						  <td></td>
						</tr>
						<tr style="text-align:center">
						  <td>디에이치엘</td>
						  <td>신효빈 사원</td>
						  <td>032-744-0787</td>
						  <td></td>
						  <td>jack.shin@dhl.com</td>
						  <td>선적서류 전달</td>
						  <td></td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="20%" />
					  	<col width="20%" />
					  	<col width="20%" />
					  	<col width="20%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center" rowspan="2"><b>13</b></td>
						  <td colspan="5"><b>서비스 수수료</b></td>
						</tr>
						<tr height="23px" bgcolor="#d7eeff" style="text-align:center">
						  <td><b>항목</b></td>
						  <td><b>수입통관</b></td>
						  <td><b>수출통관</b></td>
						  <td><b>관세환급</b></td>
						  <td><b>FTA</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td><b>기본(하한가)</b></td>
						  <td style="text-align:center">15,000원</td>
						  <td style="text-align:center">10,000원</td>
						  <td style="text-align:center">-</td>
						  <td style="text-align:center"></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td><b>상한가</b></td>
						  <td style="text-align:center">300,000원</td>
						  <td style="text-align:center">250,000원</td>
						  <td style="text-align:center">-</td>
						  <td style="text-align:center"></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td><b>수수요율</b></td>
						  <td style="text-align:center">0.0008</td>
						  <td style="text-align:center">0.0008</td>
						  <td style="text-align:center">환급액 * 0.008</td>
						  <td style="text-align:center"></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td><b>약정가</b></td>
						  <td style="text-align:center"></td>
						  <td style="text-align:center"></td>
						  <td style="text-align:center"></td>
						  <td style="text-align:center">30,000원</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="80%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>14</b></td>
						  <td colspan="3"><b>정산절차</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td><b>정산방법</b></td>
						  <td>거래내역서 작성 후 발송</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td><b>정산범위</b></td>
						  <td>통관수수료, 환급수수료, CO 발급 수수료 등</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td><b>청구일</b></td>
						  <td>매달 23 ~ 25일경</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td><b>결제일</b></td>
						  <td>계산서 발행 후 60일 TERMS</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑤</b></td>
						  <td><b>대납여부</b></td>
						  <td>요건수수료 대납 </td>
						</tr>
					  </table>
		          </div>
		          <div title="업무절차 수입" style="padding:10px;">
		            <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="80%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>15</b></td>
						  <td colspan="2"><b>신고의뢰방법(신고원칙: 반입 후 24시간내 수리)</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td><b>통관의뢰</b></td>
						  <td>통관 요청 의뢰 메일 수신 ( 3RD PARTY=  REMARK란 - CO 가산금 확인 필요 / INTERCOMPANY= TMP 전용물품, 용도확인 )</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td><b>엑셀자료 작성</b></td>
						  <td>메일상 첨부된 수입통관 엑셀 자료와 , 선적 서류 검토 후 CPS 업로드 파일 작성 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td><b>엑셀자료 확인</b></td>
						  <td>-INTERCOMPANY = 통관 의뢰시 전달받은 통관 Detail 엑셀 자료 근거 CSP 업로드 파일 가공 후 ( 인보이스상 기재된 규격,수량,원산지 확인 가능 )   인보이스 번호 & 금액 확인 이상 있다면 EDW 담당자 확인 요청<br>-3RD PARTY =통관 의뢰시 전달받은 엑셀 자료와 CPS 업로드 파일 수기 작성 후( 선적서류 근거 작성 )의 일치성 확인 -> 수량 , 금액 , 원산지 확인 이상 있다면 EDW 담당자 확인 요청</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td><b>CPS C 변환</b></td>
						  <td>3번 작성 사항 변환</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑤</b></td>
						  <td><b>CPS C 공통사항 기재</b></td>
						  <td>담당자,BL번호 , 운송주선인, 협정명, 적출국, 포장갯수, 결제금액 기재 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑥</b></td>
						  <td><b>CPS C 모델 규격 확인 (서류와 일치 여부 확인)</b></td>
						  <td>-INTERCOMPANY = 인보이스상 기재된 원산지와 자재 마스터 원산지 비교 -> 상이시 통관 의뢰시 전달받은 엑셀 자료 원산지 확인 , 듀얼 원산지의 경우 EDW 확인 요청<br>-3RD PARTY = 1) 인보이스상 기재된 규격 및 원산지 , 자재 마스터와 비교 -> 상이시 EDW 확인 요청 & 단가 편차 10% 이상시 EDW 확인 요청 (단, HAMLET 업체는 단가 5% 이상 확인 )</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑦</b></td>
						  <td><b>요건대상 확인</b></td>
						  <td>요건 대상 = 요건 승인 번호 확인 요청 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑧</b></td>
						  <td><b>신규자재 확인</b></td>
						  <td>신규 자재 = 인보이스 HS CODE  와 EDW SAP HS CODE 기준 검토 , 환급 유형 확인 필요 / EDW JP 의 경우 END USER 확인 필요 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑨</b></td>
						  <td><b>CPS W 확정</b></td>
						  <td>confirm(세인)</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑩</b></td>
						  <td><b>CPS N 변환</b></td>
						  <td>천안물류 반입 후 세관 신고 </td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="80%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>16</b></td>
						  <td colspan="2"><b>취급아이템 정보</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td style="text-align:center"><b>8414.90.</b></td>
						  <td>펌프부분품</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td style="text-align:center"><b>8536.10.</b></td>
						  <td>퓨즈 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td></td>
						  <td>이 외에 펌프 관련 제품 多</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>17</b></td>
						  <td><b>업무의 범위(Work Flow)</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td>세번부호 확인 ->반복 수입되는 펌프 부품</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td>CPS 변환시 신규 제품 확인  </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td>신규 제품 세번확인 및 통관 진행 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td>FTA 협정 적용(3RD PARTY 일부 업체 CO 발행 비용 가산 필요 ) 및 사후 협정 (천안물류 반입 시점까지 CO 미구비시 사후협정 확인 후 통관 진행 ) </td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>18</b></td>
						  <td><b>업무 기준 (FTA)</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td>CPS C/O 관리 탭에 적용대상 협정명/업체명/자재코드 구분 등록 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td>CPS C 엑셀 자료 작성시 협정명 구분하여 업로드  </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td>천안물류 반입 시점까지 , CO 미수취시 기본세율로 신고 후 사후협정 적용 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td>수입신고 1년 내에 사후협정 미진행의 건에 대해 , 리마인드 및 배제사유 확인 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑤</b></td>
						  <td>FTA 협정 적용 완료 (가산금 有) 건에 대해 EDW 담당자로부터 협정신청번호 및 인보이스번호 검증 요청 -> 세인 담당자 검토 및 전산팀 수정 요청 필요 </td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center" rowspan="2"><b>19</b></td>
						  <td><b>세관장 확인대상</b></td>
						</tr>
						<tr>
						  <td>1) 법령별 비대상 사유 등록<br>2) 법령별 대상 등록 - 요건승인번호 or AEO 인증내역 수취 후 신고 필요 </td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center" rowspan="2"><b>20</b></td>
						  <td><b>신고서류 보관장소</b></td>
						</tr>
						<tr>
						  <td>CPS 선적서류 시스템 저장 (신고 전)</td>
						</tr>
					  </table>
		          </div>
		          <div title="업무절차 수출" style="padding:10px;">
		            <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="80%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>15</b></td>
						  <td colspan="2"><b>신고의뢰방법(신고원칙: target time 내 수리)</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td><b>통관의뢰</b></td>
						  <td>통관 요청 의뢰 메일 수신 (메일상 target time 확인)</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td><b>엑셀자료 작성</b></td>
						  <td>메일 첨부의 수출통관내역 파일로 CPS 업로드 파일 작성 (첫번째 시트 - 통관리스트 / 두번째 시트 - 인보이스 내역)</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td><b>CPS C 변환</b></td>
						  <td>작업한 수출통관내역 파일을 CPS-C 에 업로드 작업 및 Confirm 요청  (신규 자재코드 확인 및 중복 통관건 확인)</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td><b>서류와 일치 여부 확인</b></td>
						  <td>수출통관내역 파일과 인보이스 파일 일치 여부 확인 (원산지, 수량, 금액, 인코텀즈 등 ) / 인보이스 기준으로 작성 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑤</b></td>
						  <td><b>CPS W 확정</b></td>
						  <td>confirm(세인) 및 원상태 수량 계산 작업 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑥</b></td>
						  <td><b>CPS N</b></td>
						  <td>수출신고 작업 및 세관 접수</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑦</b></td>
						  <td><b>CPS N</b></td>
						  <td>-원상태 서류 제출 선별시 , 사전판정서 요청 ( 유효기간 만료 or 신규 )<br>-적재지검사 선별 공유 (협업검사 or 실물 적재지검사 )</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑧</b></td>
						  <td><b>수출필증송부</b></td>
						  <td>통관 요청 의뢰 메일상 기재된 , 포워더 메일주소로 필증 송부</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="15%" />
					  	<col width="80%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>16</b></td>
						  <td colspan="2"><b>취급아이템 정보</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td style="text-align:center"><b>8414.10.</b></td>
						  <td>펌프</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td style="text-align:center"><b>8414.90.</b></td>
						  <td>펌프 부분품 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td></td>
						  <td>이 외에 펌프 관련 제품 多</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>17</b></td>
						  <td><b>업무의 범위(Work Flow)</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td>CPS 변환시 신규 제품 확인 및 요청</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td>세관장확인대상 및 재수출 여부 확인  </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td>중복의뢰 및 원산지 CX 선별</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>④</b></td>
						  <td>세관 검사 및 전략물자 대상 확인 후 서류 구비</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑤</b></td>
						  <td>미선적 확인 (주 단위)</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>⑥</b></td>
						  <td>통관완료 후 수출신고필증 메일 발송</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center"><b>18</b></td>
						  <td><b>업무 기준 (FTA)</b></td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>①</b></td>
						  <td>CPS C/O 관리 탭에 적용대상 협정명/업체명/자재코드 구분 등록</td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>②</b></td>
						  <td>인보이스 내역 등록 시 FTA MASTER 기준으로 적용되도록 로직 설정 </td>
						</tr>
						<tr>
						  <td style="text-align:center"><b>③</b></td>
						  <td>한.EU FTA 협정 문구 누락 여부 확인 / 누락 시 인보이스 재요청</td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center" rowspan="2"><b>19</b></td>
						  <td><b>세관장 확인대상</b></td>
						</tr>
						<tr>
						  <td>CPS W 확정시 시도지사면제대상(수출용) 품목으로 확인 팝업 시 에드워드 요청 </td>
						</tr>
					  </table>
					  <br>
					  <table width="100%">
					  	<col width="05%" />
					  	<col width="95%" />
						<tr height="23px" bgcolor="#d7eeff">
						  <td style="text-align:center" rowspan="2"><b>20</b></td>
						  <td><b>신고서류 보관장소</b></td>
						</tr>
						<tr>
						  <td>CPS 선적서류 시스템 저장 (통관월 기준 익월 20일 전 완료)</td>
						</tr>
					  </table>
		          </div>
		          <div title="변경이력 관리" style="padding:10px;">
		            <table width="100%">
					  	<col width="05%" />
					  	<col width="20%" />
					  	<col width="45%" />
					  	<col width="30%" />
						<tr height="23px" bgcolor="#d7eeff" style="text-align:center">
						  <td><b>NO.</b></td>
						  <td><b>년 월 일</b></td>
						  <td><b>변경내용</b></td>
						  <td><b>비고</b></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>1</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>2</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>3</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>4</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>5</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>6</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>7</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>8</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>9</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr height="23px">
						  <td style="text-align:center"><b>10</b></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
					  </table>
		          </div>		          
		        </div>
		      </div>
		    </div>
		  </div>
	  	</div>
	  </div>
	</div>
  </body>
</html>