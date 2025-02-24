import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductService } from '../common/service/product/product.service';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { Embed, IVisualEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';

@Component({
  selector: 'app-context-outbound',
  templateUrl: './context-outbound.component.html',
  styleUrls: ['./context-outbound.component.scss']
})
export class ContextOutboundComponent {
  public columnDefs: ColDef[] = [
    { field: 'productid' },
    { field: 'productname' },
    { field: 'category' },
    { field: 'released' }
  ];

  public defaultColDef: ColDef = {
    sortable: false,
    filter: false,
  };

  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @ViewChild('visualObj1') visualObj1!: PowerBIVisualEmbedComponent;
  @ViewChild('visualObj2') visualObj2: PowerBIVisualEmbedComponent;
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  totalRevenue: string;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  visualName1 = 'aa53a60d7041c85dd0db';
  visualName2 = 'b6fd455704c038a93e04';
  pageName = 'ReportSection1ab7dfc4e6d9019894ea';
  visualConfig1: IVisualEmbedConfiguration = {
    type: 'visual',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    pageName: this.pageName,
    visualName: this.visualName1,
    settings: {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToWidth
      },
      background: 1,
      filterPaneEnabled: false
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
      filterPaneEnabled: false
    }
  };

  eventHandlersMap1 = new Map([
    ['loaded', () => {
      const visual = this.visualObj1.getVisual();
      visual.setComponentTitle('Embedded visual1');
      console.log('Visual1 has loaded');
    },
    ],
    ['rendered', () => {
      console.log('Visual1 has rendered');
    }],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    },
    ],
    ['visualClicked', () => console.log('visual1 clicked')],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => {
      console.log(event);
      const categories: string[] = [];
      let totalRevenue: number = 0;
      event?.detail.dataPoints.forEach((dp: { identity: { equals: string; }[]; values: { value: number; }[]; }) => {
        dp.identity.forEach((idt: { equals: string; }) => categories.push(idt.equals));
        dp.values.forEach((v: { value: number; }) => totalRevenue += v.value);
      });
      this.totalRevenue = totalRevenue > 0 ? "Total reveneue by product category is: " + totalRevenue : '';
      this.selectAllRowsByCategory(categories);
    }],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  eventHandlersMap2 = new Map([
    ['loaded', () => {
      const visual = this.visualObj2.getVisual();
      visual.setComponentTitle('Embedded visual2');
      console.log('Visual2 has loaded');
    },
    ],
    ['rendered', () => {
      console.log('Visual2 has rendered');
    }],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    },
    ],
    ['visualClicked', () => console.log('visual2 clicked')],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => {
      console.log(event);
      const products: string[] = [];
      let totalRevenue: number = 0;
      event?.detail.dataPoints.forEach((dp: { identity: { equals: string; }[]; values: { value: number; }[]; }) => {
        dp.identity.forEach((idt: { equals: string; }) => products.push(idt.equals));
        dp.values.forEach((v: { value: number; }) => totalRevenue += v.value);
      });
      this.totalRevenue = totalRevenue > 0 ? "Total reveneue by product is: " + totalRevenue : '';
      this.selectAllRowsByProductName(products);
    }],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  constructor(private productService: ProductService, private powerbiService: PowerbiService) { }

  ngOnInit(): void {
    this.powerbiService.getReportEmbedConfig(this.reportId).subscribe(response => {
      console.log(response);
      // Update the reportConfig to embed the PowerBI report
      this.visualConfig1 = {
        ...this.visualConfig1,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.visualConfig1);

      // Update the reportConfig to embed the PowerBI report
      this.visualConfig2 = {
        ...this.visualConfig2,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.visualConfig2);
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.productService.findAll();
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  selectAllRowsByCategory(categories: string[]): void {
    const selected: IRowNode<any>[] = [];
    const deselected: IRowNode<any>[] = [];
    this.agGrid.api.forEachNode(function (node) {
      if (categories.includes(node.data.category)) {
        selected.push(node);
      } else {
        deselected.push(node);
      }
    });
    this.agGrid.api.setNodesSelected({ nodes: selected, newValue: true });
    this.agGrid.api.setNodesSelected({ nodes: deselected, newValue: false });
  }

  selectAllRowsByProductName(productNames: string[]): void {
    const selected: IRowNode<any>[] = [];
    const deselected: IRowNode<any>[] = [];
    this.agGrid.api.forEachNode(function (node) {
      if (productNames.includes(node.data.productname)) {
        selected.push(node);
      } else {
        deselected.push(node);
      }
    });
    this.agGrid.api.setNodesSelected({ nodes: selected, newValue: true });
    this.agGrid.api.setNodesSelected({ nodes: deselected, newValue: false });
  }
}