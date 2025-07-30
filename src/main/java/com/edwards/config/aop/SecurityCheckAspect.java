package com.edwards.config.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;


//@Aspect
@Configuration
public class SecurityCheckAspect {
  @Before("execution(* com.edms..*Controller.*(..))")
  @Order(1)
  public void checkSession(JoinPoint joinPoint) throws Exception {
	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
  }
}