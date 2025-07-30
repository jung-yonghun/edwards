package com.edwards.domains;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_Delivery_Cost", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class DeliveryCostVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "deliveryCostKey")
  private BigDecimal deliveryCostKey;

  @Column(name = "deliveryCostCl", updatable = false)
  @Size(max = 10)
  private String deliveryCostCl;

  @Column(name = "deliveryCostCustomerKey", updatable = false)
  private BigDecimal deliveryCostCustomerKey;

  @Column(name = "deliveryCostCustomerDb", updatable = false)
  @Size(max = 50)
  private String deliveryCostCustomerDb;

  @Column(name = "deliveryCostCustomerCode", updatable = false)
  @Size(max = 10)
  private String deliveryCostCustomerCode;

  @Column(name = "deliveryCostCustomerName", updatable = false)
  @Size(max = 120)
  private String deliveryCostCustomerName;

  @Column(name = "deliveryCostCustomerTaxNum", updatable = false)
  @Size(max = 10)
  private String deliveryCostCustomerTaxNum;

  @Column(name = "deliveryCostWriteUserKey", updatable = false)
  private BigDecimal deliveryCostWriteUserKey;

  @Column(name = "deliveryCostWriteUserId", updatable = false)
  @Size(max = 10)
  private String deliveryCostWriteUserId;

  @Column(name = "deliveryCostWriteUserName", updatable = false)
  @Size(max = 50)
  private String deliveryCostWriteUserName;

  @Column(name = "deliveryCostWriteUserTradeName", updatable = false)
  @Size(max = 100)
  private String deliveryCostWriteUserTradeName;

  @Column(name = "deliveryCostWriteUserTaxNum", updatable = false)
  @Size(max = 10)
  private String deliveryCostWriteUserTaxNum;

  @Column(name = "deliveryCostBlNum")
  @Size(max = 50)
  private String deliveryCostBlNum;

  @Column(name = "deliveryCostSingoNum")
  @Size(max = 30)
  private String deliveryCostSingoNum;

  @Column(name = "deliveryCostCompleteDay")
  @Size(min = 8, max = 8)
  private String deliveryCostCompleteDay;

  @Column(name = "deliveryCostWarehouse")
  @Size(max = 100)
  private String deliveryCostWarehouse;

  @Column(name = "deliveryCostCtQty", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryCostCtQty;

  @Column(name = "deliveryCostCtUnit")
  @Size(max = 10)
  private String deliveryCostCtUnit;

  @Column(name = "deliveryCostWeight", columnDefinition = "numeric(18, 3)", scale = 3)
  private BigDecimal deliveryCostWeight;

  @Column(name = "deliveryCostTonnage")
  @Size(max = 30)
  private String deliveryCostTonnage;

  @Column(name = "deliveryCostCargoType")
  @Size(max = 10)
  private String deliveryCostCargoType;

  @Column(name = "deliveryCostStartName")
  @Size(max = 50)
  private String deliveryCostStartName;

  @Column(name = "deliveryCostEndName")
  @Size(max = 50)
  private String deliveryCostEndName;

  @Column(name = "deliveryCostDamageYn")
  @Size(min = 1, max = 1)
  private String deliveryCostDamageYn = "N";

  @Column(name = "deliveryCostDamageNote")
  @Size(max = 4000)
  private String deliveryCostDamageNote;

  @Column(name = "deliveryCostSpecificNote")
  @Size(max = 4000)
  private String deliveryCostSpecificNote;

  @Column(name = "deliveryCostShippingType")
  @Size(max = 10)
  private String deliveryCostShippingType = "국내";

  @Column(name = "deliveryCostShippingCharge", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryCostShippingCharge = BigDecimal.ZERO;

  @Column(name = "deliveryCostWarehouseType")
  @Size(max = 10)
  private String deliveryCostWarehouseType = "타사";

  @Column(name = "deliveryCostWarehouseChange", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryCostWarehouseChange = BigDecimal.ZERO;

  @Column(name = "deliveryCostInsuranceCharge", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryCostInsuranceCharge = BigDecimal.ZERO;

  @Column(name = "deliveryCostPayforCharge", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryCostPayforCharge = BigDecimal.ZERO;

  @Column(name = "deliveryCostPayforName")
  @Size(max = 120)
  private String deliveryCostPayforName;

  @Column(name = "deliveryCostConfirmCharge", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryCostConfirmCharge = BigDecimal.ZERO;

  @Column(name = "deliveryCostConfirmUserKey")
  private BigDecimal deliveryCostConfirmUserKey;

  @Column(name = "deliveryCostConfirmUserId")
  @Size(max = 10)
  private String deliveryCostConfirmUserId;

  @Column(name = "deliveryCostConfirmUserName")
  @Size(max = 50)
  private String deliveryCostConfirmUserName;

  @Column(name = "deliveryCostConfirmDtm")
  @Size(max = 14)
  private String deliveryCostConfirmDtm;

  @Column(name = "deliveryCostStatus")
  @Size(max = 10)
  private String deliveryCostStatus = String.valueOf(CmmnConstants.IMPORT_DELIVERY_COST_INIT_10);

  @Column(name = "deliveryCostNote")
  @Size(max = 500)
  private String deliveryCostNote;

  @Column(name = "useYn")
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserKey", updatable = false)
  private BigDecimal addUserKey;

  @Column(name = "addUserId", updatable = false)
  @Size(max = 10)
  private String addUserId;

  @Column(name = "addUserNm", updatable = false)
  @Size(max = 50)
  private String addUserNm;

  @Column(name = "addDtm", updatable = false)
  @Size(min = 14, max = 14)
  private String addDtm;

  @Column(name = "editUserKey")
  private BigDecimal editUserKey;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "editDtm")
  @Size(min = 14, max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.editUserKey = null;
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
