package com.edwards.config.email;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@SpringBootApplication
@EnableSpringDataWebSupport
@PropertySource(value = {"classpath:/application.properties"})
public class EmailConfig {
  @Autowired
  private Environment env;

  @Bean
  public JavaMailSender mailSender(){
	JavaMailSenderImpl sender = new JavaMailSenderImpl();
	StandardPBEStringEncryptor encrypt = new StandardPBEStringEncryptor();
	encrypt.setAlgorithm(env.getProperty("enc.algorithm"));
	encrypt.setPassword(env.getProperty("enc.password"));

	sender.setHost(encrypt.decrypt(env.getProperty("email.host")));
	sender.setPort(Integer.parseInt("25"));
	sender.setUsername("admin@esein.co.kr");
	sender.setPassword("customs!234");

	return sender;
  }
}