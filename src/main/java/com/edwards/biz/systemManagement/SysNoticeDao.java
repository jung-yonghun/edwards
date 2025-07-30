package com.edwards.biz.systemManagement;

import com.edwards.domains.SysNoticeVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SysNoticeDao extends JpaRepository<SysNoticeVO, BigDecimal> {
  List<SysNoticeVO> findAll(Specification<SysNoticeVO> specification, Pageable pageable);

  List<SysNoticeVO> findAll(Specification<SysNoticeVO> specification);
}