package com.edwards.biz.edmsManagement;

import com.edwards.domains.CpsZeissFileDownVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsZeissFileDownDao extends JpaRepository<CpsZeissFileDownVO, BigDecimal> {
	Page<CpsZeissFileDownVO> findAll(Pageable pageable);

	List<CpsZeissFileDownVO> findAll(Specification<CpsZeissFileDownVO> specification);

//	Integer countByEdmsFileKeyAndEdmsFileCategoryAndUseYn(String edmsFileKey, String edmsFileCategory, String useYn);

	@Transactional(readOnly = true)
	CpsZeissFileDownVO findTop1ByEdmsInvNo(String edmsInvNo);

	@Transactional(readOnly = true)
	CpsZeissFileDownVO findTop1ByEdmsPoNo(String edmsPoNo);
}