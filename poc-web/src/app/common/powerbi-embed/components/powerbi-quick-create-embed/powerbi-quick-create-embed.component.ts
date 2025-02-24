import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EventHandler, PowerBIEmbedComponent } from '../powerbi-embed/powerbi-embed.component';
import { Embed, IQuickCreateConfiguration, QuickCreate } from 'powerbi-client';

@Component({
  selector: 'powerbi-quickcreate[embedConfig]',
  templateUrl: './powerbi-quick-create-embed.component.html',
  styleUrls: ['./powerbi-quick-create-embed.component.scss']
})
export class PowerbiQuickCreateEmbedComponent extends PowerBIEmbedComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() embedConfig!: IQuickCreateConfiguration;
  @Input() eventHandlers?: Map<string, EventHandler | null>;
  @ViewChild('reportContainer') private containerRef!: ElementRef<HTMLDivElement>;
  private _embed?: Embed;

  constructor() {
    super();
  }

  private get embed(): Embed | undefined {
    return this._embed;
  }

  // Setter for this._embed
  private set embed(newEmbedInstance: Embed | undefined) {
    this._embed = newEmbedInstance;
  }

  getQuickCreateEmbeObject(): QuickCreate {
    return this._embed as QuickCreate;
  }

  override ngOnInit(): void {
    // Initialize PowerBI service instance variable from parent
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.embedConfig) {
      const prevEmbedConfig = changes.embedConfig.previousValue as IQuickCreateConfiguration;

      // Check if the function is being called for the first time
      if (!prevEmbedConfig) {
        return;
      }

      this.embedQuickCreate();
    }
  }

  ngAfterViewInit(): void {
    // Check if container exists on the UI
    // this.embedQuickCreate();
  }

  private embedQuickCreate() {
    if (this.containerRef.nativeElement) {
      // Decide to embed, load or bootstrap
      if (this.embedConfig.accessToken && this.embedConfig.accessToken.trim() && this.embedConfig.datasetCreateConfig) {
        this.embed = this.powerbi.quickCreate(this.containerRef.nativeElement, this.embedConfig);
      }
    }

    // Set event handlers if available
    if (this.eventHandlers && this.embed) {
      super.setEventHandlers(this.embed, this.eventHandlers);
    }
  }
}