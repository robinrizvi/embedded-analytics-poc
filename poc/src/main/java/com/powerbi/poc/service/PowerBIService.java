package com.powerbi.poc.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.powerbi.poc.config.Config;
import com.powerbi.poc.domain.model.EmbedConfig;
import com.powerbi.poc.domain.model.EmbedToken;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

/**
 * Service with helper methods to get report's details and multi-resource embed token
 */
public class PowerBIService {

  static final Logger logger = LoggerFactory.getLogger(PowerBIService.class);

  // Prevent instantiation
  private PowerBIService() {
    throw new IllegalStateException("Power BI service class");
  }

  /**
   * Get embed params for a report for a single workspace
   *
   * @param {string} accessToken
   * @param {string} workspaceId
   * @param {string} reportId
   * @param {string} additionalDatasetIds
   * @return EmbedConfig object
   * @throws JsonProcessingException
   * @throws JsonMappingException
   */
  public static EmbedConfig getReportEmbedConfig(String accessToken, String workspaceId, String reportId,
      Integer lifetimeInMinutes, String tenant, String... additionalDatasetIds)
      throws JsonMappingException, JsonProcessingException {
    if (reportId == null || reportId.isEmpty()) {
      throw new RuntimeException("Empty Report Id");
    }
    if (workspaceId == null || workspaceId.isEmpty()) {
      throw new RuntimeException("Empty Workspace Id");
    }

    // Get Report In Group API: https://api.powerbi.com/v1.0/myorg/groups/{workspaceId}/reports/{reportId}
    StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
    urlStringBuilder.append(workspaceId);
    urlStringBuilder.append("/reports/");
    urlStringBuilder.append(reportId);

    // Request header
    HttpHeaders reqHeader = new HttpHeaders();
    reqHeader.put("Content-Type", Arrays.asList("application/json"));
    reqHeader.put("Authorization", Arrays.asList("Bearer " + accessToken));

    // HTTP entity object - holds header and body
    HttpEntity<String> reqEntity = new HttpEntity<>(reqHeader);

    // REST API URL to get report details
    String endPointUrl = urlStringBuilder.toString();

    // Rest API get report's details
    RestTemplate getReportRestTemplate = new RestTemplate();
    ResponseEntity<String> response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity,
        String.class);

    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into ReportConfig class object
    EmbedConfig embedConfig = mapper.readValue(responseBody, EmbedConfig.class);

    if (Config.DEBUG) {

      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved report details");

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }

    // Parse string into report object and get Report details
    JSONObject responseObj = new JSONObject(responseBody);

    // Create a list of DatasetIds
    List<String> datasetIds = new ArrayList<>();
    datasetIds.add(responseObj.getString("datasetId"));

    // Append to existing list of datasetIds to achieve dynamic binding later
    for (String datasetId : additionalDatasetIds) {
      datasetIds.add(datasetId);
      System.out.println(datasetId);
    }

