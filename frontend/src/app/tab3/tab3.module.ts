import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { EventSummaryComponent } from '../components/event-summary/event-summary.component';
import { EventAndRegDetailsGoerComponent } from '../components/event-and-reg-details-goer/event-and-reg-details-goer.component';
import { EventDetailsOrgComponent } from '../components/event-details-org/event-details-org.component';
import { RegistrationForOrgComponent } from '../components/registration-for-org/registration-for-org.component';
import { RegistrationsForOrgComponent } from '../components/registrations-for-org/registrations-for-org.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page, 
    EventSummaryComponent,
    EventAndRegDetailsGoerComponent,
    EventDetailsOrgComponent,
    RegistrationsForOrgComponent,
    RegistrationForOrgComponent]
})
export class Tab3PageModule {}
