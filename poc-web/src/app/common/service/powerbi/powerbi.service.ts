import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { ConfigResponse } from './config-response';

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {
  private reportEmbedConfigUrl: string;
  private dashboardEmbedConfigUrl: string;
  private dashboardTileEmbedConfigUrl: string;
  private quickCreateReportEmbedConfigUrl: string;
  private qnaEmbedConfigUrl: string;

  constructor(private http: HttpClient) {
    this.reportEmbedConfigUrl = 'http://localhost:8080/reportembedconfig';
    this.dashboardEmbedConfigUrl = 'http://localhost:8080/dashboardembedconfig';
    this.dashboardTileEmbedConfigUrl = 'http://localhost:8080/dashboardtileembedconfig';
    this.quickCreateReportEmbedConfigUrl = 'http://localhost:8080/quickcreatereportembedconfig';
    this.qnaEmbedConfigUrl = 'http://localhost:8080/qnaembedconfig';
  }

  public getReportEmbedConfig(id: string): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.reportEmbedConfigUrl + "/" + id);
  }

  public getReportEmbedConfigWithExpiringToken(id: string): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.reportEmbedConfigUrl + "/expiration/" + id);
  }

  public getReportByTenantEmbedConfig(id: string, tenantId: string): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.reportEmbedConfigUrl + "/" + id + "/tenant/" + tenantId);
  }

  public getDashboardEmbedConfig(id: string): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.dashboardEmbedConfigUrl + "/" + id);
  }

  public getDashboardTileEmbedConfig(dashboardId: string, tileId: string): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.dashboardTileEmbedConfigUrl + "/" + dashboardId + "/" + tileId);
  }

  getQuickCreateReportEmbedConfig(): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.quickCreateReportEmbedConfigUrl);
  }

  public getQnaEmbedConfig(id: string): Observable<ConfigResponse> {
    return this.http.get<ConfigResponse>(this.qnaEmbedConfigUrl + "/" + id);
  }
}