import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../common/service/client/client';
import { ConfigResponse } from '../common/service/powerbi/config-response';
import { ClientService } from '../common/service/client/client.service';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';
import { IReportEmbedConfiguration, models, Page, Report, service, Embed } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from '../common/powerbi-embed/components/powerbi-report-embed/powerbi-report-embed.component';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-analytics',
  templateUrl: './client-analytics.component.html',
  styleUrls: ['./client-analytics.component.scss']
})
export class ClientAnalyticsComponent implements OnInit {
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

  public rowData$!: Observable<any[]>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  // CSS Class to be passed to the wrapper
  reportClass = 'powerbi-container';
  reportId = '37700d57-b264-4a44-b03a-4d9c70cd4c14';
  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;
  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    id: this.reportId,
    settings: {
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToWidth
      },
      background: 1,
      filterPaneEnabled: false
    }
  };
  /**
   * Map of event handlers to be applied to the embedded report
   */
  // Update event handlers for the report by redefining the map using this.eventHandlersMap
  // Set event handler to null if event needs to be removed
  // More events can be provided from here
  // https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
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

  constructor(private clientService: ClientService, private powerbiService: PowerbiService) {

  }

  ngOnInit(): void {
    // Get the embed config from the service and set the reportConfigResponse
    this.powerbiService.getReportEmbedConfig(this.reportId).subscribe(response => {
      console.log(response);
      // Update the reportConfig to embed the PowerBI report
      this.reportConfig = {
        ...this.reportConfig,
        id: response.id,
        embedUrl: response.embedUrl,
        accessToken: response.embedToken,
      };
      console.log(this.reportConfig);
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.clientService.findAll();
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}