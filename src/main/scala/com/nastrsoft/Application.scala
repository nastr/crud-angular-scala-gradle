package com.nastrsoft

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.web.cors.{CorsConfiguration, UrlBasedCorsConfigurationSource}
import org.springframework.web.filter.CorsFilter

object Application extends App {
  SpringApplication.run(classOf[Application])
}

@SpringBootApplication
class Application {
  @Bean
  def corsFilter: FilterRegistrationBean[CorsFilter] = {
    val source: UrlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource
    val config: CorsConfiguration = new CorsConfiguration
    config.setAllowCredentials(true)
    config.addAllowedOrigin("*")
    config.addAllowedHeader("*")
    config.addAllowedMethod("*")
    source.registerCorsConfiguration("/**", config)
    val bean: FilterRegistrationBean[CorsFilter] = new FilterRegistrationBean(new CorsFilter(source))
    bean.setOrder(0)
    bean
  }
}