import { IBasicProps } from "../models";


export interface IPageContainer extends IBasicProps {
    title?: string
}
export const PageContainer = (props: IPageContainer) => {
    const { className, children, title } = props;

    return <div className={["page-container", className].join(" ")}>
        {title && <h1 className="page-title">{title}</h1>}
        {children}
    </div>
} 