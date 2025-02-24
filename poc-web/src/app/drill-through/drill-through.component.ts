import { Component, ViewChild } from '@angular/core';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { Embed, IVisualEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';

@Component({
  selector: 'app-drill-through',
  templateUrl: './drill-through.component.html',
  styleUrls: ['./drill-through.component.scss']
})
export class DrillThroughComponent {
  @ViewChild('visualObj') visualObj!: PowerBIVisualEmbedComponent;
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  visualName = '08747e14c3ab9c249288';
  pageName = 'ReportSectionc438bb890909ca1a0ae7';
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
      filterPaneEnabled: false,
    }
  };

  eventHandlersMap = new Map([
    ['loaded', () => {
      const visual = this.visualObj.getVisual();
      visual.setComponentTitle('Embedded visual');
      console.log('Visual has loaded');
    },
    ],
    ['rendered', (ev: any) => {
      console.log('Visual has rendered');
    }],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    },
    ],
    ['visualClicked', (ev) => {
      console.log('visual clicked');
      console.log(ev);
    }],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => console.log(event)]
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  constructor(private powerbiService: PowerbiService) { }

  ngOnInit(): void {
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