    // Get embed token
    embedConfig.embedToken = PowerBIService.getReportEmbedToken(accessToken, reportId, datasetIds, lifetimeInMinutes,
        tenant, workspaceId);
    return embedConfig;
  }

  /**
   * Get Embed token for single report, multiple datasetIds, and optional target workspaces
   *
   * @param {string}       accessToken
   * @param {string}       reportId
   * @param {List<string>} datasetId
   * @param {string}       targetWorkspaceIds
   * @return EmbedToken
   * @throws JsonProcessingException
   * @throws JsonMappingException
   * @see <a href="https://aka.ms/MultiResourceEmbedToken">Multi-Resource Embed Token</a>
   */
  public static EmbedToken getReportEmbedToken(String accessToken, String id, List<String> datasetIds,
      Integer lifetimeInMinutes, String tenant, String... targetWorkspaceIds)
      throws JsonMappingException, JsonProcessingException {

    // Embed Token - Generate Token REST API
    final String uri = "https://api.powerbi.com/v1.0/myorg/GenerateToken";

    RestTemplate restTemplate = new RestTemplate();

    // Create request header
    HttpHeaders headers = new HttpHeaders();
    headers.put("Content-Type", Arrays.asList("application/json"));
    headers.put("Authorization", Arrays.asList("Bearer " + accessToken));

    // Add dataset id in body
    JSONArray jsonDatasets = new JSONArray();
    for (String datasetId : datasetIds) {
      jsonDatasets.put(new JSONObject().put("id", datasetId));
    }

    // Add report id in body
    JSONArray jsonReports = new JSONArray();
    jsonReports.put(new JSONObject().put("id", id));

    // Add target workspace id in body
    JSONArray jsonWorkspaces = new JSONArray();
    for (String targetWorkspaceId : targetWorkspaceIds) {
      jsonWorkspaces.put(new JSONObject().put("id", targetWorkspaceId));
    }

    // Request body
    JSONObject requestBody = new JSONObject();
    requestBody.put("datasets", jsonDatasets);
    requestBody.put("reports", jsonReports);
    requestBody.put("targetWorkspaces", jsonWorkspaces);

    if (lifetimeInMinutes != null) {
      requestBody.put("lifetimeInMinutes", lifetimeInMinutes);
    }

    if (tenant != null && !tenant.equals("NONE")) {
      JSONObject tenantIdentityJson = new JSONObject();
      tenantIdentityJson.put("username", tenant);
      tenantIdentityJson.put("roles", new JSONArray(List.of("TenantDynamic")));
      tenantIdentityJson.put("datasets", new JSONArray(datasetIds));
      requestBody.put("identities", new JSONArray().put(tenantIdentityJson));
    }

    // Add (body, header) to HTTP entity
    HttpEntity<String> httpEntity = new HttpEntity<>(requestBody.toString(), headers);

    // Call the API
    ResponseEntity<String> response = restTemplate.postForEntity(uri, httpEntity, String.class);
    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into EmbedToken class object
    EmbedToken embedToken = mapper.readValue(responseBody, EmbedToken.class);

    if (Config.DEBUG) {

      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved Embed token\nEmbed Token Id: {}", embedToken.tokenId);

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }
    return embedToken;
  }

  public static EmbedConfig getDashboardEmbedConfig(String accessToken, String workspaceId, String dashboardId,
      String... additionalDatasetIds) throws JsonMappingException, JsonProcessingException {
    if (dashboardId == null || dashboardId.isEmpty()) {
      throw new RuntimeException("Empty Dashboard Id");
    }
    if (workspaceId == null || workspaceId.isEmpty()) {
      throw new RuntimeException("Empty Workspace Id");
    }

    StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
    urlStringBuilder.append(workspaceId);
    urlStringBuilder.append("/dashboards/");
    urlStringBuilder.append(dashboardId);

    // Request header
    HttpHeaders reqHeader = new HttpHeaders();
    reqHeader.put("Content-Type", List.of("application/json"));
    reqHeader.put("Authorization", List.of("Bearer " + accessToken));

    // HTTP entity object - holds header and body
    HttpEntity<String> reqEntity = new HttpEntity<>(reqHeader);

    // REST API URL to get report details
    String endPointUrl = urlStringBuilder.toString();

    // Rest API get report's details
    RestTemplate getReportRestTemplate = new RestTemplate();
    ResponseEntity<String> response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity,
        String.class);

    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into ReportConfig class object
    EmbedConfig embedConfig = mapper.readValue(responseBody, EmbedConfig.class);

    if (Config.DEBUG) {
      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved report details");

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }

    // Get embed token
    embedConfig.embedToken = PowerBIService.getDashboardEmbedToken(accessToken, workspaceId, dashboardId);

    return embedConfig;
  }

  public static EmbedToken getDashboardEmbedToken(String accessToken, String workspaceId, String id)
      throws JsonMappingException, JsonProcessingException {

    StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
    urlStringBuilder.append(workspaceId);
    urlStringBuilder.append("/dashboards/");
    urlStringBuilder.append(id);
    urlStringBuilder.append("/GenerateToken");

    RestTemplate restTemplate = new RestTemplate();

    // Create request header
    HttpHeaders headers = new HttpHeaders();
    headers.put("Content-Type", List.of("application/json"));
    headers.put("Authorization", List.of("Bearer " + accessToken));

    // Embed Token - Generate Token REST API
    String endPointUrl = urlStringBuilder.toString();

    // Add (body, header) to HTTP entity
    HttpEntity<String> httpEntity = new HttpEntity<>(new JSONObject().toString(), headers);

    // Call the API
    ResponseEntity<String> response = restTemplate.postForEntity(endPointUrl, httpEntity, String.class);
    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into EmbedToken class object
    EmbedToken embedToken = mapper.readValue(responseBody, EmbedToken.class);

    if (Config.DEBUG) {

      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved Embed token\nEmbed Token Id: {}", embedToken.tokenId);

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }

    return embedToken;
  }

  public static EmbedConfig getDashboardTileEmbedConfig(String accessToken, String workspaceId, String dashboardId,
      String tileId) throws JsonMappingException, JsonProcessingException {
    if (tileId == null || tileId.isEmpty()) {
      throw new RuntimeException("Empty Tile Id");
    }

    if (dashboardId == null || dashboardId.isEmpty()) {
      throw new RuntimeException("Empty Dashboard Id");
    }
    if (workspaceId == null || workspaceId.isEmpty()) {
      throw new RuntimeException("Empty Workspace Id");
    }

    StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
    urlStringBuilder.append(workspaceId);
    urlStringBuilder.append("/dashboards/");
    urlStringBuilder.append(dashboardId);
    urlStringBuilder.append("/tiles/");
    urlStringBuilder.append(tileId);

    // Request header
    HttpHeaders reqHeader = new HttpHeaders();
    reqHeader.put("Content-Type", List.of("application/json"));
    reqHeader.put("Authorization", List.of("Bearer " + accessToken));

    // HTTP entity object - holds header and body
    HttpEntity<String> reqEntity = new HttpEntity<>(reqHeader);

    // REST API URL to get report details
    String endPointUrl = urlStringBuilder.toString();

    // Rest API get report's details
    RestTemplate getReportRestTemplate = new RestTemplate();
    ResponseEntity<String> response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity,
        String.class);

    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into ReportConfig class object
    EmbedConfig embedConfig = mapper.readValue(responseBody, EmbedConfig.class);

    if (Config.DEBUG) {
      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved report details");

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }

    // Get embed token
    embedConfig.embedToken = PowerBIService.getDashboardTileEmbedToken(accessToken, workspaceId, dashboardId, tileId);

    return embedConfig;
  }

  public static EmbedToken getDashboardTileEmbedToken(String accessToken, String workspaceId, String dashboardId,
      String tileId) throws JsonMappingException, JsonProcessingException {

    StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
    urlStringBuilder.append(workspaceId);
    urlStringBuilder.append("/dashboards/");
    urlStringBuilder.append(dashboardId);
    urlStringBuilder.append("/tiles/");
    urlStringBuilder.append(tileId);
    urlStringBuilder.append("/GenerateToken");

    RestTemplate restTemplate = new RestTemplate();

    // Create request header
    HttpHeaders headers = new HttpHeaders();
    headers.put("Content-Type", List.of("application/json"));
    headers.put("Authorization", List.of("Bearer " + accessToken));

    // Embed Token - Generate Token REST API
    String endPointUrl = urlStringBuilder.toString();

    // Add (body, header) to HTTP entity
    HttpEntity<String> httpEntity = new HttpEntity<>(new JSONObject().toString(), headers);

    // Call the API
    ResponseEntity<String> response = restTemplate.postForEntity(endPointUrl, httpEntity, String.class);
    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into EmbedToken class object
    EmbedToken embedToken = mapper.readValue(responseBody, EmbedToken.class);

    if (Config.DEBUG) {

      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved Embed token\nEmbed Token Id: {}", embedToken.tokenId);

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }

    return embedToken;
  }

  public static EmbedConfig getQnaEmbedConfig(String accessToken, String workspaceId, String datasetId)
      throws JsonMappingException, JsonProcessingException {
    if (datasetId == null || datasetId.isEmpty()) {
      throw new RuntimeException("Empty Report Id");
    }
    if (workspaceId == null || workspaceId.isEmpty()) {
      throw new RuntimeException("Empty Workspace Id");
    }

    // Get Report In Group API: https://api.powerbi.com/v1.0/myorg/groups/{workspaceId}/reports/{reportId}
    StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
    urlStringBuilder.append(workspaceId);
    urlStringBuilder.append("/datasets/");
    urlStringBuilder.append(datasetId);

    // Request header
    HttpHeaders reqHeader = new HttpHeaders();
    reqHeader.put("Content-Type", Arrays.asList("application/json"));
    reqHeader.put("Authorization", Arrays.asList("Bearer " + accessToken));

    // HTTP entity object - holds header and body
    HttpEntity<String> reqEntity = new HttpEntity<>(reqHeader);

    // REST API URL to get report details
    String endPointUrl = urlStringBuilder.toString();

    // Rest API get report's details
    RestTemplate getReportRestTemplate = new RestTemplate();
    ResponseEntity<String> response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity,
        String.class);

    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into ReportConfig class object
    EmbedConfig embedConfig = mapper.readValue(responseBody, EmbedConfig.class);

    if (Config.DEBUG) {

      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved report details");

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }

    // Parse string into report object and get Report details
    JSONObject responseObj = new JSONObject(responseBody);

    embedConfig.embedUrl = responseObj.getString("qnaEmbedURL");
    embedConfig.embedToken = PowerBIService.getQnaEmbedToken(accessToken, datasetId, workspaceId);
    return embedConfig;
  }

  public static EmbedToken getQnaEmbedToken(String accessToken, String id, String... targetWorkspaceIds)
      throws JsonMappingException, JsonProcessingException {

    // Embed Token - Generate Token REST API
    final String uri = "https://api.powerbi.com/v1.0/myorg/GenerateToken";

    RestTemplate restTemplate = new RestTemplate();

    // Create request header
    HttpHeaders headers = new HttpHeaders();
    headers.put("Content-Type", Arrays.asList("application/json"));
    headers.put("Authorization", Arrays.asList("Bearer " + accessToken));

    JSONArray jsonDatasets = new JSONArray();
    jsonDatasets.put(new JSONObject().put("id", id));

    JSONArray jsonWorkspaces = new JSONArray();
    for (String targetWorkspaceId : targetWorkspaceIds) {
      jsonWorkspaces.put(new JSONObject().put("id", targetWorkspaceId));
    }

    // Request body
    JSONObject requestBody = new JSONObject();
    requestBody.put("datasets", jsonDatasets);
    requestBody.put("targetWorkspaces", jsonWorkspaces);

    // Add (body, header) to HTTP entity
    HttpEntity<String> httpEntity = new HttpEntity<>(requestBody.toString(), headers);

    // Call the API
    ResponseEntity<String> response = restTemplate.postForEntity(uri, httpEntity, String.class);
    HttpHeaders responseHeader = response.getHeaders();
    String responseBody = response.getBody();

    // Create Object Mapper to convert String into Object
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    // Convert responseBody string into EmbedToken class object
    EmbedToken embedToken = mapper.readValue(responseBody, EmbedToken.class);

    if (Config.DEBUG) {

      // Get the request Id
      List<String> reqIdList = responseHeader.get("RequestId");

      // Log progress
      logger.info("Retrieved Embed token\nEmbed Token Id: {}", embedToken.tokenId);

      // Log Request Id
      if (reqIdList != null && !reqIdList.isEmpty()) {
        for (String reqId : reqIdList) {
          logger.info("Request Id: {}", reqId);
        }
      }
    }
    return embedToken;
  }
}