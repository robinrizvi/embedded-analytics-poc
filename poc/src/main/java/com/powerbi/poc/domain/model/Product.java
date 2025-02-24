package com.powerbi.poc.domain.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Product {

  @Basic
  @Column(name = "PRODUCTID")
  @Id
  private Integer productid;
  @Basic
  @Column(name = "PRODUCTNAME")
  private String productname;
  @Basic
  @Column(name = "CATEGORY")
  private String category;
  @Basic
  @Column(name = "RELEASED")
  private Integer released;

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public Integer getProductid() {
    return productid;
  }

  public void setProductid(Integer productid) {
    this.productid = productid;
  }

  public String getProductname() {
    return productname;
  }

  public void setProductname(String productname) {
    this.productname = productname;
  }

  public Integer getReleased() {
    return released;
  }

  public void setReleased(Integer released) {
    this.released = released;
  }

  @Override
  public int hashCode() {
    return Objects.hash(productid, productname, category, released);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Product product = (Product) o;
    return Objects.equals(productid, product.productid) && Objects.equals(productname, product.productname)
        && Objects.equals(category, product.category) && Objects.equals(released, product.released);
  }
}
