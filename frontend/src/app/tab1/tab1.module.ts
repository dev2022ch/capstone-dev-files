import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { EventSummaryComponent } from '../components/event-summary/event-summary.component';
import { EventAndRegDetailsGoerComponent } from '../components/event-and-reg-details-goer/event-and-reg-details-goer.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, EventSummaryComponent, EventAndRegDetailsGoerComponent]
})
export class Tab1PageModule {}
