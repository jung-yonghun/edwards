package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_Yogun_ItemLog", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsYogunItemLogVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "yogItemLogKey")
	private BigDecimal yogItemLogKey;

	@Column(name = "yogSaup")
	@Size(max = 10)
	private String yogSaup;

	@Column(name = "bmmodelCode")
	@Size(max = 50)
	private String bmmodelCode;

	@Column(name = "ammodelCode")
	@Size(max = 50)
	private String ammodelCode;

	@Column(name = "bjajaeCode")
	@Size(max = 50)
	private String bjajaeCode;

	@Column(name = "ajajaeCode")
	@Size(max = 50)
	private String ajajaeCode;

	@Column(name = "addUserId", updatable = false)
	@NotEmpty
	@Size(max = 10)
	private String addUserId;

	@Column(name = "addUserNm", updatable = false)
	@Size(max = 50)
	private String addUserNm;

	@Column(name = "addDtm", updatable = false)
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;
}