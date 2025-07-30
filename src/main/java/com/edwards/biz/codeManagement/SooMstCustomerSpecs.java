package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CustomerVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class SooMstCustomerSpecs {
  private Logger logger = LoggerFactory.getLogger(this.getClass());

  /**
   * Both like customer db specification.
   *
   * @param customerDB the customer db
   * @return the specification
   */
  public static Specification<SooMst_CustomerVO> bothLikeCustomerDB(final String customerDB) {
	return new Specification<SooMst_CustomerVO>() {
	  @Override
	  public Predicate toPredicate(Root<SooMst_CustomerVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.like(root.get("customerDb"), "%" + customerDB + "%");
	  }
	};
  }

  /**
   * Eq customer db specification.
   *
   * @param customerDB the customer db
   * @return the specification
   */
  public static Specification<SooMst_CustomerVO> eqCustomerDB(final String customerDB) {
	return new Specification<SooMst_CustomerVO>() {
	  @Override
	  public Predicate toPredicate(Root<SooMst_CustomerVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.equal(root.get("customerDb"), customerDB);
	  }
	};
  }

  /**
   * After like customer name specification.
   *
   * @param customerName the customer name
   * @return the specification
   */
  public static Specification<SooMst_CustomerVO> afterLikeCustomerName(final String customerName) {
	return new Specification<SooMst_CustomerVO>() {
	  @Override
	  public Predicate toPredicate(Root<SooMst_CustomerVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.like(root.get("customerName"), customerName + "%");
	  }
	};
  }
}