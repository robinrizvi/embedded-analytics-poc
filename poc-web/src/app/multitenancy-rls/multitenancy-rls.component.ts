import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IReportEmbedConfiguration, models, Page, Report, service, Embed } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from '../common/powerbi-embed/components/powerbi-report-embed/powerbi-report-embed.component';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-multitenancy-rls',
  templateUrl: './multitenancy-rls.component.html',
  styleUrls: ['./multitenancy-rls.component.scss']
})
export class MultitenancyRlsComponent implements OnInit {
  tenants: string[] = ['Tenant1', 'Tenant2', 'Tenant3', 'NONE'];
  selectedTenant = this.tenants[0];
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  reportClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '73991555-886a-4f33-960f-4a5b1b3ac4a6';
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    settings: {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToWidth
      },
      background: 1,
      filterPaneEnabled: false
    }
  };

  eventHandlersMap = new Map([
    ['loaded', () => {
      const report = this.reportObj.getReport();
      report.setComponentTitle('Embedded report');
      console.log('Report has loaded');
    },
    ],
    ['rendered', () => console.log('Report has rendered')],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => console.log(event)],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  constructor(private powerbiService: PowerbiService) {

  }

  ngOnInit(): void {
    // Get the embed config from the service and set the reportConfigResponse
    this.powerbiService.getReportByTenantEmbedConfig(this.reportId, this.selectedTenant).subscribe(response => {
      console.log(response);
      // Update the reportConfig to embed the PowerBI report
      this.reportConfig = {
        ...this.reportConfig,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.reportConfig);
    });
  }

  tenantChange(event: MatSelectChange): void {
    this.applyTenantChange(event.value);
  }

  applyTenantChange(tenant: string): void {
    this.powerbiService.getReportByTenantEmbedConfig(this.reportId, tenant).subscribe(response => {
      console.log(response);
      this.reportConfig = {
        ...this.reportConfig,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      this.reportObj.getReport().setAccessToken(response.embedToken).then(() => {
        this.reportObj.getReport().refresh().then(() => this.reportObj.getReport().reload());
      });
    }, error => {
      this.reportObj.getReport().setAccessToken("INVALID").then(() => {
        this.reportObj.getReport().reload();
      });
    });
  }
}
