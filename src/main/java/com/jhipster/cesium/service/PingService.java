package com.jhipster.cesium.service;

import com.jhipster.cesium.domain.Ping;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Ping}.
 */
public interface PingService {

    /**
     * Save a ping.
     *
     * @param ping the entity to save.
     * @return the persisted entity.
     */
    Ping save(Ping ping);

    /**
     * Get all the pings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Ping> findAll(Pageable pageable);


    /**
     * Get the "id" ping.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Ping> findOne(Long id);

    /**
     * Delete the "id" ping.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
