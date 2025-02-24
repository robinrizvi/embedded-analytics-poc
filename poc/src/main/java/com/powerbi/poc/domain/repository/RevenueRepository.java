package com.powerbi.poc.domain.repository;

import com.powerbi.poc.domain.model.Client;
import com.powerbi.poc.domain.model.Revenue;
import com.powerbi.poc.domain.model.RevenueId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource
public interface RevenueRepository extends JpaRepository<Revenue, RevenueId> {

}
