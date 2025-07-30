package com.edwards.biz.codeManagement;

import com.edwards.domains.CpsCdMasterVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CodeMasterDao extends JpaRepository<CpsCdMasterVO, BigDecimal> {
	List<CpsCdMasterVO> findAll(Specification<CpsCdMasterVO> specification, Pageable pageable);
}