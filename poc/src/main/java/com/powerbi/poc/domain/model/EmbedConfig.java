package com.powerbi.poc.domain.model;

import static com.powerbi.poc.controller.PowerBIConfigController.logger;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Properties for embedding the report
 */
public class EmbedConfig {

  public String id = "";

  public String embedUrl = "";

  public String name = "";

  public Boolean isEffectiveIdentityRolesRequired = false;

  public Boolean isEffectiveIdentityRequired = false;

  public Boolean enableRLS = false;

  public String username;

  public String roles;

  public EmbedToken embedToken;

  public String errorMessage;

  public JSONObject getJSONObject() {
    JSONObject jsonObj = new JSONObject();
    try {
      jsonObj.put("reportId", id);
      jsonObj.put("embedUrl", embedUrl);
      jsonObj.put("reportName", name);
    } catch (JSONException e) {
      logger.error("DefaultListItem.toString JSONException: " + e.getMessage());
    }
    return jsonObj;
  }
}
