package com.powerbi.poc.domain.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import java.util.Objects;

@Entity
@IdClass(SalesregionId.class)
public class Salesregion {

  @Basic
  @Column(name = "SALESREGION")
  @Id
  private String salesregion;
  @Basic
  @Column(name = "STATE")
  private String state;
  @Basic
  @Column(name = "LATITUDE")
  @Id
  private Double latitude;
  @Basic
  @Column(name = "LONGITUDE")
  @Id
  private Double longitude;

  public Double getLatitude() {
    return latitude;
  }

  public void setLatitude(Double latitude) {
    this.latitude = latitude;
  }

  public Double getLongitude() {
    return longitude;
  }

  public void setLongitude(Double longitude) {
    this.longitude = longitude;
  }

  public String getSalesregion() {
    return salesregion;
  }

  public void setSalesregion(String salesregion) {
    this.salesregion = salesregion;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  @Override
  public int hashCode() {
    return Objects.hash(salesregion, state, latitude, longitude);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Salesregion that = (Salesregion) o;
    return Objects.equals(salesregion, that.salesregion) && Objects.equals(state, that.state) && Objects.equals(
        latitude, that.latitude) && Objects.equals(longitude, that.longitude);
  }
}
