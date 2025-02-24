import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IDashboardEmbedConfiguration, models, Dashboard, service, Embed } from 'powerbi-client';
import { PowerBIDashboardEmbedComponent } from '../common/powerbi-embed/components/powerbi-dashboard-embed/powerbi-dashboard-embed.component';

@Component({
  selector: 'app-embed-dashboard',
  templateUrl: './embed-dashboard.component.html',
  styleUrls: ['./embed-dashboard.component.scss']
})
export class EmbedDashboardComponent implements OnInit {
  @ViewChild(PowerBIDashboardEmbedComponent) dashboardObj!: PowerBIDashboardEmbedComponent;
  dashboardClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  dashboardId = '160eb0cb-fb28-4db5-b4da-31ed93b8121b';
  dashboardConfig: IDashboardEmbedConfiguration = {
    type: 'dashboard',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.dashboardId,
    pageView: "fitToWidth",
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
      const dashboard = this.dashboardObj.getDashboard();
      dashboard.setComponentTitle('Embedded dashboard');
      console.log('Dashboard has loaded');
    },
    ],
    ['rendered', () => console.log('Dashboard has rendered')],
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
    this.powerbiService.getDashboardEmbedConfig(this.dashboardId).subscribe(response => {
      console.log(response);
      // Update the reportConfig to embed the PowerBI report
      this.dashboardConfig = {
        ...this.dashboardConfig,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.dashboardConfig);
    });
  }
}
