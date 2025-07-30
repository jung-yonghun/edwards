package com.edwards.biz.itemMng;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

public class ItemMasterDTO {
  /**
   * The type Search response.(리스트 조회용 response)
   */
  @Getter
  @Setter
  public static class searchResponse {
	private BigDecimal itemKey;
	private String mcountNo;
	private String mmodelCode;
	private String mbomCode;
	private String mdivisionCode;
	//	private String mtcano;
//	private String mcoCode;
	private String mcoName;
	//	private String mcoCom;
	private String mshipper;
	//	private String mshipperCode;
	private BigDecimal mshipperKey;
	private String mshipperCertificationType;
	private String mshipperCertificationNum;
	//	private String mmaker;
//	private String mregDate;
//	private String mendDate;
	private String mindoCode;
	private String mhsCode;
	private String mhsCodeNew;
	private String mhsKind;
	private Double mhsRate;
	//	private String mstdGoods;
	private String mgerGoods;
	private String mspCode;
	//	private String msangpyo;
	private String mmodel1;
	private String mmodel2;
	private String mmodel3;
	private String mingredient1;
	private String mingredient2;
	private String mingredient3;
	private String morigin1;
	private String morigin2;
	private String morigin3;
	private String morigin4;
	//	private String moriginRemark;
//	private String mprovisional;
	private Double mprovisionalRate;
	private String mprovisionalRemark;
	//	private String mqtyUt;
	private String munitpriceCurrent;
	private Double munitprice;
	//	private String mdrawUnit;
//	private String mcusEntry1;
//	private String mcusEntry2;
//	private String mcusEntry3;
//	private String mconfirmFlag;
//	private String mconfirmDate;
//	private String mconfirmUser;
//	private String mreviewFlag;
//	private String mreviewCause;
	private String mremark1;
	private String mremark2;
	private String mspecialRemark1;
	private String mspecialRemark2;
	private String mspecialRemark3;
	//	private String mattached1;
//	private String mattached2;
//	private String mattached3;
//	private String mattached4;
//	private String mattached5;
//	private String mcusFlag;
//	private String mtekFlag;
//	private String myogFlag;
	private String myogOkNo;
	//	private String firstDate;
//	private String firstUser;
//	private String lastDate;
//	private String lastUser;
//	private String morigin5;
//	private String mNegukGubun;
//	private String mNegukCode;
//	private String mNegukMyun;
//	private String mEduYn;
//	private String mNongYn;
//	private Double mWeiPri;
//	private String mainKey;
	private String ftaYn;
	private String ftaText;
	//	private String sampleYn;
//	private String userPartCd;
//	private Double maddSpecCount;
//	private String maddSpecContent;
//	private String minusYn;
//	private String mVatFlag;
//	private String mVatReductionCode;
//	private String mpurposeFlag;
//	private String mpurposeNo;
//	private String mGoodscode;
//	private String mSpeccode;
//	private String mreqUserid;
//	private String mreqUsername;
//	private String mreqDatetime;
//	private String mestmateCompletiondate;
//	private String mactUserid;
//	private String mactUsername;
//	private String mprocessDatetime;
//	private String mprocessFlag;
	private Double munitpriceRate;
	//	private String dealBizRNo;
	private String hsStatus;
	private String tpStatus;
	private String itemUseYn;
//	private Date addDate;
//	private String addUserId;
//	private Date editDate;
//	private String editUserId;
  }

  @Getter
  @Setter
  public static class popupResponse {
	private BigDecimal itemKey;
	private String mcountNo;
	private String mmodelCode;
	private String mcoName;
	private String mstdGoods;
	private String mgerGoods;
	private String mmaker;
	private String mmodel1;
	private String mmodel2;
	private String mmodel3;
	private String mingredient1;
	private String mingredient2;
	private String mingredient3;
	private String ftaYn;
	private String hsStatus;
	private String tpStatus;
	private String itemUseYn;
  }
}