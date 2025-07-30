package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
@Table(name = "TBR_Ftp_Send_Log", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter

public class FtpLogVO extends CmmnExternalClass {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "\"ftpSendKey\"")
  private BigDecimal ftpSendKey;

  @Column(name = "\"singoNum\"")
  @NotEmpty
  @Size(max = 18)
  private String singoNum;

  @Column(name = "\"edmsFileKey\"")
  @NotEmpty
  @Size(max = 18)
  private String edmsFileKey;

  @Column(name = "\"count\"")
  @NotEmpty
  private String count;

  @Column(name = "\"taxNum\"")
  @NotEmpty
  @Size(max = 10)
  private String taxNum;

  @Column(name = "\"addUserId\"", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "\"addDtm\"", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;
}
