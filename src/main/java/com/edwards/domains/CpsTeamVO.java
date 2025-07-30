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
@Table(name = "CPS_Team", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsTeamVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "teamKey")
	private BigDecimal teamKey;

	@Column(name = "teamCode", updatable = false)
	@NotEmpty
	@Size(max = 10)
	private String teamCode;

	@Column(name = "teamName", updatable = false)
	@NotEmpty
	@Size(max = 100)
	private String teamName;

	@Column(name = "teamMail", updatable = false)
	@Size(max = 100)
	private String teamMail;

	@Column(name = "defaultDB", updatable = false)
	@Size(max = 30)
	private String defaultDB;

	@Column(name = "useYn")
	@NotEmpty
	@Size(min = 1, max = 1)
	private String useYn;

	@Column(name = "addUserKey", updatable = false)
	@NotEmpty
	@Size(max = 18)
	private String addUserKey;

	@Column(name = "addDtm", updatable = false)
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;

	@Column(name = "editUserKey", updatable = false)
	@Size(max = 18)
	private String editUserKey;

	@Column(name = "editDtm", updatable = false)
	@Size(min = 14, max = 14)
	private String editDtm;

	@PreUpdate
	public void preUpdate(){
		this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	}

	@PrePersist
	public void prePersist(){
		this.editUserKey 	= null;
		this.editDtm 		= null;
	}
}