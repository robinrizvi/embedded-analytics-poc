import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IQnaEmbedConfiguration, models, service, Embed } from 'powerbi-client';
import { PowerBIQnaEmbedComponent } from '../common/powerbi-embed/components/powerbi-qna-embed/powerbi-qna-embed.component';

@Component({
  selector: 'app-embed-qna',
  templateUrl: './embed-qna.component.html',
  styleUrls: ['./embed-qna.component.scss']
})
export class EmbedQnaComponent implements OnInit {
  @ViewChild(PowerBIQnaEmbedComponent) qnaObj!: PowerBIQnaEmbedComponent;
  reportClass = 'powerbi-container';
  datasetId = '6a826e49-3d40-42b5-bfd2-be453e7f1aad';
  qnaConfig: IQnaEmbedConfiguration = {
    type: 'qna',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    datasetIds: [this.datasetId],
    viewMode: models.QnaMode.Interactive,
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
      const report = this.qnaObj.getQna();
      report.setComponentTitle('Embedded Q&A');
      console.log('Q&A has loaded');
    },
    ],
    ['rendered', () => console.log('Q&A has rendered')],
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
    this.powerbiService.getQnaEmbedConfig(this.datasetId).subscribe(response => {
      console.log(response);
      this.qnaConfig = {
        ...this.qnaConfig,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.qnaConfig);
    });
  }
}
