package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_ExcelLogAccess", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsExcelLogAccessVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "exlogKey")
	private BigDecimal exlogKey;

	@Column(name = "gubun")
	@Size(max = 100)
	private String gubun;

	@Column(name = "clientIp")
	private String clientIp;

	@Column(name = "fromDate")
	@Size(max = 8)
	private String fromDate;

	@Column(name = "toDate")
	@Size(max = 8)
	private String toDate;

	@Column(name = "addUserKey", updatable = false)
	@Size(max = 18)
	private String addUserKey;

	@Column(name = "addDtm", updatable = false)
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;
}