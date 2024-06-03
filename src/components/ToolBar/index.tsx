import './toolbar.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function ToolBar({handlerChart, handlerLoading}) {
    const handlerClickChart  = (number: number) => {
        handlerLoading(true)
        handlerChart(number);

    }
    return (
        <div className={'list__link'}>
            <ul>
                <li onClick={() => handlerClickChart(1)}>
                   График 1
                </li>
                <li onClick={() => handlerClickChart(2)}>
                    График 2
                </li>
                <li onClick={() => handlerClickChart(3)}>
                    График 3
                </li>
                <li onClick={() => handlerClickChart(4)}>
                    График 4
                </li>
                <li onClick={() => handlerClickChart(5)}>
                    График 5
                </li>
            </ul>
        </div>
        
    )
}




export default ToolBar;