package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "TBR_Customs_CostMaster", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CustomsCostMasterVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "costMstKey")
  private BigDecimal costMstKey;

  @Column(name = "costMstCl")
  @NotEmpty
  @Size(max = 10)
  private String costMstCl;

  @Column(name = "costCustomerKey")
  @NotNull
  private BigDecimal costCustomerKey;

  @Column(name = "costCustomerDb")
  @NotEmpty
  @Size(max = 50)
  private String costCustomerDb;

  @Column(name = "costCustomerCode")
  @NotEmpty
  @Size(max = 10)
  private String costCustomerCode;

  @Column(name = "costCustomerName")
  @NotEmpty
  @Size(max = 120)
  private String costCustomerName;

  @Column(name = "costCustomerTaxNum")
  @NotEmpty
  @Size(max = 10)
  private String costCustomerTaxNum;

  @Column(name = "accountMonth")
  @NotEmpty
  @Size(min = 6, max = 6)
  private String accountMonth;

  @Column(name = "accountDay")
  @NotEmpty
  @Size(min = 8, max = 8)
  private String accountDay;

  @Column(name = "costShipperKey")
  @NotNull
  private BigDecimal costShipperKey;

  @Column(name = "costShipperUserId")
  @NotEmpty
  @Size(max = 10)
  private String costShipperUserId;

  @Column(name = "costShipperUserNm")
  @NotEmpty
  @Size(max = 50)
  private String costShipperUserNm;

  @Column(name = "costShipperTaxNum")
  @NotEmpty
  @Size(max = 10)
  private String costShipperTaxNum;

  @Column(name = "blNum")
  @NotEmpty
  @Size(max = 50)
  private String blNum;

  @Column(name = "singoNum")
  @Size(max = 50)
  private String singoNum;

  @Column(name = "referenceNum1")
  @Size(max = 50)
  private String referenceNum1;

  @Column(name = "referenceNum2")
  @Size(max = 50)
  private String referenceNum2;

  @Column(name = "totalSupplyAmt")
  @NotNull
  private BigDecimal totalSupplyAmt = BigDecimal.ZERO;

  @Column(name = "totalVat")
  @NotNull
  private BigDecimal totalVat = BigDecimal.ZERO;

  @Column(name = "totalSumAmt")
  @NotNull
  private BigDecimal totalSumAmt = BigDecimal.ZERO;

  @Column(name = "costMstNote")
  @Size(max = 500)
  private String costMstNote;

  @Column(name = "costMstStatus")
  @NotEmpty
  @Size(max = 10)
  private String costMstStatus;

  @Column(name = "useYn")
  @NotEmpty
  @Size(max = 1)
  private String useYn;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "addUserNm", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String addUserNm;

  @Column(name = "addDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "editDtm")
  @Size(min = 14, max = 14)
  private String editDtm;

  @OneToMany(mappedBy = "costMstKey", fetch = FetchType.LAZY)
  @JsonManagedReference
  private List<CustomsCostDetailVO> customsCostDetailVOList;

  @PreUpdate
  public void preUpdate() {
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
