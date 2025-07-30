package com.edwards.biz.itemMng;

import com.edwards.domains.ItemAttachFileVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import java.math.BigDecimal;

public class ItemAttachFileSpecs {
  private Logger logger = LoggerFactory.getLogger(this.getClass());

  /**
   * Eq item mcount no specification.
   *
   * @param itemMcountNo the item mcount no
   * @return the specification
   */
  public static Specification<ItemAttachFileVO> eqItemMcountNo(final String itemMcountNo) {
	return new Specification<ItemAttachFileVO>() {
	  @Override
	  public Predicate toPredicate(Root<ItemAttachFileVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.equal(root.get("itemMcountNo"), itemMcountNo);
	  }
	};
  }

  /**
   * Eq useyn specification.
   *
   * @param useyn the useyn
   * @return the specification
   */
  public static Specification<ItemAttachFileVO> eqUseyn(final String useyn) {
	return new Specification<ItemAttachFileVO>() {
	  @Override
	  public Predicate toPredicate(Root<ItemAttachFileVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.equal(root.get("useyn"), useyn);
	  }
	};
  }

  /**
   * Eq item file key specification.
   *
   * @param itemFileKey the item file key
   * @return the specification
   */
  public static Specification<ItemAttachFileVO> eqItemFileKey(final BigDecimal itemFileKey) {
	return new Specification<ItemAttachFileVO>() {
	  @Override
	  public Predicate toPredicate(Root<ItemAttachFileVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.equal(root.get("itemFileKey"), itemFileKey);
	  }
	};
  }

  /**
   * Eq item mcount type specification.
   *
   * @param itemMcountType the item mcount type
   * @return the specification
   */
  public static Specification<ItemAttachFileVO> eqItemMcountType(final String itemMcountType) {
	return new Specification<ItemAttachFileVO>() {
	  @Override
	  public Predicate toPredicate(Root<ItemAttachFileVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.equal(root.get("itemMcountType"), itemMcountType);
	  }
	};
  }

  /**
   * Eq item org file name specification.
   *
   * @param itemOrgFileName the item org file name
   * @return the specification
   */
  public static Specification<ItemAttachFileVO> eqItemOrgFileName(final String itemOrgFileName) {
	return new Specification<ItemAttachFileVO>() {
	  @Override
	  public Predicate toPredicate(Root<ItemAttachFileVO> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		return cb.equal(root.get("itemOrgFileName"), itemOrgFileName);
	  }
	};
  }
}