export interface Coffee {
    country: string;
    region: string;
    tastingNotes: string[];
    producer: string;
    process: string;
    variety: string;
    image: string;
    flag: string;
    "James' comments": string;
    "Ed's comments": string;
}

export interface countryProductionProps {
    rank: number;
    country: string;
    metric_tons: number;
}