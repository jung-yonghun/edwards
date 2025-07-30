package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_HS_Rate", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class SooMst_CdHsRateVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_TBR_CD_HS_Rate")
  private BigDecimal keyTbrCdHsRate;

  @Column(name = "hs1")
  @Size(max = 4)
  private String hs1;

  @Column(name = "hs2")
  @Size(max = 2)
  private String hs2;

  @Column(name = "hs3")
  @Size(max = 2)
  private String hs3;

  @Column(name = "hs4")
  @Size(max = 2)
  private String hs4;

  @Column(name = "hsCode")
  @Size(max = 10)
  private String hsCode;

  @Column(name = "hsRateFlag")
  @Size(max = 6)
  private String hsRateFlag;

  @Column(name = "HsRatePercent", columnDefinition = "float")
  private Double hsRatePercent; //float

  @Column(name = "HsRateTax", columnDefinition = "float")
  private Double hsRateTax; //float

  @Column(name = "HsRateBasic", columnDefinition = "float")
  private Double hsRateBasic; //float

  @Column(name = "hsCntrFlag")
  @Size(max = 1)
  private String hsCntrFlag;

  @Column(name = "hsUsageFlag")
  @Size(max = 2)
  private String hsUsageFlag;

  @Column(name = "hsDtStart")
  @Size(min = 8, max = 8)
  private String hsDtStart;

  @Column(name = "hsDtEnd")
  @Size(min = 8, max = 8)
  private String hsDtEnd;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
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
