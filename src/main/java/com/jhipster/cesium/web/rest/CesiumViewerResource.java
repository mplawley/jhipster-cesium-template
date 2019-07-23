package com.jhipster.cesium.web.rest;

import com.jhipster.cesium.domain.CesiumViewer;
import com.jhipster.cesium.repository.CesiumViewerRepository;
import com.jhipster.cesium.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.cesium.domain.CesiumViewer}.
 */
@RestController
@RequestMapping("/api")
public class CesiumViewerResource {

    private final Logger log = LoggerFactory.getLogger(CesiumViewerResource.class);

    private static final String ENTITY_NAME = "cesiumViewer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CesiumViewerRepository cesiumViewerRepository;

    public CesiumViewerResource(CesiumViewerRepository cesiumViewerRepository) {
        this.cesiumViewerRepository = cesiumViewerRepository;
    }

    /**
     * {@code POST  /cesium-viewers} : Create a new cesiumViewer.
     *
     * @param cesiumViewer the cesiumViewer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cesiumViewer, or with status {@code 400 (Bad Request)} if the cesiumViewer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cesium-viewers")
    public ResponseEntity<CesiumViewer> createCesiumViewer(@RequestBody CesiumViewer cesiumViewer) throws URISyntaxException {
        log.debug("REST request to save CesiumViewer : {}", cesiumViewer);
        if (cesiumViewer.getId() != null) {
            throw new BadRequestAlertException("A new cesiumViewer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CesiumViewer result = cesiumViewerRepository.save(cesiumViewer);
        return ResponseEntity.created(new URI("/api/cesium-viewers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cesium-viewers} : Updates an existing cesiumViewer.
     *
     * @param cesiumViewer the cesiumViewer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cesiumViewer,
     * or with status {@code 400 (Bad Request)} if the cesiumViewer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cesiumViewer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cesium-viewers")
    public ResponseEntity<CesiumViewer> updateCesiumViewer(@RequestBody CesiumViewer cesiumViewer) throws URISyntaxException {
        log.debug("REST request to update CesiumViewer : {}", cesiumViewer);
        if (cesiumViewer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CesiumViewer result = cesiumViewerRepository.save(cesiumViewer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cesiumViewer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cesium-viewers} : get all the cesiumViewers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cesiumViewers in body.
     */
    @GetMapping("/cesium-viewers")
    public List<CesiumViewer> getAllCesiumViewers() {
        log.debug("REST request to get all CesiumViewers");
        return cesiumViewerRepository.findAll();
    }

    /**
     * {@code GET  /cesium-viewers/:id} : get the "id" cesiumViewer.
     *
     * @param id the id of the cesiumViewer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cesiumViewer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cesium-viewers/{id}")
    public ResponseEntity<CesiumViewer> getCesiumViewer(@PathVariable Long id) {
        log.debug("REST request to get CesiumViewer : {}", id);
        Optional<CesiumViewer> cesiumViewer = cesiumViewerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cesiumViewer);
    }

    /**
     * {@code DELETE  /cesium-viewers/:id} : delete the "id" cesiumViewer.
     *
     * @param id the id of the cesiumViewer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cesium-viewers/{id}")
    public ResponseEntity<Void> deleteCesiumViewer(@PathVariable Long id) {
        log.debug("REST request to delete CesiumViewer : {}", id);
        cesiumViewerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
