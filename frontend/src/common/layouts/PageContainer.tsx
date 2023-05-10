import { IBasicProps } from "../models";


export interface IPageContainer extends IBasicProps {
    title?: any
}
export const PageContainer = (props: IPageContainer) => {
    const { className, children, title } = props;

    return <div className={["page-container", className].join(" ")}>
        {title && <>
            {(typeof title) == (typeof "") ? <h1 className="page-title">{title}</h1> : title}
        </>}
        {children}
    </div>
} 