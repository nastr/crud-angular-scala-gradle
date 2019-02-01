package com.nastrsoft

import com.nastrsoft.model.Product
import com.nastrsoft.service.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class DbPopulator @Autowired()(val productRepository: ProductRepository) extends CommandLineRunner {
  override def run(args: String*): Unit = {
    (1 to 3).foreach(i => {
      productRepository.save(new Product(id = null, name = s"Product $i", color = s"Address $i"))
    })
  }
}
