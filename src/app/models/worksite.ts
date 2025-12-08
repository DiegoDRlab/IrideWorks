export class Worksite{
    public id! : string;
    public name! : string;
    public descriription! : string;
    public customer! : string;
    public address! : string;
    public city! : string;
    public startDate! : Date;
    public completedDate! : Date;
    public workstiteStatus! : WorkstiteStatus;
    public manager! : string;
    public notes! : string;
    public imageBase64! : string;
    public activities : Activity[] = [];
}

export class Activity{
    public startDate! : Date;
    public endDate! : Date;
    public name! : string;
    public description! : string;
    public notes! : string;
    public manager! : string;
    public completed! : boolean;
}

export enum WorkstiteStatus{
    Ongoing = 'In Corso',
    Incoming = 'In Arrivo',
    Completed = 'Completato'
}