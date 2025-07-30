package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_CST_Re_Deal_AttachFile", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdCstReDealAttachFileVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "dealFileKey")
  private BigDecimal dealFileKey;

  @Column(name = "dealMstKey")
  private BigDecimal dealMstKey;

  @Column(name = "dealGubun")
  private String dealGubun;

  @Column(name = "dealServerGubun")
  private String dealServerGubun;

  @Column(name = "dealServerIp")
  private String dealServerIp;

  @Column(name = "dealFilePath")
  private String dealFilePath;

  @Column(name = "dealSaveFileName")
  private String dealSaveFileName;

  @Column(name = "dealOrgFileName")
  private String dealOrgFileName;

  @Column(name = "dealFileSize")
  private BigDecimal dealFileSize;

  @Column(name = "dealFileExt")
  private String dealFileExt;

  @Column(name = "dealSearchKeyword")
  private String dealSearchKeyword;

  @Column(name = "dealFileNote")
  private String dealFileNote;


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
