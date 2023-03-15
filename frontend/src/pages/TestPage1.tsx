import { apiRoutes } from "../common/ApiRoutes"
import { callGet } from "../common/Fetch"
import { PageContainer } from "../common/layouts/PageContainer"

export const TestPage1 = ()=>{

        const handleButton = async ()=>{
            let req = await callGet(apiRoutes.testMethod)
            alert(req.body)
        }

    return <PageContainer>
        <h1>Test page1</h1>
        <button onClick={handleButton}>Click me!</button>
    </PageContainer>
}