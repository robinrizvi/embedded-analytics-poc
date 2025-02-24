package com.powerbi.poc.domain.repository;

import com.powerbi.poc.domain.model.Salesregion;
import com.powerbi.poc.domain.model.SalesregionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SalesregionRepository extends JpaRepository<Salesregion, SalesregionId> {

}
