package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_BAS_FTADTL", schema = "dbo", catalog = "soo_MST"
		, uniqueConstraints = @UniqueConstraint(columnNames = {"FTACODE", "FTACT"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdBasFtadtlVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_CD_BAS_FTADTL")
  private BigDecimal keyCdBasFtadtl;

  @Column(name = "KEY_CD_BAS_FTAMST")
  @NotNull
  private BigDecimal keyCdBasFtamst;

  @Column(name = "FTACODE")
  @NotEmpty
  @Size(max = 5)
  private String ftacode;

  @Column(name = "FTACT")
  @NotEmpty
  @Size(max = 100)
  private String ftact;

  @Column(name = "FTACTNM")
  @Size(max = 20)
  private String ftactnm;

  @Column(name = "ORGNOSAMPLE1")
  @Size(max = 100)
  private String orgnosample1;

  @Column(name = "ORGNOSAMPLE2")
  @Size(max = 100)
  private String orgnosample2;

  @Column(name = "ORGNOSAMPLE3")
  @Size(max = 100)
  private String orgnosample3;

  @Column(name = "ORGNOST1")
  @Size(max = 100)
  private String orgnost1;

  @Column(name = "ORGNOST2")
  @Size(max = 100)
  private String orgnost2;

  @Column(name = "ORGNOST3")
  @Size(max = 100)
  private String orgnost3;

  @Column(name = "FTATXT1")
  @Size(max = 100)
  private String ftatxt1;

  @Column(name = "FTATXT2")
  @Size(max = 100)
  private String ftatxt2;

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