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
@Table(name = "CPS_SYS_Menu", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter

public class CpsSysMenuVO extends CmmnExternalClass {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "menuKey")
	private BigDecimal menuKey;

	@Column(name = "menuName")
	@NotEmpty
	@Size(max = 100)
	private String menuName;

	@Column(name = "menuEngName")
	@Size(max = 500)
	private String menuEngName;

	@Column(name = "menuPath")
	@Size(max = 500)
	private String menuPath;

	@Column(name = "menuEngPath")
	@Size(max = 500)
	private String menuEngPath;

	@Column(name = "note")
	@Size(max = 100)
	private String note;

	@Column(name = "parentID")
	@NotEmpty
	@Size(max = 18)
	private String parentID;

	@Column(name = "sortOrder")
	@NotEmpty
	@Size(max = 4)
	private String sortOrder;

	@Column(name = "menuBasic")
	@Size(max = 1)
	private String menuBasic;

	@Column(name = "menuTestAll")
	@Size(max = 1)
	private String menuTestAll;

	@Column(name = "useYn")
	@NotEmpty
	@Size(max = 1)
	private String useYn;

	@Column(name = "addUserKey")
	@Size(max = 18)
	private String addUserKey;

	@Column(name = "addDtm")
	@Size(min = 14, max = 14)
	private String addDtm;

	@Column(name = "editUserKey")
	@Size(max = 18)
	private String editUserKey;

	@Column(name = "editDtm")
	@Size(min = 14, max = 14)
	private String editDtm;

	@PreUpdate
	public void preUpdate() {
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		this.editDtm = currentDatetime;
	}
}
