package com.powerbi.poc.domain.model;

import java.io.Serializable;

public class RevenueId implements Serializable {

  private Integer clientid;
  private Integer productid;
  private String orderid;

  public RevenueId(Integer clientid, Integer productid, String orderid) {
    this.clientid = clientid;
    this.productid = productid;
    this.orderid = orderid;
  }
}
