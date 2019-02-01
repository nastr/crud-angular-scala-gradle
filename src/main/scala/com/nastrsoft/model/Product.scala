package com.nastrsoft.model

import java.lang.Long

import javax.persistence.{Entity, GeneratedValue, Id}
import javax.validation.constraints.NotEmpty

import scala.annotation.meta.field
import scala.beans.BeanProperty

@Entity
class Product(@(Id@field) @(GeneratedValue@field) @BeanProperty var id: Long,
              @BeanProperty @(NotEmpty@field) var name: String,
              @BeanProperty @(NotEmpty@field) var color: String) {

  def this() = this(null, null, null)
}