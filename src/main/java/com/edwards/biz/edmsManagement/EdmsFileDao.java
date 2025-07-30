package com.edwards.biz.edmsManagement;

import com.edwards.domains.EdmsAttachFileVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EdmsFileDao extends JpaRepository<EdmsAttachFileVO, BigDecimal> {
  Page<EdmsAttachFileVO> findAll(Pageable pageable);

  List<EdmsAttachFileVO> findAll(Specification<EdmsAttachFileVO> specification, Sort sort);

  Integer countByEdmsParentKeyAndEdmsParentGubunAndEdmsFileCategoryAndUseYn(BigDecimal edmsParentKey, String edmsParentGubun, String edmsFileCategory, String useYn);
}