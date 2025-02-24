import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { ITileEmbedConfiguration, models, Dashboard, service, Embed } from 'powerbi-client';
import { PowerBITileEmbedComponent } from '../common/powerbi-embed/components/powerbi-tile-embed/powerbi-tile-embed.component';

@Component({
  selector: 'app-embed-tile',
  templateUrl: './embed-tile.component.html',
  styleUrls: ['./embed-tile.component.scss']
})
export class EmbedTileComponent implements OnInit {
  @ViewChild(PowerBITileEmbedComponent) tileObj!: PowerBITileEmbedComponent;
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  dashboardId = '160eb0cb-fb28-4db5-b4da-31ed93b8121b';
  dashboardTileId = 'b5a33317-aa9c-4b51-8e31-ad9d47fe21cc';
  tileConfig: ITileEmbedConfiguration = {
    type: 'tile',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    dashboardId: this.dashboardId,
    id: this.dashboardTileId,
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
      const visual = this.tileObj.getTile();
      visual.setComponentTitle('Embedded Tile');
      console.log('Tile has loaded');
    },
    ],
    ['rendered', () => console.log('Tile has rendered')],
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
    this.powerbiService.getDashboardTileEmbedConfig(this.dashboardId, this.dashboardTileId).subscribe(response => {
      console.log(response);
      // Update the reportConfig to embed the PowerBI report
      this.tileConfig = {
        ...this.tileConfig,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.tileConfig);
    });
  }
}
