export interface IJourneyLeg {
    legID:number;
    journeyID:number;
    regID:number;
    tripFrom:string;
    dateFrom:Date;
    tripTo:string;
    dateTo:Date;
    transMode:number;
    costTrans:number;
    OWRndTrip:number;
    addrAccomd:string;
    dateStayStart:Date;
    dateStayEnd:Date;
    accomType:number;
    costAccomd:number;
}
