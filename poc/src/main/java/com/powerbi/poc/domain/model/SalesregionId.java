package com.powerbi.poc.domain.model;

import java.io.Serializable;

public class SalesregionId implements Serializable {

  private String salesregion;
  private Double latitude;
  private Double longitude;

  public SalesregionId(String salesregion, Double latitude, Double longitude) {
    this.salesregion = salesregion;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}