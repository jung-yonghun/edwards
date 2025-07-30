package com.edwards.config.dataSource;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@MapperScan(value="com.edwards.biz", sqlSessionFactoryRef="sqlSessionFactory3")
public class CdataSourceConfig {
	@Bean(name = "mariaDataSource")
	@ConfigurationProperties(prefix = "maria.datasource")
	public DataSource mariaDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean(name = "sqlSessionFactory3")
	public SqlSessionFactory sqlSessionFactory3(@Autowired @Qualifier("mariaDataSource") DataSource dataSource, ApplicationContext applicationContext)  throws Exception {
		SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
		factoryBean.setDataSource(dataSource);
		factoryBean.setMapperLocations(applicationContext.getResources("classpath:mybatis/mapper/maria/*.xml"));

		return factoryBean.getObject();
	}

	@Bean
	public SqlSessionTemplate SqlSessionTemplate3(@Autowired @Qualifier("sqlSessionFactory3") SqlSessionFactory factory) {
		return new SqlSessionTemplate(factory);
	}
}