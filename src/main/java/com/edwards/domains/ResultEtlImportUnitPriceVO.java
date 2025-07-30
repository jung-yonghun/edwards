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

/**
 * Created by mjlee on 2017-04-21.
 */
@Entity
@Table(name = "TBR_RESULT_ETL_Import_UnitPrice", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class ResultEtlImportUnitPriceVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "etlUnitPriceKey")
  private BigDecimal etlUnitPriceKey;

  @Column(name = "db")
  @NotEmpty
  @Size(max = 50)
  private String db;

  @Column(name = "yyyy")
  @NotEmpty
  @Size(min = 4, max = 4)
  private String yyyy;

  @Column(name = "mm")
  @NotEmpty
  @Size(min = 2, max = 2)
  private String mm;

  @Column(name = "dd")
  @NotEmpty
  @Size(min = 2, max = 2)
  private String dd;

  @Column(name = "yyyymmdd")
  @NotEmpty
  @Size(min = 8, max = 8)
  private String yyyymmdd;

  @Column(name = "Impo_Key")
  @Size(max = 11)
  private String impoKey;

  @Column(name = "Impum_lan")
  @Size(max = 3)
  private String impumLan;

  @Column(name = "Impum_heang")
  @Size(max = 2)
  private String impumHeang;

  @Column(name = "Impo_napse_saup")
  @NotEmpty
  @Size(max = 20)
  private String impoNapseSaup;

  @Column(name = "itemKey")
  @NotNull
  private BigDecimal itemKey;

  @Column(name = "itemMcountNo")
  @Size(max = 30)
  private String itemMcountNo;

  @Column(name = "itemMmodelCode")
  @NotEmpty
  @Size(max = 50)
  private String itemMmodelCode;

  @Column(name = "itemUnitPrice", columnDefinition = "float")
  private Double itemUnitPrice;

  @Column(name = "addDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;

  @PrePersist
  public void prePersist() {
	this.addDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }
}
