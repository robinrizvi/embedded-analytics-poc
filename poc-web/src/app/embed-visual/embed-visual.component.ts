import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IVisualEmbedConfiguration, models, Dashboard, service, Embed } from 'powerbi-client';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';

@Component({
  selector: 'app-embed-visual',
  templateUrl: './embed-visual.component.html',
  styleUrls: ['./embed-visual.component.scss']
})
export class EmbedVisualComponent implements OnInit {
  @ViewChild(PowerBIVisualEmbedComponent) visualObj!: PowerBIVisualEmbedComponent;
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  visualName = 'd4751212dd110a22b9d0';
  pageName = 'ReportSection1ab7dfc4e6d9019894ea';
  visualConfig: IVisualEmbedConfiguration = {
    type: 'visual',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    pageName: this.pageName,
    visualName: this.visualName,
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
      const visual = this.visualObj.getVisual();
      visual.setComponentTitle('Embedded visual');
      console.log('Visual has loaded');
    },
    ],
    ['rendered', () => console.log('Visual has rendered')],
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
      this.visualConfig = {
        ...this.visualConfig,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.visualConfig);
    });
  }
}
