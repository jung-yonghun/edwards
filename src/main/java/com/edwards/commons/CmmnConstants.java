package com.edwards.commons;

import static com.jayway.jsonpath.Criteria.where;
import static com.jayway.jsonpath.Filter.filter;

import com.jayway.jsonpath.Filter;

public class CmmnConstants {
	public final static String SESSION_ID 				= "ID"; 				// UserID Key
	public final static String SESSION_USERID 			= "USERID"; 			// UserID
	public final static String SESSION_USERNAME 		= "USERNAME"; 			// User Name
	public final static String SESSION_GRADE 			= "USERGRADE"; 			// UserGradeA
	public final static String SESSION_GRADE_B 			= "USERGRADEB"; 		// UserGradeB(포워더)
	public final static String SESSION_USER_PHONE 		= "USERPHONE"; 			// User 휴대폰
	public final static String SESSION_MAIL 			= "USERMAIL"; 			// User e-Mail
	public final static String SESSION_MENU_AUTH 		= "SESSION_MENU_AUTH"; 	// SESSION_MENU_AUTH
	public final static String SESSION_TAXNO 			= "TAXNO"; 				// User_EntrepreneurNo(TaxNo)
	public final static String SESSION_SANGHO 			= "SANGHO"; 			// 셋팅상호
	public final static String SESSION_FORWADER			= "FORWADER"; 			// 포워더상호
	public final static String SESSION_MENU 			= "MENU"; 				// 메뉴 영문/한글
	public final static String SESSION_LOGO 			= "USERLOGO"; 			// User_Logo
	public final static String SESSION_DEFAULTDB 		= "DEFAULTDB"; 			// User_defaultDB
	public final static String SESSION_DEFAULT_RMS_DB 	= "rms"; 				// User_default rms DB(데모용 계정)
	public final static String SESSION_SERVER_GUBUN 	= "SERVER_GUBUN"; 		// 서버구분(STAGE/DEV/LOCAL)
	public final static String SESSION_SERVER_IP 		= "SERVERIP"; 			// 서버IP
	public final static String SESSION_CLIENT_IP 		= "CLIENTIP"; 			// 클라이언트IP
	public final static String SESSION_CLIENT_HOSTNAME 	= "CLIENTHOSTNAME"; 	// 클라이언트hostname
	public final static String SESSION_KEY 				= "SESSIONID"; 			// 세션아이디

	// Error Return Code
	public final static String ECODE_SUCCESS 		= "0"; 		// Success
	public final static String ECODE_FAILURE 		= "-1"; 	// Fail
	public final static String ECODE_TIMEOUT 		= "-2"; 	// Session Timeout
	public final static String ECODE_ACCESS_DENY 	= "-3"; 	// Access Denied
	public final static String ECODE_ERROR_STATUS 	= "-99"; 	// error status

	// return code
	public final static long ERROR_STATE_SUCCESS = 0; 	// Success
	public final static long ERROR_STATE_FAILURE = -1; 	// Fail

	// paging
	public final static long PAGE_NUMBER_INIT 			= 0; 	// page number(dao)
	public final static long PAGE_NUMBER_INIT_MAPPER 	= 1; 	// page number(mapper)
	public final static long PAGE_SIZE 					= 20; 	// page size

	// 수출관리(TBR_Expo_Management) status
	public final static long EXPORT_INVOICE_MAKE_10 		= 10; // 인보이스작성
	public final static long EXPORT_CCREQUEST_MAKE_30 		= 30; // 통관의뢰
	public final static long EXPORT_CCREQUEST_CONFIRM_31 	= 31; // 의뢰접수
	public final static long EXPORT_CCREQUEST_REJECT_32 	= 32; // 반려처리
	public final static long EXPORT_CCREQUEST_REMAKE_35 	= 35; // 재의뢰
	public final static long EXPORT_CCREQUEST_RECONFIRM_36 	= 36; // 재접수
	public final static long EXPORT_CUSTOMS_MAKE_50 		= 50; // 수출신고
	public final static long EXPORT_CUSTOMS_TEST_51 		= 51; // 검사선별
	public final static long EXPORT_CUSTOMS_CONFIRM_53 		= 53; // 신고수리
	public final static long EXPORT_CUSTOMS_LOAD_70 		= 70; // 선적처리
	public final static long EXPORT_CUSTOMS_COMPLETE_77 	= 77; // 선적완료

	// HS종합관리(X00004) status
	//요청(內)/의뢰(外) -> (접수/반려) -> (검토/보완) -> 확정
	public final static long ITEM_HS_1000_의뢰 		= 1000;  	// 의뢰(세인內)
	public final static long ITEM_HS_2000_접수 		= 2000; 	// 접수(HS담당자)
	public final static long ITEM_HS_3000_보완 		= 3000;  	// 보완(HS담당자)
	public final static long ITEM_HS_3090_보완완료 	= 3090;  	// 보완완료(세인內)
	public final static long ITEM_HS_4000_검토 		= 4000;  	// 검토(HS담당자)
	public final static long ITEM_HS_5000_유권해석 	= 5000;  	// 유권해석(HS담당자)
	public final static long ITEM_HS_5020_심사신청 	= 5020;  	// 심사신청(HS담당자)
	public final static long ITEM_HS_5030_심사접수 	= 5030;  	// 심사접수(HS담당자)
	public final static long ITEM_HS_5040_보완통보 	= 5040;  	// 보완통보(HS담당자)
	public final static long ITEM_HS_5050_보완완료 	= 5050;  	// 보완완료(HS담당자)
	public final static long ITEM_HS_5060_협의회상정 	= 5060;  	// 협의회상정(HS담당자)
	public final static long ITEM_HS_5070_위원회상정 	= 5070;  	// 위원회상정(HS담당자)
	public final static long ITEM_HS_5080_WCO 		= 5080;  	// WCO(HS담당자)
	public final static long ITEM_HS_5090_결정통보 	= 5090;  	// 결정통보(HS담당자)
	public final static long ITEM_HS_9000_확정 		= 9000;  	// 확정(HS담당자)

