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

@Entity
@Table(name = "TBR_Expo_StartInfo", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class ExpoStartInfoVO {
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

  @Column(name = "imsInvoiceNo")
  @NotEmpty
  @Size(max = 30)
  private String imsInvoiceNo;

  @Column(name = "imsReferenceNo1")
  @Size(max = 30)
  private String imsReferenceNo1;

  @Column(name = "imsReferenceNo2")
  @Size(max = 30)
  private String imsReferenceNo2;

  @Column(name = "imsIssueContent")
  @Size(max = 120)
  private String imsIssueContent;

  @Column(name = "imsPoNo", columnDefinition = "nvarchar(50)")
  @Size(max = 50)
  private String imsPoNo;

  @Column(name = "imsSubmitDay", updatable = false)
  @NotEmpty
  @Size(min = 8, max = 8)
  private String imsSubmitDay;

  @Column(name = "imsNote")
  @Size(max = 200)
  private String imsNote;

  @Column(name = "imsStatus")
  @NotEmpty
  @Size(max = 10)
  private String imsStatus;

  @Column(name = "imsUseYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String imsUseYn;

  @Column(name = "imsAddUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String imsAddUserId;

  @Column(name = "imdAddUserNm", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String imdAddUserNm;

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

  @Column(name = "imsEditDtm")
  @Size(min = 14, max = 14)
  private String imsEditDtm;

  @PreUpdate
  public void preUpdate() {
	this.imsEditDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.imsEditUserId = null;
	this.imsEditUserNm = null;
	this.imsEditDtm = null;
  }
}
