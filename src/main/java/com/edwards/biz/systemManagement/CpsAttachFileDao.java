package com.edwards.biz.systemManagement;

import com.edwards.domains.CpsAttachFileVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsAttachFileDao extends JpaRepository<CpsAttachFileVO, BigDecimal> {
  List<CpsAttachFileVO> findAll(Specification<CpsAttachFileVO> specification, Pageable pageable);

  List<CpsAttachFileVO> findAll(Specification<CpsAttachFileVO> specs);
}