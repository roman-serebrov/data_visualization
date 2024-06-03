interface Section {
    front: number;
    back: number;
    db: number;
    [key: string]: number; 
}


interface SectionColors {
    front: string,
    back:string,
    db: string
    [key: string]: string
}

interface SetAttributes {
    (element:Element, attributes: {[key: string]: string}): void
}


interface ChartData {
    dev: Section;
    prod: Section;
    test: Section;
    norm: number
}

type Chart = ( 
    SVG__WIDTH: number,
    SVG__HEIGHT: number,
    COLUMN__WIDTH: number,
    COLUMN__SPACING: number,
    COLUMNS: number,
    SVG_ID: string,
    data: ChartData,
) => void