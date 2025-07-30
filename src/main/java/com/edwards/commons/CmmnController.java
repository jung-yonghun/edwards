package com.edwards.commons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class CmmnController {
  @Autowired
  private MessageSource messageSource;

  public void checkPagingParamsForMapper(Map map) throws Exception {
	String _pageNumber = CmmnUtils.isContainsMapValue(map, "_pageNumber") ? String.valueOf(map.get("_pageNumber")) : null;
	String _pageRow = CmmnUtils.isContainsMapValue(map, "_pageRow") ? String.valueOf(map.get("_pageRow")) : null;
	String page = CmmnUtils.isContainsMapValue(map, "page") ? String.valueOf(map.get("page")) : null;
	String size = CmmnUtils.isContainsMapValue(map, "size") ? String.valueOf(map.get("size")) : null;
	if (CmmnUtils.isNull(_pageNumber) || CmmnUtils.isNull(_pageRow) || CmmnUtils.isNull(page) || CmmnUtils.isNull(size)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "필수검색조건 오류(mapper)", ""};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}
  }

  /**
   * Is common valid set.(공용 클래스 validator)
   *
   * @param <T>     the type parameter
   * @param toCheck the to check
   * @return the set
   */
  public <T> Set<ConstraintViolation<T>> isCommonValid(T toCheck) {
	ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	Validator validator = factory.getValidator();
	Set<ConstraintViolation<T>> violations = validator.validate(toCheck);

	return violations;
  }

  /**
   * Gets user info setting db.(사용자 설정DB 리턴)
   * 입력값(_defaultDB) 없을시 세션 설정값(DB) 리턴
   *
   * @param request the request
   * @param args    the args
   * @return the user info setting db
   * @throws Exception the exception
   */
  public final String getUserInfoSettingDB(HttpServletRequest request, Map args) throws Exception {
	String returnDB = null;
	returnDB = args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_DEFAULTDB));

	if (returnDB == null) {
	  throw new Exception();
	} else {
	  return returnDB;
	}
  }

  /**
   * Common error exception list.(공용 에러 리턴값 처리: 미사용)
   *
   * @param bindingResult the binding result
   * @return the list
   */
  public static final List commonErrorException(BindingResult bindingResult) {
	List<FieldError> errors = bindingResult.getFieldErrors();
	ArrayList<Object> list = new ArrayList<>();
	for (FieldError error : errors) {
	  list.add(error.getObjectName() + " - " + error.getField() + " - " + error.getDefaultMessage());
	}
	return list;
  }
}
