package com.edwards.biz.itemMng;

import com.edwards.domains.ItemAttachFileVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ItemAttachFileDao extends JpaRepository<ItemAttachFileVO, BigDecimal> {
  Page<ItemAttachFileVO> findAll(Pageable pageable);

  List<ItemAttachFileVO> findAll(Specification<ItemAttachFileVO> specs);
}