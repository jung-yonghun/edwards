package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_ItemMasterNotYogVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstItemMasterNotYogDao extends JpaRepository<SooMst_ItemMasterNotYogVO, BigDecimal> {
  Page<SooMst_ItemMasterNotYogVO> findAll(Pageable pageable);

  List<SooMst_ItemMasterNotYogVO> findAll(Specification<SooMst_ItemMasterNotYogVO> specification, Sort sort);
}