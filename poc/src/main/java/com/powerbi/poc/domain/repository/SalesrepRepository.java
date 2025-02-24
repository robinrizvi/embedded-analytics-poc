package com.powerbi.poc.domain.repository;

import com.powerbi.poc.domain.model.Salesrep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SalesrepRepository extends JpaRepository<Salesrep, String> {

}
