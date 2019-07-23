package com.jhipster.cesium.web.rest;

import com.jhipster.cesium.JhipsterCesiumApp;
import com.jhipster.cesium.domain.Ping;
import com.jhipster.cesium.repository.PingRepository;
import com.jhipster.cesium.service.PingService;
import com.jhipster.cesium.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.jhipster.cesium.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PingResource} REST controller.
 */
@SpringBootTest(classes = JhipsterCesiumApp.class)
public class PingResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final Float DEFAULT_LATITUDE = 1F;
    private static final Float UPDATED_LATITUDE = 2F;

    private static final Float DEFAULT_LONGITUDE = 1F;
    private static final Float UPDATED_LONGITUDE = 2F;

    @Autowired
    private PingRepository pingRepository;

    @Autowired
    private PingService pingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPingMockMvc;

    private Ping ping;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PingResource pingResource = new PingResource(pingService);
        this.restPingMockMvc = MockMvcBuilders.standaloneSetup(pingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ping createEntity(EntityManager em) {
        Ping ping = new Ping()
            .label(DEFAULT_LABEL)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE);
        return ping;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ping createUpdatedEntity(EntityManager em) {
        Ping ping = new Ping()
            .label(UPDATED_LABEL)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);
        return ping;
    }

    @BeforeEach
    public void initTest() {
        ping = createEntity(em);
    }

    @Test
    @Transactional
    public void createPing() throws Exception {
        int databaseSizeBeforeCreate = pingRepository.findAll().size();

        // Create the Ping
        restPingMockMvc.perform(post("/api/pings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ping)))
            .andExpect(status().isCreated());

        // Validate the Ping in the database
        List<Ping> pingList = pingRepository.findAll();
        assertThat(pingList).hasSize(databaseSizeBeforeCreate + 1);
        Ping testPing = pingList.get(pingList.size() - 1);
        assertThat(testPing.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testPing.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testPing.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void createPingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pingRepository.findAll().size();

        // Create the Ping with an existing ID
        ping.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPingMockMvc.perform(post("/api/pings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ping)))
            .andExpect(status().isBadRequest());

        // Validate the Ping in the database
        List<Ping> pingList = pingRepository.findAll();
        assertThat(pingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPings() throws Exception {
        // Initialize the database
        pingRepository.saveAndFlush(ping);

        // Get all the pingList
        restPingMockMvc.perform(get("/api/pings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ping.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPing() throws Exception {
        // Initialize the database
        pingRepository.saveAndFlush(ping);

        // Get the ping
        restPingMockMvc.perform(get("/api/pings/{id}", ping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ping.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPing() throws Exception {
        // Get the ping
        restPingMockMvc.perform(get("/api/pings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePing() throws Exception {
        // Initialize the database
        pingService.save(ping);

        int databaseSizeBeforeUpdate = pingRepository.findAll().size();

        // Update the ping
        Ping updatedPing = pingRepository.findById(ping.getId()).get();
        // Disconnect from session so that the updates on updatedPing are not directly saved in db
        em.detach(updatedPing);
        updatedPing
            .label(UPDATED_LABEL)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);

        restPingMockMvc.perform(put("/api/pings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPing)))
            .andExpect(status().isOk());

        // Validate the Ping in the database
        List<Ping> pingList = pingRepository.findAll();
        assertThat(pingList).hasSize(databaseSizeBeforeUpdate);
        Ping testPing = pingList.get(pingList.size() - 1);
        assertThat(testPing.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testPing.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testPing.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingPing() throws Exception {
        int databaseSizeBeforeUpdate = pingRepository.findAll().size();

        // Create the Ping

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPingMockMvc.perform(put("/api/pings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ping)))
            .andExpect(status().isBadRequest());

        // Validate the Ping in the database
        List<Ping> pingList = pingRepository.findAll();
        assertThat(pingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePing() throws Exception {
        // Initialize the database
        pingService.save(ping);

        int databaseSizeBeforeDelete = pingRepository.findAll().size();

        // Delete the ping
        restPingMockMvc.perform(delete("/api/pings/{id}", ping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ping> pingList = pingRepository.findAll();
        assertThat(pingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ping.class);
        Ping ping1 = new Ping();
        ping1.setId(1L);
        Ping ping2 = new Ping();
        ping2.setId(ping1.getId());
        assertThat(ping1).isEqualTo(ping2);
        ping2.setId(2L);
        assertThat(ping1).isNotEqualTo(ping2);
        ping1.setId(null);
        assertThat(ping1).isNotEqualTo(ping2);
    }
}
