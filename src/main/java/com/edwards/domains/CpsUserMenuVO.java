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
@Table(name = "CPS_User_Menu", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter

public class CpsUserMenuVO extends CmmnExternalClass {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userMenuKey")
	private BigDecimal userMenuKey;

	@Column(name = "userKey")
	@NotEmpty
	@Size(max = 18)
	private String userKey;

	@Column(name = "sortOrder")
	@Size(max = 4)
	private String sortOrder;

	@Column(name = "useYn")
	@NotEmpty
	@Size(max = 1)
	private String useYn;

	@Column(name = "addUserKey")
	@Size(max = 18)
	private String addUserKey;

	@Column(name = "\"addDtm\"")
	@Size(min = 14, max = 14)
	private String addDtm;

	@Column(name = "editUserKey")
	@Size(max = 18)
	private String editUserKey;

	@Column(name = "\"editDtm\"")
	@Size(min = 14, max = 14)
	private String editDtm;

	@PreUpdate
	public void preUpdate() {
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		this.editDtm = currentDatetime;
	}
}
