package com.edwards.biz.customsManagement;

import com.edwards.domains.DeliveryCarVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ImportDeliveryCarDao extends JpaRepository<DeliveryCarVO, BigDecimal>{
	Page<DeliveryCarVO> findAll(Specification<DeliveryCarVO> specification, Pageable pageable);

	List<DeliveryCarVO> findAll(Specification<DeliveryCarVO> specs, Sort sort);
}