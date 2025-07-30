package com.edwards.biz.itemMng;

import com.edwards.domains.ItemHsMasterVO;
import com.edwards.domains.ItemHsStatusVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ItemHsStatusDao extends JpaRepository<ItemHsStatusVO, BigDecimal> {
  Page<ItemHsStatusVO> findAll(Pageable pageable);

  List<ItemHsStatusVO> findAll(Specification<ItemHsStatusVO> specification, Sort sort);

  Page<ItemHsStatusVO> findAll(Specification<ItemHsStatusVO> specification, Pageable pageable);

  ItemHsStatusVO findBymAAD100DKeyAndHsStatusStat(ItemHsMasterVO itemHsMasterVO, String hsStatusStat);
}