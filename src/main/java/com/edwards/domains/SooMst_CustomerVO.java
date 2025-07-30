package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TBR_MST_Customer", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Data
public class SooMst_CustomerVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "customerKey")
  private BigDecimal customerKey;

  @Column(name = "customerDB")
  private String customerDb;

  @Column(name = "customerCode")
  private String customerCode;

  @Column(name = "customerName")
  private String customerName;

  @Column(name = "customerGubun")
  private String customerGubun;

  @Column(name = "customerTaxNum")
  private String customerTaxNum;

  @Column(name = "customerJuminNum")
  private String customerJuminNum;

  @Column(name = "customerYeogwunNum")
  private String customerYeogwunNum;

  @Column(name = "customerUptae")
  private String customerUptae;

  @Column(name = "customerJong")
  private String customerJong;

  @Column(name = "customerUniqueCode")
  private String customerUniqueCode;

  @Column(name = "customerCeoName")
  private String customerCeoName;

  @Column(name = "customerPostNum")
  private String customerPostNum;

  @Column(name = "customerAddress")
  private String customerAddress;

  @Column(name = "customerNewPostNum")
  private String customerNewPostNum;

  @Column(name = "customerTelNum")
  private String customerTelNum;

  @Column(name = "customerFaxNum")
  private String customerFaxNum;

  @Column(name = "customerEmail")
  private String customerEmail;

  @Column(name = "updatedDate")
  private String updatedDate;

  @Column(name = "corperationKey")
  private BigDecimal corperationKey;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserId", updatable = false)
  private String addUserId;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "editUserId")
  private String editUserId;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;
}
