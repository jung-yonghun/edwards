package com.edwards.web.compliance;

import static com.edwards.commons.CmmnUtils.getUserInfo;

import com.edwards.biz.complianceManagement.ComplianceManagementService;
import com.edwards.biz.complianceManagement.ComplianceMapper;
import com.edwards.biz.complianceManagement.CpsComplianceApplyDao;
import com.edwards.biz.complianceManagement.CpsComplianceItemDao;
import com.edwards.biz.complianceManagement.CpsComplianceMasterDao;
import com.edwards.biz.complianceManagement.CpsYogunItemLogDao;
import com.edwards.biz.complianceManagement.CpsYogunItemMasterDao;
import com.edwards.biz.itemMng.ItemService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnMailService;
import com.edwards.commons.CmmnUtils;
import com.edwards.commons.CommExcel;
import com.edwards.domains.CpsComplianceApplyVO;
import com.edwards.domains.CpsComplianceItemVO;
import com.edwards.domains.CpsComplianceMasterVO;
import com.edwards.domains.CpsLogAccessVO;
import com.edwards.domains.CpsUserInfoVO;
import com.edwards.domains.CpsYogunItemLogVO;
import com.edwards.domains.CpsYogunItemMasterVO;
import com.edwards.domains.DeliveryRequestVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.View;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;

import javax.servlet.http.HttpServletRequest;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = {"/apis/compliance"}, method = {RequestMethod.POST})
public class ComplianceController extends CmmnController {
	@Autowired
	private ComplianceManagementService complianceManagementService;
	@Autowired
	private ItemService itemService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private CpsComplianceMasterDao cpsComplianceMasterDao;
	@Autowired
	private CpsComplianceItemDao cpsComplianceItemDao;
	@Autowired
	private CpsComplianceApplyDao cpsComplianceApplyDao;
	@Autowired
	private CpsYogunItemMasterDao cpsYogunItemMasterDao;
	@Autowired
	private CpsYogunItemLogDao cpsYogunItemLogDao;
	@Autowired
	private MessageSource messageSource;

