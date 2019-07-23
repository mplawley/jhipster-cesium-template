package com.jhipster.cesium.service.impl;

import com.jhipster.cesium.service.PingService;
import com.jhipster.cesium.domain.Ping;
import com.jhipster.cesium.repository.PingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Ping}.
 */
@Service
@Transactional
public class PingServiceImpl implements PingService {

    private final Logger log = LoggerFactory.getLogger(PingServiceImpl.class);

    private final PingRepository pingRepository;

    public PingServiceImpl(PingRepository pingRepository) {
        this.pingRepository = pingRepository;
    }

    /**
     * Save a ping.
     *
     * @param ping the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Ping save(Ping ping) {
        log.debug("Request to save Ping : {}", ping);
        return pingRepository.save(ping);
    }

    /**
     * Get all the pings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Ping> findAll(Pageable pageable) {
        log.debug("Request to get all Pings");
        return pingRepository.findAll(pageable);
    }


    /**
     * Get one ping by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Ping> findOne(Long id) {
        log.debug("Request to get Ping : {}", id);
        return pingRepository.findById(id);
    }

    /**
     * Delete the ping by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ping : {}", id);
        pingRepository.deleteById(id);
    }
}
