import { Component, OnInit, ViewChild } from '@angular/core';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { models, service, Embed, IQuickCreateConfiguration } from 'powerbi-client';
import { PowerbiQuickCreateEmbedComponent } from '../common/powerbi-embed/components/powerbi-quick-create-embed/powerbi-quick-create-embed.component';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Client } from '../common/service/client/client';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ClientService } from '../common/service/client/client.service';

@Component({
  selector: 'app-embed-adhoc',
  templateUrl: './embed-adhoc.component.html',
  styleUrls: ['./embed-adhoc.component.scss']
})
export class EmbedAdhocComponent {
  public columnDefs: ColDef[] = [
    { field: 'company' },
    { field: 'country' },
    { field: 'state' },
    { field: 'city' },
    { field: 'street' }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<Client[]>;
  reportRows: string[][] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(PowerbiQuickCreateEmbedComponent) quickCreateObj!: PowerbiQuickCreateEmbedComponent;
  reportClass = 'powerbi-container';
  phasedEmbeddingFlag = false;
  groupId = 'eed5dcae-8289-4804-9b36-71e172508f1c';
  tableSchemaList: models.ITableSchema[] = [{
    name: "client",
    columns: [
      {
        name: "company",
        dataType: models.DataType.Text
      },
      {
        name: "country",
        dataType: models.DataType.Text
      },
      {
        name: "state",
        dataType: models.DataType.Text
      },
      {
        name: "city",
        dataType: models.DataType.Text
      },
      {
        name: "street",
        dataType: models.DataType.Text
      }
    ]
  }];
  data: models.IDataTable[] = [{
    "name": "client",
    "rows": this.reportRows
  }];
  datasetCreateConfig: models.IDatasetCreateConfiguration = {
    "locale": "en_US",
    "tableSchemaList": this.tableSchemaList,
    "data": this.data
  }
  quickCreateConfig: IQuickCreateConfiguration = {
    type: 'quickCreate',
    embedUrl: 'https://app.powerbi.com/quickcreate',
    tokenType: models.TokenType.Aad,
    accessToken: '',
    // groupId: this.groupId,
    reportCreationMode: models.ReportCreationMode.QuickExplore,
    datasetCreateConfig: this.datasetCreateConfig,
    settings: {
      authoringHintsEnabled: false,
      bars: {
        actionBar: {
          visible: false
        },
        statusBar: {
          visible: false
        }
      },
      commands: [{
        copy: { displayOption: 2 },
        drill: { displayOption: 2 },
        drillthrough: { displayOption: 2 },
        addComment: { displayOption: 2 }
      }],
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
      panes: {
        bookmarks: { visible: false },
        pageNavigation: { visible: false },
        selection: { visible: false },
        syncSlicers: { visible: false },
      },
      useCustomSaveAsDialog: false,
    }
  };

  eventHandlersMap = new Map([
    ['loaded', () => {
      const report = this.quickCreateObj.getQuickCreateEmbeObject();
      report.setComponentTitle('Embedded quick create report');
      console.log('Quick Create Report has loaded');
    }
    ],
    ['rendered', () => console.log('Quick Create Report has rendered')],
    ['error', (event?: service.ICustomEvent<any>) => {
      if (event) {
        console.error(event.detail);
      }
    }
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => console.log(event)],
    ['dataSelected', (event) => console.log(event)],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  constructor(private clientService: ClientService, private powerbiService: PowerbiService) {

  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.clientService.findAll();
    this.rowData$.subscribe(cls => {
      cls.forEach(cl => {
        let row: string[] = [];
        row.push(cl.company, cl.country, cl.state, cl.city, cl.street);
        this.reportRows.push(row);
      });

      this.powerbiService.getQuickCreateReportEmbedConfig().subscribe(response => {
        console.log(response);
        this.quickCreateConfig = {
          ...this.quickCreateConfig,
          accessToken: response.embedToken,
        };
        console.log(this.quickCreateConfig);
      });
    });
  }
}