	@RequestMapping(value = "/selectModelList")
	public ResponseEntity<?> selectModelList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectModelList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertModel")
    public ResponseEntity<?> insertModel(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.insertModel(args);

	  		List<Map> returnVoList = complianceManagementService.selectModelList(args);
	  		return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/updateModel")
    public ResponseEntity<?> updateModel(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		long result1 = complianceManagementService.updateSikpumDetail(args);
	  		long result = complianceManagementService.updateModel(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/insertSikpumMaster")
    public ResponseEntity<?> insertSikpumMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.insertSikpumMaster(args);

	  		List<Map> returnVoList = complianceManagementService.selectSikpumTop1Master(args);
	  		return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/copySikpumMaster")
    public ResponseEntity<?> copySikpumMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String yogKey 			= String.valueOf(args.get("yogKey"));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.copySikpumMaster(args);

	  		args.put("yogKey", "");
	  		List<Map> returnVoList = complianceManagementService.selectSikpumTop1Master(args);
	  		Map map = new HashMap();
	  		map.put("yogKey",yogKey);
			map.put("_yogKey",returnVoList.get(0).get("yogKey"));
			map.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			map.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			map.put("addDtm", currentDatetime);
			map.put("useYn", "Y");
			long result1 = complianceManagementService.copySikpumDetail(map);

	  		return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/updateSikpumMaster")
    public ResponseEntity<?> updateSikpumMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.updateSikpumMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/gwanSikpumMaster")
    public ResponseEntity<?> gwanSikpumMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		long result = complianceManagementService.gwanSikpumMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/saveDetailMaster")
    public ResponseEntity<?> saveDetailMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		long result = complianceManagementService.saveDetailMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectSikpumMaster")
	public ResponseEntity<?> selectSikpumMaster(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectSikpumMaster(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertSikpumDetail")
    public ResponseEntity<?> insertSikpumDetail(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.insertSikpumDetail(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectSikpumDetailList")
	public ResponseEntity<?> selectSikpumDetailList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectSikpumDetailList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSikpumDetailTop1List")
	public ResponseEntity<?> selectSikpumDetailTop1List(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectSikpumDetailTop1List(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteSikpumDetail")
    public ResponseEntity<?> deleteSikpumDetail(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		args.put("useYn", "N");
	  		long result = complianceManagementService.deleteSikpumDetail(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectSikpumList")
	public ResponseEntity<?> selectSikpumList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectSikpumList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteSikpumMaster")
    public ResponseEntity<?> deleteSikpumMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		args.put("useYn", "N");
	  		long result = complianceManagementService.deleteSikpumMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/itemDonggi")
	public ResponseEntity<?> itemDonggi(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectSikpumList(args);
			for (int i = 0, n = returnVoList.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("yogSaup",returnVoList.get(i).get("yogSaup"));
				map.put("hblNo",returnVoList.get(i).get("hblNo"));
				map.put("engName",returnVoList.get(i).get("engName"));
				map.put("itemKey",returnVoList.get(i).get("itemKey"));
				List<Map> jisa = complianceManagementService.selectJisaList(map);
				if(jisa.size() > 0){
					map.put("_defaultDB",jisa.get(0).get("jisa"));
					List<Map> mcount = complianceManagementService.selectMcountList(map);
					if(mcount.size() > 0){
						map.put("mcountNo",mcount.get(0).get("Mcount_no"));
						map.put("jajaeCode",mcount.get(0).get("Mmodel_code"));
						long result = complianceManagementService.updateModelJajae(map);
					}
				}
			}

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMasterList")
	public ResponseEntity<?> selectMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectMasterList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCompResultList")
	public ResponseEntity<?> selectCompResultList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectCompResultList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectResultMasterList")
	public ResponseEntity<?> selectResultMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectResultMasterList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectResultStatusList")
	public ResponseEntity<?> selectResultStatusList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectResultStatusList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectResultDetailList")
	public ResponseEntity<?> selectResultDetailList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> jisa = complianceManagementService.selectJisaList(args);
			if(jisa.size() > 0){
				args.put("_defaultDB",jisa.get(0).get("jisa"));
				List<Map> count = complianceManagementService.selectResultDetailList(args);
				if(count.size() > 0){
					return new ResponseEntity<>(count, HttpStatus.OK);
				}else{
					String IssueNo 	= args.containsKey("IssueNo") ? String.valueOf(args.get("IssueNo")) : "";
					String 수입 = CmmnUtils.selectYogunAPI(IssueNo, "I");
					Map resultMap = new HashMap();
					resultMap.put("수입", 수입);
					return new ResponseEntity<>(resultMap, HttpStatus.OK);
				}
			}else{
				String IssueNo 	= args.containsKey("IssueNo") ? String.valueOf(args.get("IssueNo")) : "";
				String 수입 = CmmnUtils.selectYogunAPI(IssueNo, "I");
				Map resultMap = new HashMap();
				resultMap.put("수입", 수입);
				return new ResponseEntity<>(resultMap, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectResultDetailList1")
	public ResponseEntity<?> selectResultDetailList1(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String IssueNo 	= args.containsKey("IssueNo") ? String.valueOf(args.get("IssueNo")) : "";
			String 수입 = CmmnUtils.selectYogunAPI(IssueNo, "I");
			Map resultMap = new HashMap();
			resultMap.put("수입", 수입);
			return new ResponseEntity<>(resultMap, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectResultDetailList2")
	public ResponseEntity<?> selectResultDetailList2(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> count = complianceManagementService.selectResultDetailList2(args);
			return new ResponseEntity<>(count, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/resultIns")
	public ResponseEntity<?> resultIns(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userKey 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String SendNo 			= args.containsKey("SendNo") ? String.valueOf(args.get("SendNo")) : "";
			String ProcessDtm 		= args.containsKey("ProcessDtm") ? String.valueOf(args.get("ProcessDtm")) : "";
			String IssueNo 			= args.containsKey("IssueNo") ? String.valueOf(args.get("IssueNo")) : "";
			String tCnt				= "";
			String balgupDt			= "";

			List<Map> Company = complianceManagementService.selectComList(args);

			if(Company.size() > 0){
				args.put("ComSaup",Company.get(0).get("ComSaupNo"));
				args.put("RealSangho",Company.get(0).get("ComHnm"));
			}else{
				List<Map> Company1 = complianceManagementService.selectComList1(args);
				if(Company1.size() > 0){
					args.put("ComSaup",Company1.get(0).get("Saup"));
					args.put("RealSangho",Company1.get(0).get("RealSangho"));
				}
			}

			List<Map> Code = complianceManagementService.selectCodeList(args);

			if(Code.size() > 0){
				if(Code.get(0).get("Cd").equals("JM")){
					args.put("Rqpart","C");
				}
				if(Code.get(0).get("Cd").equals("KM") || Code.get(0).get("Cd").equals("OM") || Code.get(0).get("Cd").equals("PM") || Code.get(0).get("Cd").equals("QM")){
					args.put("Rqpart","D");
				}
				args.put("RqGbn",Code.get(0).get("Cd"));
			}else{
				args.put("RqGbn","");
			}

			args.put("AddUserKey",userKey);
			args.put("AddUserNm",userNm);
			args.put("AddDtm",currentDatetime);
			args.put("EditUserKey",userKey);
			args.put("EditUserNm",userNm);
			args.put("EditDtm",currentDatetime);

			Map map1 = new HashMap();
			map1.put("SendNo",SendNo);
			map1.put("IssueNo",IssueNo);

			List<Map> bb = complianceManagementService.selectResultMasterList(map1);
			if(bb.size() > 0){
			}else{
				if(IssueNo.equals("")){
				}else{
					String 수입 = CmmnUtils.selectYogunAPI(IssueNo, "I");
					JSONParser jsonParse = new JSONParser();
					JSONObject jsonObj = (JSONObject) jsonParse.parse(수입);
					JSONObject jsonObj1 = (JSONObject) jsonObj.get("xtrnUserReqApreBrkdQryRtnVo");
					JSONObject common = (JSONObject) jsonObj1.get("xtrnUserImpReqApreBrkdQryRsltVo");
					tCnt = (String) jsonObj1.get("tCnt").toString();
					balgupDt = (String) common.get("issDt").toString();
					if(tCnt.equals("1")){
						JSONObject yogObject = (JSONObject) jsonObj1.get("xtrnUserImpReqApreDtlBrkdQryRsltVo");
						Map map3 = new HashMap();
						map3.put("Etc01",common.get("apreCond"));
						map3.put("IssueDtm",common.get("issDt"));
						map3.put("Etc02",common.get("lprt"));
						map3.put("DocuGbn",common.get("relaFrmlNm"));
						map3.put("Etc04",common.get("dlcn"));
						map3.put("ProcessDtm",common.get("valtPrid"));
						map3.put("IssueNo",common.get("reqApreNo"));
						map3.put("Etc03",common.get("relaLwor"));
						map3.put("HsCode",yogObject.get("hsSgn"));
						map3.put("IdentiCode",yogObject.get("prlstIdfySgn"));
						map3.put("ItemCode",yogObject.get("prlstCd"));
						map3.put("BlNo",yogObject.get("blNo"));
						map3.put("Su",yogObject.get("apreQty"));
						map3.put("Etc06",yogObject.get("usgNm"));
						map3.put("SuDanwi",yogObject.get("qtyUt"));
						map3.put("Etc07",yogObject.get("rsqtyQty"));
						map3.put("Etc10",yogObject.get("wghtUt"));
						map3.put("ItemNm",yogObject.get("prnmStsz"));
						map3.put("Etc08",yogObject.get("csclQty"));
						map3.put("Etc09",yogObject.get("csclWght"));
						map3.put("Etc05",yogObject.get("rsqtyWght"));
						map3.put("RqGbn","AD");
						map3.put("RgFlag","A");
						map3.put("Rqpart","A");
						map3.put("UseYn","Y");
						map3.put("AddUserKey",userKey);
						map3.put("AddUserNm",userNm);
						map3.put("AddDtm",currentDatetime);
						map3.put("EditUserKey",userKey);
						map3.put("EditUserNm",userNm);
						map3.put("EditDtm",currentDatetime);

						long result = complianceManagementService.insertResultDtl(map3);
					}else{
						JSONArray yogArray = (JSONArray) jsonObj1.get("xtrnUserImpReqApreDtlBrkdQryRsltVo");
						for(int i=0; i < yogArray.size(); i++) {
							JSONObject yogObject = (JSONObject) yogArray.get(i);
							Map map3 = new HashMap();
							map3.put("Etc01",common.get("apreCond"));
							map3.put("IssueDtm",common.get("issDt"));
							map3.put("Etc02",common.get("lprt"));
							map3.put("DocuGbn",common.get("relaFrmlNm"));
							map3.put("Etc04",common.get("dlcn"));
							map3.put("ProcessDtm",common.get("valtPrid"));
							map3.put("IssueNo",common.get("reqApreNo"));
							map3.put("Etc03",common.get("relaLwor"));
							map3.put("HsCode",yogObject.get("hsSgn"));
							map3.put("IdentiCode",yogObject.get("prlstIdfySgn"));
							map3.put("ItemCode",yogObject.get("prlstCd"));
							map3.put("BlNo",yogObject.get("blNo"));
							map3.put("Su",yogObject.get("apreQty"));
							map3.put("Etc06",yogObject.get("usgNm"));
							map3.put("SuDanwi",yogObject.get("qtyUt"));
							map3.put("Etc07",yogObject.get("rsqtyQty"));
							map3.put("Etc10",yogObject.get("wghtUt"));
							map3.put("ItemNm",yogObject.get("prnmStsz"));
							map3.put("Etc08",yogObject.get("csclQty"));
							map3.put("Etc09",yogObject.get("csclWght"));
							map3.put("Etc05",yogObject.get("rsqtyWght"));
							map3.put("RqGbn","AD");
							map3.put("RgFlag","A");
							map3.put("Rqpart","A");
							map3.put("UseYn","Y");
							map3.put("AddUserKey",userKey);
							map3.put("AddUserNm",userNm);
							map3.put("AddDtm",currentDatetime);
							map3.put("EditUserKey",userKey);
							map3.put("EditUserNm",userNm);
							map3.put("EditDtm",currentDatetime);

							long result = complianceManagementService.insertResultDtl(map3);
						}
					}
				}
			}
			Map map = new HashMap();
			map.put("SendNo",SendNo);

			List<Map> aa = complianceManagementService.selectResultMasterList(map);

			if(aa.size() > 0){
				Map map2 = new HashMap();
				map2.put("SendNo",SendNo);
				map2.put("ProcessDtm",ProcessDtm);
				List<Map> cc = complianceManagementService.selectResultMasterList(map2);
				if(cc.size() > 0){
					long result = 0;
					return new ResponseEntity<>(result, HttpStatus.CREATED);
				}else{
					args.put("Su",tCnt);
					args.put("Etc01",balgupDt);
					long result = complianceManagementService.updateResult(args);
					return new ResponseEntity<>(result, HttpStatus.CREATED);
				}
			}else{
				args.put("Su",tCnt);
				args.put("Etc01",balgupDt);
				long result = complianceManagementService.insertResult(args);
				return new ResponseEntity<>(result, HttpStatus.CREATED);
			}
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}














	@RequestMapping(value = "/selectComplianceMasterList")
	public ResponseEntity<?> selectComplianceMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectComplianceMasterList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectComplianceList")
	public ResponseEntity<?> selectComplianceList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectComplianceList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertYogMaster")
    public ResponseEntity<?> insertYogMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String yogCom 			= String.valueOf(args.get("yogCom"));
	  		String yogSaup 			= String.valueOf(args.get("yogSaup"));
	  		String mmodelCode 		= String.valueOf(args.get("mmodelCode"));
			String jajaeCode 		= String.valueOf(args.get("jajaeCode"));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			CpsYogunItemMasterVO searchJajae = complianceManagementService.getJajaeInfo(yogSaup, jajaeCode);
			if(CmmnUtils.isNull(searchJajae)){
				CpsYogunItemMasterVO yogunItemMasterVO = new CpsYogunItemMasterVO();
				yogunItemMasterVO.setYogCom(yogCom);
				yogunItemMasterVO.setYogSaup(yogSaup);
				yogunItemMasterVO.setMmodelCode(mmodelCode);
				yogunItemMasterVO.setJajaeCode(jajaeCode);
				yogunItemMasterVO.setUseYn("Y");
				yogunItemMasterVO.setAddUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
				yogunItemMasterVO.setAddUserNm(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
				yogunItemMasterVO.setAddDtm(currentDatetime);
				cpsYogunItemMasterDao.save(yogunItemMasterVO);
			}

	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.insertYogMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/updateYogMaster")
    public ResponseEntity<?> updateYogMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String yogCom 			= String.valueOf(args.get("yogCom"));
	  		String yogSaup 			= String.valueOf(args.get("yogSaup"));
	  		String bmmodelCode 		= String.valueOf(args.get("bmmodelCode"));
	  		String bjajaeCode 		= String.valueOf(args.get("bjajaeCode"));
	  		String mmodelCode 		= String.valueOf(args.get("mmodelCode"));
			String jajaeCode 		= String.valueOf(args.get("jajaeCode"));
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		CpsYogunItemMasterVO searchJajae = complianceManagementService.getJajaeInfo(yogSaup, jajaeCode);
			if(CmmnUtils.isNull(searchJajae)){
				if(!bmmodelCode.equals(mmodelCode) || !bjajaeCode.equals(jajaeCode)){
					List<CpsYogunItemMasterVO> voList;
					Map map = new HashMap();
					map.put("yogSaup", yogSaup);
					map.put("jajaeCode", bjajaeCode);
					voList = complianceManagementService.selectYogItemMasterList(map);
					CpsYogunItemMasterVO CpsYogunItemMasterVO = voList.get(0);
					CpsYogunItemMasterVO.setMmodelCode(mmodelCode);
					CpsYogunItemMasterVO.setJajaeCode(jajaeCode);
					CpsYogunItemMasterVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
					CpsYogunItemMasterVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					CpsYogunItemMasterVO.setEditDtm(currentDatetime);
					cpsYogunItemMasterDao.save(CpsYogunItemMasterVO);

					CpsYogunItemLogVO yogunItemLogVO = new CpsYogunItemLogVO();
					yogunItemLogVO.setYogSaup(yogSaup);
					yogunItemLogVO.setBmmodelCode(bmmodelCode);
					yogunItemLogVO.setAmmodelCode(mmodelCode);
					yogunItemLogVO.setBjajaeCode(bjajaeCode);
					yogunItemLogVO.setAjajaeCode(jajaeCode);
					yogunItemLogVO.setAddUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
					yogunItemLogVO.setAddUserNm(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					yogunItemLogVO.setAddDtm(currentDatetime);
					cpsYogunItemLogDao.save(yogunItemLogVO);
				}else{
					CpsYogunItemMasterVO yogunItemMasterVO = new CpsYogunItemMasterVO();
					yogunItemMasterVO.setYogCom(yogCom);
					yogunItemMasterVO.setYogSaup(yogSaup);
					yogunItemMasterVO.setMmodelCode(mmodelCode);
					yogunItemMasterVO.setJajaeCode(jajaeCode);
					yogunItemMasterVO.setUseYn("Y");
					yogunItemMasterVO.setAddUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
					yogunItemMasterVO.setAddUserNm(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					yogunItemMasterVO.setAddDtm(currentDatetime);
					cpsYogunItemMasterDao.save(yogunItemMasterVO);
				}
			}


	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		args.put("useYn", "Y");
	  		long result = complianceManagementService.updateYogMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/deleteYogMaster")
    public ResponseEntity<?> deleteYogMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("editDtm", currentDatetime);
	  		args.put("useYn", "N");
	  		long result = complianceManagementService.deleteYogMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/insertSikMaster")
    public ResponseEntity<?> insertSikMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		long result = complianceManagementService.insertSikMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }















	@RequestMapping(value = "/saveComplianceMasterList")
	public ResponseEntity<?> saveComplianceMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "ComplianceMasterList");
			List<CpsComplianceMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsComplianceMasterVO.class);

			List<CpsComplianceMasterVO> returnVoList = complianceManagementService.saveComplianceMasterList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	@RequestMapping(value = "/selectComplianceMasterList")
//	public ResponseEntity<?> selectComplianceMasterList(HttpServletRequest request, @RequestBody Map args){
//	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//		try{
//			List<CpsComplianceMasterVO> returnVoList = complianceManagementService.selectComplianceMasterList(args);
//
//			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
//		}catch(Exception e){
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//	}

	@RequestMapping(value = "/selectCompMasterList")
	public ResponseEntity<?> selectCompMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectCompMasterList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

//	@RequestMapping(value = "/deleteComplianceMasterList")
//	public ResponseEntity<?> deleteComplianceMasterList(HttpServletRequest request, @RequestBody Map args) throws Exception{
//		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//		try{
//			BigDecimal compKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("compKey")));
//			String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
//			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//
//			List<CpsComplianceMasterVO> voList;
//			Map map = new HashMap();
//			map.put("compKey", compKey);
//			voList = complianceManagementService.selectComplianceMasterList(map);
//
//			CpsComplianceMasterVO CpsComplianceMasterVO = voList.get(0);
//
//			CpsComplianceMasterVO.setUseYn(useYn);
//			CpsComplianceMasterVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
//			CpsComplianceMasterVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
//			CpsComplianceMasterVO.setEditDtm(currentDatetime);
//
//			CpsComplianceMasterVO returnVO = complianceManagementService.updateComplianceMasterList(CpsComplianceMasterVO, request);
//
//			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
//		}catch(Exception e){
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//	}

	@RequestMapping(value = "/saveComplianceItemList")
	public ResponseEntity<?> saveComplianceItemList(HttpServletRequest request, @RequestBody Map map){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			CpsComplianceItemVO cpsComplianceItemVO = modelMapper.map(targetMap, CpsComplianceItemVO.class);
			cpsComplianceItemVO.setAddUserId(userId);
			cpsComplianceItemVO.setAddUserNm(userNm);
			cpsComplianceItemVO.setAddDtm(currentDatetime);
			cpsComplianceItemVO.setEditUserId(userId);
			cpsComplianceItemVO.setEditUserNm(userNm);
			cpsComplianceItemVO.setEditDtm(currentDatetime);

			CpsComplianceItemVO returnVO = complianceManagementService.saveComplianceItemList(cpsComplianceItemVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteComplianceItemList")
	public ResponseEntity<?> deleteComplianceItemList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal compItemKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("compItemKey")));
			String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<CpsComplianceItemVO> voList;
			Map map = new HashMap();
			map.put("compItemKey", compItemKey);
			voList = complianceManagementService.selectComplianceItemList(map);

			CpsComplianceItemVO CpsComplianceItemVO = voList.get(0);

			CpsComplianceItemVO.setUseYn(useYn);
			CpsComplianceItemVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			CpsComplianceItemVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			CpsComplianceItemVO.setEditDtm(currentDatetime);

			CpsComplianceItemVO returnVO = complianceManagementService.saveComplianceItemList(CpsComplianceItemVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectComplianceItemList")
	public ResponseEntity<?> selectComplianceItemList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<CpsComplianceItemVO> returnVoList = complianceManagementService.selectComplianceItemList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCompItemList")
	public ResponseEntity<?> selectCompItemList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectCompItemList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectComplianceUnitPriceList")
	public ResponseEntity<?> selectComplianceUnitPriceList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectComplianceUnitPriceList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveComplianceApplyList")
	public ResponseEntity<?> saveComplianceApplyList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "ComplianceApplyList");
			List<CpsComplianceApplyVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsComplianceApplyVO.class);

			List<CpsComplianceApplyVO> returnVoList = complianceManagementService.saveComplianceApplyList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectComplianceApplyList")
	public ResponseEntity<?> selectComplianceApplyList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<CpsComplianceApplyVO> returnVoList = complianceManagementService.selectComplianceApplyList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCompApplyList")
	public ResponseEntity<?> selectCompApplyList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectCompApplyList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteComplianceApplyList")
	public ResponseEntity<?> deleteComplianceApplyList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal applyKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("applyKey")));
			String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<CpsComplianceApplyVO> voList;
			Map map = new HashMap();
			map.put("applyKey", applyKey);
			voList = complianceManagementService.selectComplianceApplyList(map);

			CpsComplianceApplyVO CpsComplianceApplyVO = voList.get(0);

			CpsComplianceApplyVO.setUseYn(useYn);
			CpsComplianceApplyVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			CpsComplianceApplyVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			CpsComplianceApplyVO.setEditDtm(currentDatetime);

			CpsComplianceApplyVO returnVO = complianceManagementService.updateComplianceApplyList(CpsComplianceApplyVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectYogNcomList")
	public ResponseEntity<?> selectYogNcomList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> returnVoList = complianceManagementService.selectYogNcomList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRequirementMasterList")
	public ResponseEntity<?> selectRequirementMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String strCmmfArray[] = String.valueOf(args.get("mmodelCode")).split(",");
		    if (args.containsKey("mmodelCode") && strCmmfArray.length > 1) {
		      ArrayList<String> strCmmfArrayList = new ArrayList(Arrays.asList(strCmmfArray));
		      String strCmmfList = CmmnUtils.convertArrayToStringIn(strCmmfArrayList);
		      args.put("strCmmfList", strCmmfList);
		      args.put("mmodelCode", "");
		    }

			List<Map> returnVoList = complianceManagementService.selectRequirementMasterList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRequirementStatusList")
	public ResponseEntity<?> selectRequirementStatusList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String strCmmfArray[] = String.valueOf(args.get("mmodelCode")).split(",");
		    if (args.containsKey("mmodelCode") && strCmmfArray.length > 1) {
		      ArrayList<String> strCmmfArrayList = new ArrayList(Arrays.asList(strCmmfArray));
		      String strCmmfList = CmmnUtils.convertArrayToStringIn(strCmmfArrayList);
		      args.put("strCmmfList", strCmmfList);
		      args.put("mmodelCode", "");
		    }

			List<Map> returnVoList = complianceManagementService.selectRequirementStatusList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/excelImportRequirementMasterList")
	public ResponseEntity<?> excelImportRequirementMasterList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List returnList = new ArrayList();
		    long returnVal = 0L;
		    List<Map> requirementMasterList = (List<Map>) args.get("requirementMasterList");
		    String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		    for (Map map : requirementMasterList) {
		    	if (map.containsKey("mmodelCode") && !CmmnUtils.isNull(map.get("mmodelCode"))) {
			        Map mcountNoMap = new HashMap();
			        mcountNoMap.put("eqMmodelCode", map.get("mmodelCode")); // equal자재코드_비교용
			        // 기존에 입력된 CMMF(자재관리번호:mcountNo)인지?
			        List<Map> reqMaster = complianceManagementService.selectRequirementMasterList(mcountNoMap);
			        if (reqMaster.size() > 1) {
			        	Object[] parameter = {CmmnConstants.ECODE_FAILURE, "요건마스터가 2건 이상입니다.", ""};
			      	  	throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			        }

			        if (reqMaster.size() > 0) {
			        	map.put("EditUserKey", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			        	map.put("EditUserNm", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			        	map.put("EditDtm", currentDatetime);
			        	map.put("CUAA110Key", reqMaster.get(0).get("CUAA110Key"));
			        	returnVal = complianceManagementService.updateRequirementMaster(map);
			        }else{
			        	map.put("AddUserKey", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			        	map.put("AddUserNm", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			        	map.put("AddDtm", currentDatetime);
			        	returnVal = complianceManagementService.insertRequirementMaster(map);
			        }

			        if (returnVal > 0) {
			        	returnList.add(map);
			        }
		    	}
		    }

			return new ResponseEntity<>(returnList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/syncRequirementList")
	public ResponseEntity<?> syncRequirementList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List returnList = new ArrayList();
		    long returnVal = 0L;
		    String chk = String.valueOf(args.get("check"));
		    boolean isNullMcountNo = args.containsKey("isNullMcountNo") ? true : false;
		    String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		    List<Map> requirementList = new ArrayList<Map>();
		    if(chk.equalsIgnoreCase("master")){
		    	requirementList = complianceManagementService.selectRequirementMasterList(args);
		    }else if(chk.equalsIgnoreCase("status")){
		    	requirementList = complianceManagementService.selectRequirementStatusList(args);
		    }else{
		    	Object[] parameter = {CmmnConstants.ECODE_FAILURE, "동기화할 수 없습니다.", ""};
	      	  	throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		    }

		    for(Map map : requirementList){
		    	Map itemMap = new HashMap(), saveMap = new HashMap();
		    	if(map.get("MmodelCode")==""){
		    		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "CMMF가 존재하지 않습니다.", ""};
		      	  	throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		    	}
		    	itemMap.put("mcoCom", "2208146671");
		    	itemMap.put("mmodelCode", map.get("MmodelCode"));
		    	List<Map> masterList = itemService.selectItemInfo(itemMap);
		    	if(masterList.size() > 1){
		    		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "자재마스터에 자재코드가 2건 이상입니다.", ""};
		      	  	throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		    	}else if(masterList.size() == 1){
			        itemMap.put("eqMmodelCode", map.get("MmodelCode")); // 자재코드
			        // 기존에 입력된 자재(사업자&&자재코드)인지?
			        List<Map> reqData = new ArrayList<Map>();
			        if(chk.equalsIgnoreCase("master")){
			        	if(isNullMcountNo == true){
			        		itemMap.put("isNullMcountNo", "Y");
			        	}
			        	reqData = complianceManagementService.selectRequirementMasterList(itemMap);
			        }else if(chk.equalsIgnoreCase("status")){
			        	if(isNullMcountNo == true){
			        		itemMap.put("isNullMcountNo", "Y");
			        	}
			        	reqData = complianceManagementService.selectRequirementStatusList(itemMap);
			        }

			        if(reqData.size() > 1){
			        	Object[] parameter = {CmmnConstants.ECODE_FAILURE, "요건" + chk + "가 " + reqData.size() + "건 입니다.", ""};
			      	  	throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			        }

			        if(reqData.size() > 0){
			        	if(chk.equalsIgnoreCase("master")){
			        		saveMap.put("EditUserKey", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			        		saveMap.put("EditUserNm", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			        		saveMap.put("EditDtm", currentDatetime);
			        		saveMap.put("CUAA110Key", reqData.get(0).get("CUAA110Key"));
			        		saveMap.put("McountNo", masterList.get(0).get("Mcount_no"));
			        		returnVal = complianceManagementService.updateRequirementMaster(saveMap);
			        	}else if(chk.equalsIgnoreCase("master")){
			        		saveMap.put("EditUserKey", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			        		saveMap.put("EditUserNm", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			        		saveMap.put("EditDtm", currentDatetime);
			        		saveMap.put("CUAA120Key", reqData.get(0).get("CUAA120Key"));
			        		saveMap.put("mcountNo", masterList.get(0).get("Mcount_no"));
			        		returnVal = complianceManagementService.updateRequirementStatus(saveMap);
			        	}
			        }
			        if(returnVal > 0){
			        	returnList.add(saveMap);
			        }
		    	}
		    }
			return new ResponseEntity<>(returnList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertRequirementStatus")
    public ResponseEntity<?> insertRequirementStatus(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	  		args.put("AddUserKey", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("AddUserNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("AddDtm", currentDatetime);
	  		long result = complianceManagementService.insertRequirementStatus(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/updateRequirementStatus")
    public ResponseEntity<?> updateRequirementStatus(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			args.put("EditUserKey", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			args.put("EditUserNm", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
    		args.put("EditDtm", currentDatetime);
	  		long result = complianceManagementService.updateRequirementStatus(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }
}