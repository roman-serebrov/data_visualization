import {
    calculatePositionX,
    calculatePositionY,
    createElementSvg,
    drawLines,
    normalizeSections,
    setAttributes
} from "../util";
import ColumnComponent from "../components/RectComponent";


export const setChart: Chart = (
    SVG__WIDTH,
    SVG__HEIGHT,
    COLUMN__WIDTH,
    COLUMN__SPACING,
    COLUMNS,
    SVG_ID,
    data
): void => {

    const
        svg = document.getElementById(SVG_ID);

    if (!svg) {
        throw new Error(`SVG элемент с id ${SVG_ID} не найден`);
    }

    svg.innerHTML = '';
    
    const
        TOTAL__COLUMNS__WIDTH = COLUMNS * COLUMN__WIDTH + (COLUMNS - 1) * COLUMN__SPACING,
        START_X = (SVG__WIDTH - TOTAL__COLUMNS__WIDTH) / 2;
    
        const { dev, prod, test, norm} = data;

    let
        positionY,
        positionX,
        height;


     const
          heightSections = normalizeSections(dev, prod, test);

        let i = 0;
        const sectionsName = ['dev', 'prod', 'test'];
        const infoColumns = [];


        for(const section of heightSections) {
            const
                { front, back, db } = section;
            height = front + back + db;
                  positionX = calculatePositionX(START_X, i, COLUMN__WIDTH, COLUMN__SPACING),
                  positionY = calculatePositionY(SVG__HEIGHT, height);


            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const rect = ColumnComponent(COLUMN__WIDTH, height, positionX, positionY, section, data[sectionsName[i]], i);
            infoColumns.push({
                width: COLUMN__WIDTH,
                height: height,
                positionX,
                positionY,
                section,
                id: `col-${i}`
            })
            svg.appendChild(rect);

            i = i + 1;
        }
    const
        normGroup = createElementSvg('g'),
        pathData = `M20.7031 0H10C4.47715 0 0 4.47715 0 10V45.934L41.9436 0H28.9482L0.0733177 31.6219L0.0733178 22.5925L20.7031 0ZM50.1886 0L0 54.9634V185C0 185.412 0.0249141 185.818 0.0733178 186.217V185.983L80 98.4525V84.1404L0.0733177 171.671L0.0733178 162.642L80 75.1109V60.7989L0.0733177 148.33L0.0733178 139.3L80 51.7694V37.4573L0.0733177 124.988L0.0733178 115.959L80 28.4279V14.1158L0.0733177 101.646L0.0733178 92.617L79.1672 5.99837C77.8126 2.89956 74.9328 0.619879 71.4769 0.108297L0.0733177 78.305L0.0733178 69.2755L63.3307 0H50.1886ZM80 107.482L2.8408 191.982C4.65697 193.844 7.19347 195 10 195H13.1536L80 121.794V107.482ZM80 130.823L21.3986 195H34.4674L80 145.135V130.823ZM80 154.165L42.7124 195H55.7811L80 168.477V154.165ZM80 177.506L64.0262 195H70C75.5229 195 80 190.523 80 185V177.506Z`;

    const path = createElementSvg('path');

    setAttributes(path, {
        "d": pathData,
        "fill": "#4AB6E8",
        "transform": `scale(1, ${height && height / 200})`,
        "transform-origin": "0 0"
    });

    normGroup.appendChild(path);

    const normText = createElementSvg('text');

    setAttributes(normText, {
        "x": "40",
        "y": (192.5 * (height ? height / 400 : 0)).toString(),
        "dominant-baseline": "middle",
        "text-anchor": "middle",
        "fill": "#ffffff"  // Белый цвет текста для контраста
    });

    normText.textContent = norm.toString();
    normGroup.appendChild(normText);
    if(positionY && height) {
        setAttributes(normGroup, {
            "transform": `translate(${positionX && positionX + COLUMN__WIDTH + 50}, ${positionY + height - 800 * (height / 800)})`
        });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    drawLines(svg, infoColumns);

    svg.appendChild(normGroup)
};


