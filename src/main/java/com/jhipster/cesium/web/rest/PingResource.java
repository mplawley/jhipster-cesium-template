package com.jhipster.cesium.web.rest;

import com.jhipster.cesium.domain.Ping;
import com.jhipster.cesium.service.PingService;
import com.jhipster.cesium.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.cesium.domain.Ping}.
 */
@RestController
@RequestMapping("/api")
public class PingResource {

    private final Logger log = LoggerFactory.getLogger(PingResource.class);

    private static final String ENTITY_NAME = "ping";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PingService pingService;

    public PingResource(PingService pingService) {
        this.pingService = pingService;
    }

    /**
     * {@code POST  /pings} : Create a new ping.
     *
     * @param ping the ping to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ping, or with status {@code 400 (Bad Request)} if the ping has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pings")
    public ResponseEntity<Ping> createPing(@RequestBody Ping ping) throws URISyntaxException {
        log.debug("REST request to save Ping : {}", ping);
        if (ping.getId() != null) {
            throw new BadRequestAlertException("A new ping cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ping result = pingService.save(ping);
        return ResponseEntity.created(new URI("/api/pings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pings} : Updates an existing ping.
     *
     * @param ping the ping to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ping,
     * or with status {@code 400 (Bad Request)} if the ping is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ping couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pings")
    public ResponseEntity<Ping> updatePing(@RequestBody Ping ping) throws URISyntaxException {
        log.debug("REST request to update Ping : {}", ping);
        if (ping.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ping result = pingService.save(ping);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ping.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pings} : get all the pings.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pings in body.
     */
    @GetMapping("/pings")
    public ResponseEntity<List<Ping>> getAllPings(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Pings");
        Page<Ping> page = pingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /pings/:id} : get the "id" ping.
     *
     * @param id the id of the ping to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ping, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pings/{id}")
    public ResponseEntity<Ping> getPing(@PathVariable Long id) {
        log.debug("REST request to get Ping : {}", id);
        Optional<Ping> ping = pingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ping);
    }

    /**
     * {@code DELETE  /pings/:id} : delete the "id" ping.
     *
     * @param id the id of the ping to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pings/{id}")
    public ResponseEntity<Void> deletePing(@PathVariable Long id) {
        log.debug("REST request to delete Ping : {}", id);
        pingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
