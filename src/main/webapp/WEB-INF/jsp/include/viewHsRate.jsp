<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>관세율표</title>
	<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
	<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/cps/include/viewHsRate.js'/>"></script>
  </head>
  <body>
	<div id="page-wrapper" style="margin-top:5px;">
	  <div class="row">
        <div class="col-sm-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
                          관세율표
            </div>
            <div class="panel-body well-sm">
              <div class="well well-sm text-center">
                <strong>검색</strong>
                <input type="text" id="hscode" name="hscode" class="input-sm" style="width:80px;" value="${param.hscode}"  onkeypress="keyDown()"/>
                <button type="button" class="btn btn-default btn-xs" onclick="fn_change()">조회</button>
                <button type="button" class="btn btn-default btn-xs" onclick="fn_data()">관세청 Data 조회</button>
        	  </div>
        	  <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover">
                  <col width="15%"></col>
				  <col width="35%"></col>
				  <col width="15%"></col>
				  <col width="35%"></col>
                  <tbody>
                    <tr>
                      <td class="info">국가</td>
                      <td>한국</td>
                      <td class="info">해당년도</td>
                      <td>
                        <select id="hsDtStart" name="hsDtStart" class="input-sm" style="width:60px" onchange="fn_changeYear(this.value)">
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
				  		  <option value="2017">2017</option>
                        </select>년
                      </td>
                    </tr>
                    <tr>
                      <td class="info">품목번호</td>
                      <td><input type="text" id="hsnum" name="hsnum" class="input-sm" style="width:80px;" readOnly/></td>
                      <td class="info">단위(중량/수량)</td>
                      <td id="unit"></td>
                    </tr>
                    <tr>
                      <td class="info">품명</td>
                      <td colspan="3" id="hsNmHan"></td>
                    </tr>
                    <tr>
                      <td class="info">Description</td>
                      <td colspan="3" id="hsNmEng"></td>
                    </tr>
                    <tr>
                      <td class="info">관세</td>
                      <td colspan="3" id="aa"></td>
                    </tr>
                    <tr>
                      <td class="info">FTA협정</td>
                      <td colspan="3" id="bb"></td>
                    </tr>
                    <tr>
                      <td class="success">수입통합공고</td>
                      <td colspan="3" id="hsmate1"></td>
                    </tr>
                    <tr>
                      <td class="success">수입세관장확인</td>
                      <td colspan="3" id="hsmate2"></td>
                    </tr>
                    <tr>
                      <td class="success">수출통합공고</td>
                      <td colspan="3" id="hsmate3"></td>
                    </tr>
                    <tr>
                      <td class="success">수출세관장확인</td>
                      <td colspan="3" id="hsmate4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
          	</div>
          </div>
		</div>
	  </div>
	</div>
  </body>
</html>