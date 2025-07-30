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
@Table(name = "CPS_SaveTeam", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsSaveTeamVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "stKey")
	private BigDecimal stKey;

	@Column(name = "teamCode", updatable = false)
	@NotEmpty
	@Size(max = 10)
	private String teamCode;

	@Column(name = "teamName", updatable = false)
	@NotEmpty
	@Size(max = 100)
	private String teamName;

	@Column(name = "userId", updatable = false)
	@NotEmpty
	@Size(max = 100)
	private String userId;

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