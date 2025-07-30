package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_HS_MATE1", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdHsMate1VO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEYCDHSMATE1")
  private BigDecimal keycdhsmate1;

  @Column(name = "IMEXTPCD")
  private String imextpcd;

  @Column(name = "HSCODE")
  private String hscode;

  @Column(name = "HSENGNM")
  private String hsengnm;

  @Column(name = "HSHANNM")
  private String hshannm;

  @Column(name = "HSDESC")
  private String hsdesc;

  @Column(name = "HSLAW")
  private String hslaw;

  @Column(name = "HSREMARK")
  private String hsremark;

  @Column(name = "useYn", columnDefinition = "CHAR(1)")
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
