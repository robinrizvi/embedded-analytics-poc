import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IReportEmbedConfiguration, models, Page, Report, service, Embed, Visual, VisualDescriptor } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from '../common/powerbi-embed/components/powerbi-report-embed/powerbi-report-embed.component';
import 'powerbi-report-authoring';
import { IVisualResponse } from 'powerbi-report-authoring/dist/models';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss']
})
export class AuthorCreateComponent implements OnInit {
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  reportClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  authoredPage: Page;
  authoredVisual1: IVisualResponse | null = null;
  authoredVisual2: IVisualResponse | null = null;
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    viewMode: models.ViewMode.Edit,
    permissions: models.Permissions.All,
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

  constructor(private powerbiService: PowerbiService) { }

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

  removePage($event: MouseEvent) {
    this.authoredPage.delete();
  }

  removeVisual1($event: MouseEvent) {
    if (this.authoredVisual1 != null) {
      this.authoredPage.deleteVisual(this.authoredVisual1.visual.name);
      this.authoredVisual1 = null;
    }
  }

  async createVisual1($event: MouseEvent) {
    this.authoredVisual1 = await this.authoredPage.createVisual('columnChart');
    let visual1 = await this.authoredPage.getVisualByName(this.authoredVisual1.visual.name);

    const categoryColumn: models.IColumnTarget = {
      column: 'Category',
      table: 'tblProducts',
      $schema: 'http://powerbi.com/product/schema#column'
    };

    const revenueColumn: models.IColumnAggrTarget = {
      column: 'Revenue',
      table: 'tblRevenue',
      $schema: 'http://powerbi.com/product/schema#columnAggr',
      aggregationFunction: 'Sum'
    };

    visual1.getCapabilities().then((c) => console.log(c));

    visual1.addDataField('Category', categoryColumn);
    visual1.addDataField('Y', revenueColumn);
  }

  removeVisual2($event: MouseEvent) {
    if (this.authoredVisual2 != null) {
      this.authoredPage.deleteVisual(this.authoredVisual2.visual.name);
      this.authoredVisual2 = null;
    }
  }

  async createVisual2($event: MouseEvent) {
    this.authoredVisual2 = await this.authoredPage.createVisual('lineChart');
    let visual2 = await this.authoredPage.getVisualByName(this.authoredVisual2.visual.name);

    const categoryColumn: models.IColumnTarget = {
      column: 'SalesDate',
      table: 'tblRevenue',
      $schema: 'http://powerbi.com/product/schema#column'
    };

    const revenueColumn: models.IColumnAggrTarget = {
      column: 'Revenue',
      table: 'tblRevenue',
      $schema: 'http://powerbi.com/product/schema#columnAggr',
      aggregationFunction: 'Sum'
    };

    visual2.addDataField('Category', categoryColumn);
    visual2.addDataField('Y', revenueColumn);
  }

  async createPage($event: MouseEvent) {
    this.authoredPage = await this.reportObj.getReport().addPage("AuthoringPage");
  }
}
