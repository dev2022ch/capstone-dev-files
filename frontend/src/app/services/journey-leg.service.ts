import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJourney } from '../interfaces/journey';
import { IJourneyInfo } from '../interfaces/journey-info';
import { IJourneyLeg } from '../interfaces/journeyLeg';

@Injectable({
  providedIn: 'root'
})
export class JourneyLegService {

  journeyInfo:IJourneyInfo;

  constructor(private httpClient:HttpClient) { }

  getJourneysAndLegs(userID:number){
    console.log("userID:number: " + userID);
    console.log(`http://localhost:3000/journeyAndLegs/:${userID}`);
  
  //  return this.httpClient.get<IJourneyLeg[]>(`http://localhost:3000/journeysAndLegs/${userID}`);
    return this.httpClient.get<IJourneyLeg[]>(`http://localhost:3000/journeysAndLegs/${userID}`);

  }


  getJourneyAndLegs(userID:number, journeyID: number){
    console.log("getJourneyAndLegs");
    return this.httpClient.get<IJourney>(`http://localhost:3000/journeyAndLegs/${userID}/${journeyID}`);

  }

  getJourneyInfo(journeyAndLegs:any){
    this.journeyInfo = <IJourneyInfo>{};
  //  this.journeyInfo.destinations =  {};

    this.journeyInfo.dateFrom = this.getJourneyStartDate(journeyAndLegs);
    this.journeyInfo.dateTo =  this.getJourneyEndDate(journeyAndLegs);
    this.journeyInfo.destinations =  this.getJourneyDestinations(journeyAndLegs);

    return this.journeyInfo;
 }

 getJourneyStartDate(journeyAndLegs:any){
  console.log("journeyAndLegs");
  console.log(journeyAndLegs);
  console.log("journeyAndLegs.userID");
  console.log(journeyAndLegs.userID);
    let startDate = new Date(journeyAndLegs.Legs[0].dateFrom);


      for (let j of journeyAndLegs.Legs) {
        let dateFrom = new Date(j.dateFrom);
        if (startDate > dateFrom) {
          startDate = dateFrom
        }
      }
      return startDate;
 }

 getJourneyEndDate(journeyAndLegs:any){
    let endDate = new Date(journeyAndLegs.Legs[0].dateTo);
    for (let j of journeyAndLegs.Legs) {
      let dateTo = new Date(j.dateTo);
      if (endDate < dateTo) {
        endDate = dateTo;
      }
    }
    return endDate;
 }
 
 getJourneyDestinations(journeyAndLegs:any){
    let destinationsSet = new Set();

    for (let j of journeyAndLegs.Legs) {
      destinationsSet.add(j.tripFrom);
      destinationsSet.add(j.tripTo);
    }
    // Create an Iterator
    const destinationValues = destinationsSet.values();
    // List all Values
    let destinations = "";
    for (let destination of destinationValues) {
      destinations += (destination + "  ");
    }
    return destinations;
 }


  putJourneyLegDetails(legId:number, Data: any) {
    return this.httpClient.put(`http://localhost:3000/journeyLegs/${legId}`, Data);
  }

  postJourneyLeg(Data: any) {

    return this.httpClient.post("http://localhost:3000/journeyLegs", Data);
  }

  postJourney(Data: any) {

    return this.httpClient.post("http://localhost:3000/journeys", Data);
  }

}
