import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, SortChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductService } from '../common/service/product/product.service';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { Embed, IVisualEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-context-inbound',
  templateUrl: './context-inbound.component.html',
  styleUrls: ['./context-inbound.component.scss']
})
export class ContextInboundComponent implements OnInit {
  public columnDefs: ColDef[] = [
    { field: 'productid' },
    { field: 'productname', sortable: true, sortingOrder: ['asc', 'desc'] },
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
  @ViewChild('visualObj3') visualObj3: PowerBIVisualEmbedComponent;
  categoryList = new FormControl('');
  categories: string[] = ['FLUX', 'DARO', 'KENO'];
  containerClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  visualName1 = 'aa53a60d7041c85dd0db';
  visualName2 = 'b6fd455704c038a93e04';
  visualName3 = 'd4751212dd110a22b9d0';
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
  visualConfig3: IVisualEmbedConfiguration = {
    type: 'visual',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    pageName: this.pageName,
    visualName: this.visualName3,
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
    ['dataSelected', (event) => console.log(event)],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  eventHandlersMap2 = new Map([
    ['loaded', () => {
      const visual = this.visualObj2.getVisual();
      visual.setComponentTitle('Embedded visual2');
      console.log('Visual2 has loaded');
      this.agGrid.columnApi.getColumnState().filter(c => c.colId == 'productname' && c.sort != null).forEach(c => 
        this.applyProductNameSort(c.sort as string));
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
    ['dataSelected', (event) => console.log(event)],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  eventHandlersMap3 = new Map([
    ['loaded', () => {
      const visual = this.visualObj3.getVisual();
      visual.setComponentTitle('Embedded visual3');
      console.log('Visual3 has loaded');
    },
    ],
    ['rendered', () => {
      console.log('Visual3 has rendered');
    }],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    },
    ],
    ['visualClicked', () => console.log('visual3 clicked')],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => console.log(event)],
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

      // Update the reportConfig to embed the PowerBI report
      this.visualConfig3 = {
        ...this.visualConfig3,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.visualConfig3);
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.productService.findAll();
    params.columnApi.applyColumnState({
      state: [
        {
          colId: 'productname',
          sort: 'asc'
        }
      ]
    });
  }

  onSortChanged(e: SortChangedEvent): void {
    e.columnApi.getColumnState().filter(c => c.colId == 'productname' && c.sort != null).forEach(c => 
      this.applyProductNameSort(c.sort as string));
  }

  applyProductNameSort(order: string) {
    const orderByDef = {
      // Set the target data field of the sort
      orderBy: {
        table: "tblProducts",
        column: "Product Name"
      },
      direction: order == 'asc' ? models.SortDirection.Ascending : models.SortDirection.Descending
    };

    this.visualObj1.getVisual().getVisualDescriptor().then(vd => vd.sortBy(orderByDef));
    this.visualObj2.getVisual().getVisualDescriptor().then(vd => vd.sortBy(orderByDef));
    this.visualObj3.getVisual().getVisualDescriptor().then(vd => vd.sortBy(orderByDef));
  }

  applyCategoryFilter(categories: string[]): void {
    this.rowData$ = this.productService.findAllByCategory(categories);

    const filter: models.IBasicFilter = {
      $schema: "http://powerbi.com/product/schema#basic",
      filterType: models.FilterType.Basic,
      values: categories,
      operator: "In",
      target: {
        table: 'tblProducts',
        column: 'Category'
      }
    };

    this.visualObj1.getVisual().getFilters().then(filters => {
      console.log(filters);
      this.visualObj1.getVisual().updateFilters(models.FiltersOperations.Replace, [filter]);
    });
    this.visualObj2.getVisual().getFilters().then(filters => {
      console.log(filters);
      this.visualObj2.getVisual().updateFilters(models.FiltersOperations.Replace, [filter]);
    });
    this.visualObj3.getVisual().getFilters().then(filters => {
      console.log(filters);
      this.visualObj3.getVisual().updateFilters(models.FiltersOperations.Replace, [filter]);
    });
  }

  categoryChange(event: MatSelectChange): void {
    this.applyCategoryFilter((event.value as string[]).length > 0 ? event.value : this.categories);
  }
}
