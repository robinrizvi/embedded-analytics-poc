import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAnalyticsComponent } from './client-analytics/client-analytics.component';
import { EmbedReportComponent } from './embed-report/embed-report.component';
import { EmbedDashboardComponent } from './embed-dashboard/embed-dashboard.component';
import { EmbedVisualComponent } from './embed-visual/embed-visual.component';
import { PocDocumentationComponent } from './poc-documentation/poc-documentation.component';
import { EmbedTileComponent } from './embed-tile/embed-tile.component';
import { EmbedAdhocComponent } from './embed-adhoc/embed-adhoc.component';
import { ContextInboundComponent } from './context-inbound/context-inbound.component';
import { ContextOutboundComponent } from './context-outbound/context-outbound.component';
import { EmbedAdhocManualComponent } from './embed-adhoc-manual/embed-adhoc-manual.component';
import { EmbedQnaComponent } from './embed-qna/embed-qna.component';
import { DrillPbiAppComponent } from './drill-pbi-app/drill-pbi-app.component';
import { DrillPbiAppTargetComponent } from './drill-pbi-app-target/drill-pbi-app-target.component';
import { DrillUpDownComponent } from './drill-up-down/drill-up-down.component';
import { DrillThroughComponent } from './drill-through/drill-through.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { SessionAppValidationComponent } from './session-app-validation/session-app-validation.component';
import { SessionPbiValidationComponent } from './session-pbi-validation/session-pbi-validation.component';
import { MultitenancyRlsComponent } from './multitenancy-rls/multitenancy-rls.component';
import { DatasourceMongoComponent } from './datasource-mongo/datasource-mongo.component';
import { DatasourceRestComponent } from './datasource-rest/datasource-rest.component';
import { MultitenancyWrkspcComponent } from './multitenancy-wrkspc/multitenancy-wrkspc.component';

const routes: Routes = [
  { path: 'embed-report', component: EmbedReportComponent },
  { path: 'embed-visual', component: EmbedVisualComponent },
  { path: 'embed-dashboard', component: EmbedDashboardComponent },
  { path: 'embed-tile', component: EmbedTileComponent },
  { path: 'embed-qna', component: EmbedQnaComponent },
  { path: 'embed-adhoc-quick', component: EmbedAdhocComponent },
  { path: 'embed-adhoc-manual', component: EmbedAdhocManualComponent },
  { path: 'context-inbound', component: ContextInboundComponent },
  { path: 'context-outbound', component: ContextOutboundComponent },
  { path: 'drill-up-down', component: DrillUpDownComponent },
  { path: 'drill-through', component: DrillThroughComponent },
  { path: 'drill-pbi-app', component: DrillPbiAppComponent },
  { path: 'products-drill-target', component: DrillPbiAppTargetComponent },
  { path: 'author-edit', component: AuthorEditComponent },
  { path: 'author-create', component: AuthorCreateComponent },
  { path: 'session-app-validation', component: SessionAppValidationComponent },
  { path: 'session-pbi-validation', component: SessionPbiValidationComponent },
  { path: 'multitenancy-rls', component: MultitenancyRlsComponent },
  { path: 'multitenancy-wrkspc', component: MultitenancyWrkspcComponent },
  { path: 'datasource-mongo', component: DatasourceMongoComponent },
  { path: 'datasource-rest', component: DatasourceRestComponent },
  { path: 'clients', component: ClientAnalyticsComponent },
  { path: 'poc-documentation', component: PocDocumentationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
