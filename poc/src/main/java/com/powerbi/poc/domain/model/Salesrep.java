package com.powerbi.poc.domain.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Salesrep {

  @Basic
  @Column(name = "SALESREPID")
  @Id
  private String salesrepid;
  @Basic
  @Column(name = "SALESREP")
  private String salesrep;
  @Basic
  @Column(name = "SALESREGION")
  private String salesregion;

  public String getSalesregion() {
    return salesregion;
  }

  public void setSalesregion(String salesregion) {
    this.salesregion = salesregion;
  }

  public String getSalesrep() {
    return salesrep;
  }

  public void setSalesrep(String salesrep) {
    this.salesrep = salesrep;
  }

  public String getSalesrepid() {
    return salesrepid;
  }

  public void setSalesrepid(String salesrepid) {
    this.salesrepid = salesrepid;
  }

  @Override
  public int hashCode() {
    return Objects.hash(salesrepid, salesrep, salesregion);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Salesrep salesrep1 = (Salesrep) o;
    return Objects.equals(salesrepid, salesrep1.salesrepid) && Objects.equals(salesrep, salesrep1.salesrep)
        && Objects.equals(salesregion, salesrep1.salesregion);
  }
}
