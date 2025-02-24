import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../common/service/product/product.service';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { Embed, IVisualEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';

@Component({
  selector: 'app-drill-pbi-app',
  templateUrl: './drill-pbi-app.component.html',
  styleUrls: ['./drill-pbi-app.component.scss']
})
export class DrillPbiAppComponent {
  @ViewChild('visualObj') visualObj!: PowerBIVisualEmbedComponent;
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  visualName = 'ec6a991b288647c055c3';
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
      extensions: {
        commands: [{
          name: "showProductsCommand",
          title: "Show Products",
          icon: "data:image/png;base64,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",
          selector: {
            $schema: "http://powerbi.com/product/schema#visualSelector",
            visualName: 'ec6a991b288647c055c3'
          },
          extend: {
            visualContextMenu: {
              title: "Show Products",
            },
            // visualOptionsMenu: {
            //   title: "options menu title",
            // }
          }
        }]
      }
    }
  };

  eventHandlersMap = new Map([
    ['loaded', () => {
      const visual = this.visualObj.getVisual();
      visual.setComponentTitle('Embedded visual');
      console.log('Visual has loaded');
    },
    ],
    ['rendered', () => {
      console.log('Visual has rendered');
    }],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => console.log(event)],
    ['commandTriggered', (event) => {
      console.log(event);
      let commandName = event?.detail.command;

      if (commandName === "showProductsCommand") {
        const categories: string[] = [];
        event?.detail.dataPoints.forEach((dp: { identity: { equals: string; }[]; values: { value: number; }[]; }) => {
          dp.identity.forEach((idt: { equals: string; }) => categories.push(idt.equals));
        });
        this.navigateToProductsPage(categories);
      }
    }],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  constructor(private router: Router, private powerbiService: PowerbiService) { }

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

  navigateToProductsPage(categories: string[]): void {
    this.router.navigate(['/products-drill-target'],
      { queryParams: { categories: categories.join(',') } });
  }
}