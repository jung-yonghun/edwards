package com.edwards.biz.itemMng;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

public class ItemAttachFileDTO {
  @Data
  public static class additionalInfo {
	@NotNull
	private BigDecimal itemFileKey;
	@Size(max = 500)
	private String itemFileCategory;
	@Size(max = 500)
	private String itemSearchKeyword;
	@Size(max = 1000)
	private String itemFileNote;
	@Size(max = 10)
	private String itemFileAccessGrade;
	@Size(max = 10)
	private String editUserId;
	@Temporal(TemporalType.TIMESTAMP)
	private Date editDate;
  }
}