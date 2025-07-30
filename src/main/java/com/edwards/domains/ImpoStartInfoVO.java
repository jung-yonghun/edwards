package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TBR_Impo_StartInfo", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class ImpoStartInfoVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "imsKey")
  private BigDecimal imsKey;

  @Column(name = "imsTaxpayerKey", updatable = false)
  @NotNull
  private BigDecimal imsTaxpayerKey;

  @Column(name = "imsTaxpayerDB", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String imsTaxpayerDb;

  @Column(name = "imsTaxpayerCode", updatable = false)
  @NotEmpty
  @Size(max = 6)
  private String imsTaxpayerCode;

  @Column(name = "imsTaxpayerTradeName", updatable = false)
  @NotEmpty
  @Size(max = 120)
  private String imsTaxpayerTradeName;

  @Column(name = "imsTaxpayerNum", updatable = false)
  @Size(max = 20)
  private String imsTaxpayerNum;

  @Column(name = "imsHouseBl")
  @NotEmpty
  @Size(max = 20)
  private String imsHouseBl;

  @Column(name = "imsReferenceNo1")
  @Size(max = 30)
  private String imsReferenceNo1;

  @Column(name = "imsReferenceNo2")
  @Size(max = 30)
  private String imsReferenceNo2;

  @Column(name = "imsIssueContent")
  @Size(max = 120)
  private String imsIssueContent;

  @Column(name = "imsPoNo")
  @Size(max = 50)
  private String imsPoNo;

  @Column(name = "forwarderUserKey")
  private BigDecimal forwarderUserKey;

  @Column(name = "forwarderUserId")
  @Size(max = 10)
  private String forwarderUserId;

  @Column(name = "forwarderTaxNum")
  @Size(max = 20)
  private String forwarderTaxNum;

  @Column(name = "imsStatus")
  @NotEmpty
  @Size(max = 10)
  private String imsStatus;

  @Column(name = "imsUseYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String imsUseYn;

  @Column(name = "imsSubmitDate", updatable = false)
  @NotEmpty
  @Size(min = 8, max = 8)
  private String imsSubmitDate;

  @Column(name = "imsAddUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String imsAddUserId;

  @Column(name = "imsAddUserNm", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String imsAddUserNm;

  @Basic(optional = false)
  @Column(name = "imsAddDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date imsAddDate;

  @Column(name = "imsAddDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String imsAddDtm;

  @Column(name = "imsEditUserId")
  @Size(max = 10)
  private String imsEditUserId;

  @Column(name = "imsEditUserNm")
  @Size(max = 50)
  private String imsEditUserNm;

  @Column(name = "imsEditDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date imsEditDate;

  @Column(name = "imsEditDtm")
  @Size(min = 14, max = 14)
  private String imsEditDtm;

  @PreUpdate
  public void preUpdate() {
	//수정일시
	this.imsEditDate = new Date();
	this.imsEditDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	//수정자
	this.imsEditUserId 	= null;
	this.imsEditUserNm 	= null;
	this.imsEditDtm 	= null;
  }
}