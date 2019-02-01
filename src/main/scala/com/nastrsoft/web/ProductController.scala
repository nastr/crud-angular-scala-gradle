package com.nastrsoft.web

import java.util.function
import java.util.stream.Collectors

import com.fasterxml.jackson.databind.ObjectMapper
import com.nastrsoft.model.Product
import com.nastrsoft.service.ProductRepository
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.{Page, Pageable}
import org.springframework.http.{HttpStatus, MediaType, ResponseEntity}
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(Array("/products"))
class ProductController @Autowired()(private val productRepository: ProductRepository,
                                     private val objectMapper: ObjectMapper) {

  private val logger: Logger = LoggerFactory.getLogger(classOf[ProductController])

  @GetMapping(value = Array("{id}"), produces = Array(MediaType.APPLICATION_JSON_UTF8_VALUE))
  def getById(@PathVariable("id") id: Long, model: Model) = {
    val products = productRepository.findById(id)
    if (products.isPresent) {
      val product = objectMapper.writeValueAsString(products.get()).mkString
      logger.debug(objectMapper.writeValueAsString(product))
      new ResponseEntity[String](product, HttpStatus.OK)
    } else
      new ResponseEntity[Void](HttpStatus.NOT_FOUND)
  }

  @PostMapping(consumes = Array(MediaType.APPLICATION_JSON_UTF8_VALUE))
  def create(@RequestBody product: Product, bindingResult: BindingResult) =
    if (bindingResult.hasErrors) {
      logger.error(bindingResult.toString)
      new ResponseEntity[Void](HttpStatus.NOT_ACCEPTABLE)
    } else {
      productRepository.save(product)
      logger.debug("saved: " + objectMapper.writeValueAsString(product))
      new ResponseEntity[Void](HttpStatus.CREATED)
    }

  @PutMapping(value = Array("{id}"), consumes = Array(MediaType.APPLICATION_JSON_UTF8_VALUE))
  def updateByBody(@PathVariable("id") id: Long, @RequestBody product: Product, bindingResult: BindingResult) =
    if (bindingResult.hasErrors) {
      logger.error(bindingResult.toString)
      new ResponseEntity[Void](HttpStatus.NOT_MODIFIED)
    } else {
      product.id = id
      productRepository.save(product)
      logger.debug("updated: " + objectMapper.writeValueAsString(product))
      new ResponseEntity[Void](HttpStatus.OK)
    }

  @PutMapping(consumes = Array(MediaType.APPLICATION_JSON_UTF8_VALUE))
  def updateById(@RequestBody product: Product, bindingResult: BindingResult) =
    if (bindingResult.hasErrors) {
      logger.error(bindingResult.toString)
      new ResponseEntity[Void](HttpStatus.NOT_MODIFIED)
    } else {
      productRepository.save(product)
      logger.debug("updated: " + objectMapper.writeValueAsString(product))
      new ResponseEntity[Void](HttpStatus.OK)
    }

  @DeleteMapping(value = Array("{id}"))
  def deleteById(@PathVariable("id") id: Long) = {
    productRepository.deleteById(id)
    logger.debug("deleted: " + id)
    new ResponseEntity[Void](HttpStatus.NO_CONTENT)
  }

  @GetMapping(produces = Array(MediaType.APPLICATION_JSON_UTF8_VALUE))
  def listPageable(pageable: Pageable) = {
    val pr: Page[Product] = productRepository.findAll(pageable)

    val mapper: function.Function[_ >: Product, _ <: String] = (p: Product) => objectMapper.writeValueAsString(p)

    val product: String = pr.map[String](mapper).get.collect(Collectors.joining(",", "[", "]"))
    logger.debug(product)
    new ResponseEntity[String](product, HttpStatus.OK)
  }


}
