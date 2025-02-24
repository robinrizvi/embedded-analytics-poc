import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductService } from '../common/service/product/product.service';
import { PowerBIVisualEmbedComponent } from '../common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { Embed, IVisualEmbedConfiguration, models, service } from 'powerbi-client';
import { PowerbiService } from '../common/service/powerbi/powerbi.service';

@Component({
  selector: 'app-drill-pbi-app-target',
  templateUrl: './drill-pbi-app-target.component.html',
  styleUrls: ['./drill-pbi-app-target.component.scss']
})
export class DrillPbiAppTargetComponent {
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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.productService.findAll();
  }

  onFirstDataRendered(event: FirstDataRenderedEvent) {
    this.route.queryParams
      .subscribe((params): void => {
        console.log(params);
        this.selectAllRowsByCategory(params.categories);
      });
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
}