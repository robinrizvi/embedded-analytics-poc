import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectModule } from '@angular/material/select';
import { PowerBIDashboardEmbedComponent } from './common/powerbi-embed/components/powerbi-dashboard-embed/powerbi-dashboard-embed.component';
import { PowerBIEmbedComponent } from './common/powerbi-embed/components/powerbi-embed/powerbi-embed.component';
import { PowerBIPaginatedReportEmbedComponent } from './common/powerbi-embed/components/powerbi-paginated-report-embed/powerbi-paginated-report-embed.component';
import { PowerBIQnaEmbedComponent } from './common/powerbi-embed/components/powerbi-qna-embed/powerbi-qna-embed.component';
import { PowerBIReportEmbedComponent } from './common/powerbi-embed/components/powerbi-report-embed/powerbi-report-embed.component';
import { PowerBITileEmbedComponent } from './common/powerbi-embed/components/powerbi-tile-embed/powerbi-tile-embed.component';
import { PowerBIVisualEmbedComponent } from './common/powerbi-embed/components/powerbi-visual-embed/powerbi-visual-embed.component';
import { EmbedReportComponent } from './embed-report/embed-report.component';
import { EmbedDashboardComponent } from './embed-dashboard/embed-dashboard.component';
import { EmbedVisualComponent } from './embed-visual/embed-visual.component';
import { EmbedTileComponent } from './embed-tile/embed-tile.component';
import { ClientAnalyticsComponent } from './client-analytics/client-analytics.component';
import { ClientService } from './common/service/client/client.service';
import { PocDocumentationComponent } from './poc-documentation/poc-documentation.component';
import { PowerbiQuickCreateEmbedComponent } from './common/powerbi-embed/components/powerbi-quick-create-embed/powerbi-quick-create-embed.component';
import { EmbedAdhocComponent } from './embed-adhoc/embed-adhoc.component';
import { ContextInboundComponent } from './context-inbound/context-inbound.component';
import { ProductService } from './common/service/product/product.service';
import { ContextOutboundComponent } from './context-outbound/context-outbound.component';
import { EmbedAdhocManualComponent } from './embed-adhoc-manual/embed-adhoc-manual.component';
import { EmbedQnaComponent } from './embed-qna/embed-qna.component';
import { DrillPbiAppComponent } from './drill-pbi-app/drill-pbi-app.component';
import { DrillPbiAppTargetComponent } from './drill-pbi-app-target/drill-pbi-app-target.component';
import { DrillUpDownComponent } from './drill-up-down/drill-up-down.component';
import { DrillThroughComponent } from './drill-through/drill-through.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { SessionService } from './common/service/session/session.service';
import { SessionAppValidationComponent } from './session-app-validation/session-app-validation.component';
import { SessionPbiValidationComponent } from './session-pbi-validation/session-pbi-validation.component';
import { MultitenancyRlsComponent } from './multitenancy-rls/multitenancy-rls.component';
import { MultitenancyWrkspcComponent } from './multitenancy-wrkspc/multitenancy-wrkspc.component';
import { DatasourceMongoComponent } from './datasource-mongo/datasource-mongo.component';
import { DatasourceRestComponent } from './datasource-rest/datasource-rest.component';

@NgModule({
    declarations: [
        AppComponent,
        PowerBIDashboardEmbedComponent,
        PowerBIEmbedComponent,
        PowerBIPaginatedReportEmbedComponent,
        PowerBIQnaEmbedComponent,
        PowerBIReportEmbedComponent,
        PowerBITileEmbedComponent,
        PowerBIVisualEmbedComponent,
        EmbedReportComponent,
        EmbedDashboardComponent,
        EmbedVisualComponent,
        EmbedTileComponent,
        ClientAnalyticsComponent,
        PocDocumentationComponent,
        PowerbiQuickCreateEmbedComponent,
        EmbedAdhocComponent,
        ContextInboundComponent,
        ContextOutboundComponent,
        EmbedAdhocManualComponent,
        EmbedQnaComponent,
        DrillPbiAppComponent,
        DrillPbiAppTargetComponent,
        DrillUpDownComponent,
        DrillThroughComponent,
        AuthorEditComponent,
        AuthorCreateComponent,
        SessionAppValidationComponent,
        SessionPbiValidationComponent,
        MultitenancyRlsComponent,
        MultitenancyWrkspcComponent,
        DatasourceMongoComponent,
        DatasourceRestComponent
    ],
    providers: [ClientService, ProductService, SessionService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        AgGridModule,
        MatSelectModule,
        MarkdownModule.forRoot({ loader: HttpClientModule })
    ]
})
export class AppModule { }
