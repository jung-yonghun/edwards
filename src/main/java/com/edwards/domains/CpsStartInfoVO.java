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
@Table(name = "CPS_StartInfo", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsStartInfoVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "startKey")
  private BigDecimal startKey;

  @Column(name = "startGubun", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String startGubun;

  @Column(name = "startJisaCode", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String startJisaCode;

  @Column(name = "startTaxpayerTradeName", updatable = false)
  @NotEmpty
  @Size(max = 120)
  private String startTaxpayerTradeName;

  @Column(name = "startTaxpayerNum", updatable = false)
  @NotEmpty
  @Size(max = 20)
  private String startTaxpayerNum;

  @Column(name = "startNum")
  @NotEmpty
  @Size(max = 30)
  private String startNum;

  @Column(name = "startReferenceNo1")
  @Size(max = 30)
  private String startReferenceNo1;

  @Column(name = "startReferenceNo2")
  @Size(max = 30)
  private String startReferenceNo2;

  @Column(name = "startIssueContent")
  @Size(max = 500)
  private String startIssueContent;

  @Column(name = "startPoNo")
  @Size(max = 50)
  private String startPoNo;

  @Column(name = "startNote")
  @Size(max = 500)
  private String startNote;

  @Column(name = "startCompensationYn")
  @Size(max = 1)
  private String startCompensationYn;

  @Column(name = "startLocation")
  @Size(max = 500)
  private String startLocation;

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
	//수정일시
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	//수정자
	this.editUserId 	= null;
	this.editUserNm 	= null;
	this.editDtm 		= null;
  }
}