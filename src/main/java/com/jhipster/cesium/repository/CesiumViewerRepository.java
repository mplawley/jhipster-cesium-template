package com.jhipster.cesium.repository;

import com.jhipster.cesium.domain.CesiumViewer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CesiumViewer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CesiumViewerRepository extends JpaRepository<CesiumViewer, Long> {

}
