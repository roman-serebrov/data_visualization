import './title.css';
interface TitleParams {
    title: string,
    loading: boolean
}
function Title({title, loading}: TitleParams) {
    return (
        <div className={`title ${loading ? '' : 'active'}`}>
                     
            <div className={'sub__title'}>
                <span>Количество пройденных тестов:</span>
            </div>
            <h2> “{title ? title : ''}”</h2>
        </div>
    )
}


export default Title;