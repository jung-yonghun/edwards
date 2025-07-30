$(document).ready(function(){
	var xml2json = new XMLtoJSON();
	var objson = xml2json.fromStr("https://unipass.customs.go.kr:38010/ext/rest/trifFxrtInfoQry/retrieveTrifFxrtInfo?crkyCn=o290i146b092i023v030r020r0&qryYymmDd=20210928&imexTp=1");
	var strjson = xml2json.fromStr("https://unipass.customs.go.kr:38010/ext/rest/trifFxrtInfoQry/retrieveTrifFxrtInfo?crkyCn=o290i146b092i023v030r020r0&qryYymmDd=20210928&imexTp=1", 'string');
	console.log(objson);
	console.log(strjson);
});