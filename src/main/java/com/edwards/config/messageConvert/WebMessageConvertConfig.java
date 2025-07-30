package com.edwards.config.messageConvert;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

//@Configuration
public class WebMessageConvertConfig extends WebMvcConfigurerAdapter {
  @Bean
  public MappingJackson2HttpMessageConverter customJackson2HttpMessageConverter() {
	MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
	ObjectMapper objectMapper = new ObjectMapper();
	//objectMapper.setPropertyNamingStrategy(new LowerCaseNamingStrategy());
//	jsonConverter.setSupportedMediaTypes(Arrays.asList(MediaType.TEXT_PLAIN));
//	jsonConverter.setObjectMapper(objectMapper);
	return jsonConverter;
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
	converters.add(customJackson2HttpMessageConverter());
	super.configureMessageConverters(converters);
  }
}