import { Redirect } from "expo-router"
import { appRoutes } from '../src/utils/routes';

const DashboardController = () => {
    return (
        <Redirect href={appRoutes.tabs.home} />
    )
}

export default DashboardController