package com.edwards.commons;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@Data
public class CmmnErrorResponse {
  private String message;
  private String code;
  private List<FieldError> errors;

  public static class FieldError {
	private String field;
	private String value;
	private String reason;
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public CmmnErrorResponse handleException(Exception e) {
	CmmnErrorResponse errorResponse = new CmmnErrorResponse();
	errorResponse.setMessage(e.getMessage());
	errorResponse.setCode(e.getCause().toString());
	return errorResponse;
  }
}