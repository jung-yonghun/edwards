package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_BAS_FRERATE", schema = "dbo", catalog = "soo_MST"
		, uniqueConstraints = @UniqueConstraint(columnNames = {"CD_KEY", "FREGBN"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdBasFrerateVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_CD_BAS_FRERATE")
  private BigDecimal keyCdBasFrerate;

  @Column(name = "CD_KEY")
  @NotEmpty
  @Size(min = 15, max = 15)
  private String cdKey;

  @Column(name = "FREGBN")
  @NotEmpty
  @Size(max = 1)
  private String fregbn;

  @Column(name = "FREKG")
  private BigDecimal frekg;

  @Column(name = "FRERATEAREA1")
  private BigDecimal freratearea1;

  @Column(name = "FRERATEAREA2")
  private BigDecimal freratearea2;

  @Column(name = "FRERATEAREA3")
  private BigDecimal freratearea3;

  @Column(name = "FRERATEAREA4")
  private BigDecimal freratearea4;

  @Column(name = "FRERATEAREAT1")
  private BigDecimal frerateareat1;

  @Column(name = "FRERATEAREAT2")
  private BigDecimal frerateareat2;

  @Column(name = "FRERATEAREAT3")
  private BigDecimal frerateareat3;

  @Column(name = "FRERATEAREAT4")
  private BigDecimal frerateareat4;

  @Column(name = "FRERATEAREAT5")
  private BigDecimal frerateareat5;

  @Column(name = "FRERATEAREAT6")
  private BigDecimal frerateareat6;

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
	// 수정일시
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}