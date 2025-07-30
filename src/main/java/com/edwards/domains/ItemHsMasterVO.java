package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "MAAD100M", schema = "dbo", catalog = "CPS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class ItemHsMasterVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "MAAD100MKey")
  private BigDecimal MAAD100MKey;

  @Column(name = "hsRegNum", updatable = false, unique = true)
  @Size(max = 30)
  private String hsRegNum;

  @Column(name = "hsStatus")
  @NotEmpty
  @Size(max = 5)
  private String hsStatus;

  @Column(name = "hsImportance")
  @NotEmpty
  @Size(max = 2)
  private String hsImportance;

  @Column(name = "hsReqType")
  @NotEmpty
  @Size(max = 1)
  private String hsReqType = "A";

  @Column(name = "hsReqTypeEtcNote")
  @Size(max = 50)
  private String hsReqTypeEtcNote;

  @Column(name = "hsEmergencyYn")
  @NotEmpty
  @Size(max = 1)
  private String hsEmergencyYn;

  @Column(name = "hsSupplementationYn")
  @Size(max = 1)
  private String hsSupplementationYn;

  @Column(name = "hsReviewDt")
  @Size(min = 8, max = 8)
  private String hsReviewDt;

  // 의뢰자
  @Column(name = "hsRegUserKey")
  private BigDecimal hsRegUserKey;

  @Column(name = "hsRegUserId")
  @NotEmpty
  @Size(max = 100)
  private String hsRegUserId;

  @Column(name = "hsRegUserNm")
  @NotEmpty
  @Size(max = 30)
  private String hsRegUserNm;

  @Column(name = "hsRegUserPhoneNum")
  @Size(max = 50)
  private String hsRegUserPhoneNum;

  @Column(name = "hsRegUserEmail")
  @Email
  @Size(max = 100)
  private String hsRegUserEmail;

  // 검토자
  @Column(name = "hsReviewerUserKey")
  private BigDecimal hsReviewerUserKey;

  @Column(name = "hsReviewerUserId")
  @Size(max = 100)
  private String hsReviewerUserId;

  @Column(name = "hsReviewerUserNm")
  @Size(max = 30)
  private String hsReviewerUserNm;

  @Column(name = "hsReviewerPhoneNum")
  @Size(max = 50)
  private String hsReviewerPhoneNum;

  @Column(name = "hsReviewerUserEmail")
  @Email
  @Size(max = 100)
  private String hsReviewerUserEmail;

  @Column(name = "hsOkUserKey")
  private BigDecimal hsOkUserKey;

  @Column(name = "hsOkUserId")
  @Size(max = 100)
  private String hsOkUserId;

  @Column(name = "hsOkUserNm")
  @Size(max = 30)
  private String hsOkUserNm;

  @Column(name = "hsOkPhoneNum")
  @Size(max = 50)
  private String hsOkPhoneNum;

  @Column(name = "hsOkUserEmail")
  @Email
  @Size(max = 100)
  private String hsOkUserEmail;

  // 업체정보
  @Column(name = "hsRegUserComKey")
  private BigDecimal hsRegUserComKey;

  @Column(name = "hsRegUserComName")
  @Size(max = 100)
  private String hsRegUserComName;

  @Column(name = "hsRegUserComTaxNum")
  @Size(min = 10, max = 10)
  private String hsRegUserComTaxNum;

  @Column(name = "hsRegUserComTeamName")
  @Size(max = 50)
  private String hsRegUserComTeamName;

  @Column(name = "hsRegUserComAddress")
  @Size(max = 500)
  private String hsRegUserComAddress;

  @Column(name = "hsRegUserComCeoName")
  @Size(max = 100)
  private String hsRegUserComCeoName;

  @Column(name = "hsRegUserComMan")
  @Size(max = 50)
  private String hsRegUserComMan;

  @Column(name = "hsRegUserComTel")
  @Size(max = 50)
  private String hsRegUserComTel;

  @Column(name = "hsRegUserComeMail")
  @Email
  @Size(max = 100)
  private String hsRegUserComeMail;

  // 자재
  @Column(name = "itemIsNewType")
  @Size(max = 5)
  private String itemIsNewType;

  @Column(name = "itemType")
  @Size(max = 1)
  private String itemType = "A";

  @Column(name = "itemTypeEtcNote")
  @Size(max = 50)
  private String itemTypeEtcNote;

  @Column(name = "itemImpoExpoType")
  @Size(max = 5)
  private String itemImpoExpoType;

  @Column(name = "itemKey")
  private BigDecimal itemKey;

  @Column(name = "itemMcountNo")
  @Size(max = 30)
  private String itemMcountNo;

  @Column(name = "itemMmodelCode")
  @Size(max = 50)
  private String itemMmodelCode;

  @Column(name = "itemMstdGoods")
  @Size(max = 100)
  private String itemMstdGoods;

  @Column(name = "itemGyuguek")
  @Size(max = 300)
  private String itemGyuguek;

  @Column(name = "itemSungbun")
  @Size(max = 200)
  private String itemSungbun;

  @Column(name = "itemUnit")
  @Size(max = 3)
  private String itemUnit;

  @Column(name = "itemPrice", columnDefinition = "float")
  private Double itemPrice;

  @Column(name = "itemUnitPrice")
  @Size(max = 50)
  private String itemUnitPrice;

  @Column(name = "itemOrigin")
  @Size(max = 2)
  private String itemOrigin;

  @Column(name = "itemHs")
  @Size(max = 50)
  private String itemHs;

  @Column(name = "itemTradePartnerHs")
  @Size(max = 50)
  private String itemTradePartnerHs;

  @Column(name = "itemJaejosa")
  @Size(max = 100)
  private String itemJaejosa;

  @Column(name = "itemJaejosaHomepage")
  @Size(max = 100)
  private String itemJaejosaHomepage = "";

  @Column(name = "hsUserMemo", columnDefinition = "TEXT")
  private String hsUserMemo = "";

  @Column(name = "hsRegDt")
  @Size(max = 8)
  private String hsRegDt;

  @Column(name = "itemOkHs")
  @Size(max = 10)
  private String itemOkHs;

  @Column(name = "itemOkDtm")
  @Size(max = 14)
  private String itemOkDtm;

  @Column(name = "itemReviewerDtm")
  @Size(max = 14)
  private String itemReviewerDtm;

  @Column(name = "itemUpdate")
  @Size(max = 1)
  private String itemUpdate;

  @Column(name = "hsIssueMemo", columnDefinition = "TEXT")
  private String hsIssueMemo = "";

  @Column(name = "itemSupplementMemo", columnDefinition = "TEXT")
  private String itemSupplementMemo = "";

  @Column(name = "itemReviewerMemo", columnDefinition = "TEXT")
  private String itemReviewerMemo = "";

  @Column(name = "itemOkMemo", columnDefinition = "TEXT")
  private String itemOkMemo = "";

  @Column(name = "itemUpdateMemo", columnDefinition = "TEXT")
  private String itemUpdateMemo = "";

  @Column(name = "UseYN")
  @Size(min = 1, max = 1)
  private String UseYN;

  @Column(name = "adduserid", updatable = false)
  @Size(max = 100)
  private String adduserid;

  @Column(name = "AddUserKey", updatable = false)
  private BigDecimal AddUserKey;

  @Column(name = "adduserNm", updatable = false)
  @Size(max = 30)
  private String adduserNm;

  @Column(name = "addDtm", updatable = false)
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

  @OneToMany(mappedBy = "MAAD100MKey", fetch = FetchType.LAZY)
  @JsonManagedReference
  private List<ItemHsStatusVO> hsStatusVOList;

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
