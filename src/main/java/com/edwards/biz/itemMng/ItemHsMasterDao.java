package com.edwards.biz.itemMng;

import com.edwards.domains.ItemHsMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ItemHsMasterDao extends JpaRepository<ItemHsMasterVO, BigDecimal> {
  Page<ItemHsMasterVO> findAll(Pageable pageable);

  List<ItemHsMasterVO> findAll(Specification<ItemHsMasterVO> specification, Sort sort);

  Page<ItemHsMasterVO> findAll(Specification<ItemHsMasterVO> specification, Pageable pageable);

  int countByHsRegDt(String hsRegDt);
}