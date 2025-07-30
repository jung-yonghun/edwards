package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_Field_Master", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsFieldMasterVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "fieldKey")
	private BigDecimal fieldKey;

	@Column(name = "defaultDB")
	@NotEmpty
	@Size(max = 30)
	private String defaultDB;

	@Column(name = "gubun")
	@NotEmpty
	@Size(max = 10)
	private String gubun;

	@Column(name = "imexKey")
	@Size(max = 15)
	private String imexKey;

	@Column(name = "singoNo")
	@Size(max = 15)
	private String singoNo;

	@Column(name = "status")
	@NotEmpty
	@Size(max = 20)
	private String status;

	@Column(name = "fieldRequest")
	@Size(max = 1000)
	private String fieldRequest;

	@Column(name = "fieldNote1")
	@Size(max = 1000)
	private String fieldNote1;

	@Column(name = "fieldNote2")
	@Size(max = 1000)
	private String fieldNote2;

	@Column(name = "fieldNote3")
	@Size(max = 1000)
	private String fieldNote3;

	@Column(name = "useYn")
	@NotEmpty
	@Size(max = 1)
	private String useYn;

	@Column(name = "addUserId")
	@NotEmpty
	@Size(max = 18)
	private String addUserId;

	@Column(name = "addDtm")
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;

	@Column(name = "editUserId")
	@Size(max = 18)
	private String editUserId;

	@Column(name = "editDtm")
	@Size(min = 14, max = 14)
	private String editDtm;

	@PreUpdate
	public void preUpdate() {
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		this.editDtm = currentDatetime;
	}
}