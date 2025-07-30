package com.edwards.biz.itemMng;

import com.edwards.commons.CmmnUtils;
import com.edwards.domains.ItemAttachFileVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ItemFileService {
	@Autowired
	private ItemAttachFileDao itemAttachFileDao;

	public List<ItemAttachFileVO> selectItemFileList(Map args) throws Exception {
		String itemMcountNo = args.containsKey("itemMcountNo") ? String.valueOf(args.get("itemMcountNo")) : null;
		String useYn = args.containsKey("useyn") ? String.valueOf(args.get("useyn")) : "";
		String itemMcountType = args.containsKey("itemMcountType") ? String.valueOf(args.get("itemMcountType")) : null;
		BigDecimal itemFileKey = CmmnUtils.isContainsMapValue(args, "itemFileKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("itemFileKey"))) : null;
		String itemOrgFileName = args.containsKey("itemOrgFileName") ? String.valueOf(args.get("itemOrgFileName")) : null;

		//검색조건(필수:useYn,itemMcountNo)
		Specifications spec = Specifications.where(ItemAttachFileSpecs.eqUseyn(useYn)).and(ItemAttachFileSpecs.eqItemMcountNo(itemMcountNo));
		//검색조건
		if (!CmmnUtils.isNull(itemMcountType)) spec = spec.and(ItemAttachFileSpecs.eqItemMcountType(itemMcountType));
		if (!CmmnUtils.isNull(itemFileKey)) spec = spec.and(ItemAttachFileSpecs.eqItemFileKey(itemFileKey));
		if (!CmmnUtils.isNull(itemOrgFileName)) spec = spec.and(ItemAttachFileSpecs.eqItemOrgFileName(itemOrgFileName));

		return itemAttachFileDao.findAll(spec);
	}

	public ItemAttachFileVO selectItemFileInfo(BigDecimal itemFileKey) {
		return itemAttachFileDao.findOne(itemFileKey);
	}













  /**
   * Save item file info item attach file vo.
   *
   * @param itemAttachFileVo the item attach file vo
   * @return the item attach file vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public ItemAttachFileVO saveItemFileInfo(ItemAttachFileVO itemAttachFileVo) throws Exception {
	return itemAttachFileDao.save(itemAttachFileVo);
  }

  /**
   * Save item attach file additional info item attach file vo.(파일카테고리, 검색키워드, 노트, 접근권한 수정)
   *
   * @param additionalInfo the additional info
   * @param request        the request
   * @return the item attach file vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public ItemAttachFileVO saveItemAttachFileAdditionalInfo(ItemAttachFileDTO.additionalInfo additionalInfo, HttpServletRequest request) throws Exception {
	ItemAttachFileVO fileVO = itemAttachFileDao.findOne(additionalInfo.getItemFileKey());
	fileVO.setItemFileCategory(additionalInfo.getItemFileCategory());
	fileVO.setItemFileNote(additionalInfo.getItemFileNote());
	fileVO.setItemSearchKeyword(additionalInfo.getItemSearchKeyword());
	fileVO.setItemFileAccessGrade(additionalInfo.getItemFileAccessGrade());

	ItemAttachFileVO returnVO = itemAttachFileDao.save(fileVO);

	return returnVO;
  }
}