	// 수출입 심플의뢰(simpleRequest)
	public final static long COMMON_SIMPLE_REQUEST_의뢰_10 = 10; // 의뢰
	public final static long COMMON_SIMPLE_REQUEST_접수_20 = 20; // 접수

	// 수출입 비용관리 상태(customsCost)
	public final static long CUSTOMS_COST_REQUEST_입력_10 = 10; // 입력
	public final static long CUSTOMS_COST_PROCESS_처리_20 = 20; // 처리

	// 수입 배송관리(impoDelivery)
	// public final static long IMPORT_DELIVERY_TRANSPORT_STANDBY_10 = 10; 	// 운송대기
	public final static long IMPORT_DELIVERY_TRANSPORT_REQUEST_20 	= 20; 	// 운송의뢰
	public final static long IMPORT_DELIVERY_ALLOCATION_REQUEST_30 	= 30; 	// 배차요청
	public final static long IMPORT_DELIVERY_ALLOCATION_COMPLETE_40 = 40; 	// 배차완료
	public final static long IMPORT_DELIVERY_SHIPPING_50 			= 50; 	// 배송중
	public final static long IMPORT_DELIVERY_SHIPPING_COMPLETE_60 	= 60; 	// 배송완료

	// 수출입 배송비용관리(impoDeliveryCost)
	public final static long IMPORT_DELIVERY_COST_INIT_10 			= 10; // 운송사 입력
	public final static long IMPORT_DELIVERY_COST_TNL_CONFIRM_20 	= 20; // TNL 확인

	public static Filter get법령_법령ID_Filter(){
		return filter(
			where("법령ID").in("001504", "001372", "001792", "001570", "011357", "009353", "000239", "001457", "001850", "009761", "001556", "000591", "001729", "000623", "000223", "001973", "001605", "0001586", "001585", "000603",
				"000936", "000762",	"001434", "011154", "001978", "001514", "001569", "010499", "000583", "001467", "000593", "001638", "001871", "002025", "000165", "011620", "001607", "001706", "010107", "001563", "001571",
				"009189", "000416",	"001499", "001461", "000328", "001766", "001870", "011540", "011384", "001860", "001589", "010602", "010965", "012247", "000592", "001513", "001805", "000190", "009683", "001783", "000474",
				"012070", "000324",	"000660", "001525", "010511", "011435", "012863", "009514", "009609", "000595", "001747", "000155", "001466", "010097", "000187", "000798", "001459", "001734", "001732", "001720", "002002",
				"001584", "000422", "001566", "011992", "001477", "001476", "001649", "011178", "001642", "001507", "000036", "000752", "001771", "000154", "000150", "001218", "011528", "002015", "000317", "000162", "011857", "009758", /*법률*/
				"006128", "002058", "008083", "004750", "008542", "005308", "011471", "011468", "009654", "009581", "006174", "002109", "006264", "002221", "006285", "002246", "009810", "006392", "002421", "006419", "011762",
				"011318", "012326", "006489", "002521", "002523", "006492", "002599", "006574", "002619", "006698", "002814", "006699", "002820", "006741", "002884", "006742", "002891", "002937", "006780", "002942", "003000",
				"011421", "003126", "006910", "003143",	"003281", "007026", "011247", "011249", "006972", "003205", "006982", "003210", "003233", "010819", "010816", "003293", "013119", "003313", "003447", "007119",	"007880",
				"004498", "007124", "003461", "012875", "007133", "003470", "011863", "011860", "007165", "003506", "013163", "012693", "010194", "010126", "007229", "003608", "013025", "007289", "003666", "009208", "007307",
				"003695", "007314", "003723", "007364", "003786", "007395", "003823", "011761", "011732", "011602", "011601", "003931", "010885", "010886", "011207", "012500", "012486", "007591", "004043", "007621", "007628",
				"004093", "007634", "004097", "011440", "009890", "009892", "007669", "004138", "007673", "004144", "012304", "012297", "004240", "004262", "007770", "007778", "004270", "004273", "011880", "011484", "013110",
				"013104", "009740", "009705", "011794", "004136", "007668", "012386", "009861", "009837", "011799", "012889", "013157", "012349", "012694", "007928", "004590", "007934", "004592", "007953", "004610",	"007601",
				"004049", "010172", "010175", "007972", "004628", "008026", "004680", "008044", "004698", "004705", "012057", "004771", "008218", "004920", "008223", "004925", "008233", "004938", "012103", "011949", "012387",
				"012477", "013160", "012341", "012979", "012511", "013164", "012874", "004958", "008334", "005077", "008478", "005245", "005246", "008483", "005249", "005292", "005323", "005329", "008567", "005353", "005354",
				"008741", "005668", "008745", "005671", "007845", "004390", "009946", "009947" /*시행령*/
			)
		);
	}
}