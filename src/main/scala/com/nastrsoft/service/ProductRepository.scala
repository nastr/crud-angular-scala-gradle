package com.nastrsoft.service

import java.lang.Long

import com.nastrsoft.model.Product
import org.springframework.data.repository.PagingAndSortingRepository

trait ProductRepository extends PagingAndSortingRepository[Product, Long] /*with CrudRepository[Product, Long]*/ {

}
