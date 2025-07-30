package com.edwards.biz.customsManagement;

import com.edwards.domains.DeliveryCarryingInVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ImportDeliveryCarryingInDao extends JpaRepository<DeliveryCarryingInVO, BigDecimal>{
	Page<DeliveryCarryingInVO> findAll(Specification<DeliveryCarryingInVO> specification, Pageable pageable);

	List<DeliveryCarryingInVO> findAll(Specification<DeliveryCarryingInVO> specs, Sort sort);
}