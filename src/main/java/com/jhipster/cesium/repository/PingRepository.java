package com.jhipster.cesium.repository;

import com.jhipster.cesium.domain.Ping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PingRepository extends JpaRepository<Ping, Long> {

}
