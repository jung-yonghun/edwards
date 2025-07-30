package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdCstReDealAttachFileVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdCstReDealAttachFileDao extends JpaRepository<SooMst_CdCstReDealAttachFileVO, BigDecimal> {
  Page<SooMst_CdCstReDealAttachFileVO> findAll(Pageable pageable);

  List<SooMst_CdCstReDealAttachFileVO> findAll(Specification<SooMst_CdCstReDealAttachFileVO> specification, Sort sort);
}