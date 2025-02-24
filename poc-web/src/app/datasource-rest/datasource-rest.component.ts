import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IReportEmbedConfiguration, models, Page, Report, service, Embed } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from '../common/powerbi-embed/components/powerbi-report-embed/powerbi-report-embed.component';

@Component({
  selector: 'app-datasource-rest',
  templateUrl: './datasource-rest.component.html',
  styleUrls: ['./datasource-rest.component.scss']
})
export class DatasourceRestComponent implements OnInit {
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  reportClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '1526aed8-b15f-405c-a42a-c2fcc21c3581';
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
    this.powerbiService.getReportEmbedConfig(this.reportId).subscribe(response => {
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
}