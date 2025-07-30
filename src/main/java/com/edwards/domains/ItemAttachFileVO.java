package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TBR_Item_AttachFile", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class ItemAttachFileVO {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ITEM_FILE_KEY")
  private BigDecimal itemFileKey;

  @Column(name = "ITEM_MCOUNT_NO")
  @NotEmpty
  @Size(max = 50)
  private String itemMcountNo;

  @Column(name = "ITEM_MCOUNT_TYPE")
  @Size(max = 500)
  private String itemMcountType;

  @Column(name = "ITEM_DOC_GROUP")
  @Size(max = 10)
  private String itemDocGroup;

  @Column(name = "ITEM_FILE_CATEGORY")
  @Size(max = 500)
  private String itemFileCategory;

  @Column(name = "ITEM_SERVER_GUBUN", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String itemServerGubun;

  @Column(name = "ITEM_SERVER_IP", updatable = false)
  @NotEmpty
  @Size(max = 100)
  private String itemServerIp;

  @Column(name = "ITEM_FILE_PATH", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String itemFilePath;

  @Column(name = "ITEM_SAVE_FILE_NAME", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String itemSaveFileName;

  @Column(name = "ITEM_ORG_FILE_NAME", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String itemOrgFileName;

  @Column(name = "ITEM_FILE_SIZE", updatable = false)
  @NotNull
  private BigDecimal itemFileSize;

  @Column(name = "ITEM_FILE_EXT", updatable = false)
  @Size(max = 100)
  private String itemFileExt;

  @Column(name = "ITEM_SEARCH_KEYWORD")
  @Size(max = 500)
  private String itemSearchKeyword;

  @Column(name = "ITEM_FILE_NOTE")
  @Size(max = 1000)
  private String itemFileNote;

  @Column(name = "ITEM_FILE_ACCESS_GRADE")
  @Size(max = 10)
  private String itemFileAccessGrade;

  @Column(name = "USEYN")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useyn;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @Column(name = "adduserNm")
  @Size(max = 50)
  private String adduserNm;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "adddtm")
  @Size(max = 14)
  private String adddtm;

  @Column(name = "editDtm")
  @Size(max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDate = new Date();
  }

  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
  }
}