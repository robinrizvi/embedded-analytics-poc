package com.powerbi.poc.domain.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Client {

  @Basic
  @Column(name = "CLIENTID")
  @Id
  private Integer clientid;
  @Basic
  @Column(name = "COMPANY")
  private String company;
  @Basic
  @Column(name = "COUNTRY")
  private String country;
  @Basic
  @Column(name = "STATE")
  private String state;
  @Basic
  @Column(name = "CITY")
  private String city;
  @Basic
  @Column(name = "STREET")
  private String street;

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public Integer getClientid() {
    return clientid;
  }

  public void setClientid(Integer clientid) {
    this.clientid = clientid;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  @Override
  public int hashCode() {
    return Objects.hash(clientid, company, country, state, city, street);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Client client = (Client) o;
    return Objects.equals(clientid, client.clientid) && Objects.equals(company, client.company) && Objects.equals(
        country, client.country) && Objects.equals(state, client.state) && Objects.equals(city, client.city)
        && Objects.equals(street, client.street);
  }
}
