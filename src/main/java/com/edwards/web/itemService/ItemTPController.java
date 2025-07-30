package com.edwards.web.itemService;

import com.edwards.biz.itemMng.ItemTPService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnUtils;
import com.edwards.config.excel.CommonExcelView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;

import java.net.URLEncoder;
import java.util.*;

@RestController
@RequestMapping(value = {"/apis/master"}, method = {RequestMethod.POST})
public class ItemTPController extends CmmnController {
	@Autowired
	private ItemTPService itemTPService;

	@Value("${upload.path.tempFile}")
	public String excelTempFileUploadPath;

	@RequestMapping(value = "/selectItemTpInfoExcelExport")
	public View selectItemTpInfoExcelExport(HttpServletRequest request, Map ModelMap) throws Exception{
		List<String> ColName = new ArrayList<>();
		ColName.add("사업자번호");
		ColName.add("자재코드");
		ColName.add("단가");

		List<String[]> ColValue = new ArrayList<>();

		Map searchMap = new HashMap();

		searchMap.put("_DateType", request.getParameter("_DateType"));
		searchMap.put("mcoCom", request.getParameter("mcoCom"));
		searchMap.put("strFromDate", request.getParameter("strFromDate"));
		searchMap.put("strToDate", request.getParameter("strToDate"));
		if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156")){
			searchMap.put("_defaultRmsDb", "[demoRms]");
		}else{
			searchMap.put("_defaultRmsDb", "[CPS]");
		}

		searchMap.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		searchMap.put("_Auth", CmmnUtils.getUserAuth((String) CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE)));
		List<Map> result = itemTPService.selectItemTPList(searchMap);

		for(int i = 0; i < result.size(); i++){
			List<String> Col = new ArrayList();
			Col.add(0, (String) result.get(i).get("Mco_com"));
			Col.add(1, (String) result.get(i).get("Mmodel_code"));
			Col.add(2, CmmnUtils.convertBigDecimalNumber(result.get(i).get("Munitprice")));

			String[] sArrays = Col.toArray(new String[1]);

			ColValue.add(sArrays);
		}
		String formatDate = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		ModelMap.put("ExcelName", URLEncoder.encode("자재TP단가", "UTF-8") + "_" + formatDate);
		ModelMap.put("SheetName", "자재TP단가_" + formatDate);
		ModelMap.put("ColName", ColName);
		ModelMap.put("ColValue", ColValue);

		return new CommonExcelView();
    }

	@RequestMapping(value = "/saveItemTPInfo")
	public ResponseEntity<?> saveItemTPInfo(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			if(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156")){
				args.put("_defaultRmsDb", "[demoRms]");
			}else{
				args.put("_defaultRmsDb", "[CPS]");
			}
			args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			args.put("_userNm", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			args.put("_Auth", CmmnUtils.getUserAuth((String) CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE)));
			Map result = itemTPService.saveItemTPInfo(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}