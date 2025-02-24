package com.powerbi.poc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.powerbi.poc.config.Config;
import com.powerbi.poc.domain.model.EmbedConfig;
import com.powerbi.poc.service.AzureADService;
import com.powerbi.poc.service.PowerBIService;
import java.net.MalformedURLException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PowerBIConfigController {

  public static final Logger logger = LoggerFactory.getLogger(PowerBIConfigController.class);

  @GetMapping("/reportembedconfig/{id}")
  @ResponseBody
  public ResponseEntity<String> getReportEmbedConfig(@PathVariable String id)
      throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken();
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      // Log error message
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());

    } catch (InterruptedException interruptedEx) {
      // Log error message
      logger.error(interruptedEx.getMessage());

      Thread.currentThread().interrupt();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    // Get required values for embedding the report
    try {

      // Get report details
      EmbedConfig embedConfig = PowerBIService.getReportEmbedConfig(accessToken, Config.workspaceId, id, null, null);

      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("id", embedConfig.id);
      responseObj.put("embedUrl", embedConfig.embedUrl);
      responseObj.put("embedToken", embedConfig.embedToken.token);
      responseObj.put("tokenExpiry", embedConfig.embedToken.expiration);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }

  @GetMapping("/reportembedconfig/expiration/{id}")
  @ResponseBody
  public ResponseEntity<String> getReportEmbedConfigWithExpiringToken(@PathVariable String id)
      throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken();
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      // Log error message
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());

    } catch (InterruptedException interruptedEx) {
      // Log error message
      logger.error(interruptedEx.getMessage());

      Thread.currentThread().interrupt();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    // Get required values for embedding the report
    try {

      // Get report details
      EmbedConfig embedConfig = PowerBIService.getReportEmbedConfig(accessToken, Config.workspaceId, id, 1, null);

      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("id", embedConfig.id);
      responseObj.put("embedUrl", embedConfig.embedUrl);
      responseObj.put("embedToken", embedConfig.embedToken.token);
      responseObj.put("tokenExpiry", embedConfig.embedToken.expiration);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }

  @GetMapping("/reportembedconfig/{id}/tenant/{tenantId}")
  @ResponseBody
  public ResponseEntity<String> getReportByTenantEmbedConfig(@PathVariable String id, @PathVariable String tenantId)
      throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken();
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      // Log error message
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());

    } catch (InterruptedException interruptedEx) {
      // Log error message
      logger.error(interruptedEx.getMessage());

      Thread.currentThread().interrupt();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    // Get required values for embedding the report
    try {

      // Get report details
      EmbedConfig embedConfig = PowerBIService.getReportEmbedConfig(accessToken, Config.workspaceId, id, null,
          tenantId);

      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("id", embedConfig.id);
      responseObj.put("embedUrl", embedConfig.embedUrl);
      responseObj.put("embedToken", embedConfig.embedToken.token);
      responseObj.put("tokenExpiry", embedConfig.embedToken.expiration);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }

  @GetMapping("/dashboardembedconfig/{id}")
  @ResponseBody
  public ResponseEntity<String> getDashboardEmbedConfig(@PathVariable String id)
      throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken();
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    } catch (InterruptedException interruptedEx) {
      logger.error(interruptedEx.getMessage());
      Thread.currentThread().interrupt();

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    try {

      // Get report details
      EmbedConfig reportEmbedConfig = PowerBIService.getDashboardEmbedConfig(accessToken, Config.workspaceId, id);

      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("id", reportEmbedConfig.id);
      responseObj.put("embedUrl", reportEmbedConfig.embedUrl);
      responseObj.put("embedToken", reportEmbedConfig.embedToken.token);
      responseObj.put("tokenExpiry", reportEmbedConfig.embedToken.expiration);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }

  @GetMapping("/dashboardtileembedconfig/{dashboardId}/{tileId}")
  @ResponseBody
  public ResponseEntity<String> getDashboardTileEmbedConfig(@PathVariable String dashboardId,
      @PathVariable String tileId) throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken();
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    } catch (InterruptedException interruptedEx) {
      logger.error(interruptedEx.getMessage());
      Thread.currentThread().interrupt();

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    try {

      // Get report details
      EmbedConfig reportEmbedConfig = PowerBIService.getDashboardTileEmbedConfig(accessToken, Config.workspaceId,
          dashboardId, tileId);

      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("id", reportEmbedConfig.id);
      responseObj.put("embedUrl", reportEmbedConfig.embedUrl);
      responseObj.put("embedToken", reportEmbedConfig.embedToken.token);
      responseObj.put("tokenExpiry", reportEmbedConfig.embedToken.expiration);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }

  @GetMapping("/quickcreatereportembedconfig")
  @ResponseBody
  public ResponseEntity<String> getQuickCreateReportEmbedConfig() throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken("MasterUser");
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      // Log error message
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());

    } catch (InterruptedException interruptedEx) {
      // Log error message
      logger.error(interruptedEx.getMessage());

      Thread.currentThread().interrupt();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    // Get required values for embedding the report
    try {
      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("embedToken", accessToken);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }

  @GetMapping("/qnaembedconfig/{id}")
  @ResponseBody
  public ResponseEntity<String> getQnaEmbedConfig(@PathVariable String id)
      throws JsonMappingException, JsonProcessingException {

    // Get access token
    String accessToken;
    try {
      accessToken = AzureADService.getAccessToken();
    } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
      // Log error message
      logger.error(ex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());

    } catch (InterruptedException interruptedEx) {
      // Log error message
      logger.error(interruptedEx.getMessage());

      Thread.currentThread().interrupt();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
    }

    // Get required values for embedding the report
    try {

      // Get report details
      EmbedConfig embedConfig = PowerBIService.getQnaEmbedConfig(accessToken, Config.workspaceId, id);

      // Return JSON response in string
      JSONObject responseObj = new JSONObject();
      responseObj.put("id", embedConfig.id);
      responseObj.put("embedUrl", embedConfig.embedUrl);
      responseObj.put("embedToken", embedConfig.embedToken.token);
      responseObj.put("tokenExpiry", embedConfig.embedToken.expiration);

      String response = responseObj.toString();
      return ResponseEntity.ok(response);

    } catch (HttpClientErrorException hcex) {
      // Build the error message
      StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
      errMsgStringBuilder.append(hcex.getMessage());

      // Get Request Id
      HttpHeaders header = hcex.getResponseHeaders();
      List<String> requestIds = header.get("requestId");
      if (requestIds != null) {
        for (String requestId : requestIds) {
          errMsgStringBuilder.append("\nRequest Id: ");
          errMsgStringBuilder.append(requestId);
        }
      }

      // Error message string to be returned
      String errMsg = errMsgStringBuilder.toString();

      // Log error message
      logger.error(errMsg);

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);

    } catch (RuntimeException rex) {
      // Log error message
      logger.error(rex.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
    }
  }
}
