import { Component, ViewChild } from '@angular/core';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { Embed, IVisualEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { SessionService } from '../common/service/session/session.service';

@Component({
  selector: 'app-session-app-validation',
  templateUrl: './session-app-validation.component.html',
  styleUrls: ['./session-app-validation.component.scss']
})
export class SessionAppValidationComponent {
  @ViewChild('visualObj') visualObj!: PowerBIVisualEmbedComponent;
  @ViewChild('visualObj2') visualObj2!: PowerBIVisualEmbedComponent;
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  visualName = 'd270a6400c750245899c';
  visualName2 = '88721ef1c46ec7034175';
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
  visualConfig2: IVisualEmbedConfiguration = {
    type: 'visual',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    pageName: this.pageName,
    visualName: this.visualName2,
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
      this.visualObj.getVisual().getVisualDescriptor().then(vd => vd.exportData(models.ExportDataType.Summarized).then(d => console.log(d)));
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
    ['dataSelected', (event) => console.log(event)],
    ['buttonClicked', (event) => console.log(event)]
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  eventHandlersMap2 = new Map([
    ['loaded', () => {
      const visual = this.visualObj.getVisual();
      visual.setComponentTitle('Embedded visual');
      console.log('Visual has loaded');
    },
    ],
    ['rendered', (ev: any) => {
      console.log('Visual has rendered');
      this.visualObj.getVisual().getVisualDescriptor().then(vd => vd.exportData(models.ExportDataType.Summarized).then(d => console.log(d)));
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
    ['dataSelected', (event) => console.log(event)],
    ['buttonClicked', (event) => console.log(event)]
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  constructor(private powerbiService: PowerbiService, private sessionService: SessionService) {
    this.sessionService.logoutEvent$.subscribe(() => {
      this.visualObj.getVisual().setAccessToken('INVALIDATE');
      this.visualObj2.getVisual().setAccessToken('INVALIDATE');
    });
  }

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
      // Update the reportConfig to embed the PowerBI report
      this.visualConfig2 = {
        ...this.visualConfig2,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.visualConfig2);
    });
  }
}
