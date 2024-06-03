export const WIDTH__SVG = 700;
export const HEIGHT__SVG  = 500;
export const COLUMN__WIDTH = 80;
export const COLUMN__SPACING = 100;
export const COLUMNS = 4;






export const normalizeSections = (...sectionsData: Section[]) => {
    
    const
        NORMAL__HEIGHT__COLUMN = 100,
        MIN__HEIGHT__SECTION    = 30;

    const maxTotalHeight =
                        Math.max(...sectionsData.flatMap(column => [column.front, column.back, column.db]));
    
    const scaleColumn = (column: Section): Section => {
        return {
            front: normalizeAndScale(column.front, maxTotalHeight),
            back:  normalizeAndScale(column.back, maxTotalHeight),
            db:    normalizeAndScale(column.db, maxTotalHeight)
        };
    };
    const normalizeAndScale = (value: number, maxValue: number) => {
        const normalized = value > 0 ? (value / maxValue) * NORMAL__HEIGHT__COLUMN : 0;
        return normalized < MIN__HEIGHT__SECTION ? MIN__HEIGHT__SECTION + normalized : normalized;
    };
    
   return sectionsData.map(scaleColumn);
   
}



export const createElementSvg = (type: string) => document.createElementNS("http://www.w3.org/2000/svg", type);

export const setAttributes: SetAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};


export const calculatePositionX = (startX: number, i: number, columnWidth: number, columnSpacing: number): number => {
    return startX + i * (columnWidth + columnSpacing);
};

export const calculatePositionY = (svgHeight: number, height : number) => {
    return svgHeight - 70 - height;
}

export const createSectionPath = (section: string, positionX: number, currentY: number, width: number, sectionHeight: number) => {
    let d: string;

    if (section === 'front') {

        d = `
                M ${positionX},${currentY + 10}
                a 10,10 0 0 1 10,-10
                h ${width - 20}
                a 10,10 0 0 1 10,10
                v ${sectionHeight}
                h -${width}
                Z
            `;
    } else if (section === 'db') {

        d = `
                M ${positionX},${currentY}
                h ${width}
                v ${sectionHeight - 10}
                a 10,10 0 0 1 -10,10
                h -${width - 20}
                a 10,10 0 0 1 -10,-10
                Z
            `;
    } else {

        d = `
                M ${positionX},${currentY}
                h ${width}
                v ${sectionHeight}
                h -${width}
                Z
            `;
    }

    return d;
}


export function drawLines(svg: HTMLElement, columns: [{positionX: number, positionY: number, width: number}]) {

    const linePaths = [];

    // Соединение колонок
    for (let i = 0; i < columns.length - 1; i++) {
        const col1 = columns[i];
        const col2 = columns[i + 1];

        const x1 = col1.positionX + col1.width / 2;
        const y1 = col1.positionY - 10;
        const x2 = col2.positionX + col2.width / 2;
        const y2 = col2.positionY - 10;


        const controlY = Math.min(y1, y2) - 50;
        linePaths.push(`M ${x1 + 5}, ${y1} V ${controlY} H ${x2 - 5} V ${y2}`);

        const arrowHead = createElementSvg('path');
        const arrowSize = 10;
        const arrowPathData = `
            M ${x2 - 5},${y2 + arrowSize - 5}
            L ${x2 - 5 - arrowSize / 2},${y2 - 5}
            L ${x2 - 5 + arrowSize / 2},${y2 - 5}
            Z
        `;
        setAttributes(arrowHead, {
            "d": arrowPathData,
            "fill": "#898290"
        });
        svg.appendChild(arrowHead);
    }


    linePaths.forEach(pathData => {
        const path = createElementSvg('path');
        setAttributes(path, {
            "d": pathData,
            "stroke": "#898290",
            "fill": "none"
        });
        svg.appendChild(path);
    });
}





