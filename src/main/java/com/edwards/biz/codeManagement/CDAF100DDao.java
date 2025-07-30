package com.edwards.biz.codeManagement;

import com.edwards.domains.CDAF100DVO;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CDAF100DDao extends JpaRepository<CDAF100DVO, BigDecimal> {
	List<CDAF100DVO> findAll(Specification<CDAF100DVO> specification);
}