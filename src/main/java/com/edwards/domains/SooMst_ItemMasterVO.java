package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by mjlee on 2016-11-02.
 */
@Entity
@Table(name = "TBR_MST_ItemMaster", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Data
public class SooMst_ItemMasterVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "itemKey")
  private BigDecimal itemKey;

  @Column(name = "Mcount_no", updatable = false)
  @NotEmpty
  @Size(max = 30)
  private String mcountNo;

  @Column(name = "Mmodel_code")
  @Size(max = 50)
  private String mmodelCode;

  @Column(name = "Mbom_code")
  @Size(max = 30)
  private String mbomCode;

  @Column(name = "Mdivision_code")
  @Size(max = 20)
  private String mdivisionCode;

  @Column(name = "Mtcano")
  @Size(max = 5)
  private String mtcano;

  @Column(name = "Mco_code")
  @Size(max = 4)
  private String mcoCode;

  @Column(name = "Mco_name")
  @Size(max = 35)
  private String mcoName;

  @Column(name = "Mco_com")
  @Size(max = 13)
  private String mcoCom;

  @Column(name = "Mshipper")
  @Size(max = 60)
  private String mshipper;

  @Column(name = "Mshipper_code")
  @Size(max = 13)
  private String mshipperCode;

  @Column(name = "Mshipper_key")
  private BigDecimal mshipperKey;

  @Column(name = "Mshipper_certification_type")
  @Size(max = 10)
  private String mshipperCertificationType;

  @Column(name = "Mshipper_certification_num")
  @Size(max = 50)
  private String mshipperCertificationNum;

  @Column(name = "Mmaker")
  @Size(max = 60)
  private String mmaker;

  @Column(name = "Mreg_date")
  @Size(min = 8, max = 8)
  private String mregDate;

  @Column(name = "Mend_date")
  @Size(min = 8, max = 8)
  private String mendDate;

  @Column(name = "Mindo_code", columnDefinition = "CHAR(3)")
  @Size(max = 3)
  private String mindoCode;

  @Column(name = "Mhs_code")
  @Size(max = 10)
  private String mhsCode;

  @Column(name = "Mhs_code_new")
  @Size(max = 24)
  private String mhsCodeNew;

  @Column(name = "Mhs_kind")
  @Size(max = 6)
  private String mhsKind;

  @Column(name = "Mhs_rate")
  private Double mhsRate;

  @Column(name = "Mstd_goods")
  @Size(max = 50)
  private String mstdGoods;

  @Column(name = "Mger_goods")
  @Size(max = 50)
  private String mgerGoods;

  @Column(name = "Msp_code")
  @Size(max = 4)
  private String mspCode;

  @Column(name = "Msangpyo")
  @Size(max = 50)
  private String msangpyo;

  @Column(name = "Mmodel_1")
  @Size(max = 30)
  private String mmodel1;

  @Column(name = "Mmodel_2")
  @Size(max = 30)
  private String mmodel2;

  @Column(name = "Mmodel_3")
  @Size(max = 40)
  private String mmodel3;

  @Column(name = "Mingredient_1")
  @Size(max = 30)
  private String mingredient1;

  @Column(name = "Mingredient_2")
  @Size(max = 30)
  private String mingredient2;

  @Column(name = "Mingredient_3")
  @Size(max = 30)
  private String mingredient3;

  @Column(name = "Morigin1")
  @Size(max = 2)
  private String morigin1;

  @Column(name = "Morigin2")
  @Size(max = 1)
  private String morigin2;

  @Column(name = "Morigin3")
  @Size(max = 1)
  private String morigin3;

  @Column(name = "Morigin4")
  @Size(max = 1)
  private String morigin4;

  @Column(name = "Morigin_remark")
  @Size(max = 120)
  private String moriginRemark;

  @Column(name = "Mprovisional")
  @Size(max = 1)
  private String mprovisional;

  @Column(name = "Mprovisional_rate")
  private Double mprovisionalRate;

  @Column(name = "Mprovisional_remark")
  @Size(max = 80)
  private String mprovisionalRemark;

  @Column(name = "Mqty_ut")
  @Size(max = 3)
  private String mqtyUt;

  @Column(name = "Munitprice_current")
  @Size(max = 3)
  private String munitpriceCurrent;

  @Column(name = "Munitprice")
  private Double munitprice;

  @Column(name = "Mdraw_unit")
  @Size(max = 3)
  private String mdrawUnit;

  @Column(name = "Mcus_entry1")
  @Size(max = 1)
  private String mcusEntry1;

  @Column(name = "Mcus_entry2")
  @Size(max = 1)
  private String mcusEntry2;

  @Column(name = "Mcus_entry3")
  @Size(max = 1)
  private String mcusEntry3;

  @Column(name = "Mconfirm_flag")
  @Size(max = 1)
  private String mconfirmFlag;

  @Column(name = "Mconfirm_date")
  @Size(min = 8, max = 8)
  private String mconfirmDate;

  @Column(name = "Mconfirm_user")
  @Size(max = 10)
  private String mconfirmUser;

  @Column(name = "Mreview_flag")
  @Size(max = 1)
  private String mreviewFlag;

  @Column(name = "Mreview_cause")
  @Size(max = 80)
  private String mreviewCause;

  @Column(name = "Mremark1", columnDefinition = "TEXT")
  @Lob
  private String mremark1;

  @Column(name = "Mremark2", columnDefinition = "TEXT")
  @Lob
  private String mremark2;

  @Column(name = "Mspecial_remark1")
  @Size(max = 120)
  private String mspecialRemark1;

  @Column(name = "Mspecial_remark2")
  @Size(max = 120)
  private String mspecialRemark2;

  @Column(name = "Mspecial_remark3")
  @Size(max = 120)
  private String mspecialRemark3;

  @Column(name = "Mattached1")
  @Size(max = 100)
  private String mattached1;

  @Column(name = "Mattached2")
  @Size(max = 100)
  private String mattached2;

  @Column(name = "Mattached3")
  @Size(max = 100)
  private String mattached3;

  @Column(name = "Mattached4")
  @Size(max = 100)
  private String mattached4;

  @Column(name = "Mattached5")
  @Size(max = 100)
  private String mattached5;

  @Column(name = "Mcus_flag")
  @Size(max = 1)
  private String mcusFlag;

  @Column(name = "Mtek_flag")
  @Size(max = 1)
  private String mtekFlag;

  @Column(name = "Myog_flag")
  @Size(max = 1)
  private String myogFlag;

  @Column(name = "Myog_ok_no")
  @Size(max = 40)
  private String myogOkNo;

  @Column(name = "Morigin5", columnDefinition = "CHAR(2)")
  @Size(max = 2)
  private String morigin5;

  @Column(name = "M_neguk_gubun", columnDefinition = "CHAR(2)")
  @Size(max = 2)
  private String mNegukGubun;

  @Column(name = "M_neguk_code", columnDefinition = "CHAR(6)")
  @Size(max = 6)
  private String mNegukCode;

  @Column(name = "M_neguk_myun", columnDefinition = "CHAR(7)")
  @Size(max = 7)
  private String mNegukMyun;

  @Column(name = "M_edu_yn", columnDefinition = "CHAR(1)")
  @Size(max = 1)
  private String mEduYn;

  @Column(name = "M_nong_yn", columnDefinition = "CHAR(1)")
  @Size(max = 1)
  private String mNongYn;

  @Column(name = "MWei_Pri")
  private Double mWeiPri;

  @Column(name = "Main_key", columnDefinition = "CHAR(16)")
  @Size(max = 16)
  private String mainKey;

  @Column(name = "fta_yn", columnDefinition = "CHAR(1)")
  @Size(max = 1)
  private String ftaYn;

  @Column(name = "fta_text", columnDefinition = "CHAR(50)")
  @Size(max = 50)
  private String ftaText;

  @Column(name = "sample_yn", columnDefinition = "CHAR(1)")
  @Size(max = 1)
  private String sampleYn;

  @Column(name = "user_part_cd", columnDefinition = "CHAR(6)")
  @Size(max = 6)
  private String userPartCd;

  @Column(name = "madd_spec_count")
  private Double maddSpecCount;

  @Column(name = "madd_spec_content")
  @Size(max = 80)
  private String maddSpecContent;

  @Column(name = "minus_yn")
  @Size(max = 1)
  private String minusYn;

  @Column(name = "MVat_Flag")
  @Size(max = 1)
  private String mVatFlag;

  @Column(name = "MVat_Reduction_Code")
  @Size(max = 7)
  private String mVatReductionCode;

  @Column(name = "Mpurpose_Flag")
  @Size(max = 1)
  private String mpurposeFlag;

  @Column(name = "Mpurpose_No")
  @Size(max = 25)
  private String mpurposeNo;

  @Column(name = "mGoodscode")
  @Size(max = 2)
  private String mGoodscode;

  @Column(name = "mSpeccode")
  @Size(max = 40)
  private String mSpeccode;

  @Column(name = "mreq_userid")
  @Size(max = 10)
  private String mreqUserid;

  @Column(name = "mreq_username")
  @Size(max = 12)
  private String mreqUsername;

  @Column(name = "mreq_datetime")
  @Size(min = 14, max = 14)
  private String mreqDatetime;

  @Column(name = "mestmate_completiondate")
  @Size(min = 8, max = 8)
  private String mestmateCompletiondate;

  @Column(name = "mact_userid")
  @Size(max = 10)
  private String mactUserid;

  @Column(name = "mact_username")
  @Size(max = 12)
  private String mactUsername;

  @Column(name = "mprocess_datetime")
  @Size(min = 8, max = 8)
  private String mprocessDatetime;

  @Column(name = "mprocess_flag")
  @Size(max = 1)
  private String mprocessFlag;

  @Column(name = "Munitprice_Rate")
  private Double munitpriceRate;

  @Column(name = "deal_BizRNo")
  @Size(max = 10)
  private String dealBizRNo;

  @Column(name = "HsStatus")
  @Size(max = 2)
  private String hsStatus;

  @Column(name = "TpStatus")
  @Size(max = 2)
  private String tpStatus;

  @Column(name = "itemUseYn")
  @NotEmpty
  @Size(max = 1)
  private String itemUseYn;

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
