import {createElementSvg, createSectionPath, setAttributes} from "../../util.ts";


function ColumnComponent(width: number, height: number, positionX: number, positionY: number, sections: Section, data: Section, id: number) {
    const group = createElementSvg('g');
    setAttributes(group, {
        "id":`col-${id}`
    });

    let currentY = positionY;
    const sectionColors: SectionColors = {
        front: "#4AB6E8",
        back: "#AA6FAC",
        db: "#E85498"
    };


    for (const [section, sectionHeight] of Object.entries(sections)) {
        const
            path = createElementSvg('path');

        setAttributes(path, {
            "d": createSectionPath(section, positionX, currentY, width, sectionHeight),
            "fill": sectionColors[section]
        });

        group.appendChild(path);

        const
            text = createElementSvg('text');
        setAttributes(text, {
            "x": (positionX + width / 2).toString(),
            "y": (currentY + sectionHeight / 2).toString(),
            "dominant-baseline": "middle",
            "text-anchor": "middle",
            "fill": "#ffffff"
        });
        text.textContent = (data[section]).toString();
        group.appendChild(text);

        currentY += sectionHeight;

    }

    const rect = createElementSvg('rect');
    setAttributes(rect, {
        "width": width.toString(),
        "height": height.toString(),
        "fill": "none",
        "rx": "10",
        "x": positionX.toString(),
        "y": positionY.toString(),
    });

    return group;
}




export default ColumnComponent;