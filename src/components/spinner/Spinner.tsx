import "./spinner.sass"

export const Spinner = () => {
    return(
        <div className="spinner-container">
            <span className={"spinner__title"}>Загрузка</span>
            <div className={"spinner"}></div>
        </div>
    )
}