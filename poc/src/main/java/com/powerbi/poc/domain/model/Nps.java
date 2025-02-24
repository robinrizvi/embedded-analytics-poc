package com.powerbi.poc.domain.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Nps {

  @Basic
  @Column(name = "NAME")
  private String name;
  @Basic
  @Column(name = "DATE")
  @Id
  private String date;
  @Basic
  @Column(name = "STATE")
  @Id
  private String state;
  @Basic
  @Column(name = "NPS")
  @Id
  private Integer nps;

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getNps() {
    return nps;
  }

  public void setNps(Integer nps) {
    this.nps = nps;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, date, state, nps);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Nps nps1 = (Nps) o;
    return Objects.equals(name, nps1.name) && Objects.equals(date, nps1.date) && Objects.equals(state, nps1.state)
        && Objects.equals(nps, nps1.nps);
  }
}
