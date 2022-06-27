import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { JourneyComponent } from '../components/journey/journey.component';
import { JourneyLegComponent } from '../components/journey-leg/journey-leg.component';
import { JourneyLegDetailsComponent } from '../components/journey-leg-details/journey-leg-details.component';
import { EventSummaryComponent } from '../components/event-summary/event-summary.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page, 
    JourneyComponent, 
    JourneyLegComponent, 
    JourneyLegDetailsComponent, 
    EventSummaryComponent]
})
export class Tab2PageModule {}
