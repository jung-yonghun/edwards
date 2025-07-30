package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_Customs_CostDetail", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CustomsCostDetailVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "costDtlKey")
  private BigDecimal costDtlKey;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "costMstKey", updatable = false)
  @JsonBackReference
  private CustomsCostMasterVO costMstKey;

  @Column(name = "costCode")
  @NotEmpty
  @Size(max = 10)
  private String costCode;

  @Column(name = "costName")
  @NotEmpty
  @Size(max = 200)
  private String costName;

  @Column(name = "supplyAmt")
  @NotNull
  private BigDecimal supplyAmt = BigDecimal.ZERO;

  @Column(name = "vat")
  @NotNull
  private BigDecimal vat = BigDecimal.ZERO;

  @Column(name = "totalAmt")
  @NotNull
  private BigDecimal totalAmt = BigDecimal.ZERO;

  @Column(name = "costDtlNote")
  @Size(max = 500)
  private String costDtlNote;

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
