package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_Delivery_Request", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class DeliveryRequestVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "deliveryRequestKey")
  private BigDecimal deliveryRequestKey;

  // 업체정보
  @Column(name = "customerKey", updatable = false)
  @NotNull
  private BigDecimal customerKey;

  @Column(name = "customerDB", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String customerDb;

  @Column(name = "customerCode", updatable = false)
  @NotEmpty
  @Size(max = 4)
  private String customerCode;

  @Column(name = "customerName", updatable = false)
  @NotEmpty
  @Size(max = 100)
  private String customerName;

  @Column(name = "customerTaxNum", updatable = false)
  @NotEmpty
  @Size(min = 10, max = 10)
  private String customerTaxNum;

  // edms정보
  @Column(name = "mblNo")
  @Size(max = 20)
  private String mblNo;

  @Column(name = "hblNo", updatable = false)
  @Size(max = 20)
  private String hblNo;

  @Column(name = "cargoNo")
  @Size(max = 50)
  private String cargoNo;

  @Column(name = "singoNo", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String singoNo;

  @Column(name = "singoDate")
  @Size(max = 14)
  private String singoDate;

  @Column(name = "suirDate")
  @Size(max = 14)
  private String suirDate;

  @Column(name = "cargoStatus")
  @NotEmpty
  @Size(max = 10)
  private String cargoStatus;

  // 통관정보
  @Column(name = "pojangSu", columnDefinition = "numeric(18, 0)", updatable = false)
  @NotNull
  private BigDecimal pojangSu;

  @Column(name = "pojangDanwi")
  @Size(max = 2)
  private String pojangDanwi;

  @Column(name = "totalJung", columnDefinition = "numeric(18, 3)", scale = 3, updatable = false)
  @NotNull
  private BigDecimal totalJung;

  @Column(name = "jungDanwi")
  @Size(max = 10)
  private String jungDanwi;

  @Column(name = "impoSegwan")
  @Size(max = 3)
  private String impoSegwan;

  @Column(name = "impoJangchBuho")
  @Size(max = 8)
  private String impoJangchBuho;

  @Column(name = "impoJangchName")
  @Size(max = 30)
  private String impoJangchName;

  @Column(name = "impoJangchJangso")
  @Size(max = 10)
  private String impoJangchJangso;

  @Column(name = "deliveryStatus")
  @NotEmpty
  @Size(max = 10)
  private String deliveryStatus;

  // 화주/포워딩/운송요청업체
  @Column(name = "impoBanipDate")
  @Size(max = 14)
  private String impoBanipDate;

  @Column(name = "banipPlace")
  @Size(max = 20)
  private String banipPlace;

  @Column(name = "cargoSize")
  @Size(max = 20)
  private String cargoSize;

  @Column(name = "deliveryPojangSu", columnDefinition = "numeric(18, 0)")
  private BigDecimal deliveryPojangSu;

  @Column(name = "deliveryPojangDanwi")
  @Size(max = 10)
  private String deliveryPojangDanwi;

  @Column(name = "deliveryJung", columnDefinition = "numeric(18, 3)", scale = 3)
  private BigDecimal deliveryJung;

  @Column(name = "deliveryJungDanwi")
  @Size(max = 10)
  private String deliveryJungDanwi;

  @Column(name = "requestCoName")
  @Size(max = 100)
  private String requestCoName;

  @Column(name = "requestMan")
  @Size(max = 50)
  private String requestMan;

  @Column(name = "requestPhone")
  @Size(max = 50)
  private String requestPhone;

  @Column(name = "requestDate", updatable = false)
  @Size(max = 14)
  private String requestDate;

  @Column(name = "requestNote")
  @Size(max = 4000)
  private String requestNote;

  @Column(name = "requestInvisibleNote")
  @Size(max = 4000)
  private String requestInvisibleNote;

  @Column(name = "deliveryDate")
  @Size(max = 14)
  private String deliveryDate;

  // 운송요청업체
  @Column(name = "assignId")
  @Size(max = 20)
  private String assignId;

  @Column(name = "assignMan")
  @Size(max = 20)
  private String assignMan;

  @Column(name = "assignPhone")
  @Size(max = 50)
  private String assignPhone;

  @Column(name = "allocateRequestDate")
  @Size(max = 14)
  private String allocateRequestDate;

  @Column(name = "deliveryCoKey")
  private BigDecimal deliveryCoKey;

  @Column(name = "deliveryCoName")
  @Size(max = 100)
  private String deliveryCoName;

  @Column(name = "deliveryCoPhone")
  @Size(max = 50)
  private String deliveryCoPhone;

  // 화주/포워딩/운송요청업체
  @Column(name = "deliveryCarryingInKey")
  private BigDecimal deliveryCarryingInKey;

  @Column(name = "deliveryCarryingInName")
  @Size(max = 200)
  private String deliveryCarryingInName;

  @Column(name = "deliveryCarryingInTaxNum")
  @Size(max = 50)
  private String deliveryCarryingInTaxNum;

  @Column(name = "deliveryCarryingInPhone")
  @Size(max = 50)
  private String deliveryCarryingInPhone;

  @Column(name = "deliveryCarryingInEmail")
  @Size(max = 200)
  private String deliveryCarryingInEmail;

  @Column(name = "deliveryCarryingInFax")
  @Size(max = 50)
  private String deliveryCarryingInFax;

  @Column(name = "deliveryCarryingInMan")
  @Size(max = 50)
  private String deliveryCarryingInMan;

  @Column(name = "deliveryCarryingInMobile")
  @Size(max = 50)
  private String deliveryCarryingInMobile;

  @Column(name = "deliveryCarryingInAddr")
  @Size(max = 200)
  private String deliveryCarryingInAddr;

  // 운송사
  @Column(name = "allocateDate")
  @Size(max = 14)
  private String allocateDate;

  @Column(name = "deliveryCarKey")
  private BigDecimal deliveryCarKey;

  @Column(name = "deliveryCarName")
  @Size(max = 50)
  private String deliveryCarName;

  @Column(name = "deliveryCarPhone")
  @Size(max = 50)
  private String deliveryCarPhone;

  @Column(name = "deliveryCarNum")
  @Size(max = 50)
  private String deliveryCarNum;

  @Column(name = "deliveryStartDate")
  @Size(max = 14)
  private String deliveryStartDate;

  @Column(name = "deliveryEndDate")
  @Size(max = 14)
  private String deliveryEndDate;

  @Column(name = "damage")
  @Size(max = 50)
  private String damage;

  @Column(name = "damageDetail")
  @Size(max = 255)
  private String damageDetail;

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

  @Column(name = "landingArea")
  @Size(max = 20)
  private String landingArea;

  @Column(name = "arrivalTime")
  @Size(max = 50)
  private String arrivalTime;

  @Column(name = "deliveryCarryingInEmailTax")
  @Size(max = 100)
  private String deliveryCarryingInEmailTax;

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
