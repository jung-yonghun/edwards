package com.edwards.config.properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;

@Configuration
public class PropertiesConfig {
  @Bean
  public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() throws IOException {
	PropertySourcesPlaceholderConfigurer propertyConfigurer = new PropertySourcesPlaceholderConfigurer();
	propertyConfigurer.setLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/**/*.properties"));
	return propertyConfigurer;
  }
}