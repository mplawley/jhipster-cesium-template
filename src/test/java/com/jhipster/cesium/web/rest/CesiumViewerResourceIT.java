package com.jhipster.cesium.web.rest;

import com.jhipster.cesium.JhipsterCesiumApp;
import com.jhipster.cesium.domain.CesiumViewer;
import com.jhipster.cesium.repository.CesiumViewerRepository;
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
 * Integration tests for the {@Link CesiumViewerResource} REST controller.
 */
@SpringBootTest(classes = JhipsterCesiumApp.class)
public class CesiumViewerResourceIT {

    @Autowired
    private CesiumViewerRepository cesiumViewerRepository;

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

    private MockMvc restCesiumViewerMockMvc;

    private CesiumViewer cesiumViewer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CesiumViewerResource cesiumViewerResource = new CesiumViewerResource(cesiumViewerRepository);
        this.restCesiumViewerMockMvc = MockMvcBuilders.standaloneSetup(cesiumViewerResource)
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
    public static CesiumViewer createEntity(EntityManager em) {
        CesiumViewer cesiumViewer = new CesiumViewer();
        return cesiumViewer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CesiumViewer createUpdatedEntity(EntityManager em) {
        CesiumViewer cesiumViewer = new CesiumViewer();
        return cesiumViewer;
    }

    @BeforeEach
    public void initTest() {
        cesiumViewer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCesiumViewer() throws Exception {
        int databaseSizeBeforeCreate = cesiumViewerRepository.findAll().size();

        // Create the CesiumViewer
        restCesiumViewerMockMvc.perform(post("/api/cesium-viewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cesiumViewer)))
            .andExpect(status().isCreated());

        // Validate the CesiumViewer in the database
        List<CesiumViewer> cesiumViewerList = cesiumViewerRepository.findAll();
        assertThat(cesiumViewerList).hasSize(databaseSizeBeforeCreate + 1);
        CesiumViewer testCesiumViewer = cesiumViewerList.get(cesiumViewerList.size() - 1);
    }

    @Test
    @Transactional
    public void createCesiumViewerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cesiumViewerRepository.findAll().size();

        // Create the CesiumViewer with an existing ID
        cesiumViewer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCesiumViewerMockMvc.perform(post("/api/cesium-viewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cesiumViewer)))
            .andExpect(status().isBadRequest());

        // Validate the CesiumViewer in the database
        List<CesiumViewer> cesiumViewerList = cesiumViewerRepository.findAll();
        assertThat(cesiumViewerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCesiumViewers() throws Exception {
        // Initialize the database
        cesiumViewerRepository.saveAndFlush(cesiumViewer);

        // Get all the cesiumViewerList
        restCesiumViewerMockMvc.perform(get("/api/cesium-viewers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cesiumViewer.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCesiumViewer() throws Exception {
        // Initialize the database
        cesiumViewerRepository.saveAndFlush(cesiumViewer);

        // Get the cesiumViewer
        restCesiumViewerMockMvc.perform(get("/api/cesium-viewers/{id}", cesiumViewer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cesiumViewer.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCesiumViewer() throws Exception {
        // Get the cesiumViewer
        restCesiumViewerMockMvc.perform(get("/api/cesium-viewers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCesiumViewer() throws Exception {
        // Initialize the database
        cesiumViewerRepository.saveAndFlush(cesiumViewer);

        int databaseSizeBeforeUpdate = cesiumViewerRepository.findAll().size();

        // Update the cesiumViewer
        CesiumViewer updatedCesiumViewer = cesiumViewerRepository.findById(cesiumViewer.getId()).get();
        // Disconnect from session so that the updates on updatedCesiumViewer are not directly saved in db
        em.detach(updatedCesiumViewer);

        restCesiumViewerMockMvc.perform(put("/api/cesium-viewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCesiumViewer)))
            .andExpect(status().isOk());

        // Validate the CesiumViewer in the database
        List<CesiumViewer> cesiumViewerList = cesiumViewerRepository.findAll();
        assertThat(cesiumViewerList).hasSize(databaseSizeBeforeUpdate);
        CesiumViewer testCesiumViewer = cesiumViewerList.get(cesiumViewerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCesiumViewer() throws Exception {
        int databaseSizeBeforeUpdate = cesiumViewerRepository.findAll().size();

        // Create the CesiumViewer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCesiumViewerMockMvc.perform(put("/api/cesium-viewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cesiumViewer)))
            .andExpect(status().isBadRequest());

        // Validate the CesiumViewer in the database
        List<CesiumViewer> cesiumViewerList = cesiumViewerRepository.findAll();
        assertThat(cesiumViewerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCesiumViewer() throws Exception {
        // Initialize the database
        cesiumViewerRepository.saveAndFlush(cesiumViewer);

        int databaseSizeBeforeDelete = cesiumViewerRepository.findAll().size();

        // Delete the cesiumViewer
        restCesiumViewerMockMvc.perform(delete("/api/cesium-viewers/{id}", cesiumViewer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CesiumViewer> cesiumViewerList = cesiumViewerRepository.findAll();
        assertThat(cesiumViewerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CesiumViewer.class);
        CesiumViewer cesiumViewer1 = new CesiumViewer();
        cesiumViewer1.setId(1L);
        CesiumViewer cesiumViewer2 = new CesiumViewer();
        cesiumViewer2.setId(cesiumViewer1.getId());
        assertThat(cesiumViewer1).isEqualTo(cesiumViewer2);
        cesiumViewer2.setId(2L);
        assertThat(cesiumViewer1).isNotEqualTo(cesiumViewer2);
        cesiumViewer1.setId(null);
        assertThat(cesiumViewer1).isNotEqualTo(cesiumViewer2);
    }
}
