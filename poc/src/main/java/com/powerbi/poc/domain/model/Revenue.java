package com.powerbi.poc.domain.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import java.util.Objects;

@Entity
@IdClass(RevenueId.class)
public class Revenue {

  @Basic
  @Column(name = "CLIENTID")
  @Id
  private Integer clientid;
  @Basic
  @Column(name = "PRODUCTID")
  @Id
  private Integer productid;
  @Basic
  @Column(name = "ORDERID")
  @Id
  private String orderid;
  @Basic
  @Column(name = "REVENUE")
  private Integer revenue;
  @Basic
  @Column(name = "SALESDATE")
  private String salesdate;

  public Integer getClientid() {
    return clientid;
  }

  public void setClientid(Integer clientid) {
    this.clientid = clientid;
  }

  public String getOrderid() {
    return orderid;
  }

  public void setOrderid(String orderid) {
    this.orderid = orderid;
  }

  public Integer getProductid() {
    return productid;
  }

  public void setProductid(Integer productid) {
    this.productid = productid;
  }

  public Integer getRevenue() {
    return revenue;
  }

  public void setRevenue(Integer revenue) {
    this.revenue = revenue;
  }

  public String getSalesdate() {
    return salesdate;
  }

  public void setSalesdate(String salesdate) {
    this.salesdate = salesdate;
  }

  @Override
  public int hashCode() {
    return Objects.hash(clientid, productid, orderid, revenue, salesdate);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Revenue revenue1 = (Revenue) o;
    return Objects.equals(clientid, revenue1.clientid) && Objects.equals(productid, revenue1.productid)
        && Objects.equals(orderid, revenue1.orderid) && Objects.equals(revenue, revenue1.revenue) && Objects.equals(
        salesdate, revenue1.salesdate);
  }
}
