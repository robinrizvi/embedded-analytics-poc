package com.powerbi.poc.service;

import com.microsoft.aad.msal4j.ClientCredentialFactory;
import com.microsoft.aad.msal4j.ClientCredentialParameters;
import com.microsoft.aad.msal4j.ConfidentialClientApplication;
import com.microsoft.aad.msal4j.IAuthenticationResult;
import com.microsoft.aad.msal4j.PublicClientApplication;
import com.microsoft.aad.msal4j.UserNamePasswordParameters;
import com.powerbi.poc.config.Config;
import java.net.MalformedURLException;
import java.util.Collections;
import java.util.concurrent.ExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service to authenticate using MSAL
 */
public class AzureADService {

  static final Logger logger = LoggerFactory.getLogger(AzureADService.class);

  // Prevent instantiation
  private AzureADService() {
    throw new IllegalStateException("Authentication service class");
  }

  /**
   * Acquires access token for the based on config values
   *
   * @return AccessToken
   */
  public static String getAccessToken() throws MalformedURLException, InterruptedException, ExecutionException {

    if (Config.authenticationType.equalsIgnoreCase("MasterUser")) {
      return getAccessTokenUsingMasterUser(Config.clientId, Config.pbiUsername, Config.pbiPassword);
    } else if (Config.authenticationType.equalsIgnoreCase("ServicePrincipal")) {
      // Check if Tenant Id is empty
      if (Config.tenantId.isEmpty()) {
        throw new RuntimeException("Tenant Id is empty");
      }

      return getAccessTokenUsingServicePrincipal(Config.clientId, Config.tenantId, Config.appSecret);
    } else {

      // Authentication Type is none of the above
      throw new RuntimeException("Invalid authentication type: " + Config.authenticationType);
    }
  }

  public static String getAccessToken(String authType)
      throws MalformedURLException, InterruptedException, ExecutionException {

    if (authType.equalsIgnoreCase("MasterUser")) {
      return getAccessTokenUsingMasterUser(Config.clientId, Config.pbiUsername, Config.pbiPassword);
    } else if (authType.equalsIgnoreCase("ServicePrincipal")) {

      // Check if Tenant Id is empty
      if (Config.tenantId.isEmpty()) {
        throw new RuntimeException("Tenant Id is empty");
      }
      return getAccessTokenUsingServicePrincipal(Config.clientId, Config.tenantId, Config.appSecret);
    } else {

      // Authentication Type is none of the above
      throw new RuntimeException("Invalid authentication type: " + Config.authenticationType);
    }
  }

  /**
   * Acquires access token for the given clientId and app secret
   *
   * @param clientId
   * @param tenantId
   * @param appSecret
   * @return AccessToken
   */
  private static String getAccessTokenUsingServicePrincipal(String clientId, String tenantId, String appSecret)
      throws MalformedURLException, InterruptedException, ExecutionException {

    // Build Confidential Client App
    ConfidentialClientApplication app = ConfidentialClientApplication.builder(clientId,
        ClientCredentialFactory.createFromSecret(appSecret)).authority(Config.authorityUrl + tenantId).build();

    ClientCredentialParameters clientCreds = ClientCredentialParameters.builder(Collections.singleton(Config.scopeBase))
        .build();

    // Acquire new AAD token
    IAuthenticationResult result = app.acquireToken(clientCreds).get();

    // Return access token if token is acquired successfully
    if (result != null && result.accessToken() != null && !result.accessToken().isEmpty()) {
      if (Config.DEBUG) {
        logger.info("Authenticated with Service Principal mode");
      }
      return result.accessToken();
    } else {
      logger.error("Failed to authenticate with Service Principal mode");
      return null;
    }
  }

  /**
   * Acquires access token for the given clientId and user credentials
   *
   * @param clientId
   * @param username
   * @param password
   * @return AccessToken
   */
  private static String getAccessTokenUsingMasterUser(String clientId, String username, String password)
      throws MalformedURLException, InterruptedException, ExecutionException {

    // Build Public Client App
    PublicClientApplication app = PublicClientApplication.builder(clientId)
        .authority(Config.authorityUrl + "organizations")  // Use authorityUrl+tenantId if this doesn't work
        .build();

    UserNamePasswordParameters userCreds = UserNamePasswordParameters.builder(Collections.singleton(Config.scopeBase),
        username, password.toCharArray()).build();

    // Acquire new AAD token
    IAuthenticationResult result = app.acquireToken(userCreds).get();

    // Return access token if token is acquired successfully
    if (result != null && result.accessToken() != null && !result.accessToken().isEmpty()) {
      if (Config.DEBUG) {
        logger.info("Authenticated with MasterUser mode");
      }
      return result.accessToken();
    } else {
      logger.error("Failed to authenticate with MasterUser mode");
      return null;
    }
  }
}