package com.edwards.biz.edmsManagement;

import com.edwards.domains.EdmsMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EdmsMasterDao extends JpaRepository<EdmsMasterVO, BigDecimal> {
  Page<EdmsMasterVO> findAll(Pageable pageable);

  List<EdmsMasterVO> findAll(Specification<EdmsMasterVO> specification, Sort sort);

  @Transactional(readOnly = true)
  EdmsMasterVO findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn(String edmsGubun, String jisaCode, BigDecimal edmsComKey, String useYn);

  @Transactional(readOnly = true)
  EdmsMasterVO findTop1ByEdmsGubunAndEdmsComKeyAndSingoNumAndUseYnOrderByEdmsKey(String edmsGubun, BigDecimal edmsComKey, String singoNum, String useYn);


  @Transactional(readOnly = true)
  EdmsMasterVO findTop1ByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYnOrderByEdmsKey(String edmsGubun, BigDecimal edmsComKey, String edmsNum, String useYn);

  List<EdmsMasterVO> findByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYn(String edmsGubun, BigDecimal edmsComKey, String edmsNum, String useYn);

  int countByAddDay(String addDay);

  @Query(value = "SELECT RIGHT(ISNULL(MAX(edmsManagementNum), 'ED' + RIGHT(CONVERT(VARCHAR(8), getdate(), 112), 6) + '000000'), 12) " +
		  "FROM [soo].[dbo].[TBR_EDMS_Master] WHERE edmsManagementNum LIKE 'ED' + :yymmdd + '%' ", nativeQuery = true)
  String getMaxEdmsManagementNum(@Param("yymmdd") String yymmdd);

  EdmsMasterVO findTop1ByAddDayOrderByAddDayDesc(String addDay);

  @Transactional(readOnly = true)
  EdmsMasterVO findTop1ByEdmsKey(BigDecimal edmsKey);
}